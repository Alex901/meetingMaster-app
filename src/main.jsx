import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { MeetingProvider } from '../contexts/MeetingContext.jsx'
import { EmployeeProvider } from '../contexts/EmployeeContext.jsx'
import { DataProvider } from '../contexts/DataContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <EmployeeProvider>
      <DataProvider>
        <MeetingProvider>
          <App />
        </MeetingProvider>
      </DataProvider>
    </EmployeeProvider>

  </React.StrictMode>,
)