import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBlock,
} from "reactstrap";

import Spinner from '../../components/Spinner/';
import Environment from '../../components/Environment/';
import EnvStore from '../../stores/Environments';
import PcfAutomationStatusActions from '../../actions/PcfAutomationStatus.js';
import PcfAutomationStatusConstants from '../../constants/PcfAutomationStatus.js';

const API_URL = '/metrics/environments';

class Environments extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      environments: [],
      loading: true,
      loaded: false
    };

    this.onChange = this.onChange.bind(this);
  }

  tick() {
    let state = this.state;
    state.loading = true;
    this.setState(state);
    PcfAutomationStatusActions.loadPcfAutomationStatus(API_URL, PcfAutomationStatusConstants.RECEIVE_PAYLOAD_ENVIRONMENTS);
  }

  componentDidMount() {
    PcfAutomationStatusActions.loadPcfAutomationStatus(API_URL, PcfAutomationStatusConstants.RECEIVE_PAYLOAD_ENVIRONMENTS);
  }

  componentWillMount() {
    EnvStore.addChangeListener(this.onChange);
    this.interval = setInterval(this.tick.bind(this), PcfAutomationStatusConstants.REFRESH_TIME_INTERVAL_ENVIRONMENTS);
  }

  componentWillUnmount() {
    EnvStore.removeChangeListener(this.onChange);
    clearInterval(this.interval);
  }


  onChange() {
    this.setState({
      environments: EnvStore.getEnvironments(),
      loading: false,
      loaded: EnvStore.getEnvironments().length != 0
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
        {
          this.state.environments.map((env) => {
            return <Environment env={env} key={env.region+"-"+env.foundation}></Environment>;
          })
        }
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
        <h1 className="mb-0">Environments
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
    )}
}

export default Environments;
