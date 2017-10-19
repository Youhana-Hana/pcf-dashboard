import AppDispatcher from '../dispatcher/AppDispatcher';
import PcfAutomationStatusConstants from '../constants/PcfAutomationStatus';
import API from '../services/API';

export default {
  loadPcfAutomationStatus: (url, actionType) => {
    API
      .get(url)
      .then((payload) => {
        AppDispatcher.dispatch({
          actionType: actionType,
          data: payload,
        });
      })
      .catch((message) => {
        AppDispatcher.dispatch({
          actionType: PcfAutomationStatusConstants.RECEIVE_PAYLOAD_ERROR,
          message: message,
        });
      });
  }
};
