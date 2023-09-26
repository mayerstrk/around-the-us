import React from 'react';
import ReactDOM from 'react-dom/client'; // eslint-disable-line n/file-extension-in-import
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from './components/App/store';
import App from './components/App/App';
import './index.css';
import LogIn from './components/LogIn/log-in';
import SignUp from './components/SignUp/sign-up';
import { RoutesPaths } from './utills';
import ProtectedMain from './components/ProtectedComponent/instances/ProtectedMain';

const router = createBrowserRouter([
	{
		path: RoutesPaths.home,
		element: <App/>,
		children: [
			{
				path: RoutesPaths.home,
				element: <ProtectedMain/>,
			},
			{
				path: RoutesPaths.logIn,
				element: <LogIn/>,
			},
			{
				path: RoutesPaths.signUp,
				element: <SignUp/>,
			},
		],
	},
]);

ReactDOM.createRoot(document.querySelector('#root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router}/>
		</Provider>
	</React.StrictMode>,
);
