import Arweave from "../src/index.ts";

const Credentials = JSON.parse(
    await Deno.readTextFile("./arweave-keyfile.json")
)


type ArwConnection = Arweave & { anchor: string };

async function init(): Promise<ArwConnection> {

    const arweave = Arweave.init({
        host: "arweave.net",
        port: 443,
        protocol: "https",
        logging: true,
        logger: (...e: any[]) => console.log(...e),
      });
      
      (arweave as any).anchor = (await arweave.api.get("/tx_anchor")).data;
      
      return arweave as ArwConnection;
      
}

export async function save(
    connection: ArwConnection,
  ) {
    const transaction = await connection.createTransaction(
      { data: "test", last_tx: connection.anchor },
      Credentials,
    );
    transaction.addTag("Content-Type", "application/plain-text");
  
    await connection.transactions.sign(transaction, Credentials);
    const res = await connection.transactions.post(transaction);
  
    if (res.status >= 300) throw new Error("Transaction failed!");
  
    return transaction.id;
}

await save(await init());