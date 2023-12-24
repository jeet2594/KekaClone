import { useEffect, useState } from "react";
import http from "../../http";
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Swal from 'sweetalert2';
import { Link, useNavigate } from "react-router-dom";
import Input from "@/components/Input";

interface User {
    name: string;
    lastname: string;
    password: string;
    cpassword: string;
    email: string;
    dob: string,
    joindate: string,
    lastdate: string,
    roles: number[],
}
interface Role {
    id: number;
    name: string;
}

const userSchema = z.object({
    name: z.string().nonempty('First Name Field is Required'),
    lastname: z.string().nonempty('Last Name Field is Required'),
    password: z.string().nonempty('Password Field is Required'),
    cpassword: z.string().nonempty('Confirm Password Field is Required'),
    email: z.string().nonempty('Email Field is Required').email({ message: "Invalid email address" }),
    dob: z.string().nonempty('Date of Birth Field is Required'),
    joindate: z.string().nonempty('Join Date Field is Required'),
    lastdate: z.string(),
    roles: z.array(z.number()).refine(roles => roles.length > 0, {
        message: "Select Atleast one role!",
    }),
    // roles: z.array(z.number()),
}).refine(
    (values) => {
      return values.password === values.cpassword;
    },
    {
      message: "Passwords must match!",
      path: ["cpassword"],
    }
  );
const CreateUser = () => {
    const navigate = useNavigate();
    const [roles, setRoles] = useState<Role[]>([]);
    useEffect(() => {
        http.get('/roles').then(response => {
            console.log(response);
            setRoles(response.data.roles);
        }).catch(error => {
            console.log(error);
        })
    }, [])

    const {
        handleSubmit,
        control,
        formState: { errors },
        setError,
    } = useForm<User>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            name: "",
            lastname: "",
            password: "",
            cpassword: "",
            email: "",
            dob: "",
            joindate: "",
            lastdate: "",
            roles: [], // Empty array for roles
        },
    });
    console.log('=== errors', errors);
    const onSubmit = (formData: User) => {
        try {
            userSchema.parse(formData);
            console.log('=== onSubmit formData ', formData);
            http.post('/users',formData).then(response => {
                console.log('=== onSubmit response',response);
                const responseData = response.data;
                if(responseData.status) {
                    navigate('/users')
                    Swal.fire("Good job!", responseData.message, "success");
                } else {
                    Swal.fire("Error!", responseData.message, "error");
                }
                // setRoles(response.data.roles);
            })
            .catch(error => {
                if (error.response?.data?.message !== undefined && error.response.data.message !== null) {
                    console.log('=== onSubmit error',error.response.data.message);
                    const validationError = error.response.data.message;
                    console.log('=== validationError ',validationError);
                    for (const errorField of validationError) {
                        console.log('=== errorField ',errorField);
                        setError(errorField.field, { type: 'manual', message: errorField.error });
                    }
                    console.log('=== updated error ', errors);
                    console.log('=== updated error email', errors.email);
                } else {
                    Swal.fire("Error!", error.message, "error");
                }

            });
        } catch (error) {
            const validationError = error as z.infer<typeof userSchema>;
            console.log(validationError);
        }
    };

    return (
        <div>
            <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
                <div className="toolbar" id="kt_toolbar">
                    <div id="kt_toolbar_container" className="container-fluid d-flex flex-stack">
                        <div data-kt-swapper="true" data-kt-swapper-mode="prepend" data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}" className="page-title d-flex align-items-center flex-wrap me-3 mb-5 mb-lg-0">
                        <h1 className="d-flex align-items-center text-dark fw-bolder fs-3 my-1">User Create
                            <span className="h-20px border-gray-200 border-start ms-3 mx-2" ></span>
                            <ul className="breadcrumb breadcrumb-separatorless fw-bold fs-7 my-1">
                                <li className="breadcrumb-item text-muted">
                                    <Link to="/dashboard"><span className="text-muted text-hover-primary">Dashboard</span></Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <span className="bullet bg-gray-300 w-5px h-2px"></span>
                                </li>
                                <li className="breadcrumb-item text-muted">
                                    <Link to="/users"><span className="text-muted text-hover-primary">Users List</span></Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <span className="bullet bg-gray-300 w-5px h-2px"></span>
                                </li>
                                <li className="breadcrumb-item text-dark">User Create</li>
                            </ul>
                        </h1>
                        </div>
                    </div>
                </div>
                <div className="post d-flex flex-column-fluid" id="kt_post">
                    <div id="kt_content_container" className="container-xxl">
                        <div className="card">
                            <div className="card-body pt-6">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="row mb-12">
                                        <div className="col-md-4">
                                            <label htmlFor="name" className="required form-label">First Name</label>
                                            <Controller
                                                name="name"
                                                control={control}
                                                render={({ field }) => (
                                                    <>
                                                    <Input
                                                        type="text"
                                                        className="form-control"
                                                        id="name"
                                                        {...field}
                                                        placeholder="First Name"
                                                    />
                                                        {errors.name && <p className="fv-plugins-message-container invalid-feedback">{errors.name.message}</p>}
                                                    </>
                                                )}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="lastname" className="required form-label">Last Name</label>
                                            <Controller
                                                name="lastname"
                                                control={control}
                                                render={({ field }) => (
                                                    <>
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            id="lastname"
                                                            {...field}
                                                            placeholder="Last Name"
                                                        />
                                                        {errors.lastname && <p className="fv-plugins-message-container invalid-feedback">{errors.lastname.message}</p>}
                                                    </>
                                                )}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="name" className="required form-label">Email</label>
                                            <Controller
                                                name="email"
                                                control={control}
                                                render={({ field }) => (
                                                    <>
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            id="email"
                                                            {...field}
                                                            placeholder="Email"
                                                        />
                                                        {errors.email && <p className="fv-plugins-message-container invalid-feedback">{errors.email.message}</p>}
                                                    </>
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-12">
                                        <div className="col-md-4">
                                            <label htmlFor="password" className="required form-label">Password</label>
                                            <Controller
                                                name="password"
                                                control={control}
                                                render={({ field }) => (
                                                    <>
                                                        <Input
                                                            type="password"
                                                            className="form-control"
                                                            id="password"
                                                            {...field}
                                                            placeholder="Password"
                                                        />
                                                        {errors.password && <p className="fv-plugins-message-container invalid-feedback">{errors.password.message}</p>}
                                                    </>
                                                )}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="cpassword" className="required form-label">Password</label>
                                            <Controller
                                                name="cpassword"
                                                control={control}
                                                render={({ field }) => (
                                                    <>
                                                        <Input
                                                            type="password"
                                                            className="form-control"
                                                            id="cpassword"
                                                            {...field}
                                                            placeholder="Conform Password"
                                                        />
                                                        {errors.cpassword && <p className="fv-plugins-message-container invalid-feedback">{errors.cpassword.message}</p>}
                                                    </>
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-12">
                                        <div className="col-md-4">
                                            <label htmlFor="dob" className="required form-label">Birth Date</label>
                                            <Controller
                                                name="dob"
                                                control={control}
                                                render={({ field }) => (
                                                    <>
                                                        <Input
                                                            type="date"
                                                            className="form-control"
                                                            id="dob"
                                                            {...field}
                                                            placeholder="MM/DD/YYYY"
                                                        />
                                                        {errors.dob && <p className="fv-plugins-message-container invalid-feedback">{errors.dob.message}</p>}
                                                    </>
                                                )}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="joindate" className="required form-label">Joining Date</label>
                                            <Controller
                                                name="joindate"
                                                control={control}
                                                render={({ field }) => (
                                                    <>
                                                        <Input
                                                            type="date"
                                                            className="form-control"
                                                            id="joindate"
                                                            {...field}
                                                            placeholder="Join Date"
                                                        />
                                                        {errors.joindate && <p className="fv-plugins-message-container invalid-feedback">{errors.joindate.message}</p>}
                                                    </>
                                                )}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="lastdate" className="form-label">Last Day Date</label>
                                            <Controller
                                                name="lastdate"
                                                control={control}
                                                render={({ field }) => (
                                                    <>
                                                        <Input
                                                            type="date"
                                                            className="form-control"
                                                            id="lastdate"
                                                            {...field}
                                                            placeholder="Last Date"
                                                        />
                                                        {errors.lastdate && <p className="fv-plugins-message-container invalid-feedback">{errors.lastdate.message}</p>}
                                                    </>
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-10">
                                        <Controller
                                            name="roles"
                                            control={control}
                                            render={({ field }) => (
                                                <div className="mb-10">
                                                    <label className="required fw-bold fs-6 mb-5">Roles</label>
                                                    {
                                                        roles.map((role) => {
                                                            return (
                                                                <div className="d-flex flex-column fv-row" key={role.id}>
                                                                    <div className="form-check form-check-custom form-check-solid mb-5">
                                                                        <input
                                                                            type="checkbox"
                                                                            {...field}
                                                                            name={`roles[${role.id}]`} // Set the name dynamically based on role ID
                                                                            value={role.id}
                                                                            checked={field.value.includes(role.id)}
                                                                            onChange={(e) => {
                                                                                const roleId = role.id;
                                                                                const isChecked = e.target.checked;
                                                                                if (isChecked) {
                                                                                    field.onChange([...field.value, roleId]); // Add the selected role to the array
                                                                                } else {
                                                                                    field.onChange(field.value.filter((id) => id !== roleId)); // Remove the unselected role from the array
                                                                                }
                                                                            }}
                                                                        />

                                                                        <label className="form-check-label">
                                                                            <div className="fw-bolder text-gray-800">{role.name}</div>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })
                                                    }
                                                    {errors.roles && <p className="fv-plugins-message-container invalid-feedback">{errors.roles.message}</p>}
                                                </div>
                                            )}
                                        />

                                    </div>
                                    <div className="col-12">
                                        <button type="submit" className="btn btn-primary">Submit</button>
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
export default CreateUser