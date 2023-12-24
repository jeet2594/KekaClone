import { useContext, useEffect, useState } from 'react'
import http from '../../http';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import usePagination from '../../services/Pagination';
import { useDebounce } from 'use-debounce';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import LoadingBar from 'react-top-loading-bar';
import Input from '@/components/Input';

interface USER {
    id: number;
    name: string;
    email: string;
}



const Users = () => {

    const [totalItems, setTotalItems] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
  const [loadBarProgress, setLoadBarProgress] = useState(0);

    const itemsPerPage = 2;
    const {
        currentPage,
        setCurrentPage,
        totalPages,
        goToPage,
        nextPage,
        prevPage,
    } = usePagination(totalItems, { itemsPerPage });

    const [users, setUsers] = useState<USER[]>([])
    const [searchInput, setSearchInput] = useState('');
    const [debouncedSearchInput] = useDebounce(searchInput, 300);

    const userCon = useContext(UserContext);
    const user = userCon?.user;
    // useEffect(() => {
    //     // http.get(`/users`).then(res => {
    //     http.get(`/users/pagination?page=${currentPage}&perPage=${itemsPerPage}`).then(res => {
    //         console.log(res);
    //         if (res.data.status == 1) {
    //             setUsers(res.data.users.data);
    //             setTotalItems(res.data.users.totalItems);
    //         } else {
    //             Swal.fire("Error!", res.data.message, "error");
    //         }
    //     }).catch(error => {
    //         console.error("An error occurred:", error);
    //     });
    // }, [currentPage]);

    useEffect(() => {
        setLoadBarProgress(30);  // Set initial progress when component mounts
      }, []);

    useEffect(() => {
        setLoadBarProgress(70);
        setIsLoading(true)
        // Make an API request for searching users based on the input
        http.get(`/users/pagination?query=${debouncedSearchInput}&page=${currentPage}&perPage=${itemsPerPage}`).then(res => {
            if (res.data.status) {
                setUsers(res.data.users.data);
                setTotalItems(res.data.users.totalItems);
                setIsLoading(false);
                setLoadBarProgress(100);
            } else {
                Swal.fire("Error!", res.data.message, "error");
            }
        }).catch(error => {
            console.error("An error occurred:", error);
        });
    }, [debouncedSearchInput, currentPage]);

    const deleteUser = (id: number, index: number) => {

        alert(id);
        http.delete(`/users/${id}`).then(res => {
            console.log(res);
            if (res.data.status == 1) {
                Swal.fire("Success!", res.data.message, "success");
                const userData = [...users];
                userData.splice(index, 1);
                setUsers(userData);
            } else {
                Swal.fire("Error!", res.data.message, "error");
            }
        }).catch(error => {
            console.error("An error occurred:", error);
        });
    }

    const hasPermission = (requiredPermission: string) => {
        return user?.permissions.includes(requiredPermission);
    };
    console.log('users data', users);
    // alert(currentPage)
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
                            <h1 className="d-flex align-items-center text-dark fw-bolder fs-3 my-1">Users
                            <span className="h-20px border-gray-200 border-start ms-3 mx-2" ></span>

                            <ul className="breadcrumb breadcrumb-separatorless fw-bold fs-7 my-1">

                                <li className="breadcrumb-item text-muted">
                                    <Link to="/dashboard"><label className="text-muted text-hover-primary">Dashboard</label></Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <span className="bullet bg-gray-300 w-5px h-2px"></span>
                                </li>
                                <li className="breadcrumb-item text-dark">Users List</li>
                            </ul>
                            </h1>
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
                                            id="searchUser"
                                            name="searchUser"
                                            onChange={(e) => [setSearchInput(e.target.value), setCurrentPage(1)]}
                                            placeholder="Search User"
                                        />
                                        
                                    </div>
                                </div>
                                <div className="card-toolbar">
                                    <div className="d-flex justify-content-end" data-kt-customer-table-toolbar="base">
                                        {hasPermission('user_add') ? (
                                            <Link to="/user-add" className='btn btn-primary' >Add User</Link>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                            <div className="card-body pt-0">
                                <table className="table align-middle table-row-dashed fs-6 gy-5" id="kt_customers_table">
                                    <thead>
                                        <tr className="text-start text-gray-400 fw-bolder fs-7 text-uppercase gs-0">
                                            <th className="w-10px pe-2">
                                                <div className="form-check form-check-sm form-check-custom form-check-solid me-3">
                                                    <input className="form-check-input" type="checkbox" data-kt-check="true" data-kt-check-target="#kt_customers_table .form-check-input" value="1" />
                                                </div>
                                            </th>
                                            <th className="min-w-125px">User Name</th>
                                            <th className="min-w-125px">Email</th>
                                            <th className="text-end min-w-70px">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="fw-bold text-gray-600">
                                        {
                                            isLoading
                                                ?
                                                (
                                                    Array.from({ length: itemsPerPage }).map((_, rowIndex) => (
                                                        <tr key={rowIndex}>
                                                            <td className="col-0.5" >
                                                                <Skeleton style={{ height: '40px' }} />
                                                            </td>
                                                            <td className="col-4">
                                                                <Skeleton style={{ height: '40px' }} />
                                                            </td>
                                                            <td className="col-4">
                                                                <Skeleton style={{ height: '40px' }} />
                                                            </td>
                                                            <td className='text-end col-2'>
                                                                <Skeleton style={{ height: '40px' }} />
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    users.length === 0
                                                    ?
                                                    <tr>
                                                    <td colSpan={4} className="text-center">
                                                      No matching data found
                                                    </td>
                                                  </tr>                                                    :
                                                    users.map((value, index) => {
                                                        return (<tr key={value.id}>
                                                            <td className='col-0.5'>
                                                                <div className="form-check form-check-sm form-check-custom form-check-solid me-3">
                                                                    <input className="form-check-input" type="checkbox" data-kt-check="true" data-kt-check-target="#kt_customers_table .form-check-input" value="1" />
                                                                </div>
                                                            </td>
                                                            <td className="col-4">
                                                                {value.name}
                                                            </td>
                                                            <td className="col-4">
                                                                {value.email}
                                                            </td>
                                                            <td className='text-end col-2'>
                                                                <div className='d-flex justify-content-end flex-shrink-0'>
                                                                {hasPermission('user_edit') ? (
                                                                    <Link to={`/user-edit/${value.id}`} className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
                                                                        <span className="svg-icon svg-icon-3 svg-icon-primary">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                                <path opacity="0.3" d="M21.4 8.35303L19.241 10.511L13.485 4.755L15.643 2.59595C16.0248 2.21423 16.5426 1.99988 17.0825 1.99988C17.6224 1.99988 18.1402 2.21423 18.522 2.59595L21.4 5.474C21.7817 5.85581 21.9962 6.37355 21.9962 6.91345C21.9962 7.45335 21.7817 7.97122 21.4 8.35303ZM3.68699 21.932L9.88699 19.865L4.13099 14.109L2.06399 20.309C1.98815 20.5354 1.97703 20.7787 2.03189 21.0111C2.08674 21.2436 2.2054 21.4561 2.37449 21.6248C2.54359 21.7934 2.75641 21.9115 2.989 21.9658C3.22158 22.0201 3.4647 22.0084 3.69099 21.932H3.68699Z" fill="currentColor" />
                                                                                <path d="M5.574 21.3L3.692 21.928C3.46591 22.0032 3.22334 22.0141 2.99144 21.9594C2.75954 21.9046 2.54744 21.7864 2.3789 21.6179C2.21036 21.4495 2.09202 21.2375 2.03711 21.0056C1.9822 20.7737 1.99289 20.5312 2.06799 20.3051L2.696 18.422L5.574 21.3ZM4.13499 14.105L9.891 19.861L19.245 10.507L13.489 4.75098L4.13499 14.105Z" fill="currentColor" />
                                                                            </svg>
                                                                        </span>
                                                                    </Link>
                                                                ) : null}
                                                                {hasPermission('user_delete') ? (
                                                                    <button className='btn btn-icon btn-bg-light btn-active-color btn-sm me-1' onClick={() => deleteUser(value.id, index)}>

                                                                        <span className="svg-icon svg-icon-3 svg-icon-danger">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                                <path d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z" fill="currentColor" />
                                                                                <path opacity="0.5" d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z" fill="currentColor" />
                                                                                <path opacity="0.5" d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z" fill="currentColor" />
                                                                            </svg>
                                                                        </span>
                                                                    </button>
                                                                ) : null}
                                                                </div>

                                                                {/* {hasPermission('user_edit') ? (
                                                                    <Link className="menu-link btn btn-primary" to={`/user-edit/${value.id}`}>Edit</Link>
                                                                ) : null}
                                                                {hasPermission('user_delete') ? (
                                                                    <button className='btn btn-danger' onClick={() => deleteUser(value.id, index)}>Delete</button>
                                                                ) : null} */}

                                                            </td>
                                                        </tr>)
                                                    })
                                                )
                                        }
                                    </tbody>
                                </table>
                                <div className="d-flex justify-content-center">
                                    <nav>
                                        {/* <ul className="pagination"> */}
                                        <ul className="pagination pagination-circle pagination-outline">
                                            <li className={`page-item previous m-1 ${currentPage === 1 ? 'disabled' : ''}`} >
                                                <button className="page-link" onClick={prevPage} >
                                                    <i className="previous"></i>
                                                </button>
                                            </li>
                                            {Array.from({ length: totalPages }, (_, i) => (
                                                <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                                    <button className="page-link" onClick={() => goToPage(i + 1)}>
                                                        {i + 1}
                                                    </button>
                                                </li>
                                            ))}
                                            <li className={`page-item next m-1 ${currentPage === totalPages ? 'disabled' : ''}`}>
                                                <button className="page-link" onClick={nextPage}>
                                                    <i className="next "></i>
                                                </button>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*end::Post*/}
            </div>
        </div>
    )
}

export default Users