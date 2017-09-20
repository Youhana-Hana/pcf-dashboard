import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/PcfPipelines.js';
import { EventEmitter } from 'events';

const CHANGE_EVENT  = 'change';

let _versions = [];

function setVersion(versions) {
    _versions = versions;
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

    getVersions() {
        return _versions;
    }
}

const PivnetStore = new PivnetStoreClass();

PivnetStore.dispatchToken = AppDispatcher.register(action => {
    switch(action.actionType) {
    case Constants.RECIEVE_PAYLOAD:
        setVersion(action.data.pivnet.ertVersions);
        PivnetStore.emitChange();
    }
});

export default PivnetStore;
