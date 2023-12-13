import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { RoutesPaths } from '../../utils';
import { useAppSelector } from '../../hooks/hooks-redux';
import { useLogOutMutation } from '../../features/app-data-api/app-data-api-slice';
import ProcessLoadingBar from '../ProcessLoadingBar/process-loading-bar';
import logo from './header-images/logo.svg'; // eslint-disable-line n/file-extension-in-import

const enum AuthButtonText {
	signIn = 'Log in',
	logOut = 'Log out',
	signUp = 'Sign up',
}

interface AuthButtonOptions {
	route: RoutesPaths;
	text: AuthButtonText;
}

const breakpoint = 650;

const enum PageState {
	largeScreen = 1,
	smallScreenAndAtHome,
	smallScreenAndAtAuthPage,
}

export default function Header() {
	const location = useLocation();

	return (
		<header
			className={`header ${
				location.pathname === RoutesPaths.home ? 'header_small-screen_home' : ''
			}`}
		>
			<img src={logo} alt="Around the U.S. logo" className="header__logo" />
			<SessionMenu />
		</header>
	);
}

function SessionMenu() {
	const [pageState, setPageState] = useState<PageState>();
	const [isBurgerMenuActive, setIsBurgerMenuActive] = useState(false);

	const currentUserEmail = useAppSelector((state) => state.currentUser.email);
	const location = useLocation();

	const toggleBurgerMenuState = useCallback(() => {
		setIsBurgerMenuActive((prevState) => !prevState);
	}, []);

	const checkPageState = useCallback(() => {
		const isLargeScreen = window.innerWidth > breakpoint;
		const isAtHome = location.pathname === RoutesPaths.home;

		if (isLargeScreen) {
			setPageState(PageState.largeScreen);
		} else if (isAtHome) {
			setPageState(PageState.smallScreenAndAtHome);
		} else {
			setPageState(PageState.smallScreenAndAtAuthPage);
		}
	}, [location.pathname]);

	useEffect(() => {
		checkPageState();
		window.addEventListener('resize', checkPageState);
		return () => window.removeEventListener('resize', checkPageState);
	}, [checkPageState]);

	return (
		<>
			<div
				className={`header__session-toolbar ${
					pageState === PageState.smallScreenAndAtHome
						? 'header__session-toolbar_burger-menu'
						: ''
				} ${
					isBurgerMenuActive && pageState === PageState.smallScreenAndAtHome
						? 'header__session-toolbar_burger-menu_visible'
						: ''
				}`}
			>
				<p className="header__user-email">{currentUserEmail}</p>
				<AuthButton />
			</div>
			{pageState !== PageState.largeScreen && (
				<button
					type="button"
					className={`header__burger-menu
                        ${
													pageState === PageState.smallScreenAndAtHome
														? 'header__burger-menu_visible'
														: ''
												}
                    `}
					onClick={toggleBurgerMenuState}
				/>
			)}
		</>
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
						route: RoutesPaths.signIn,
						text: AuthButtonText.signIn,
					};
				}

				case RoutesPaths.signIn: {
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
						navigate(RoutesPaths.signIn);
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
