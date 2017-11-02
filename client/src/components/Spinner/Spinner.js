import React, { Component } from 'react';
import { HashLoader } from 'react-spinners';

class Spinner extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <div className='sweet-loading col-centered'>
        <HashLoader
      color={'#000000'}
      size= { parseInt(this.props.size)}
      loading={Boolean(this.props.loading)} 
        />
        </div>
    );
  }
}

export default Spinner;
