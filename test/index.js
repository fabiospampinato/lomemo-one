
/* IMPORT */

import {describe} from 'fava';
import lomemoOnce from '../dist/index.js';

/* MAIN */

describe ( 'Lomemo Once', it => {

  it ( 'can memoize a function, keying on the first argument', t => {

    const fn = ( a, b ) => a + b;
    const mfn = lomemoOnce ( fn );

    t.is ( mfn ( 1, 2 ), 3 );
    t.is ( mfn ( 1, 5 ), 3 );
    t.is ( mfn ( 2, 8 ), 10 );
    t.is ( mfn ( 1, 5 ), 6 );

    t.is ( fn ( 1, 2 ), 3 );
    t.is ( fn ( 1, 5 ), 6 );

  });

  it ( 'can memoize a function, keying on a custom function', t => {

    const fn = ( a, b ) => a + b;
    const mfn = lomemoOnce ( fn, ( ...args ) => args.join ( '' ) );

    t.is ( mfn ( 1, 2 ), 3 );
    t.is ( mfn ( 1, 5 ), 6 );
    t.is ( mfn ( '', '15' ), 6 );
    t.is ( mfn ( 2, 8 ), 10 );
    t.is ( mfn ( '', '15' ), '15' );

    t.is ( fn ( 1, 2 ), 3 );
    t.is ( fn ( 1, 5 ), 6 );

  });

  it ( 'calls the original function with the original this context', t => {

    const results = [];
    const fn = function ( arg ) { results.push ( this, arg ) };
    const mfn = lomemoOnce ( fn );

    mfn ( 123 )
    mfn.call ( 1, 2 );

    t.deepEqual ( results, [undefined, 123, 1, 2] );

  });

  it ( 'calls the resolver function with the original this context', t => {

    const results = [];
    const fn = () => {};
    const mfn = lomemoOnce ( fn, function ( arg ) { results.push ( this, arg ); } );

    mfn ( 123 )
    mfn.call ( 1, 2 );

    t.deepEqual ( results, [undefined, 123, 1, 2] );

  });

});
