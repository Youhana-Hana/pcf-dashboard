import React, { Component } from 'react';
import PivnetVersions from '../Pivnet/PivnetVersions';
import Environments from '../Environments/Environments';

class Dashboard extends Component {

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
