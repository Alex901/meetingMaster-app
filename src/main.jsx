import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { MeetingProvider } from '../contexts/MeetingContext.jsx'
import { EmployeeProvider } from '../contexts/EmployeeContext.jsx'
import { DataProvider } from '../contexts/DataContext.jsx'
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
Modal.setAppElement('#root');

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <EmployeeProvider>
      <DataProvider>
        <MeetingProvider>
          <App />
          <ToastContainer
            position="top-center"
            autoClose={5000}
            theme="dark"
             />
        </MeetingProvider>
      </DataProvider>
    </EmployeeProvider>

  </React.StrictMode>,
)