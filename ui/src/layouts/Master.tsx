import Sidebar from './Sidebar'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Master = () => {
  return (
    <div>
        <div className="d-flex flex-column flex-root" style={{ height: '100vh' }}>
          <div className="page d-flex flex-row flex-column-fluid" >
              <Sidebar />
            <div className="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
              <Header />
              <Outlet/>
              <Footer />
            </div>
          </div>
        </div>
      </div>
  )
}

export default Master