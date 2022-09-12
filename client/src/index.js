import React from 'react';
import {createRoot} from 'react-dom/client';
import {App} from './App';
import store from './app/store';
import {Provider} from 'react-redux';
import reportWebVitals from "./reportWebVitals";

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
<Provider store={store}>
<App />
</Provider>
);

reportWebVitals();

