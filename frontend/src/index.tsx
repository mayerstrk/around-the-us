import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from './components/App/store';
import App from './components/App/App';
import './index.css'; // eslint-disable-line n/file-extension-in-import
import SignIn from './components/SignIn/sign-in';
import SignUp from './components/SignUp/sign-up';
import { RoutesPaths } from './utils';
import ProtectedHome from './components/ProtectedComponent/instances/ProtectedHome';
import AuthErrorPopup from './components/PopupAuthError/auth-error-popup';
import RegisterSuccessPopup from './components/RegisterSuccessPopup/RegisterSuccessPopup';

const router = createBrowserRouter([
	{
		path: RoutesPaths.home,
		element: <App />,
		children: [
			{
				path: RoutesPaths.home,
				// A protected component has a fallbakc component that is rendered if the user is not authorized
				element: <ProtectedHome />,
			},
			{
				path: RoutesPaths.signIn,
				element: (
					<SignIn>
						<AuthErrorPopup />
						<RegisterSuccessPopup />
					</SignIn>
				),
			},
			{
				path: RoutesPaths.signUp,
				element: (
					<SignUp>
						<AuthErrorPopup />
					</SignUp>
				),
			},
		],
	},
]);

createRoot(document.querySelector('#root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>,
);
