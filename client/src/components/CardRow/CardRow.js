import React, { Component } from 'react';

import {
    Row,
    Col
} from "reactstrap";


class CardRow extends Component {
    render() {

        let value = this.props.row.value;
        let url = this.props.row.url;

      return (
              <Row className="padding-10">
              <Col xs="12" sm="6" lg="7">
              <h3>{this.props.row.label}</h3>
              </Col>
              <Col xs="12" sm="6" lg="5">
              <h3>
              { url ? <a href={url} className="text-white nav-link float-right" target="_blank">{value}</a> : value }
              </h3>
              </Col>
              </Row>
    )
  }
}

export default CardRow;
