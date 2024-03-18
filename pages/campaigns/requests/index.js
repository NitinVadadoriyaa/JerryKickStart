import React, { Component } from "react";
import Layout from "../../../components/Layout";
import { Button, Table } from "semantic-ui-react";
import { Link } from "../../../routes";
import Campaign from "../../../ethereum/campaign";
import RequestRow from "../../../components/RequestRow";

class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    const campaign = Campaign(address);
    const approversCount = await campaign.methods.approversCount().call();
    const requestCount = await campaign.methods.getRequestsCount().call();
    /* javascript fancy logic */
    const requests = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((element, index) => {
          return campaign.methods
            .requests(index)
            .call(); /* requests is array of struct */
        })
    );

    return { address, requests, requestCount, approversCount };
  }

  renderRow() {
    return this.props.requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          request={request}
          address={this.props.address}
          approversCount={this.props.approversCount}
        />
      );
    });
  }
  render() {
    const { Header, Row, HeaderCell, Body } = Table; /* es6 javascript */
    return (
      <Layout>
        <h3> Requests List</h3>
        <Link route={`/campaigns/${this.props.address}`}>
          <a>
            <Button primary floated="left" style={{ marginBottom: 10 }}>
              Back
            </Button>
          </a>
        </Link>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button primary floated="right" style={{ marginBottom: 10 }}>
              Add Request
            </Button>
          </a>
        </Link>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Recipient Address</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRow()}</Body>
        </Table>
        <span>
          Found <b>{this.props.requestCount}</b> Request.
        </span>
      </Layout>
    );
  }
}

export default RequestIndex;
