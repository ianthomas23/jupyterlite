// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import { TerminalAPI } from '@jupyterlab/services';

import { Token } from '@lumino/coreutils';

/**
 * The token for the Terminals service.
 */
export const ITerminals = new Token<ITerminals>('@jupyterlite/terminal:ITerminals');

/**
 * An interface for the Terminals service.
 */
export interface ITerminals {
  /**
   * List the running terminals.
   */
  list: () => Promise<TerminalAPI.IModel[]>;

  /**
   * Start a new kernel.
   */
  startNew: () => Promise<TerminalAPI.IModel>;
}
