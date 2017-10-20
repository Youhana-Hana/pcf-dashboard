import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBlock,
} from "reactstrap";

import Environment from '../../components/Environment/';
import EnvStore from '../../stores/Environments';
import PcfAutomationStatusActions from '../../actions/PcfAutomationStatus.js';
import PcfAutomationStatusConstants from '../../constants/PcfAutomationStatus.js';

const API_URL = '/metrics/environments';

class Environments extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      environments: []
    };

    this.onChange = this.onChange.bind(this);
  }

  tick() {
    PcfAutomationStatusActions.loadPcfAutomationStatus(API_URL, PcfAutomationStatusConstants.RECEIVE_PAYLOAD_ENVIRONMENTS);
  }

  componentDidMount() {
    PcfAutomationStatusActions.loadPcfAutomationStatus(API_URL, PcfAutomationStatusConstants.RECEIVE_PAYLOAD_ENVIRONMENTS);

  }

  componentWillMount() {
    EnvStore.addChangeListener(this.onChange);
    this.interval = setInterval(this.tick, 10000);
  }

  componentWillUnmount() {
    EnvStore.removeChangeListener(this.onChange);
    clearInterval(this.interval);
  }


  onChange() {
    this.setState({
      environments: EnvStore.getEnvironments()
    });
  }
  render() {
    return (
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <h1 className="mb-0">Environments</h1>
            </CardHeader>
            <CardBlock className="card-body">
              <Row>

                {
                  this.state.environments.map((env) => {
                    return <Environment env={env} key={env.region+"-"+env.foundation}></Environment>;
                  })
                }
              </Row>
            </CardBlock>
          </Card>
        </Col>
      </Row>
    )}
}

export default Environments;
