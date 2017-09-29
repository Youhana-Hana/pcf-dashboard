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

  getStatusLabel(status) {
    switch(status.toLowerCase()) {
      case "passed":
        return "S";
      case "failed":
        return "F";
      default:
        return "R";
    }
  }

  getStatusColor(status) {
    switch(status.toLowerCase()) {
      case "passed":
        return "success";
      case "failed":
        return "danger";
      default:
        return "warning";
    }
  }


  render() {
    let url = this.props.env.products.buildInfo.buildUrl;
    let buildNumber = this.props.env.products.buildInfo.buildGlobalIdentifier;
    let failedJobName = this.props.env.products.buildInfo.failedJobName;
    let stagedVersion = this.props.env.products.stagedVersion;

    return (
      <Col xs="12" sm="6" lg="4">
        <CardHeader>
          <h2 className="mb-0">
            {this.props.env.region} {this.props.env.foundation}
            <Badge pill color={this.getStatusColor(this.props.env.products.pipelineStatus)} className="float-right"><a href={url} className="text-white" target="_blank"> {buildNumber}</a></Badge>
          </h2>
        </CardHeader>

        <Card className="text-white bg-primary">
          <CardBlock className="card-body pb-0">
            <CardRow row= {{label:"Current ERT Version", value: this.props.env.products.currentVersion}} key={this.props.env.products.currentVersion}></CardRow>

            {stagedVersion ?
            <CardRow row= {{label:"Staged ERT Version", value: this.props.env.products.stagedVersion}} key={this.props.env.products.stagedVersion}></CardRow> : <CardRow row= {{label:"Staged ERT Version", value: "N/A"}}></CardRow>}

            <CardRow row= {{label:"Forthcoming ERT Version(S3)", value: this.props.env.products.currentVersionInS3}} key={this.props.env.products.currentVersionInS3}></CardRow>

            <CardRow row= {{label:"PCF Pipeline Version", value: this.props.env.products.pcfPipelineVersion}} key={this.props.env.products.pcfPipelineVersion}></CardRow>

            {failedJobName ?
             <CardRow row= {{label:"Failed Job", value: failedJobName, url: url }} key={failedJobName}></CardRow> : ""}
          </CardBlock>
        </Card>
      </Col>
    )
  }
}

export default Environment;
