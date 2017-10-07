import React, { Component } from 'react';
import PivnetVersions from '../Pivnet/PivnetVersions';
import Environments from '../Environments/Environments';
import PivnetActions from '../../actions/PcfPipelinesStatus.js';

const API_URL = '/metrics';

class Dashboard extends Component {
  tick() {
    PivnetActions.loadPcfPipelinesStatus(API_URL);
  }

  componentDidMount() {
    PivnetActions.loadPcfPipelinesStatus(API_URL);
  }

  componentWillMount() {
    this.interval = setInterval(this.tick, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="animated fadeIn margin-10">
        <PivnetVersions/>
        <Environments/>
      </div>
    )
  }
}

export default Dashboard;
