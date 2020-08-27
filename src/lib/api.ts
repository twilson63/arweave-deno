import Axios from "https://raw.githubusercontent.com/divy-work/axiod/master/mod.ts";
import {
  IAxiodResponse as AxiosResponse,
  IRequest as AxiosRequestConfig,
} from "https://raw.githubusercontent.com/divy-work/axiod/master/interfaces.ts";

export interface ApiConfig {
  host?: string;
  protocol?: string;
  port?: string | number;
  timeout?: number;
  logging?: boolean;
  logger?: Function;
}

export default class Api {
  public readonly METHOD_GET = "GET";
  public readonly METHOD_POST = "POST";

  public config!: ApiConfig;

  constructor(config: ApiConfig) {
    this.applyConfig(config);
  }

  public applyConfig(config: ApiConfig) {
    this.config = this.mergeDefaults(config);
  }

  public getConfig() {
    return this.config;
  }

  private mergeDefaults(config: ApiConfig): ApiConfig {
    const protocol = config.protocol || "http";
    const port = config.port || (protocol === "https" ? 443 : 80);

    return {
      host: config.host || "127.0.0.1",
      protocol,
      port,
      timeout: config.timeout || 20000,
      logging: config.logging || false,
      logger: config.logger || console.log,
    };
  }

  public async get(
    endpoint: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse> {
    try {
      if (this.config.logging) {
        this.config.logger!(
          `Requesting: ${this.config.protocol}://${this.config.host}:${this.config.port}${
            endpoint.startsWith("/") ? endpoint : "/" + endpoint
          }`,
        );
      }
      return await Axios.get(
        `${this.config.protocol}://${this.config.host}:${this.config.port}${
          endpoint.startsWith("/") ? endpoint : "/" + endpoint
        }`,
        config,
      );
    } catch (error) {
      if (error.response && error.response.status) {
        return error.response;
      }

      throw error;
    }
  }

  public async post(
    endpoint: string,
    body: Uint8Array | string | object,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse> {
    try {
      if (this.config.logging) {
        this.config.logger!(
          `Requesting: ${this.config.protocol}://${this.config.host}:${this.config.port}${
            endpoint.startsWith("/") ? endpoint : "/" + endpoint
          }`,
        );
      }
      return await Axios.post(
        `${this.config.protocol}://${this.config.host}:${this.config.port}${
          endpoint.startsWith("/") ? endpoint : "/" + endpoint
        }`,
        body,
        config,
      );
    } catch (error) {
      if (error.response && error.response.status) {
        return error.response;
      }

      throw error;
    }
  }

  /**
   * Get an AxiosInstance with the base configuration setup to fire off
   * a request to the network.
   */
  public request(): typeof Axios {
    let instance = Axios.create({
      baseURL:
        `${this.config.protocol}://${this.config.host}:${this.config.port}`,
      timeout: this.config.timeout,
    });

    return instance;
  }
}
