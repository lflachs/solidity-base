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

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(abi)
    .deploy({
      data: bytecode,
      arguments: ["test"],
    })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    // console.log(inbox.options.address);
    assert.ok(inbox.options.address);
  });

  it("has the default message", async () => {
    // console.log(inbox);
    // const test = await inbox.methods
    //   .setMessage("test")
    //   .send({ from: accounts[0] });

    const message = await inbox.methods.message().call({ from: accounts[0] });
    console.log("message is", message);
    // assert.equal(message, "Hi there");
  });
});
