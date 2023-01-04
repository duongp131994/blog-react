import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './App';

import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { userReducer } from './store/userSlice';

// import reportWebVitals from './reportWebVitals';

const store = configureStore({
    reducer: {//changing state and get state
        userData: userReducer
    }
})

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

// reportWebVitals();
