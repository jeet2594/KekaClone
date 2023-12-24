import { Link, useNavigate, useParams } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Input from '@/components/Input'
import http from '@/http'
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react'
import LoadingBar from 'react-top-loading-bar';
import Skeleton from "react-loading-skeleton";
import Button from '@/components/Button'

interface Permission {
  id: number
  name: string
}
interface Role {
  name: string
  permissionIds: number[]
}

const roleSchema = z.object({
  name: z.string().nonempty('Field is Required'),
  permissionIds: z.array(z.number()).refine(permission => permission.length > 0, {
    message: 'Select Atleast one permission',
  }),
})

const RoleEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [loadBarProgress, setLoadBarProgress] = useState(0);
  const [isPermissionsLoading, setIsPermissionsLoading] = useState(true)

  useEffect(() => {
    setLoadBarProgress(30);  // Set initial progress when component mounts
  }, []);
  useEffect(() => {
    setLoadBarProgress(70);
    http
      .get('/permission')
      .then(res => {
        const responseData = res.data
        if (responseData.status) {
          setPermissions(responseData.permissions)
		  setIsPermissionsLoading(false);
        } else {

        }
		setLoadBarProgress(100);
      })
      .catch(error => {
        console.log(error)
		setLoadBarProgress(100);
      })
  }, []);
  useEffect(() => {
	http.get(`roles/${id}`).then(res => {
		console.log('roles data is ',res);
		if(res.data.status) {
			const roleDetails = res.data.role;
			setValue('name', roleDetails.name);
			const permissions = roleDetails.permissions.map((item: any) => item.id);
			setValue('permissionIds', permissions);
		}
	}).then(error => {
		console.log(error);

	})
  },[]);
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
	setValue,
  } = useForm<Role>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: '',
      permissionIds: [],
    },
  })

  const onSubmit = (formData: Role) => {
    try {
      console.log(formData)
      http
        .patch(`/roles/${id}`, formData)
        .then(response => {
          console.log('=== onSubmit response', response)
          const responseData = response.data
          if (responseData.status) {
            navigate('/roles')
            Swal.fire('Good job!', responseData.message, 'success')
          } else {
            Swal.fire('Error!', responseData.message, 'error')
          }
        })
        .catch(error => {
          if (
            error.response?.data?.message !== undefined &&
            error.response.data.message !== null
          ) {
            console.log('=== onSubmit error', error.response.data.message)
            const validationError = error.response.data.message
            console.log('=== validationError ', validationError)
            for (const errorField of validationError) {
              console.log('=== errorField ', errorField)
              setError(errorField.field, {
                type: 'manual',
                message: errorField.error,
              })
            }
            console.log('=== updated error ', errors)
          } else {
            Swal.fire('Error!', error.message, 'error')
          }
        })
    } catch (error) {
      console.log(error)

      const validationError = error as z.infer<typeof roleSchema>
      console.log(validationError)
    }
  }

  return (
    <div>
		<LoadingBar
        color="#f11946"
        progress={loadBarProgress}
        onLoaderFinished={() => setLoadBarProgress(0)}
      />
      <div
        className='content d-flex flex-column flex-column-fluid'
        id='kt_content'
      >
        <div className='toolbar' id='kt_toolbar'>
          <div
            id='kt_toolbar_container'
            className='container-fluid d-flex flex-stack'
          >
            <div
              data-kt-swapper='true'
              data-kt-swapper-mode='prepend'
              data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}"
              className='page-title d-flex align-items-center flex-wrap me-3 mb-5 mb-lg-0'
            >
              <h1 className='d-flex align-items-center text-dark fw-bolder fs-3 my-1'>
                Role Create
                <span className='h-20px border-gray-200 border-start ms-3 mx-2'></span>
                <ul className='breadcrumb breadcrumb-separatorless fw-bold fs-7 my-1'>
                  {/* <!--begin::Item--> */}
                  <li className='breadcrumb-item text-muted'>
                    <Link to='/dashboard'>
                      <span className='text-muted text-hover-primary'>
                        Dashboard
                      </span>
                    </Link>
                  </li>
                  {/* <!--end::Item-->
										<!--begin::Item--> */}
                  <li className='breadcrumb-item'>
                    <span className='bullet bg-gray-300 w-5px h-2px'></span>
                  </li>
                  {/* <!--end::Item-->
										<!--begin::Item--> */}
                  <li className='breadcrumb-item text-muted'>
                    <Link to='/roles'>
                      <span className='text-muted text-hover-primary'>
                        Roles List
                      </span>
                    </Link>
                  </li>
                  {/* <!--end::Item-->
										<!--begin::Item--> */}
                  <li className='breadcrumb-item'>
                    <span className='bullet bg-gray-300 w-5px h-2px'></span>
                  </li>
                  {/* <!--end::Item-->
										<!--begin::Item--> */}
                  <li className='breadcrumb-item text-dark'>Role Create</li>
                  {/* <!--end::Item--> */}
                </ul>
              </h1>
            </div>
          </div>
        </div>
        <div className='post d-flex flex-column-fluid' id='kt_post'>
          <div id='kt_content_container' className='container-xxl'>
            <div className='card'>
              <div className='card-body pt-6'>
                <form className='row g-3' onSubmit={handleSubmit(onSubmit)}>
                  <div className='col-md-4 mb-5'>
                    <label htmlFor='name' className='form-label'>
                      Role
                    </label>
                    <Controller
                      name='name'
                      control={control}
                      render={({ field }) => (
                        <>
                          <Input
                            type='text'
                            id='name'
                            className='form-control'
                            placeholder='Role Name'
                            {...field}
                          />
                          {errors.name && (
                            <p className='fv-plugins-message-container invalid-feedback'>
                              {errors.name.message}
                            </p>
                          )}
                        </>
                      )}
                    />
                  </div>
				  { isPermissionsLoading
                          ?
						  <div>
						  <Skeleton style={{ width: '80px' }} />
						  <div className="row mb-12 mt-2">
                                <div className="col-md-4">
                                  <Skeleton count={5} />
                                </div>
                                <div className="col-md-4">
                                  {/* <Skeleton style={{ width: '80px' }} /> */}
                                  <Skeleton count={5} />
                                </div>
                                <div className="col-md-4">
                                  {/* <Skeleton style={{ width: '80px' }} /> */}
                                  <Skeleton count={5} />
                                </div>
                            </div>

						  </div>
						  :
                  <div className='mb-10'>
                    <Controller
                      name='permissionIds'
                      control={control}
                      render={({ field }) => (
                        <div className='mb-10'>
                          <label className='required fw-bold fs-6 mb-5'>
                            Permissions
                          </label>
                          <div className='row'>
                            {permissions.map((permission) => (
                              <div className='col-4' key={permission.id}>
                                {' '}
                                {/* Use col-4 to have three items per row in a 12-column grid system */}
                                <div className='form-check form-check-custom form-check-solid mb-5'>
                                  <input
                                    type='checkbox'
                                    {...field}
                                    name={`permissionIds[${permission.id}]`}
                                    value={permission.id}
                                    checked={field.value.includes(permission.id)}
                                    onChange={e => {
                                      const roleId = permission.id
                                      const isChecked = e.target.checked
                                      if (isChecked) {
                                        field.onChange([...field.value, roleId])
                                      } else {
                                        field.onChange(
                                          field.value.filter(
                                            id => id !== roleId,
                                          ),
                                        )
                                      }
                                    }}
                                  />
                                  <label className='form-check-label'>
                                    <div className='fw-bolder text-gray-800'>
                                      {permission.name}
                                    </div>
                                  </label>
                                </div>
                              </div>
                            ))}
                          </div>
                          {errors.permissionIds && (
                            <p className='fv-plugins-message-container invalid-feedback'>
                              {errors.permissionIds.message}
                            </p>
                          )}
                        </div>
                      )}
                    />
                  </div>
					}
                  <div className='col-12'>
                    <Button
                        label="Submit"
                        className="btn btn-primary"
                        type="submit"
                        id="updateRole"
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

export default RoleEdit