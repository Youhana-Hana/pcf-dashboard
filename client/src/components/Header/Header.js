import React, { Component } from 'react';
import {
  NavbarBrand,
} from 'reactstrap';

import logo from '../../../public/img/biclogo.jpg';
import boschLogo from '../../../public/img/boschlogo.jpg';

class Header extends Component {
  render() {
    return (
      <header className="app-header" >
            <div className="header">
            <div className="col_1"><img src={logo}/></div>
            <div className="col_2 title">Bosch IoT Cloud</div>
            <div className="col_3 title">PCF Automation</div>
            <div className="col_4"><img src={boschLogo} /></div>
            </div>
      </header>
    )
  }
}

export default Header;
