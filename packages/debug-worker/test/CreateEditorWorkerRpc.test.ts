import { createEditorWorkerRpc } from "../../src/parts/CreateEditorWorkerRpc/CreateEditorWorkerRpc";

// Mock GetPortTuple to provide a valid MessageChannel
jest.mock("../../src/parts/GetPortTuple/GetPortTuple", () => {
  const { MessageChannel } = require('worker_threads');
  return {
    getPortTuple: () => {
      const { port1, port2 } = new MessageChannel();
      return { port1, port2 };
    }
  };
});

// Mock sendMessagePortToEditorWorker to simulate sending the port
jest.mock("../../src/parts/SendMessagePortToEditorWorker/SendMessagePortToEditorWorker", () => ({
  sendMessagePortToEditorWorker: async (port) => Promise.resolve()
}));


describe("createEditorWorkerRpc", () => {
  it("should create an rpc instance", async () => {
    const rpc = await createEditorWorkerRpc();
    expect(rpc).toBeDefined();
    expect(rpc).toHaveProperty('commandMap');
  });
});

