import Arweave from "./common.ts";
import { ApiConfig } from "./lib/api.ts";
import WebCryptoDriver from "./lib/crypto/webcrypto-driver.ts";

Arweave.crypto = new WebCryptoDriver();

Arweave.init = function(apiConfig: ApiConfig = {}): Arweave {
  return new Arweave(apiConfig);
};

export default Arweave;
