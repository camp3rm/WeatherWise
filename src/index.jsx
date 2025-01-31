import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Main from './components/Main/Main';
import Header from "./components/Header/Header";
import { FetchingDataProvider } from "./components/FetchingAPI/FetchingData";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FetchingDataProvider>
      <Header />
      <Main />
    </FetchingDataProvider>
  </React.StrictMode>
);

reportWebVitals();
