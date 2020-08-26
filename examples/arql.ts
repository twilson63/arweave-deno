import Arweave from "../src/index.ts";

const arweave = Arweave.init({
  host: "arweave.net",
  protocol: "https",
});

const txids = await arweave.arql({
  op: "and",
  expr1: {
    op: "equals",
    expr1: "from",
    expr2: "hnRI7JoN2vpv__w90o4MC_ybE9fse6SUemwQeY8hFxM",
  },
  expr2: {
    op: "or",
    expr1: {
      op: "equals",
      expr1: "type",
      expr2: "post",
    },
    expr2: {
      op: "equals",
      expr1: "type",
      expr2: "comment",
    },
  },
});

console.log(txids);
