import { call, put } from 'redux-saga/effects';

import actions from '../actions';
import { apiUrl } from './../helpers/api';

export function* getDataWorker () {

    try {

        yield put(actions.startFetching());

        const response = yield call(fetch, apiUrl, {
            method: 'GET'
        });

        if (response.status !== 200) {
            throw new Error("Failed to load data");
        }

        const data = yield call([response, response.json]);
        
        yield put(actions.getDataSuccess(data));
    }
    catch ({ message }) {
        yield put(actions.getDataFail());
    }
    finally {
        yield put(actions.stopFetching());
    }
}