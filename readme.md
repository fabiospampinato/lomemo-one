# Lomemo One

A variant of [lodash's memoize function](https://www.npmjs.com/package/lodash.memoize) that remembers only one result, the last one.

## Install

```sh
npm install lomemo-one
```

## Usage

```ts
import lomemoOne from 'lomemo-one';

// Let's memoize a function, using the first argument as the key

const memoized = lomemoOne ( ( a, b ) => a + b );

memoized ( 1, 2 ); // => 3
memoized ( 1, 5 ); // => 3
memoized ( 2, 8 ); // => 10
memoized ( 1, 5 ); // => 6

// Let's memoize a function, using a custom function to generate the key

const resolver = ( ...args ) => args.join ( '' );
const memoized = lomemoOne ( ( a, b ) => a + b, resolver );

memoized ( 1, 2 ); // => 3
memoized ( 1, 5 ); // => 6
memoized ( '', '15' ); // => 6
memoized ( 2, 8 ); // => 10
memoized ( '', '15' ); // => '15'
```

## License

MIT © Fabio Spampinato
