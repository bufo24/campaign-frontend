import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import web3 from "../../campaign/web3";
import getCampaign from "../../campaign/campaign";

class RequestRow extends Component {
  onApprove = async () => {
    const campaign = getCampaign(this.props.address);

    const accounts = await web3.eth.getAccounts();
    await campaign.methods.approveRequest(this.props.id).send({
      from: accounts[0],
    });
  };
  onFinalize = async () => {
    const campaign = getCampaign(this.props.address);

    const accounts = await web3.eth.getAccounts();
    await campaign.methods.finalizeRequest(this.props.id).send({
      from: accounts[0],
    });
  };
  render() {
    const { Row, Cell } = Table;
    const { id, request, approversCount } = this.props;
    const readyToFinalize = request.approvalCount > approversCount / 2;
    return (
      <Row
        disabled={request.complete}
        positive={this.readyToFinalize && !request.complete}
      >
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, "ether")}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>
          {request.approvalCount} / {approversCount}
        </Cell>
        <Cell>
          {request.complete ? null : (
            <Button onClick={this.onApprove} color="green" basic>
              Approve
            </Button>
          )}
        </Cell>
        <Cell>
          {request.complete ? null : (
            <Button onClick={this.onFinalize} color="teal" basic>
              Finalize
            </Button>
          )}
        </Cell>
      </Row>
    );
  }
}

export default RequestRow;
