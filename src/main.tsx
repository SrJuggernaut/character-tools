import App from '@/App'
import StateConsumer from '@/components/state/StateConsumer'
import store from '@/state/store'
import '@fontsource/roboto/latin-300.css'
import '@fontsource/roboto/latin-400.css'
import '@fontsource/roboto/latin-700.css'
import '@fontsource/source-code-pro/latin-400.css'
import '@fontsource/source-code-pro/latin-900.css'
import { CssBaseline } from '@mui/material'
import React, { type FC } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

const Main: FC = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <StateConsumer>
          <CssBaseline />
          <App />
        </StateConsumer>
      </Provider>
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root') as Element).render(<Main />)
