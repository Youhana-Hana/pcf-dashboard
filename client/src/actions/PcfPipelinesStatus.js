import AppDispatcher from '../dispatcher/AppDispatcher';
import PcfPipelinesStatusConstants from '../constants/PcfPipelinesStatus';
import API from '../services/API';

export default {
  loadPcfPipelinesStatus: (url) => {
    API
      .get(url)
      .then((payload) => {
        AppDispatcher.dispatch({
          actionType: PcfPipelinesStatusConstants.RECEIVE_PAYLOAD,
          data: payload,
        });
      })
      .catch((message) => {
        AppDispatcher.dispatch({
          actionType: PcfPipelinesStatusConstants.RECEIVE_PAYLOAD_ERROR,
          message: message,
        });
      });
  }
};
