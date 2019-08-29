import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import Chat from './container/Chat';

import store from './store/store';

render (
    <Provider store = { store }>
        <Chat />
    </Provider>
    ,document.getElementById('root'));