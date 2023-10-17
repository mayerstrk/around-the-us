import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { RoutesPaths } from '../../utils';
import { useAppSelector } from '../../hooks/hooks-redux';
import { useLogOutMutation } from '../../features/app-data-api/app-data-api-slice';
import ProcessLoadingBar from '../ProcessLoadingBar/ProcessLoadingBar';
import logo from './header-images/logo.svg'; // eslint-disable-line n/file-extension-in-import

const enum AuthButtonText {
	logIn = 'Log in',
	logOut = 'Log out',
	signUp = 'Sign up',
}

interface AuthButtonOptions {
	route: RoutesPaths;
	text: AuthButtonText;
}

export default function Header() {
	const currentUserEmail = useAppSelector((state) => state.currentUser.email);

	return (
		<header className="header">
			<img src={logo} alt="Around the U.S. logo" className="header__logo" />
			<div className="header__session-toolbar">
				<p className="header__user-email">{currentUserEmail}</p>
				<AuthButton />
			</div>
		</header>
	);
}

function AuthButton() {
	const [authButtonOptions, setAuthButtonOptions] = useState<AuthButtonOptions>(
		{} as AuthButtonOptions,
	);
	const [logOut, { isLoading: isLogOutLoading }] = useLogOutMutation();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const authButtonOptions = (() => {
			switch (location.pathname) {
				case RoutesPaths.signUp: {
					return {
						route: RoutesPaths.logIn,
						text: AuthButtonText.logIn,
					};
				}

				case RoutesPaths.logIn: {
					return {
						route: RoutesPaths.signUp,
						text: AuthButtonText.signUp,
					};
				}

				default: {
					return {
						route: RoutesPaths.home,
						text: AuthButtonText.logOut,
					};
				}
			}
		})();

		setAuthButtonOptions(authButtonOptions);
	}, [location]);

	return (
		<>
			{isLogOutLoading && <ProcessLoadingBar />}

			{location.pathname === RoutesPaths.home ? (
				<button
					type="button"
					className="header__button_logout"
					onClick={() => {
						logOut();
						navigate(RoutesPaths.logIn);
					}}
				>
					{AuthButtonText.logOut}
				</button>
			) : (
				<Link to={authButtonOptions.route} className="header__link_auth">
					{authButtonOptions.text}
				</Link>
			)}
		</>
	);
}
