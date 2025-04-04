import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import Main from '@components/Main/Main';
import Header from "@components/Header/Header";
import Footer from "@components/Footer/Footer"
import { DataProvider } from "./FetchingAPI/FetchingWeatherData";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DataProvider>
      <Header />
      <Main />
      <Footer />
    </DataProvider>
  </React.StrictMode>
);

reportWebVitals();
