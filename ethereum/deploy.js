//deployed CampaignFactory-contract address = 0x1b2De54F73f3104fbef8B644A88779a06EC4fD68

const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");

const provider = new HDWalletProvider( // HDWalletProvider -> simalatously and automaticaly unlock accounts.
  "Your 12/16 words neomonic for unlock your metamask wallet",
  "Your node api key"
);

const web3 = new Web3(provider); // provider,web3 -> instance

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: "1000000" });

  console.log("Successfully Contract deployed to", result.options.address);
  //to prevent a hanging deployment
  provider.engine.stop();
};

deploy();
