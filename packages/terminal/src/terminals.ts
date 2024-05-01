// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import { Contents, TerminalAPI } from '@jupyterlab/services';

import { Terminal } from './terminal';

import { ITerminals } from './tokens';

/**
 * A class to handle requests to /api/terminals
 */
export class Terminals implements ITerminals {
  /**
   * Construct a new Terminals object.
   */
  constructor(wsUrl: string, contentsManager: Contents.IManager) {
    this._wsUrl = wsUrl;
    this._contentsManager = contentsManager;
    console.log("==> Terminals.constructor");
  }

  /**
   * List the running terminals.
   */
  async list(): Promise<TerminalAPI.IModel[]> {
    const ret = [...this._terminals.values()].map((terminal) => ({
      name: terminal.name,
    }));
    console.log("==> Terminals.list", ret);
    return ret;
  }

  /**
   * Start a new kernel.
   */
  async startNew(): Promise<TerminalAPI.IModel> {
    const name = this._nextAvailableName();
    console.log("==> Terminals.new", name);
    const term = new Terminal({ name, contentsManager: this._contentsManager });
    this._terminals.set(name, term);

    const url = `${this._wsUrl}terminals/websocket/${name}`;
    await term.wsConnect(url);

    return { name };
  }

  private _nextAvailableName(): string {
    for (let i = 1; ; ++i) {
      const name = `${i}`;
      if (!this._terminals.has(name)) {
        return name;
      }
    }
  }

  private _wsUrl: string;
  private _contentsManager: Contents.IManager;
  private _terminals: Map<string, Terminal> = new Map();
}
