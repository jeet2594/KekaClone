import { useEffect, useState } from 'react'
import http from '../../http';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import LoadingBar from 'react-top-loading-bar';
import Input from '@/components/Input';

interface Holiday {
    id: number;
    name: string;
    date: string;
}

const Holiday = () => {
    const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loadBarProgress, setLoadBarProgress] = useState(0);

  useEffect(() => {
    setLoadBarProgress(30);  // Set initial progress when component mounts
  }, []);
    useEffect(() => {
    setLoadBarProgress(50);

        http.get(`/holiday`).then(res => {
          console.log(res);
          if(res.data.status == 1)
          {
            setLoadBarProgress(100);
            setHolidays(res.data.holidays);
          } else {
            Swal.fire("Error!", res.data.message, "error");
          }
        }).catch(error => {
          console.error("An error occurred:", error);
        });
      }, []);
    
      const deleteHoliday = (id: number,index: number) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                http.delete(`/holiday/${id}`).then(res => {
                    console.log(res);
                    if(res.data.status == 1)
                    {
                    Swal.fire("Success!", res.data.message, "success");
                    const holidayData = [...holidays];
                    holidayData.splice(index,1);
                    setHolidays(holidayData);
                    } else {
                    Swal.fire("Error!", res.data.message, "error");
                    }
                }).catch(error => {
                    console.error("An error occurred:", error);
                });
            }
        })
      }

    return (
        <div>
            <LoadingBar
            color="#f11946"
            progress={loadBarProgress}
            onLoaderFinished={() => setLoadBarProgress(0)}
          />
            <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
                {/*begin::Toolbar*/}
                <div className="toolbar" id="kt_toolbar">
                    {/*begin::Container*/}
                    <div id="kt_toolbar_container" className="container-fluid d-flex flex-stack">
                        {/*begin::Page title*/}
                        <div data-kt-swapper="true" data-kt-swapper-mode="prepend" data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}" className="page-title d-flex align-items-center flex-wrap me-3 mb-5 mb-lg-0">
                            {/*begin::Title*/}
                            <h1 className="d-flex align-items-center text-dark fw-bolder fs-3 my-1">Holiday
                                {/*begin::Separator*/}
                                <span className="h-20px border-gray-200 border-start ms-3 mx-2" />
                                {/*end::Separator*/}
                                {/*begin::Description*/}
                                <small className="text-muted fs-7 fw-bold my-1 ms-1">Holiday Lists</small>
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
                        <div className="card">
                            <div className="card-header border-0 pt-6">
                                <div className="card-title">
                                    <div className="d-flex align-items-center position-relative my-1">
                                        <span className="svg-icon svg-icon-1 position-absolute ms-6">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="currentColor" />
                                                <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor" />
                                            </svg>
                                        </span>
                                        <Input
                                            type="text"
                                            data-kt-customer-table-filter='search'
                                            className="form-control form-control-solid w-250px ps-15"
                                            id="searchCustomer"
                                            name="searchCustomer"
                                            placeholder="Search Customer"
                                        />
                                    </div>
                                    <div>
                                        <Link to="/create-holiday" className='btn btn-primary' >Add</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body pt-0">
                                <table className="table align-middle table-row-dashed fs-6 gy-5" id="kt_customers_table">
                                    <thead>
                                        <tr className="text-start text-gray-400 fw-bolder fs-7 text-uppercase gs-0">
                                            <th className="w-10px pe-2">
                                                <div className="form-check form-check-sm form-check-custom form-check-solid me-3">
                                                    <input className="form-check-input" type="checkbox" value="1" />
                                                </div>
                                            </th>
                                            <th className="min-w-125px">Holiday Name</th>
                                            <th className="min-w-125px">Date</th>
                                            <th className="text-end min-w-70px">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="fw-bold text-gray-600">
                                        {
                                            holidays.map((value, index) => {
                                                return (<tr key={value.id}>
                                                    <td>
                                                        <div className="form-check form-check-sm form-check-custom form-check-solid me-3">
                                                            <input className="form-check-input" type="checkbox" data-kt-check="true" data-kt-check-target="#kt_customers_table .form-check-input" value="1" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {value.name}
                                                    </td>
                                                    <td>
                                                        {value.date}
                                                    </td>
                                                    <td className='text-end min-w-70px'>
                                                        <Link className="menu-link btn btn-primary" to={`/holiday-edit/${value.id}`}>Edit</Link>
                                                        <Button label="Delete" onClick={() => deleteHoliday(value.id,index)} color="danger"  />
                                                    </td>
                                                </tr>)
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {/*end::Post*/}
            </div>
        </div>
    )
}

export default Holiday