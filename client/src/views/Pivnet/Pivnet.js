import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBlock,
} from 'reactstrap';

import ERTVersions from '../../components/Pivnet/';
import OpsManager from '../../components/OpsManager/';

class Pivnet extends Component {
  render() {
    return (
        <Row>
        <Col>
        <Card>
        <CardHeader>
        <h1 className="mb-0">Pivnet</h1>
        </CardHeader>
        <CardBlock className="card-body">
        
        <Row>
        <Col xs="12" sm="6" lg="5"><ERTVersions/></Col>
        <Col xs="12" sm="6" lg="1"/>
        <Col xs="12" sm="6" lg="5"><OpsManager/></Col>
        </Row>
        </CardBlock>
        </Card>
        </Col>
        </Row>
    )}
}

export default Pivnet;
