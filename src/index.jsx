import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import Loader from "@components/Loader/Loader";
import { DataProvider } from "./FetchingAPI/FetchingWeatherData";

const Header = lazy(() => import("@components/Header/Header"));
const Main = lazy(() => import("@components/Main/Main"));
const Footer = lazy(() => import("@components/Footer/Footer"));

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
