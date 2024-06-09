
/* IMPORT */

import type {FN} from './types';

/* MAIN */

const memoizeOnce = <Arguments extends unknown[], Return> ( fn: FN<Arguments, Return>, resolver?: FN<Arguments, unknown> ): FN<Arguments, Return> => {

  let inited = false;
  let cachedKey: unknown;
  let cachedResult: Return;

  return function ( this: unknown, ...args: Arguments ): Return {

    const key = resolver ? resolver.apply ( this, args ) : args[0];

    if ( inited && key === cachedKey ) return cachedResult;

    const result = fn.apply ( this, args );

    inited = true;
    cachedKey = key;
    cachedResult = result;

    return result;

  };

};

/* EXPORT */

export default memoizeOnce;
