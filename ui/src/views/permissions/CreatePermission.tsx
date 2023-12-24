import { Link, useNavigate } from "react-router-dom"
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/Input";
import http from "@/http";
import Swal from "sweetalert2";
import Button from "@/components/Button";

interface Permission {
	name: string;
}

const permissionSchema = z.object({
    name: z.string().nonempty('Field is Required'),
})

const CreatePermission = () => {
    const navigate = useNavigate();
	const {
        handleSubmit,
        control,
        formState: { errors },
        setError,
    } = useForm<Permission>({
        resolver: zodResolver(permissionSchema),
        defaultValues: {
            name: ""
        },
    });

	const onSubmit = (formData: Permission) => {
		try {
			console.log(formData);
			http.post('/permission',formData).then(response => {
                console.log('=== onSubmit response',response);
                const responseData = response.data;
                if(responseData.status) {
                    navigate('/permissions')
                    Swal.fire("Good job!", responseData.message, "success");
                } else {
                    Swal.fire("Error!", responseData.message, "error");
                }
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
                } else {
                    Swal.fire("Error!", error.message, "error");
                }

            });
		} catch (error) {
			console.log(error);

			const validationError = error as z.infer<typeof permissionSchema>;
            console.log(validationError);
		}
	}

	return (
		<div>
			<div className="content d-flex flex-column flex-column-fluid" id="kt_content">
				<div className="toolbar" id="kt_toolbar">
					<div id="kt_toolbar_container" className="container-fluid d-flex flex-stack">
						<div data-kt-swapper="true" data-kt-swapper-mode="prepend" data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}" className="page-title d-flex align-items-center flex-wrap me-3 mb-5 mb-lg-0">
							<h1 className="d-flex align-items-center text-dark fw-bolder fs-3 my-1">Permission Create

								<span className="h-20px border-gray-200 border-start ms-3 mx-2" ></span>

								<ul className="breadcrumb breadcrumb-separatorless fw-bold fs-7 my-1">
									{/* <!--begin::Item--> */}
									<li className="breadcrumb-item text-muted">
										<Link to="/dashboard"><span className="text-muted text-hover-primary">Dashboard</span></Link>
									</li>
									{/* <!--end::Item-->
										<!--begin::Item--> */}
									<li className="breadcrumb-item">
										<span className="bullet bg-gray-300 w-5px h-2px"></span>
									</li>
									{/* <!--end::Item-->
										<!--begin::Item--> */}
									<li className="breadcrumb-item text-muted">
										<Link to="/permissions"><span className="text-muted text-hover-primary">Permissions List</span></Link>
									</li>
									{/* <!--end::Item-->
										<!--begin::Item--> */}
									<li className="breadcrumb-item">
										<span className="bullet bg-gray-300 w-5px h-2px"></span>
									</li>
									{/* <!--end::Item-->
										<!--begin::Item--> */}
									<li className="breadcrumb-item text-dark">Permission Create</li>
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
								<form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
									<div className="col-md-4 mb-5">
										<label htmlFor="name" className="form-label">Permission</label>
										<Controller
											name="name"
											control={control}
											render={({ field }) => (
												<>
												<Input type='text' id='name' className="form-control" placeholder="Permission Name" {...field}/>
													{errors.name && <p className="fv-plugins-message-container invalid-feedback">{errors.name.message}</p>}
												</>
											)}
										/>
									</div>
									<div className="col-12">
										<Button
                                            label="Submit"
                                            className="btn btn-primary"
                                            type="submit"
                                            id="createPermission"
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

export default CreatePermission