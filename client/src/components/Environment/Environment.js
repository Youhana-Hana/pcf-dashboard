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
    let stagedVersionERT = this.props.env.stagedVersionERT;
    let currentVersionERT = this.props.env.currentVersionERT;

    return (
      <Col xs="12" sm="6" lg="4">
        <CardHeader>
          <h2 className="mb-0">
            {this.props.env.region} {this.props.env.foundation}
          </h2>
        </CardHeader>

        <Card className="text-white bg-primary">
          <CardBlock className="card-body pb-0">
            {currentVersionERT ?
            <CardRow row= {{label:"Current ERT Version", value: this.props.env.currentVersionERT}} key={this.props.env.currentVersionERT}></CardRow> : <CardRow row= {{label:"Current ERT Version", value: "TBC"}}></CardRow>}

            {stagedVersionERT ?
            <CardRow row= {{label:"Staged ERT Version", value: this.props.env.stagedVersionERT}} key={this.props.env.stagedVersionERT}></CardRow> : <CardRow row= {{label:"Staged ERT Version", value: "N/A"}}></CardRow>}

          </CardBlock>
        </Card>
      </Col>
    )
  }
}

export default Environment;
