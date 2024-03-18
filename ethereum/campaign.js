import web3 from "./web3";
import Campaign from "./build/Campaign.json";

/*
every contract-address have to make instance that allow js to interact with it.

*/
export default (address) => {
  return new web3.eth.Contract(JSON.parse(Campaign.interface), address);
};
