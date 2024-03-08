import React, { Component } from "react";
import factory from "../ethereum/factory";

//class based component
class CampaignIndex extends Component {
  async ComponentDidMount() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    console.log(campaigns);
  }

  render() {
    return <div>campaigns index!</div>;
  }
}

export default CampaignIndex;
