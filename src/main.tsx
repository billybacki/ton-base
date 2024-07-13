import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import MuiThemeProvider from './provider/MuiThemeProvider'
import StateProvider from './provider/StateProvider'
import { ModalProvider } from './provider/ModalProvider'
import NiceModal from '@ebay/nice-modal-react'
import App from './App'
import { TonConnectUIProvider } from '@tonconnect/ui-react'

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(
  <StrictMode>
    <TonConnectUIProvider manifestUrl={'/tonconnect-manifest.json'}>
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
    </TonConnectUIProvider>
  </StrictMode>
)
