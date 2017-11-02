import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBlock,
} from 'reactstrap';

import Pivnet from '../../components/Pivnet/';
import Spinner from '../../components/Spinner/';
import PivnetStore from '../../stores/Pivnet';
import PcfAutomationStatusActions from '../../actions/PcfAutomationStatus.js';
import PcfAutomationStatusConstants from '../../constants/PcfAutomationStatus.js';

const API_URL = '/metrics/pivnet';

class PivnetVersions extends Component {

  constructor(props) {
    super(props);
    this.state =  {
      ertVersions: [],
      opsManagerVersions: [],
      loading: true,
      loaded: false
    };

    this.onChange = this.onChange.bind(this);
  }

  tick() {
    let state = this.state;
    state.loading = true;
    this.setState(state);
    PcfAutomationStatusActions.loadPcfAutomationStatus(API_URL, PcfAutomationStatusConstants.RECEIVE_PAYLOAD_PIVNET);
  }

  componentDidMount() {
    PcfAutomationStatusActions.loadPcfAutomationStatus(API_URL, PcfAutomationStatusConstants.RECEIVE_PAYLOAD_PIVNET);
  }

  componentWillMount() {
    PivnetStore.addChangeListener(this.onChange);
    this.interval = setInterval(this.tick.bind(this), PcfAutomationStatusConstants.REFRESH_TIME_INTERVAL);
  }

  componentWillUnmount() {
    PivnetStore.removeChangeListener(this.onChange);
    clearInterval(this.interval);
  }


  onChange() {
    this.setState({
      ertVersions: PivnetStore.getErtVersions(),
      opsManagerVersions: PivnetStore.getOpsManagerVersions(),
      loading: false,
      loaded: PivnetStore.getErtVersions().length != 0
    });
  }

  getContent() {
    if (!this.state.loaded) {
      return (
          <div className="col-centered">
          <Spinner size="50" loading="true"/>
          </div>);
    } else {
      return (
          <Row>
          <Col xs="12" sm="6" lg="5"><Pivnet versions={this.state.ertVersions} header= "ERT Versions"/></Col>
          <Col xs="12" sm="6" lg="1"/>
          <Col xs="12" sm="6" lg="5"><Pivnet versions={this.state.opsManagerVersions} header= "OpsManager Versions"/></Col>
          </Row>);
    }
  }
  render() {
    let content = this.getContent();
    return (
      <Row>
        <Col>
          <Card>
        <CardHeader>
        <h1 className="mb-0">Pivnet
        <div className="align-bottom float-right">
        <Spinner className="align-middle" size="15" loading={this.state.loading}/>
        </div></h1>
        </CardHeader>
        <CardBlock className="card-body">
        {content}
            </CardBlock>
          </Card>
        </Col>
      </Row>
    );}
}

export default PivnetVersions;
