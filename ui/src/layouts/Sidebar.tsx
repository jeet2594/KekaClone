/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

const Sidebar = () => {

  const [asideMinimize, setAsideMinimize] = useState(false);

  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const userContext = useContext(UserContext);


  if (!userContext) {
    // Handle the case where UserContext is not provided, e.g., by rendering an error message.
    return (
      <div>
        <p>User context is not available. Ensure your component is wrapped with UserProvider.</p>
      </div>
    );
  }

  const { user } = userContext;

  // console.log(isOnline)



  const hasPermission = (requiredPermission: string) => {
    return user.permissions.includes(requiredPermission);
  }

    const toggleSubMenu = (menuItem: any) => {
        setActiveSubMenu(activeSubMenu === menuItem ? null : menuItem);
    };
  const toggleAsideMinimize = () => {
    setAsideMinimize(prevState => !prevState);

    if (asideMinimize) {
      document.body.removeAttribute('data-kt-aside-minimize');
    } else {
      document.body.setAttribute('data-kt-aside-minimize', 'on'); // Wrap 'on' with quotes
    }
  };


  return (
    <div>
      <div id="kt_aside" className="aside aside-dark aside-hoverable" data-kt-drawer="true" data-kt-drawer-name="aside" data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="true" data-kt-drawer-width="{default:'200px', '300px': '250px'}" data-kt-drawer-direction="start" data-kt-drawer-toggle="#kt_aside_mobile_toggle" style={{ height:'100%' }}>
        <div className="aside-logo flex-column-auto" id="kt_aside_logo">
          <a href="../../demo1/dist/index.html">
            <img alt="Logo" src="/assets/media/logos/logo-1-dark.svg" className="h-25px logo" />
          </a>
          {/* <span style = {{color : 'white'}}>{isOnline ? "online" : "Offline"}</span> */}
          <div id="kt_aside_toggle" className="btn btn-icon w-auto px-0 btn-active-color-primary aside-toggle" data-kt-toggle="true" data-kt-toggle-state="active" data-kt-toggle-target="body" data-kt-toggle-name="aside-minimize" onClick={toggleAsideMinimize}>
            <span className="svg-icon svg-icon-1 rotate-180">
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                <path opacity="0.5" d="M14.2657 11.4343L18.45 7.25C18.8642 6.83579 18.8642 6.16421 18.45 5.75C18.0358 5.33579 17.3642 5.33579 16.95 5.75L11.4071 11.2929C11.0166 11.6834 11.0166 12.3166 11.4071 12.7071L16.95 18.25C17.3642 18.6642 18.0358 18.6642 18.45 18.25C18.8642 17.8358 18.8642 17.1642 18.45 16.75L14.2657 12.5657C13.9533 12.2533 13.9533 11.7467 14.2657 11.4343Z" fill="black" />
                <path d="M8.2657 11.4343L12.45 7.25C12.8642 6.83579 12.8642 6.16421 12.45 5.75C12.0358 5.33579 11.3642 5.33579 10.95 5.75L5.40712 11.2929C5.01659 11.6834 5.01659 12.3166 5.40712 12.7071L10.95 18.25C11.3642 18.6642 12.0358 18.6642 12.45 18.25C12.8642 17.8358 12.8642 17.1642 12.45 16.75L8.2657 12.5657C7.95328 12.2533 7.95328 11.7467 8.2657 11.4343Z" fill="black" />
              </svg>
            </span>
          </div>

        </div>
        <div className="aside-menu flex-column-fluid">
          {/*begin::Aside Menu*/}
          <div className="hover-scroll-overlay-y my-5 my-lg-5" id="kt_aside_menu_wrapper" data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-height="auto" data-kt-scroll-dependencies="#kt_aside_logo, #kt_aside_footer" data-kt-scroll-wrappers="#kt_aside_menu" data-kt-scroll-offset={0}>
            {/*begin::Menu*/}
            <div className="menu menu-column menu-title-gray-800 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500" id="#kt_aside_menu" data-kt-menu="true">
              <div className="menu-item">
                <div className="menu-content pb-2">
                  <span className="menu-section text-muted text-uppercase fs-8 ls-1">Dashboard</span>
                </div>
              </div>
              <div className="menu-item">
                {hasPermission('user_dashboard') && (
                  <Link className="menu-link active" to="/dashboard">
                    <span className="menu-icon">
                      {/*begin::Svg Icon | path: icons/duotune/general/gen025.svg*/}
                      <span className="svg-icon svg-icon-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                          <rect x={2} y={2} width={9} height={9} rx={2} fill="black" />
                          <rect opacity="0.3" x={13} y={2} width={9} height={9} rx={2} fill="black" />
                          <rect opacity="0.3" x={13} y={13} width={9} height={9} rx={2} fill="black" />
                          <rect opacity="0.3" x={2} y={13} width={9} height={9} rx={2} fill="black" />
                        </svg>
                      </span>
                      {/*end::Svg Icon*/}
                    </span>
                    <span className="menu-title">Dashboard</span>
                  </Link>
                )}
              </div>
              <div className="menu-item">
              {hasPermission('holiday_list') && (
                <Link className="menu-link" to="/holidays">
                  <span className="menu-icon">
                    {/*begin::Svg Icon | path: icons/duotune/art/art002.svg*/}
                    <span className="svg-icon svg-icon-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={25} viewBox="0 0 24 25" fill="none">
                        <path opacity="0.3" d="M8.9 21L7.19999 22.6999C6.79999 23.0999 6.2 23.0999 5.8 22.6999L4.1 21H8.9ZM4 16.0999L2.3 17.8C1.9 18.2 1.9 18.7999 2.3 19.1999L4 20.9V16.0999ZM19.3 9.1999L15.8 5.6999C15.4 5.2999 14.8 5.2999 14.4 5.6999L9 11.0999V21L19.3 10.6999C19.7 10.2999 19.7 9.5999 19.3 9.1999Z" fill="black" />
                        <path d="M21 15V20C21 20.6 20.6 21 20 21H11.8L18.8 14H20C20.6 14 21 14.4 21 15ZM10 21V4C10 3.4 9.6 3 9 3H4C3.4 3 3 3.4 3 4V21C3 21.6 3.4 22 4 22H9C9.6 22 10 21.6 10 21ZM7.5 18.5C7.5 19.1 7.1 19.5 6.5 19.5C5.9 19.5 5.5 19.1 5.5 18.5C5.5 17.9 5.9 17.5 6.5 17.5C7.1 17.5 7.5 17.9 7.5 18.5Z" fill="black" />
                      </svg>
                    </span>
                    {/*end::Svg Icon*/}
                  </span>
                  <span className="menu-title">Holiday</span>
                </Link>
              )}
              </div>
              <div className="menu-item">
              {hasPermission('user_list') && (
                <Link className="menu-link" to="/users">
                  <span className="menu-icon">
                    {/*begin::Svg Icon | path: icons/duotune/art/art002.svg*/}
                    <span className="svg-icon svg-icon-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={25} viewBox="0 0 24 25" fill="none">
                        <path opacity="0.3" d="M8.9 21L7.19999 22.6999C6.79999 23.0999 6.2 23.0999 5.8 22.6999L4.1 21H8.9ZM4 16.0999L2.3 17.8C1.9 18.2 1.9 18.7999 2.3 19.1999L4 20.9V16.0999ZM19.3 9.1999L15.8 5.6999C15.4 5.2999 14.8 5.2999 14.4 5.6999L9 11.0999V21L19.3 10.6999C19.7 10.2999 19.7 9.5999 19.3 9.1999Z" fill="black" />
                        <path d="M21 15V20C21 20.6 20.6 21 20 21H11.8L18.8 14H20C20.6 14 21 14.4 21 15ZM10 21V4C10 3.4 9.6 3 9 3H4C3.4 3 3 3.4 3 4V21C3 21.6 3.4 22 4 22H9C9.6 22 10 21.6 10 21ZM7.5 18.5C7.5 19.1 7.1 19.5 6.5 19.5C5.9 19.5 5.5 19.1 5.5 18.5C5.5 17.9 5.9 17.5 6.5 17.5C7.1 17.5 7.5 17.9 7.5 18.5Z" fill="black" />
                      </svg>
                    </span>
                    {/*end::Svg Icon*/}
                  </span>
                  <span className="menu-title">Users</span>
                </Link>
              )}
              </div>
              <div className="menu-item">
              {hasPermission('user_list') && (
                <Link className="menu-link" to="/permissions">
                  <span className="menu-icon">
                    {/*begin::Svg Icon | path: icons/duotune/art/art002.svg*/}
                    <span className="svg-icon svg-icon-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={25} viewBox="0 0 24 25" fill="none">
                        <path opacity="0.3" d="M8.9 21L7.19999 22.6999C6.79999 23.0999 6.2 23.0999 5.8 22.6999L4.1 21H8.9ZM4 16.0999L2.3 17.8C1.9 18.2 1.9 18.7999 2.3 19.1999L4 20.9V16.0999ZM19.3 9.1999L15.8 5.6999C15.4 5.2999 14.8 5.2999 14.4 5.6999L9 11.0999V21L19.3 10.6999C19.7 10.2999 19.7 9.5999 19.3 9.1999Z" fill="black" />
                        <path d="M21 15V20C21 20.6 20.6 21 20 21H11.8L18.8 14H20C20.6 14 21 14.4 21 15ZM10 21V4C10 3.4 9.6 3 9 3H4C3.4 3 3 3.4 3 4V21C3 21.6 3.4 22 4 22H9C9.6 22 10 21.6 10 21ZM7.5 18.5C7.5 19.1 7.1 19.5 6.5 19.5C5.9 19.5 5.5 19.1 5.5 18.5C5.5 17.9 5.9 17.5 6.5 17.5C7.1 17.5 7.5 17.9 7.5 18.5Z" fill="black" />
                      </svg>
                    </span>
                    {/*end::Svg Icon*/}
                  </span>
                  <span className="menu-title">Permissions</span>
                </Link>
              )}
              </div>
              <div className="menu-item">
              {hasPermission('role_list') && (
                <Link className="menu-link" to="/roles">
                  <span className="menu-icon">
                    {/*begin::Svg Icon | path: icons/duotune/art/art002.svg*/}
                    <span className="svg-icon svg-icon-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={25} viewBox="0 0 24 25" fill="none">
                        <path opacity="0.3" d="M8.9 21L7.19999 22.6999C6.79999 23.0999 6.2 23.0999 5.8 22.6999L4.1 21H8.9ZM4 16.0999L2.3 17.8C1.9 18.2 1.9 18.7999 2.3 19.1999L4 20.9V16.0999ZM19.3 9.1999L15.8 5.6999C15.4 5.2999 14.8 5.2999 14.4 5.6999L9 11.0999V21L19.3 10.6999C19.7 10.2999 19.7 9.5999 19.3 9.1999Z" fill="black" />
                        <path d="M21 15V20C21 20.6 20.6 21 20 21H11.8L18.8 14H20C20.6 14 21 14.4 21 15ZM10 21V4C10 3.4 9.6 3 9 3H4C3.4 3 3 3.4 3 4V21C3 21.6 3.4 22 4 22H9C9.6 22 10 21.6 10 21ZM7.5 18.5C7.5 19.1 7.1 19.5 6.5 19.5C5.9 19.5 5.5 19.1 5.5 18.5C5.5 17.9 5.9 17.5 6.5 17.5C7.1 17.5 7.5 17.9 7.5 18.5Z" fill="black" />
                      </svg>
                    </span>
                    {/*end::Svg Icon*/}
                  </span>
                  <span className="menu-title">Roles</span>
                </Link>
              )}
              </div>
              <div className="menu-item">
              {hasPermission('role_list') && (
                <Link className="menu-link" to="/attendance">
                  <span className="menu-icon">
                    {/*begin::Svg Icon | path: icons/duotune/art/art002.svg*/}
                    <span className="svg-icon svg-icon-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={25} viewBox="0 0 24 25" fill="none">
                        <path opacity="0.3" d="M8.9 21L7.19999 22.6999C6.79999 23.0999 6.2 23.0999 5.8 22.6999L4.1 21H8.9ZM4 16.0999L2.3 17.8C1.9 18.2 1.9 18.7999 2.3 19.1999L4 20.9V16.0999ZM19.3 9.1999L15.8 5.6999C15.4 5.2999 14.8 5.2999 14.4 5.6999L9 11.0999V21L19.3 10.6999C19.7 10.2999 19.7 9.5999 19.3 9.1999Z" fill="black" />
                        <path d="M21 15V20C21 20.6 20.6 21 20 21H11.8L18.8 14H20C20.6 14 21 14.4 21 15ZM10 21V4C10 3.4 9.6 3 9 3H4C3.4 3 3 3.4 3 4V21C3 21.6 3.4 22 4 22H9C9.6 22 10 21.6 10 21ZM7.5 18.5C7.5 19.1 7.1 19.5 6.5 19.5C5.9 19.5 5.5 19.1 5.5 18.5C5.5 17.9 5.9 17.5 6.5 17.5C7.1 17.5 7.5 17.9 7.5 18.5Z" fill="black" />
                      </svg>
                    </span>
                    {/*end::Svg Icon*/}
                  </span>
                  <span className="menu-title">Attendance</span>
                </Link>
              )}
              </div>
              {/* <div className="menu-item">
                <a className="menu-link" href="../../demo1/dist/dashboards/light-aside.html">
                  <span className="menu-icon">
                    <span className="svg-icon svg-icon-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                        <path opacity="0.3" d="M21.25 18.525L13.05 21.825C12.35 22.125 11.65 22.125 10.95 21.825L2.75 18.525C1.75 18.125 1.75 16.725 2.75 16.325L4.04999 15.825L10.25 18.325C10.85 18.525 11.45 18.625 12.05 18.625C12.65 18.625 13.25 18.525 13.85 18.325L20.05 15.825L21.35 16.325C22.35 16.725 22.35 18.125 21.25 18.525ZM13.05 16.425L21.25 13.125C22.25 12.725 22.25 11.325 21.25 10.925L13.05 7.62502C12.35 7.32502 11.65 7.32502 10.95 7.62502L2.75 10.925C1.75 11.325 1.75 12.725 2.75 13.125L10.95 16.425C11.65 16.725 12.45 16.725 13.05 16.425Z" fill="black" />
                        <path d="M11.05 11.025L2.84998 7.725C1.84998 7.325 1.84998 5.925 2.84998 5.525L11.05 2.225C11.75 1.925 12.45 1.925 13.15 2.225L21.35 5.525C22.35 5.925 22.35 7.325 21.35 7.725L13.05 11.025C12.45 11.325 11.65 11.325 11.05 11.025Z" fill="black" />
                      </svg>
                    </span>
                  </span>
                  <span className="menu-title">Light Aside</span>
                </a>
              </div> */}
              {/* <div className="menu-item">
                <a className="menu-link" href="../../demo1/dist/dashboards/only-header.html">
                  <span className="menu-icon">
                    <span className="svg-icon svg-icon-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                        <path opacity="0.3" d="M20 21H3C2.4 21 2 20.6 2 20V10C2 9.4 2.4 9 3 9H20C20.6 9 21 9.4 21 10V20C21 20.6 20.6 21 20 21Z" fill="black" />
                        <path d="M20 7H3C2.4 7 2 6.6 2 6V3C2 2.4 2.4 2 3 2H20C20.6 2 21 2.4 21 3V6C21 6.6 20.6 7 20 7Z" fill="black" />
                      </svg>
                    </span>
                  </span>
                  <span className="menu-title">Only Header</span>
                </a>
              </div> */}
              {/* <div className="menu-item">
                <a className="menu-link" href="../../demo1/dist/landing.html">
                  <span className="menu-icon">
                    <span className="svg-icon svg-icon-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                        <path opacity="0.3" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="black" />
                        <path d="M19 10.4C19 10.3 19 10.2 19 10C19 8.9 18.1 8 17 8H16.9C15.6 6.2 14.6 4.29995 13.9 2.19995C13.3 2.09995 12.6 2 12 2C11.9 2 11.8 2 11.7 2C12.4 4.6 13.5 7.10005 15.1 9.30005C15 9.50005 15 9.7 15 10C15 11.1 15.9 12 17 12C17.1 12 17.3 12 17.4 11.9C18.6 13 19.9 14 21.4 14.8C21.4 14.8 21.5 14.8 21.5 14.9C21.7 14.2 21.8 13.5 21.9 12.7C20.9 12.1 19.9 11.3 19 10.4Z" fill="black" />
                        <path d="M12 15C11 13.1 10.2 11.2 9.60001 9.19995C9.90001 8.89995 10 8.4 10 8C10 7.1 9.40001 6.39998 8.70001 6.09998C8.40001 4.99998 8.20001 3.90005 8.00001 2.80005C7.30001 3.10005 6.70001 3.40002 6.20001 3.90002C6.40001 4.80002 6.50001 5.6 6.80001 6.5C6.40001 6.9 6.10001 7.4 6.10001 8C6.10001 9 6.80001 9.8 7.80001 10C8.30001 11.6 9.00001 13.2 9.70001 14.7C7.10001 13.2 4.70001 11.5 2.40001 9.5C2.20001 10.3 2.10001 11.1 2.10001 11.9C4.60001 13.9 7.30001 15.7 10.1 17.2C10.2 18.2 11 19 12 19C12.6 20 13.2 20.9 13.9 21.8C14.6 21.7 15.3 21.5 15.9 21.2C15.4 20.5 14.9 19.8 14.4 19.1C15.5 19.5 16.5 19.9 17.6 20.2C18.3 19.8 18.9 19.2 19.4 18.6C17.6 18.1 15.7 17.5 14 16.7C13.9 15.8 13.1 15 12 15Z" fill="black" />
                      </svg>
                    </span>
                  </span>
                  <span className="menu-title">Landing Page</span>
                </a>
              </div> */}
              <div className="menu-item">
                <div className="menu-content pt-8 pb-2">
                  <span className="menu-section text-muted text-uppercase fs-8 ls-1">Crafted</span>
                </div>
              </div>

              <div data-kt-menu-trigger="click" className={`menu-item menu-accordion ${activeSubMenu === "customers" ? "hover show" : ""}`} onClick={() => toggleSubMenu("customers")}>
                <span className="menu-link">
                  <span className="menu-icon">
                    {/*begin::Svg Icon | path: icons/duotune/finance/fin006.svg*/}
                    <span className="svg-icon svg-icon-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                        <path opacity="0.3" d="M20 15H4C2.9 15 2 14.1 2 13V7C2 6.4 2.4 6 3 6H21C21.6 6 22 6.4 22 7V13C22 14.1 21.1 15 20 15ZM13 12H11C10.5 12 10 12.4 10 13V16C10 16.5 10.4 17 11 17H13C13.6 17 14 16.6 14 16V13C14 12.4 13.6 12 13 12Z" fill="black" />
                        <path d="M14 6V5H10V6H8V5C8 3.9 8.9 3 10 3H14C15.1 3 16 3.9 16 5V6H14ZM20 15H14V16C14 16.6 13.5 17 13 17H11C10.5 17 10 16.6 10 16V15H4C3.6 15 3.3 14.9 3 14.7V18C3 19.1 3.9 20 5 20H19C20.1 20 21 19.1 21 18V14.7C20.7 14.9 20.4 15 20 15Z" fill="black" />
                      </svg>
                    </span>
                    {/*end::Svg Icon*/}
                  </span>
                  <span className="menu-title">Customers</span>
                  <span className="menu-arrow" />
                </span>
                <div className="menu-sub menu-sub-accordion">
                  <div className="menu-item">
                    <a className="menu-link" href="../../demo1/dist/apps/customers/getting-started.html">
                      <span className="menu-bullet">
                        <span className="bullet bullet-dot" />
                      </span>
                      <span className="menu-title">Getting Started</span>
                    </a>
                  </div>
                  <div className="menu-item">
                    <a className="menu-link" href="../../demo1/dist/apps/customers/list.html">
                      <span className="menu-bullet">
                        <span className="bullet bullet-dot" />
                      </span>
                      <span className="menu-title">Customer Listing</span>
                    </a>
                  </div>
                  <div className="menu-item">
                    <a className="menu-link" href="../../demo1/dist/apps/customers/view.html">
                      <span className="menu-bullet">
                        <span className="bullet bullet-dot" />
                      </span>
                      <span className="menu-title">Customer Details</span>
                    </a>
                  </div>
                </div>
              </div>

              <div data-kt-menu-trigger="click" className={`menu-item menu-accordion ${activeSubMenu === "users" ? "hover show" : ""}`} onClick={() => toggleSubMenu("users")}>
                <span className="menu-link">
                  <span className="menu-icon">
                    {/*begin::Svg Icon | path: icons/duotune/finance/fin006.svg*/}
                    <span className="svg-icon svg-icon-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                        <path opacity="0.3" d="M20 15H4C2.9 15 2 14.1 2 13V7C2 6.4 2.4 6 3 6H21C21.6 6 22 6.4 22 7V13C22 14.1 21.1 15 20 15ZM13 12H11C10.5 12 10 12.4 10 13V16C10 16.5 10.4 17 11 17H13C13.6 17 14 16.6 14 16V13C14 12.4 13.6 12 13 12Z" fill="black" />
                        <path d="M14 6V5H10V6H8V5C8 3.9 8.9 3 10 3H14C15.1 3 16 3.9 16 5V6H14ZM20 15H14V16C14 16.6 13.5 17 13 17H11C10.5 17 10 16.6 10 16V15H4C3.6 15 3.3 14.9 3 14.7V18C3 19.1 3.9 20 5 20H19C20.1 20 21 19.1 21 18V14.7C20.7 14.9 20.4 15 20 15Z" fill="black" />
                      </svg>
                    </span>
                    {/*end::Svg Icon*/}
                  </span>
                  <span className="menu-title">Users</span>
                  <span className="menu-arrow" />
                </span>
                <div className="menu-sub menu-sub-accordion">
                  <div className="menu-item">
                    <a className="menu-link" href="../../demo1/dist/apps/customers/getting-started.html">
                      <span className="menu-bullet">
                        <span className="bullet bullet-dot" />
                      </span>
                      <span className="menu-title">Getting Started</span>
                    </a>
                  </div>
                  <div className="menu-item">
                    <a className="menu-link" href="../../demo1/dist/apps/customers/list.html">
                      <span className="menu-bullet">
                        <span className="bullet bullet-dot" />
                      </span>
                      <span className="menu-title">Customer Listing</span>
                    </a>
                  </div>
                  <div className="menu-item">
                    <a className="menu-link" href="../../demo1/dist/apps/customers/view.html">
                      <span className="menu-bullet">
                        <span className="bullet bullet-dot" />
                      </span>
                      <span className="menu-title">Customer Details</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/*end::Menu*/}
          </div>
          {/*end::Aside Menu*/}
        </div>
      </div>
    </div>
  )
}

export default Sidebar