// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import { ITerminals } from './tokens';

/**
 * A class to handle requests to /api/terminals
 */
export class Terminals implements ITerminals {
  constructor() {
    console.log("==> Terminals.constructor")
  }
}
