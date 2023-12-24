import { useEffect, useContext, Suspense, lazy } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Master from '../layouts/Master'
import Content from '../layouts/Content'
import http from '../http'
// import Holiday from '../views/holiday/Holiday'
import CreateHoliday from '../views/holiday/CreateHoliday'
import EditHoliday from '../views/holiday/EditHoliday'
import { UserContext } from '../UserContext'
import Permissions from '../services/Permission'
import PermissionErrorPage from '../pages/PermissionErrorPage'
import Users from '../views/user/Users'
import CreateUser from '../views/user/CreateUser'
import UserEdit from '../views/user/UserEdit'
import PermissionsList from '@/views/permissions/Permissions'
import CreatePermission from '@/views/permissions/CreatePermission'
import EditPermission from '@/views/permissions/EditPermission'
import RoleList from '@/views/roles/RoleList'
import CreateRole from '@/views/roles/CreateRole'
import RoleEdit from '@/views/roles/RoleEdit'
import Attendance from '@/views/attendance/Attendance'
// import Login from '@/pages/Login'

const Login = lazy(() => import('@/pages/Login'));
const Holiday = lazy(() => import('@/views/holiday/Holiday'));

export const ApiRoute = () => {

  const navigate = useNavigate();
  // const { user } = useContext(UserContext);
  const userContext = useContext(UserContext);

  const checkAuthentication = async () => {
    try {
      const response = await http.get(`/auth/check-token`);
      console.log(response);
      if (response.data.status !== 1) {
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      navigate('/');
    }
  };

  useEffect(() => {
    const login = localStorage.getItem('token');
    console.log('login is ', login);

    if (!login) {
      navigate('/');
    }
    else {
      checkAuthentication();
    }
  }, [navigate]);


  if (!userContext) {
    // Handle the case where UserContext is not provided, e.g., by rendering an error message.
    return (
      <div>
        <p>User context is not available. Ensure your component is wrapped with UserProvider.</p>
      </div>
    );
  }

  const { user } = userContext;


  const hasPermission = (requiredPermission: string) => {
    return user.permissions.includes(requiredPermission);
  }

  return (
    <Routes>
      {/* <Route path="/" element={<Login />} /> */}
      <Route
        path="/"
        element={(
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        )}
      />

      <Route path="/dashboard" element={<Master />}>
        <Route index element={<Content />} />
      </Route>
      {/* <Route path="/holidays" element={<Master />}>
            <Route index element={<Holiday />} />
        </Route> */}
      {/* <Route
        path="/holidays"
        element={
          hasPermission(Permissions.HOLIDAY_LIST) ? (
            <Master />
          ) : (
            <PermissionErrorPage />
          )
        }
      >
        <Route index element={<Holiday />} />
      </Route> */}
      <Route
        path="/holidays"
        element={
          hasPermission(Permissions.HOLIDAY_LIST) ? (
            <Suspense fallback={<div>Loading...</div>}>
              <Master />
            </Suspense>
          ) : (
            <PermissionErrorPage />
          )
        }
      >
        <Route index element={<Holiday />} />
      </Route>
      <Route path="/create-holiday" element={hasPermission(Permissions.HOLIDAY_ADD) ? (<Master />) : (<PermissionErrorPage />)}>
        <Route index element={<CreateHoliday />} />
      </Route>
      <Route path="/holiday-edit/:id" element={hasPermission(Permissions.HOLIDAY_EDIT) ? (<Master />) : (<PermissionErrorPage />)}>
        <Route index element={<EditHoliday />} />
      </Route>
      <Route path="/users" element={hasPermission(Permissions.USER_LIST) ? (<Master />) : (<PermissionErrorPage />)}>
        <Route index element={<Users />} />
      </Route>
      <Route path="/user-add" element={hasPermission(Permissions.USER_ADD) ? (<Master />) : (<PermissionErrorPage />)}>
        <Route index element={<CreateUser />} />
      </Route>
      <Route path="/user-edit/:id" element={hasPermission(Permissions.USER_EDIT) ? (<Master />) : (<PermissionErrorPage />)}>
        <Route index element={<UserEdit />} />
      </Route>
      <Route path="/permissions" element={hasPermission(Permissions.PERMISSION_LIST) ? (<Master />) : (<PermissionErrorPage />)}>
        <Route index element={<PermissionsList />} />
      </Route>
      <Route path="/create-permission" element={hasPermission(Permissions.PERMISSION_ADD) ? (<Master />) : (<PermissionErrorPage />)}>
        <Route index element={<CreatePermission />} />
      </Route>
      <Route path="/edit-permission/:id" element={hasPermission(Permissions.PERMISSION_EDIT) ? (<Master />) : (<PermissionErrorPage />)}>
        <Route index element={<EditPermission />} />
      </Route>
      <Route path="/roles" element={hasPermission(Permissions.ROLE_LIST) ? (<Master />) : (<PermissionErrorPage />)}>
        <Route index element={<RoleList />} />
      </Route>
      <Route path="/create-role" element={hasPermission(Permissions.ROLE_ADD) ? (<Master />) : (<PermissionErrorPage />)}>
        <Route index element={<CreateRole />} />
      </Route>
      <Route path="/edit-role/:id" element={hasPermission(Permissions.ROLE_EDIT) ? (<Master />) : (<PermissionErrorPage />)}>
        <Route index element={<RoleEdit />} />
      </Route>
      <Route path="/attendance" element={hasPermission(Permissions.USER_ATTENDANCE) ? (<Master />) : (<PermissionErrorPage />)}>
        <Route index element={<Attendance />} />
      </Route>
    </Routes>
  )
}
