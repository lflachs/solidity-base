const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const http = require("http");
const Web3HttpProvider = require("web3-providers-http");
const contractFile = require("../compile");
// Initialization
const bytecode = contractFile.evm.bytecode.object;
const abi = contractFile.abi;

const provider = new Web3HttpProvider("http://localhost:7545");
// const provider = ganache.provider()

const web3 = new Web3(provider);
let accounts;
let inbox;
let INITIAL_MESSAGE = "Hi there";
beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(abi)
    .deploy({
      data: bytecode,
      arguments: [INITIAL_MESSAGE],
    })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    assert.ok(inbox.options.address);
  });

  it("has the default message", async () => {
    const message = await inbox.methods.message().call({ from: accounts[0] });
    assert.equal(message, INITIAL_MESSAGE);
  });

  it("should change the message", async () => {
    const newMessage = "Bye Bye";
    await inbox.methods.setMessage(newMessage).send({ from: accounts[0] });
    const message = await inbox.methods.message().call({ from: accounts[0] });
    assert.equal(message, newMessage);
  });
});
