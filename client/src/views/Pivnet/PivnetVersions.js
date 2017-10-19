import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBlock,
} from 'reactstrap';

import Pivnet from '../../components/Pivnet/';
import PivnetStore from '../../stores/Pivnet';
import PcfAutomationStatusActions from '../../actions/PcfAutomationStatus.js';
import PcfAutomationStatusConstants from '../../constants/PcfAutomationStatus.js';

const API_URL = '/metrics/pivnet';

class PivnetVersions extends Component {

  constructor(props) {
    super(props);
    this.state =  {
      ertVersions: [],
      opsManagerVersions: []
    };

    this.onChange = this.onChange.bind(this);
  }

  tick() {
    PcfAutomationStatusActions.loadPcfAutomationStatus(API_URL, PcfAutomationStatusConstants.RECEIVE_PAYLOAD_PIVNET);
  }

  componentDidMount() {
    PcfAutomationStatusActions.loadPcfAutomationStatus(API_URL, PcfAutomationStatusConstants.RECEIVE_PAYLOAD_PIVNET);
  }

  componentWillMount() {
    PivnetStore.addChangeListener(this.onChange);
    this.interval = setInterval(this.tick, 10000);
  }

  componentWillUnmount() {
    PivnetStore.removeChangeListener(this.onChange);
    clearInterval(this.interval);
  }


  onChange() {
    this.setState({
      ertVersions: PivnetStore.getErtVersions(),
      opsManagerVersions: PivnetStore.getOpsManagerVersions()
    });
  }
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
                <Col xs="12" sm="6" lg="5"><Pivnet versions={this.state.ertVersions} header= "ERT Versions"/></Col>
                <Col xs="12" sm="6" lg="1"/>
                <Col xs="12" sm="6" lg="5"><Pivnet versions={this.state.opsManagerVersions} header= "OpsManager Versions"/></Col>
              </Row>
            </CardBlock>
          </Card>
        </Col>
      </Row>
    )}
}

export default PivnetVersions;
