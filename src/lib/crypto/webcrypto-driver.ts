import { JWKInterface, JWKPublicInterface } from "../wallet.ts";
import CryptoInterface from "./crypto-interface.ts";
import * as ArweaveUtils from "../utils.ts";
import {
  generateJWK,
  hash,
  encrypt,
  decrypt,
  sign,
  verify,
} from "https://raw.githubusercontent.com/divy-work/arweave-crypto-api/master/sdk/deno/mod.ts";

export default class WebCryptoDriver implements CryptoInterface {
  public readonly keyLength = 4096;
  public readonly publicExponent = 0x10001;
  public readonly hashAlgorithm = "sha256";

  public async generateJWK(): Promise<JWKInterface> {
    return await generateJWK();
  }

  public async sign(jwk: JWKInterface, data: Uint8Array): Promise<Uint8Array> {
    let signature = await sign(jwk, data);
    return new Uint8Array(signature.data);
  }

  public async hash(
    data: Uint8Array,
    algorithm: string = "SHA-256",
  ): Promise<Uint8Array> {
    let digest = await hash(data, algorithm);
    return new Uint8Array(digest.data);
  }

  public async verify(
    publicModulus: string,
    data: Uint8Array,
    signature: Uint8Array,
  ): Promise<boolean> {
    return Boolean(await verify(publicModulus, data, signature));
  }

  public async encrypt(
    data: Uint8Array,
    key: string,
  ): Promise<Uint8Array> {
    const b = await encrypt(data, key);
    return new Uint8Array(b.data);
  }

  public async decrypt(
    encrypted: Uint8Array,
    key: string,
  ): Promise<Uint8Array> {
    const b = await decrypt(encrypted, key);
    return new Uint8Array(b.data);
  }
}
