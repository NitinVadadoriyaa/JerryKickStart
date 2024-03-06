const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledFactory = require("../ethereum/build/CampaignFactory.json");
const compiledCampaign = require("../ethereum/build/Campaign.json");

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: "1000000" });

  await factory.methods.createCampaign("100").send({
    from: accounts[0],
    gas: "1000000", // gasLimit
  });

  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
  campaign = await new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface),
    campaignAddress
  );
});

describe("Campaigns", () => {
  it("deploys a factory and a campaign", () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  it("marks caller as the campaign manager", async () => {
    // console.log(await web3.eth.getBalance(accounts[1]));
    const manager = await campaign.methods.manager().call();
    assert.equal(accounts[0], manager);
  });

  it("allows people to contribute money and marks them as approvers", async () => {
    await campaign.methods.contribute().send({
      value: "1000",
      from: accounts[1],
    });

    const isContributor = await campaign.methods.approvers(accounts[1]).call();
    assert(isContributor);
  });

  it("requires a minimum contribution", async () => {
    try {
      // handle transaction abort error...
      await campaign.methods.contribute().send({
        value: "50",
        from: accounts[1],
      });
      assert(false);
    } catch (error) {
      assert(error);
    }
  });

  it("allows a manager to make payment a request", async () => {
    await campaign.methods
      .createRequest("buy battery", "100", accounts[1])
      .send({
        from: accounts[0],
        gas: "1000000", // must be same as gasLimit set during contract creations
      });

    const request = await campaign.methods.requests(0).call();
    assert.equal("buy battery", request.description);
  });

  it("processes request", async () => {
    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei("10", "ether"),
    });

    await campaign.methods
      .createRequest("A", web3.utils.toWei("5", "ether"), accounts[1])
      .send({
        from: accounts[0],
        gas: "1000000",
      });

    try {
      // approveRequest by not approver
      await campaign.methods.approveReques(0).send({
        from: accounts[2],
        gas: "1000000",
      });
      assert(false);
    } catch (error) {
      assert(error);
    }

    await campaign.methods.approveRequest(0).send({
      from: accounts[0],
      gas: "1000000",
    });

    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: "1000000",
    });

    let balance = await web3.eth.getBalance(accounts[1]);
    balance = web3.utils.fromWei(balance, "ether");
    balance = parseFloat(balance);
    console.log(balance);

    assert(balance > 103); // intial balance is 100
  });

  it("majority vote on request allow transaction only", async () => {
    await campaign.methods
      .createRequest("buy battery", "10000000000", accounts[3])
      .send({
        from: accounts[0],
        gas: "1000000", // must be same as gasLimit set during contract creations
      });

    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei("1", "ether"),
    });
    await campaign.methods.contribute().send({
      from: accounts[1],
      value: web3.utils.toWei("1", "ether"),
    });
    await campaign.methods.contribute().send({
      from: accounts[2],
      value: web3.utils.toWei("1", "ether"),
    });

    try {
      // 0 vote and finalizeRequest
      await campaign.methods.finalizeRequest(0).send({
        from: accounts[0],
        gas: "1000000",
      });
      assert(false);
    } catch (error) {
      assert(error);
    }

    await campaign.methods.approveRequest(0).send({
      // 1 vote for approve
      from: accounts[0],
      gas: "1000000",
    });

    try {
      // 1 vote and finalizeRequest
      await campaign.methods.finalizeRequest(0).send({
        from: accounts[0],
        gas: "1000000",
      });
      assert(false);
    } catch (error) {
      assert(error);
    }

    await campaign.methods.approveRequest(0).send({
      // 2 vote for approve
      from: accounts[1],
      gas: "1000000",
    });

    let balance1 = await web3.eth.getBalance(accounts[3]);
    balance1 = web3.utils.fromWei(balance1, "ether");
    balance1 = parseFloat(balance1);
    console.log(balance1);

    try {
      // 2 vote and finalizeRequest && now it exicute successfully..
      await campaign.methods.finalizeRequest(0).send({
        from: accounts[0],
        gas: "1000000",
      });
      assert(false);
    } catch (error) {
      console.log("in two vote...");
      assert(error);
    }

    await campaign.methods.approveRequest(0).send({
      // vote 3
      // 1 vote for approve
      from: accounts[2],
      gas: "1000000",
    });

    let balance2 = await web3.eth.getBalance(accounts[3]);
    balance2 = web3.utils.fromWei(balance2, "ether");
    balance2 = parseFloat(balance2);
    console.log(balance2);
  });
});
