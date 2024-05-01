// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import { TerminalAPI } from '@jupyterlab/services';

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
    return [];
  }

  /**
   * Start a new kernel.
   */
  async startNew(): Promise<TerminalAPI.IModel> {
    console.log("==> Terminals.new");
    // need a unique name.
    return { name: "2222" };
  }
}
