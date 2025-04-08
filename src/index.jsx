import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import Loader from "@components/Loader/Loader";
import Header from "@components/Header/Header";
import Main from "@components/Main/Main";
import Footer from "@components/Footer/Footer";
import { DataProvider } from "./FetchingAPI/FetchingWeatherData";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DataProvider>
      <Suspense fallback={<Loader />}>
        <Header />
        <Main />
        <Footer />
      </Suspense>
    </DataProvider>
  </React.StrictMode>
);

reportWebVitals();
