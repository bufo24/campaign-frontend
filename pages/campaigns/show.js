import React, { Component } from "react";
import Layout from "../../components/Layout";
import getCampaign from "../../campaign/campaign";
import { Card, Grid, Button } from "semantic-ui-react";
import { Link } from "../../routes";
import web3 from "../../campaign/web3";
import ContributeForm from "../../components/ContributeForm";

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = getCampaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();
    return {
      address: props.query.address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      owner: summary[4],
    };
  }

  renderCards() {
    const {
      balance,
      owner,
      minimumContribution,
      requestsCount,
      approversCount,
    } = this.props;
    const items = [
      {
        header: owner,
        meta: "Address of owner",
        description:
          "The manager created this campaign and can create a request to withdraw money.",
        style: { overflowWrap: "break-word" },
      },
      {
        header: minimumContribution,
        meta: "Minimum Contribution (wei)",
        description:
          "You must contribute at least this amount of wei to contribute.",
      },
      {
        header: requestsCount,
        meta: "Number of requests",
        description:
          "A request to withdraw money from the contract. Request must be approved by approvers.",
      },
      {
        header: approversCount,
        meta: "Number of Approvers",
        description:
          "Number of people who have already donated to this campaign.",
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Campaign Balance (ether)",
        description:
          "The balance is how much money this campaign has left to spend.",
      },
    ];
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>Campaign show</h3>
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
                  <Button primary>View requests</Button>
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
