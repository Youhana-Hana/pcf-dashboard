import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/PcfPipelines.js';
import { EventEmitter } from 'events';

const CHANGE_EVENT  = 'change';

let _environments = [];

function setEnvironemnts(environments) {
    _environments = environments;
}

class EnvStoreClass extends EventEmitter {

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

    getEnvironments() {
        return _environments;
    }
}

const EnvStore = new EnvStoreClass();

EnvStore.dispatchToken = AppDispatcher.register(action => {
    switch(action.actionType) {
    case Constants.RECIEVE_PAYLOAD:
        setEnvironemnts(action.data.environments);
        EnvStore.emitChange();
    }
});

export default EnvStore;
