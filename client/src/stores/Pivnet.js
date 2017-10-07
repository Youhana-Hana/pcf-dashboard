import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/PcfAutomationStatus.js';
import { EventEmitter } from 'events';

const CHANGE_EVENT  = 'change';

let _ertVersions = [];
let _opsManagerVersions = [];

function setErtVersions(versions) {
  _ertVersions = versions;
}

function setOpsManagerVersions(versions) {
  _opsManagerVersions = versions;
}

class PivnetStoreClass extends EventEmitter {

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getErtVersions() {
    return _ertVersions;
  }

  getOpsManagerVersions() {
    return _opsManagerVersions;
  }
}

const PivnetStore = new PivnetStoreClass();

PivnetStore.dispatchToken = AppDispatcher.register(action => {
  switch(action.actionType) {
  case Constants.RECEIVE_PAYLOAD:
    setErtVersions(action.data.pivnet.ertVersions);
    setOpsManagerVersions(action.data.pivnet.opsManagerVersions);
    PivnetStore.emitChange();
  }
});

export default PivnetStore;
