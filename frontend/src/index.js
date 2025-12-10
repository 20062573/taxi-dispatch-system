import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//performance tool from cra (ref: so - https://stackoverflow.com/questions/69816159/what-is-reportwebvitals-in-react)

const root = ReactDOM.createRoot(document.getElementById('root'));
// creates the root react node 

root.render(
  <React.StrictMode>
    {/* strictmode helps catch early bugs in dev env (ref: react docs - https://react.dev/reference/react/StrictMode) */}
    <App />
  </React.StrictMode>
);
//helps measure performance metrics like loading speed and responsiveness 
reportWebVitals();
