import AppDispatcher from '../dispatcher/AppDispatcher';
import PcfPipelinesConstants from '../constants/PcfPipelines';
import API from '../services/API';

export default {
  loadPcfPipelines: (url) => {
    API
      .get(url)
      .then((payload) => {
        AppDispatcher.dispatch({
          actionType: PcfPipelinesConstants.RECIEVE_PAYLOAD,
          data: payload,
        });
      })
      .catch((message) => {
        AppDispatcher.dispatch({
          actionType: PcfPipelinesConstants.RECIEVE_PAYLOAD_ERROR,
          message: message,
        });
      });
  }
};
