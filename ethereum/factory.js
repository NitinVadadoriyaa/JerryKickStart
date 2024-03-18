import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x82086B8bB471e043513860d60d7343A330A6d57A"
);

export default instance;
