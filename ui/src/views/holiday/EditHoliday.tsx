/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import http from '../../http';
import Swal from 'sweetalert2';
import Input from '@/components/Input';
import Button from '@/components/Button';

interface Holiday {
    name: string,
    date: string,
}

const EditHoliday = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [holidayDate, setHolidayDate] = useState<Holiday>({
        name:"",
        date:""
    });
    const [errors, setErrors] = useState({
        name:"",
        date:""
    });

    useEffect(() => {
        http.get(`/holiday/${id}`).then(res => {
            const responseData = res.data;
            if(responseData.status === 1) {
                setHolidayDate({...holidayDate,'name':responseData.details.name, 'date':responseData.details.date});
            } else {
                Swal.fire("Error!", responseData.message, "error");
            }
        }).catch(error => {
            Swal.fire("Error!", error.message, "error");
        });
    }, [])
    
    const onSubmit = (e: any) => {
        e.preventDefault();
        const newErrors : { [key: string]: string } = {};

        Object.keys(holidayDate).forEach((key) => {
            if (!holidayDate[key as keyof Holiday]) {
              newErrors[key] = 'This field is required!!';
            }
          });

        if(Object.keys(newErrors).length === 0) {
            const formData = new FormData();
            formData.append('name',holidayDate.name);
            formData.append('date',holidayDate.date);
            http.patch(`/holiday/${id}`,formData).then(res => {
                const responseData = res.data;
                if(responseData.status === 1) {
                    Swal.fire("Success!", responseData.message, "success");
                    navigate('/holidays');
                } else{
                    Swal.fire("Error!", responseData.message, "error");
                }
            }).catch((error) => {
                console.error('HTTP request error:', error);
                Swal.fire('Error!', 'An error occurred while processing your request', 'error');
              });
        } else {
            setErrors({
                ...errors, // Preserve existing errors
                ...newErrors, // Add new errors
              });
        }
    }

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        console.log('name is ',e.target.name);
        console.log('value is ',e.target.value);        
        setHolidayDate({...holidayDate,[e.target.name]: e.target.value });
    }
    return (
        <div>
            <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
                <div className="toolbar" id="kt_toolbar">
                    <div id="kt_toolbar_container" className="container-fluid d-flex flex-stack">
                        <div data-kt-swapper="true" data-kt-swapper-mode="prepend" data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}" className="page-title d-flex align-items-center flex-wrap me-3 mb-5 mb-lg-0">
                            <h1 className="d-flex align-items-center text-dark fw-bolder fs-3 my-1">Holiday Edit
                                <span className="h-20px border-gray-200 border-start ms-3 mx-2" ></span>
                                <ul className="breadcrumb breadcrumb-separatorless fw-bold fs-7 my-1">
                                    <li className="breadcrumb-item text-muted">
                                        <Link to="/dashboard"><span className="text-muted text-hover-primary">Dashboard</span></Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <span className="bullet bg-gray-300 w-5px h-2px"></span>
                                    </li>
                                    <li className="breadcrumb-item text-muted">
                                        <Link to="/holidays"><span className="text-muted text-hover-primary">Holiday List</span></Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <span className="bullet bg-gray-300 w-5px h-2px"></span>
                                    </li>
                                    <li className="breadcrumb-item text-dark">Holiday Edit</li>
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
                                            onChange={(e) => handleInput(e)}
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
                                            onChange={(e) => handleInput(e)}
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
                                            id="updateHoliday"
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

export default EditHoliday