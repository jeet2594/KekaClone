import { ChangeEvent, FormEvent, useState } from 'react'
import http from '../http';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';

const Login = () => {
    const navigate = useNavigate();

    const divStyle = {
        backgroundImage: 'url(assets/media/illustrations/sketchy-1/14.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundAttachment: 'fixed',
        backgroundPositionY: 'bottom',
        backgroundPositionX: 'center',
        // Add other styles if needed
    };
    const [loginForm, setLoginForm] = useState({
        'email': '',
        'password': '',
    });
    const onInput = (e: ChangeEvent<HTMLInputElement>) => {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    }
    const loginSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', loginForm.email);
        formData.append('password', loginForm.password);
        http.post(`/auth/login`, formData).then(res => {
            console.log(res);
            if (res.data.status == 1) {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('permissions', JSON.stringify(res.data.permissions));
                const storedPermission = localStorage.getItem('permissions');
                const storedToken = localStorage.getItem('token');
                console.log('storedPermission', storedPermission);
                console.log('storedToken', storedToken);

                setLoginForm({ ...loginForm, 'email': "", 'password': "" });
                navigate('/dashboard')
                Swal.fire("Good job!", res.data.message, "success");
            } else {
                Swal.fire("Error!", res.data.message, "error");
            }
            console.log(res);
        }).catch(error => {
            console.log(error);
        });
    }
    return (
        <div>
            <div className="d-flex flex-column flex-root">
                <div className="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed" style={divStyle}>
                    <div className="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
                        <a href="../../demo1/dist/index.html" className="mb-12">
                            <img alt="Logo" src="assets/media/logos/keka4.png" className="h-40px" />
                        </a>
                        <div className="w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto">
                            <form className="form w-100" id="kt_sign_in_form" onSubmit={loginSubmit}>
                                <div className="text-center mb-10">
                                    <h1 className="text-dark mb-3">Sign In to Keka</h1>
                                </div>
                                <div className="fv-row mb-10">
                                    <label className="form-label fs-6 fw-bolder text-dark">Email</label>
                                    <Input
                                        type="text"
                                        className="form-control form-control-lg form-control-solid"
                                        id="username"
                                        onChange={(e) => onInput(e)}
                                        value={loginForm.email}
                                        name="email"
                                        placeholder="Enter username"
                                    />
                                </div>
                                <div className="fv-row mb-10">
                                    <div className="d-flex flex-stack mb-2">
                                        <label className="form-label fw-bolder text-dark fs-6 mb-0">Password</label>
                                        <a href="../../demo1/dist/authentication/layouts/basic/password-reset.html" className="link-primary fs-6 fw-bolder">Forgot Password ?</a>
                                    </div>
                                    <Input
                                        type="password"
                                        className="form-control form-control-lg form-control-solid"
                                        id="username"
                                        onChange={(e) => onInput(e)}
                                        value={loginForm.password}
                                        name="password"
                                        placeholder="Enter password"
                                    />
                                </div>
                                <div className="text-center">
                                    <Button
                                        label="Submit"
                                        color="primary"
                                        className="btn-lg w-100 mb-5"
                                        type="submit"
                                        id="kt_sign_in_submit"
                                    >
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login