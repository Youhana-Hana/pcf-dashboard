import React, { Component } from 'react';

import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBlock,
  CardFooter,
  CardTitle
} from "reactstrap";

import CardRow from '../CardRow/';

class Pivnet extends Component {
  render() {
    return (
      <div>
        <CardHeader>

          <h1 className="mb-0">{this.props.header}</h1>

        </CardHeader>
        <Card className="text-white bg-primary">
          <CardBlock className="card-body pb-0">
            {
              this.props.versions.map((version) => {
                let row = {
                  label: version.id,
                  value: version.latest,
                  url: version.releaseNotesUrl
                };

                return <CardRow row= {row} key={version.id}></CardRow>;
              })
            }
          </CardBlock>
        </Card>
      </div>
    )
  }
}

export default Pivnet;
