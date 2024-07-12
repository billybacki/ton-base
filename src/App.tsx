import { Suspense, useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
      <Suspense fallback={null}>
        1
      </Suspense>
  )
}

export default App
