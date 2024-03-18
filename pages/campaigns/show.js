import React, { Component } from "react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign"; // import instance
import { Card, Grid, Button } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import { Link } from "../../routes";

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(
      props.query.address
    ); /* make instance of campaign contract with help of it s address*/
    const summary = await campaign.methods.getSummary().call();
    /* summary is object */
    return {
      address: props.query.address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approverCount: summary[3],
      manager: summary[4],
    };
  }
  renderCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approverCount,
    } = this.props;
    const items = [
      {
        header: (
          <a
            href={`https://sepolia.etherscan.io/address/${manager}`}
            target="_blank"
          >
            {manager}
          </a>
        ),
        meta: "Address of Manager",
        description:
          "The manager created this campaign and can create request to withdrow money.",
        style: { overflowWrap: "break-word" },
      },
      {
        header: minimumContribution,
        meta: "Minimum Contributaion (wei)",
        description:
          "You Must Contribute at least this much Wei to become an approver.",
      },
      {
        header: requestsCount,
        meta: "Number Of Requests",
        description:
          "A Request tries to withdraw money from the contract. Request must be approved by approvers.",
      },
      {
        header: approverCount,
        meta: "Number Of Approvers",
        description: "Number of people who are donated money in this campaign.",
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Campaign Balance (ether)",
        description:
          "The balance is how much money this campaign has left to spend.",
      },
    ];
    return <Card.Group items={items}></Card.Group>;
  }

  render() {
    return (
      <Layout>
        <h3>Campaign Show</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary>View Request</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
