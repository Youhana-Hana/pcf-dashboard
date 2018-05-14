import React, { Component } from 'react';
import {
  NavbarBrand,
} from 'reactstrap';

class Header extends Component {
  render() {
    return (
      <header className="app-header" >
        <div className="header">
          <div className="col_2 title">IoT Cloud</div>
          <div className="col_3 title">PCF Automation</div>
        </div>
      </header>
    )
  }
}

export default Header;
