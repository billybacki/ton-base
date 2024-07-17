import { Suspense, useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import routes from './constants/routes'
import Test1 from './pages/test1'
import ComingSoon from './components/ComingSoon'
import BottomNavigation from './components/BottomNavigation'
import '@twa-dev/sdk'
import { BackendTokenContext } from './provider/BackendTokenProvider'

function App() {
  // const [count, setCount] = useState(0)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const loader = document.querySelector('.app-loader')
    if (loader) {
      loader.classList.add('app-loader-hidden')
      setTimeout(() => {
        loader.classList.add('app-loader-none')
      }, 300)
    }
  }, [])

  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path={routes.test1} element={<Test1 />} />
        <Route path={routes.test2} element={<ComingSoon />} />
        <Route path={routes.test3} element={<>3</>} />
        <Route path="*" element={<Navigate to={routes.test1} replace />} />
      </Routes>
      <BottomNavigation />
      <BackendTokenContext.Provider value={{ token, setToken }}></BackendTokenContext.Provider>
    </Suspense>
  )
}

export default App
