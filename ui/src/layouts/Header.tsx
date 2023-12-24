import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
type Position = 'absolute' | 'relative' | 'static' | 'fixed' | 'sticky';

const Header = () => {
  const navigate = useNavigate()
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(prevState => !prevState);
  };

  const menuStyle = {
    zIndex: 105,
    position: 'fixed' as Position,
    inset: '0px 0px auto auto',
    margin: '0px',
    transform: 'translate3d(-30px, 65px, 0px)',
    display: 'block'
  };

  const signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('permissions');
    navigate('/')
  }
  return (
    <div>
      <div id="kt_header" style={{}} className="header align-items-stretch">
                {/*begin::Container*/}
                <div className="container-fluid d-flex align-items-stretch justify-content-between">
                  {/*begin::Aside mobile toggle*/}
                  <div className="d-flex align-items-center d-lg-none ms-n3 me-1" title="Show aside menu">
                    <div className="btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px" id="kt_aside_mobile_toggle">
                      {/*begin::Svg Icon | path: icons/duotune/abstract/abs015.svg*/}
                      <span className="svg-icon svg-icon-2x mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                          <path d="M21 7H3C2.4 7 2 6.6 2 6V4C2 3.4 2.4 3 3 3H21C21.6 3 22 3.4 22 4V6C22 6.6 21.6 7 21 7Z" fill="black" />
                          <path opacity="0.3" d="M21 14H3C2.4 14 2 13.6 2 13V11C2 10.4 2.4 10 3 10H21C21.6 10 22 10.4 22 11V13C22 13.6 21.6 14 21 14ZM22 20V18C22 17.4 21.6 17 21 17H3C2.4 17 2 17.4 2 18V20C2 20.6 2.4 21 3 21H21C21.6 21 22 20.6 22 20Z" fill="black" />
                        </svg>
                      </span>
                      {/*end::Svg Icon*/}
                    </div>
                  </div>
                  {/*end::Aside mobile toggle*/}
                  {/*begin::Mobile logo*/}
                  <div className="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
                    <a href="../../demo1/dist/index.html" className="d-lg-none">
                      <img alt="Logo" src="/assets/media/logos/logo-2.svg" className="h-30px" />
                    </a>
                  </div>
                  {/*end::Mobile logo*/}
                  {/*begin::Wrapper*/}
                  <div className="d-flex align-items-stretch justify-content-between flex-lg-grow-1">
                    {/*begin::Navbar*/}
                    <div className="d-flex align-items-stretch" id="kt_header_nav">
                      {/*begin::Menu wrapper*/}
                      <div className="header-menu align-items-stretch" data-kt-drawer="true" data-kt-drawer-name="header-menu" data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="true" data-kt-drawer-width="{default:'200px', '300px': '250px'}" data-kt-drawer-direction="end" data-kt-drawer-toggle="#kt_header_menu_mobile_toggle" data-kt-swapper="true" data-kt-swapper-mode="prepend" data-kt-swapper-parent="{default: '#kt_body', lg: '#kt_header_nav'}">

                      </div>
                      {/*end::Menu wrapper*/}
                    </div>
                    {/*end::Navbar*/}
                    {/*begin::Topbar*/}
                    <div className="d-flex align-items-stretch flex-shrink-0">
                      {/*begin::Toolbar wrapper*/}
                      <div className="d-flex align-items-stretch flex-shrink-0">
                        {/*begin::User*/}
                        <div className="d-flex align-items-center ms-1 ms-lg-3" id="kt_header_user_menu_toggle">
                          {/*begin::Menu wrapper*/}
                          <div className={`cursor-pointer symbol symbol-30px symbol-md-40px ${isDropdownVisible ? 'show menu-dropdown' : ''}`} data-kt-menu-trigger="click" data-kt-menu-attach="parent" data-kt-menu-placement="bottom-end" onClick={toggleDropdown}>
                            <img src="assets/media/logos/keka4.png" alt="Image" />
                          </div>
                          {/*begin::Menu*/}
                          <div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px" data-kt-menu="true" style={isDropdownVisible ? menuStyle : {}}>
                            {/*begin::Menu item*/}
                            <div className="menu-item px-3">
                              <div className="menu-content d-flex align-items-center px-3">
                                {/*begin::Avatar*/}
                                <div className="symbol symbol-50px me-5">
                                  <img alt="Logo" src="assets/media/logos/keka4.png" />
                                </div>
                                {/*end::Avatar*/}
                                {/*begin::Username*/}
                                <div className="d-flex flex-column">
                                  <div className="fw-bolder d-flex align-items-center fs-5">Max Smith
                                    <span className="badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2">Pro</span></div>
                                  <a href="#" className="fw-bold text-muted text-hover-primary fs-7">max@kt.com</a>
                                </div>
                                {/*end::Username*/}
                              </div>
                            </div>
                            {/*end::Menu item*/}
                            {/*begin::Menu separator*/}
                            <div className="separator my-2" />
                            {/*end::Menu separator*/}
                            {/*begin::Menu item*/}
                            <div className="menu-item px-5">
                              <a href="../../demo1/dist/account/overview.html" className="menu-link px-5">My Profile</a>
                            </div>
                            {/*end::Menu item*/}




                            {/*begin::Menu item*/}
                            <div className="menu-item px-5">
                              <span className="menu-link px-5" onClick={() => signOut()}>Sign Out</span>
                            </div>
                            {/*end::Menu item*/}


                          </div>
                          {/*end::Menu*/}
                          {/*end::Menu wrapper*/}
                        </div>
                        {/*end::User */}
                        {/*begin::Heaeder menu toggle*/}
                        <div className="d-flex align-items-center d-lg-none ms-2 me-n3" title="Show header menu">
                          <div className="btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px" id="kt_header_menu_mobile_toggle">
                            {/*begin::Svg Icon | path: icons/duotune/text/txt001.svg*/}
                            <span className="svg-icon svg-icon-1">
                              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                <path d="M13 11H3C2.4 11 2 10.6 2 10V9C2 8.4 2.4 8 3 8H13C13.6 8 14 8.4 14 9V10C14 10.6 13.6 11 13 11ZM22 5V4C22 3.4 21.6 3 21 3H3C2.4 3 2 3.4 2 4V5C2 5.6 2.4 6 3 6H21C21.6 6 22 5.6 22 5Z" fill="black" />
                                <path opacity="0.3" d="M21 16H3C2.4 16 2 15.6 2 15V14C2 13.4 2.4 13 3 13H21C21.6 13 22 13.4 22 14V15C22 15.6 21.6 16 21 16ZM14 20V19C14 18.4 13.6 18 13 18H3C2.4 18 2 18.4 2 19V20C2 20.6 2.4 21 3 21H13C13.6 21 14 20.6 14 20Z" fill="black" />
                              </svg>
                            </span>
                            {/*end::Svg Icon*/}
                          </div>
                        </div>
                        {/*end::Heaeder menu toggle*/}
                      </div>
                      {/*end::Toolbar wrapper*/}
                    </div>
                    {/*end::Topbar*/}
                  </div>
                  {/*end::Wrapper*/}
                </div>
                {/*end::Container*/}
              </div>
    </div>
  )
}

export default Header