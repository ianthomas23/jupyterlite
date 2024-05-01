// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import { ITerminal } from './tokens';

export class Terminal implements ITerminal {
  /**
   * Construct a new Terminal.
   */
  constructor(options: ITerminal.IOptions) {
    this._name = options.name;
    console.log("==> new Terminal", name);
  }

  /**
   * Get the name of the terminal.
   */
  get name(): string {
    return this._name;
  }

  private _name: string;
}
