import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ApiRoute } from './routes/ApiRoute'
// import Login from './pages/Login'

function App() {
  return (
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/*" element={<ApiRoute />}>
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
