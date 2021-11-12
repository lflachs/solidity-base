require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const contractFile = require("./compile");
const bytecode = contractFile.evm.bytecode.object;
const abi = contractFile.abi;

const provider = new HDWalletProvider(
  process.env.WALLET,
  process.env.INFURA_API_kEY
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("attempting to deploy from account", accounts[0]);
  const result = await new web3.eth.Contract(abi)
    .deploy({
      data: bytecode,
      arguments: ["Hi there"],
    })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("Contract deployed to ", result.options.address);
  return true;
};
// 0xe4d5d26407d95df2f4047aa81e0c7842ccf871a7;
// 0xD998c914b928e0f7A255b9196BB8e039014E4fd5

deploy();
