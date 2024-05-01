// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import { TerminalAPI } from '@jupyterlab/services';

import { Terminal } from './terminal';

import { ITerminals } from './tokens';

/**
 * A class to handle requests to /api/terminals
 */
export class Terminals implements ITerminals {
  /**
   * Construct a new Terminals object.
   */
  constructor() {
    console.log("==> Terminals.constructor");
  }

  /**
   * List the running terminals.
   */
  async list(): Promise<TerminalAPI.IModel[]> {
    console.log("==> Terminals.list");
    return [...this._terminals.values()].map((terminal) => ({
      name: terminal.name,
    }));
  }

  /**
   * Start a new kernel.
   */
  async startNew(): Promise<TerminalAPI.IModel> {
    const name = this._nextAvailableName();
    console.log("==> Terminals.new", name);
    const term = new Terminal({ name });
    this._terminals.set(name, term);
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

  private _terminals: Map<string, Terminal> = new Map();
}
