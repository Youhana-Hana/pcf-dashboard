import React, { Component } from 'react';

import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBlock,
  CardFooter,
  CardTitle,
  Badge
} from "reactstrap";

import CardRow from '../CardRow/';

class Environment extends Component {

  render() {
    let url = this.props.env.products.buildInfo.buildUrl;
    let buildNumber = this.props.env.products.buildInfo.buildGlobalIdentifier;
    let failedJobName = this.props.env.products.buildInfo.failedJobName;
    let stagedVersionERT = this.props.env.products.stagedVersionERT;

    return (
      <Col xs="12" sm="6" lg="4">
        <CardHeader>
          <h2 className="mb-0">
            {this.props.env.region} {this.props.env.foundation}
          </h2>
        </CardHeader>

        <Card className="text-white bg-primary">
          <CardBlock className="card-body pb-0">
            <CardRow row= {{label:"Current ERT Version", value: this.props.env.products.currentVersionERT}} key={this.props.env.products.currentVersionERT}></CardRow>

            {stagedVersionERT ?
            <CardRow row= {{label:"Staged ERT Version", value: this.props.env.products.stagedVersionERT}} key={this.props.env.products.stagedVersionERT}></CardRow> : <CardRow row= {{label:"Staged ERT Version", value: "N/A"}}></CardRow>}

            <CardRow row= {{label:"Forthcoming ERT Version(S3)", value: this.props.env.products.currentVersionERTInS3}} key={this.props.env.products.currentVersionERTInS3}></CardRow>

          </CardBlock>
        </Card>
      </Col>
    )
  }
}

export default Environment;
