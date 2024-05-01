// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import { JupyterFileSystem } from "@ianthomas23/cockle";

import { JSONPrimitive } from '@lumino/coreutils';

import { Server as WebSocketServer, Client as WebSocketClient } from 'mock-socket';

import { ITerminal } from './tokens';

export class Terminal implements ITerminal {
  /**
   * Construct a new Terminal.
   */
  constructor(options: ITerminal.IOptions) {
    this._name = options.name;
    const jfs = new JupyterFileSystem(options.contentsManager);
    console.log("==> new Terminal", name, jfs);
  }

  /**
   * Get the name of the terminal.
   */
  get name(): string {
    return this._name;
  }

  async wsConnect(url: string) {
    console.log("==> Terminal.wsConnect", url);

    const server = new WebSocketServer(url, { mock: false });

    server.on('connection', async (socket: WebSocketClient) => {
      console.log("SERVER CONNECTION", this, socket);

      socket.on('message', async (message: any) => {
        // might be a 'set-size' message.
        const data = JSON.parse(message) as JSONPrimitive[];
        console.log("SOCKET MESSAGE", data);
        const message_type = data[0];
        const content = data.slice(1);

        if (message_type == 'stdin') {
            // send this to shell. Later get returned string.
            // echo character back...
            let char = content[0];  // Can this be more than one character?
            if (char == '\r') {
              char = '\n\r';
            }
            const ret = JSON.stringify(['stdout', char]);
            socket.send(ret);
          }
      });

      socket.on('close', async () => {
        console.log("SOCKET CLOSE");
      });

      socket.on('error', async () => {
        console.log("SOCKET ERROR");
      });

      // Return handshake.
      const res = JSON.stringify(['setup']);
      console.log("Returning handshake via socket", res);
      socket.send(res);
    });
  }

  private _name: string;
}
