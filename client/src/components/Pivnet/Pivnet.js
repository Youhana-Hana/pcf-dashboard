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
import PivnetStore from '../../stores/Pivnet';

class Pivnet extends Component {
    constructor(props) {
        super(props);
        this.state =  {
            ertVersions: []
        };

        this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
        PivnetStore.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        PivnetStore.removeChangeListener(this.onChange);
    }


    onChange() {
        this.setState({
            ertVersions: PivnetStore.getVersions()
        });
    }

  render() {
      return (
          <div>
              <CardHeader>

              <h1 className="mb-0">ERT Versions</h1>

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

export default Pivnet;
