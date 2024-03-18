import React, { Component } from "react";
import { Form, Button, Message, Input } from "semantic-ui-react";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import { Link, Router } from "../../../routes";
import Layout from "../../../components/Layout";

class RequestNew extends Component {
  state = {
    value: "",
    description: "",
    recipientAddress: "",
    errorMessage: "",
    loading: false,
  };
  static async getInitialProps(props) {
    const { address } = props.query;
    return { address };
  }

  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: "" });
    const campaign = Campaign(this.props.address);
    const { description, value, recipientAddress } = this.state;
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(
          description,
          web3.utils.toWei(value, "ether"),
          recipientAddress
        )
        .send({
          from: accounts[0],
        });
      Router.pushRoute(`/campaigns/${this.props.address}/requests`);
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }
    this.setState({ loading: false });
  };
  render() {
    return (
      <Layout>
        <Link route={`/campaigns/${this.props.address}/requests`}>
          <a>
            <b>Back</b>
          </a>
        </Link>
        <h3>Create a Request</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Description</label>
            <Input
              value={this.state.description}
              onChange={(event) =>
                this.setState({ description: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Value in Ether</label>
            <Input
              value={this.state.value}
              onChange={(event) => this.setState({ value: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Recipient Address</label>
            <Input
              value={this.state.recipientAddress}
              onChange={(event) =>
                this.setState({ recipientAddress: event.target.value })
              }
            />
          </Form.Field>
          <Message
            error
            header="Transaction Rejected!"
            content={this.state.errorMessage}
          />
          <Button primary loading={this.state.loading}>
            Create!
          </Button>{" "}
          <label>Only Owner of Campaign will make Request.</label>
        </Form>
      </Layout>
    );
  }
}

export default RequestNew;
