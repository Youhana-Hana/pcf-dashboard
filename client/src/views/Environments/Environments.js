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

class Environments extends Component {
    constructor(props) {
        super(props);
        this.state =  {
            environments: []
        };

        this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
        EnvStore.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        EnvStore.removeChangeListener(this.onChange);
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
                    return <Environment env={env} key={env.id}></Environment>;
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
