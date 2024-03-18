import React, { Component } from "react";
import { Button, Form, Table, Message } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";
import { Router } from "../routes";

class RequestRow extends Component {
  state = {
    app_loading: false,
    fin_loading: false,
  };
  onApprove = async () => {
    this.setState({ app_loading: true });
    const campaign = Campaign(this.props.address);
    const accounts = await web3.eth.getAccounts();
    try {
      await campaign.methods.approveRequest(this.props.id).send({
        from: accounts[0],
      });
      Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
    } catch (error) {
      <span value={error.message}></span>;
    }

    this.setState({ app_loading: false });
  };

  onFinalize = async () => {
    this.setState({ fin_loading: true });
    const campaign = Campaign(this.props.address);
    const accounts = await web3.eth.getAccounts();
    try {
      await campaign.methods.finalizeRequest(this.props.id).send({
        from: accounts[0],
      });
      Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
    } catch (error) {
      <span value={error.message}></span>;
    }
    this.setState({ fin_loading: false });
  };
  render() {
    const { Row, Cell } = Table;
    const { id, request, approversCount } = this.props;
    const readyToFinalize = request.approvalCount > approversCount / 2;
    return (
      <Row
        disabled={request.complete}
        positive={readyToFinalize && !request.complete}
      >
        <Cell>{id + 1}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, "ether")}</Cell>
        <Cell>
          <a
            href={`https://sepolia.etherscan.io/address/${request.recipient}`}
            target="_blank"
          >
            {request.recipient}
          </a>
        </Cell>
        <Cell>
          {request.approvalCount}/{approversCount}
        </Cell>
        <Cell>
          {request.complete ? null : (
            <Button
              color="green"
              basic
              onClick={this.onApprove}
              loading={this.state.app_loading}
            >
              Approve
            </Button>
          )}
        </Cell>
        <Cell>
          {request.complete ? null : (
            <Button
              color="teal"
              basic
              onClick={this.onFinalize}
              loading={this.state.fin_loading}
            >
              Finalize
            </Button>
          )}
        </Cell>
      </Row>
    );
  }
}

export default RequestRow;
