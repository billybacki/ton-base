import { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import routes from './constants/routes'
import Test1 from './pages/test1'
import ComingSoon from './components/ComingSoon'
import BottomNavigation from './components/BottomNavigation'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path={routes.test1} element={<Test1 />} />
        <Route path={routes.test2} element={<ComingSoon />} />
        <Route path="*" element={<Navigate to={routes.test1} replace />} />
      </Routes>
      <BottomNavigation />
    </Suspense>
  )
}

export default App
