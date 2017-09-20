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
import OpsManagerStore from '../../stores/OpsManager';

class OpsManager extends Component {
    constructor(props) {
        super(props);
        this.state =  {
            ertVersions: []
        };

        this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
        OpsManagerStore.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        OpsManagerStore.removeChangeListener(this.onChange);
    }


    onChange() {
        this.setState({
            ertVersions: OpsManagerStore.getVersions()
        });
    }

  render() {
      return (
          <div>
              <CardHeader>

              <h1 className="mb-0">OpsManager Versions</h1>

          </CardHeader>
              <Card className="text-white bg-primary">
              <CardBlock className="card-body pb-0">
              {
                  this.state.ertVersions.map((version) => {
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

export default OpsManager;
