import { shallow, mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import Environments  from '../../src/views/Environments/Environments';
import EnvironmentStore from '../../src/stores/Environments'
import toJson from 'enzyme-to-json';

jest.mock('../../src/stores/Environments.js');

describe('Environments', () => {
  const environments = [{
    "id": "us-t4",
    "env": "T4",
    "region": "US",
    "currentErtVersion": "1.10.13",
    "latestErtVersionInS3": "1.10.17",
    "pcfPipelineVersion": "1.15.1",
    "pcfPipelineStatus": {
      "status": "failed",
      "upgradeErtBuildNumber": "22",
      "upgradeErtBuildGlobalIdentifier": "56",
      "upgradeErtBuildUrl": "http://myconcourse-on-T4us.com/builds/56",
      "lastSuccessfulUpgradeErtBuildUrl": "http://myconcourse-on-T4us.com/builds/55",
      "lastSuccessfulUpgradeErtBuildTimestamp": 1505748632000,
      "failedJobName": "configure-ert"
    }
  }, {
    "id": "us-t5",
    "env": "T5",
    "region": "US",
    "currentErtVersion": "1.10.13",
    "latestErtVersionInS3": "1.10.17",
    "pcfPipelineVersion": "1.15.1",
    "pcfPipelineStatus": {
      "status": "failed",
      "upgradeErtBuildNumber": "22",
      "upgradeErtBuildGlobalIdentifier": "56",
      "upgradeErtBuildUrl": "http://myconcourse-on-T4us.com/builds/56",
      "lastSuccessfulUpgradeErtBuildUrl": "http://myconcourse-on-T4us.com/builds/55",
      "lastSuccessfulUpgradeErtBuildTimestamp": 1505748632000,
      "failedJobName": "configure-ert"
    }
  }];

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Environments/>,
    );

    const callback = jest.fn();

    EnvironmentStore.getEnvironments = jest.fn(() => {
      return environments;
    })
    
    EnvironmentStore.addChangeListener = jest.fn((callback) => {
      callback();
    })

    EnvironmentStore.removeChangeListener = jest.fn((callback) => {
      callback();
    })
  });

  afterEach(() => {
    EnvironmentStore.getEnvironments.mockClear();
    EnvironmentStore.addChangeListener.mockClear();
    EnvironmentStore.removeChangeListener.mockClear();
  });

  it('should render environemnts header', () => {
    const label= wrapper.find('h1').html();

    expect(label).toEqual('<h1 class="mb-0">Environments</h1>');
  })

  it('should render first environment', () => {
    wrapper.setState({environments: environments});

    const t4= wrapper.find('Environment').first();
    
    expect(t4.props().env).toEqual(environments[0]);
    expect(t4.key()).toEqual(environments[0].id);
  })
  
  it('should render last environment', () => {
    wrapper.setState({environments: environments});

    const t5= wrapper.find('Environment').last();

    expect(t5.props().env).toEqual(environments[1]);
    expect(t5.key()).toEqual(environments[1].id);
  })
  
  it('test to see if the environments renders correctly', () => {
    wrapper.setState({environments: environments});
    
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('register to EnvironmentStore', () => {
    wrapper = mount(
      <Environments/>,
    );

    expect(EnvironmentStore.addChangeListener.mock.calls.length).toEqual(1);
  })

  it('unRegister to EnvironmentStore', () => {
    wrapper = mount(
      <Environments/>,
    );

    wrapper.unmount();
    expect(EnvironmentStore.removeChangeListener.mock.calls.length).toEqual(1);
  })
});
