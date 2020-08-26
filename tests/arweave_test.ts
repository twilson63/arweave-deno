import { Test } from "./deps.ts";
import Arweave from "../src/index.ts";

Test.testPlan("arweave_test.ts", () => {
  Test.testSuite("init", () => {
    Test.testCase("Create arweave instance", () => {
      const arweave = Arweave.init({
        host: "127.0.0.1",
        port: 1984,
        protocol: "http",
      });
      Test.asserts.assert(arweave);
    });
  });
});

Test.run();
