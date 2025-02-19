import { createBrowserRouter } from 'react-router'
import { Dashboard } from './pages/app/dashboard/dashboard'
import { SignIn } from './pages/auth/signIn'
import { AppLayout } from './pages/_layouts/appLayout'
import { AuthLayout } from './pages/_layouts/authLayout'
import { SignUp } from './pages/auth/signUp'
import { Orders } from './pages/orders/orders'
import { NotFound } from './pages/404'


export const router = createBrowserRouter([
    {
        path: '/', element: <AppLayout />,
        errorElement:<NotFound/>,
        children: [
            { path: '/', element: <Dashboard /> },
            { path: '/orders', element: <Orders /> }
        ]
    },
    {
        path: '/', element: <AuthLayout />,
        errorElement:<NotFound/>,
        children: [
            { path: '/signIn', element: <SignIn /> },
            { path: '/signUp', element: <SignUp /> }
        ]
    }

])