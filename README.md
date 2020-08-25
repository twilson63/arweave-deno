# Arweave Deno

Arweave Deno is a fork of arweave-js and it is intended to be the TypeScript SDK for interacting with the Arweave network and uploading data ot the permaweb for **Deno**.

## Initialisation

### Deno
```js
import Arweave from "https://x.nest.land/arweave@0.0.1/src/index.ts";

const arweave = Arweave.init({
    host: '127.0.0.1',
    port: 1984,
    protocol: 'http'
});
```

### Initialisation options
```js
{
    host: 'arweave.net',// Hostname or IP address for a Arweave host
    port: 443,          // Port
    protocol: 'https',  // Network protocol http or https
    timeout: 20000,     // Network request timeouts in milliseconds
    logging: false,     // Enable network request logging
}
```

### ArQL

ArQL allows you to search for transactions by tags or by wallet address.

  The allowed operators are `and`, `or`, and `equals` which all accept exactly two expressions. Therefore, to `and` three or more expressions together, you will need to nest `and` expressions. The same goes for `or`. Searching by wallet is done by using the special tag `from`.

`arweave.arql` takes the ArQL query as an object and returns the matching transaction IDs as an array of strings.

```js
const txids = await arweave.arql({
  op: "and",
  expr1: {
    op: "equals",
    expr1: "from",
    expr2: "hnRI7JoN2vpv__w90o4MC_ybE9fse6SUemwQeY8hFxM"
  },
  expr2: {
    op: "or",
    expr1: {
      op: "equals",
      expr1: "type",
      expr2: "post"
    },
    expr2: {
      op: "equals",
      expr1: "type",
      expr2: "comment"
    }
  }
})

console.log(txids)
// [
//   'TwS2G8mi5JGypMZO_EWtHKvrJkB76hXmWN3ROCjkLBc',
//   'urdjQI4iKo7l8xQ0A55G7bOM3oi4QdGAd7MeVE_ru5c',
//   '_CD8p7z3uFJCB03OCMU7R80FTQ3ZRf8O2UGhNxoUaOg',
//   ...
// ]
```

### License

This software is released under MIT license. See [LICENSE.md](./LICENSE.md) for full license details.
