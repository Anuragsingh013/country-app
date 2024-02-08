import { createRoot } from 'react-dom/client'
import App from './App'
import Contact from './components/Contact';

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Home from './components/Home';
import Error from './components/Error';
import CountryDetail from './components/CountryDetail';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/contact',
                element: <Contact />
            },
            {
                path: '/Blog',
                element: <div>My blog </div>
            },
            {
                path: '/:country',
                element: <CountryDetail />
            }
        ],
        errorElement: <Error />
    },


]);
const root = createRoot(document.querySelector('#root'))

root.render(<RouterProvider router={router} />)