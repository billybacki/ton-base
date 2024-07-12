import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import MuiThemeProvider from './provider/MuiThemeProvider'
import StateProvider from './provider/StateProvider'
import { ModalProvider } from './provider/ModalProvider'
import NiceModal from '@ebay/nice-modal-react'
import App from './App'

const container = document.getElementById('root')
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!)

root.render(
  <StrictMode>
    <StateProvider>
      <MuiThemeProvider>
          <NiceModal.Provider>
          <ModalProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
          </ModalProvider>
        </NiceModal.Provider>
      </MuiThemeProvider>
    </StateProvider>
  </StrictMode>
)
