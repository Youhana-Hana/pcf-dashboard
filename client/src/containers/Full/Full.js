import React, {Component} from 'react';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Footer from '../../components/Footer/';
import Dashboard from '../../views/Dashboard/';

class Full extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <main className="main">
            <Container fluid>
            <Dashboard/>
            </Container>
          </main>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Full;
