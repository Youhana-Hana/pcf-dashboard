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

  getRowContent(key, label, defaultValue) {
    let value = this.props.env[key];
    if(value) {
      return (<CardRow row= {{label, value}} key={`${key}_${value}`}></CardRow>);
    } else {
      if(defaultValue) {
        return (<CardRow row= {{label, value: defaultValue}}></CardRow>);
      } else {
        return(<p/>);
      }
    }
  }

  render() {
    let currentVersionERT = this.getRowContent('currentVersionERT', 'Current ERT Version', 'TBC');
    let stagedVersionERT = this.getRowContent('stagedVersionERT', 'Staged ERT Version', 'N/A');

    let currentVersionOpsManager = this.getRowContent('currentVersionOpsManager', 'Current OpsManager Version', null);
    let stagedVersionOpsManager = this.getRowContent('stagedVersionOpsManager', 'Staged OpsManager Version', null);
    return (
      <Col xs="12" sm="8" lg="4">
        <CardHeader>
          <h2 className="mb-0">
            {this.props.env.region} {this.props.env.foundation}
          </h2>
        </CardHeader>

        <Card className="text-white bg-primary">
        <CardBlock className="card-body pb-0">
        {currentVersionERT}
      {stagedVersionERT}
      {currentVersionOpsManager}
      {stagedVersionOpsManager}
          </CardBlock>
        </Card>
      </Col>
    )
  }
}

export default Environment;
