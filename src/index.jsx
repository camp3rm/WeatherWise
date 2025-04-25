import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import Header from '@components/Header/Header';
import Main from '@pages/Main/Main';
import Footer from '@components/Footer/Footer';
import { WeatherProvider } from '@providers/WeatherProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WeatherProvider>
      <Header />
      <Main />
      <Footer />
    </WeatherProvider>
  </React.StrictMode>
);

reportWebVitals();
