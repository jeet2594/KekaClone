const Content = () => {
  return (
    // <div>
        <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
                {/*begin::Toolbar*/}
                <div className="toolbar" id="kt_toolbar">
                  {/*begin::Container*/}
                  <div id="kt_toolbar_container" className="container-fluid d-flex flex-stack">
                    {/*begin::Page title*/}
                    <div data-kt-swapper="true" data-kt-swapper-mode="prepend" data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}" className="page-title d-flex align-items-center flex-wrap me-3 mb-5 mb-lg-0">
                      {/*begin::Title*/}
                      <h1 className="d-flex align-items-center text-dark fw-bolder fs-3 my-1">Dashboard
                        {/*begin::Separator*/}
                        <span className="h-20px border-gray-200 border-start ms-3 mx-2" />
                        {/*end::Separator*/}
                        {/*begin::Description*/}
                        <small className="text-muted fs-7 fw-bold my-1 ms-1">#XRS-45670</small>
                        {/*end::Description*/}</h1>
                      {/*end::Title*/}
                    </div>
                    {/*end::Page title*/}
                  </div>
                  {/*end::Container*/}
                </div>
                {/*end::Toolbar*/}
                {/*begin::Post*/}
                <div className="post d-flex flex-column-fluid" id="kt_post">
                  <div id="kt_content_container" className="container-xxl">
                    <h1>hello</h1>
                  </div>
                </div>
                {/*end::Post*/}
              </div>
    // </div>
  )
}

export default Content