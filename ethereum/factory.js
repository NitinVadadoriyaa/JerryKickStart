import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x1b2De54F73f3104fbef8B644A88779a06EC4fD68"
);

export default instance;
