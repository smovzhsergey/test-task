import { takeEvery } from 'redux-saga/effects';

import actions from '../actions/types';
import { getDataWorker } from './getData';

function *getDataWatcher(){
    yield takeEvery(actions.GET_DATA, getDataWorker);
}

export function* saga () {
    yield getDataWatcher();
}



