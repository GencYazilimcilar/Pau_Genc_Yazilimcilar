import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/root/App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { NaviProvider } from './components/contextApi/NaviContexApi';
import { AdminProvider } from './components/contextApi/AdminPanelContextApi';
import "alertifyjs/build/css/alertify.min.css";
import { NewsProvider } from './components/contextApi/NewsContextApi';
import { SponsorsProvider } from './components/contextApi/SponsorsContextApi';
import { AnnouncementsProvider } from './components/contextApi/AnnouncementsContextApi';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AdminProvider>
        <NaviProvider>
          <NewsProvider>
            <SponsorsProvider>
              <AnnouncementsProvider>
                <App/>
              </AnnouncementsProvider>
            </SponsorsProvider>
          </NewsProvider>
        </NaviProvider>
      </AdminProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
