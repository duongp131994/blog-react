import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './App';

import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import userSliceData from './store/userSlice';
import messageReducer from './store/message';

const store = configureStore({
    reducer: {
        userData: userSliceData,
        messageReducer,
    }
})

// import setupInterceptors from "./services/setupInterceptors";
console.clear()
console.log(123)
ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <BrowserRouter>
              <App />
          </BrowserRouter>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// setupInterceptors(store);