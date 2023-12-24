/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import http from '../../http';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import Input from '@/components/Input';
import Button from '@/components/Button';

interface HolidayDate {
    name: string;
    date: string;
}

interface Errors {
    // Define properties and their types as needed
    name?: string;
    date?: string;
    // Add more properties if necessary
}

const CreateHoliday = () => {

    const [holidayDate, setHolidayDate] = useState<HolidayDate>({
        name: "",
        date: "",
    });
    const navigate = useNavigate();
    // const [errors, setErrors] = useState({});
    const [errors, setErrors] = useState<Errors>({});


    const handleInput = (e: any) => {
        const { name, value } = e;
        setHolidayDate({ ...holidayDate, [name]: [value] });
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        const formData = new FormData();
        const newErrors: Record<keyof HolidayDate, string> = {} as Record<keyof HolidayDate, string>;
        // const newErrors: Record<string, string> = {};

        // Check for empty fields
        for (const key in holidayDate) {
            if (!holidayDate[key as keyof HolidayDate]) {
                newErrors[key as keyof HolidayDate] = 'This field is required';
            }
        }

        if (Object.keys(newErrors).length === 0) {
            formData.append('name', holidayDate.name);
            formData.append('date', holidayDate.date);
            http.post(`/holiday`, formData).then(res => {
                console.log(res);
                if (res.data.status == 1) {
                    setHolidayDate({ ...holidayDate, 'name': "", 'date': "" });
                    Swal.fire("Good job!", res.data.message, "success");
                    navigate('/holiday')
                } else {
                    Swal.fire("Error!", res.data.message, "error");
                }
                console.log(res);
            }).catch(error => {
                console.log(error);
            });
        } else {
            setErrors(newErrors);
        }

    }

    return (
        <div>
            <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
                <div className="toolbar" id="kt_toolbar">
                    <div id="kt_toolbar_container" className="container-fluid d-flex flex-stack">
                        <div data-kt-swapper="true" data-kt-swapper-mode="prepend" data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}" className="page-title d-flex align-items-center flex-wrap me-3 mb-5 mb-lg-0">
                            <h1 className="d-flex align-items-center text-dark fw-bolder fs-3 my-1">Holiday Create
                                {/*begin::Separator*/}
                                <span className="h-20px border-gray-200 border-start ms-3 mx-2" ></span>
                                {/*end::Separator*/}
                                {/*begin::Description*/}
                                {/* <Link to="/holidays"><small className="text-muted fs-7 fw-bold my-1 ms-1">Holiday Lists</small></Link>
                                <span className="h-20px border-gray-200 border-start ms-3 mx-2" ></span> */}
                                {/*end::Separator*/}
                                {/*begin::Description*/}
                                {/* <small className="text-muted fs-7 fw-bold my-1 ms-1">Holiday Add</small> */}
                                {/*end::Description*/}
                                <ul className="breadcrumb breadcrumb-separatorless fw-bold fs-7 my-1">
                                    {/* <!--begin::Item--> */}
                                    <li className="breadcrumb-item text-muted">
                                        <Link to="/dashboard"><a className="text-muted text-hover-primary">Dashboard</a></Link>
                                    </li>
                                    {/* <!--end::Item-->
										<!--begin::Item--> */}
                                    <li className="breadcrumb-item">
                                        <span className="bullet bg-gray-300 w-5px h-2px"></span>
                                    </li>
                                    {/* <!--end::Item-->
										<!--begin::Item--> */}
                                    <li className="breadcrumb-item text-muted">
                                        <Link to="/holidays"><a className="text-muted text-hover-primary">Holiday List</a></Link>
                                    </li>
                                    {/* <!--end::Item-->
										<!--begin::Item--> */}
                                    <li className="breadcrumb-item">
                                        <span className="bullet bg-gray-300 w-5px h-2px"></span>
                                    </li>
                                    {/* <!--end::Item-->
										<!--begin::Item--> */}
                                    <li className="breadcrumb-item text-dark">Holiday Create</li>
                                    {/* <!--end::Item--> */}
                                </ul>
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="post d-flex flex-column-fluid" id="kt_post">
                    <div id="kt_content_container" className="container-xxl">
                        <div className="card">
                            <div className="card-body pt-6">
                                <form className="row g-3" onSubmit={onSubmit}>
                                    <div className="col-md-4">
                                        <label htmlFor="name" className="form-label">Holiday Title</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            onChange={(e) => handleInput(e.target)}
                                            value={holidayDate.name}
                                            name="name"
                                            placeholder="Enter name"
                                        />
                                        {errors.name && <p className="error">{errors.name}</p>}
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="date" className="form-label">Holiday Date</label>
                                        <Input
                                            type="date"
                                            className="form-control"
                                            id="date"
                                            onChange={(e) => handleInput(e.target)}
                                            value={holidayDate.date}
                                            name="date"
                                            placeholder="mm/dd/yyyy"
                                        />
                                        {errors.date && <p className="error">{errors.date}</p>}
                                    </div>
                                    <div className="col-12">
                                        <Button
                                            label="Submit"
                                            className="btn btn-primary"
                                            type="submit"
                                            id="holidaySubmit"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateHoliday