import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import { FormProvider } from './personal-voice/context/form-context'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FormProvider>
      <App />
    </FormProvider>
  </React.StrictMode>,
)
