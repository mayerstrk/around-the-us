
import { Link } from 'react-router-dom';
import { RoutesPaths } from '../../utills';
import { useAppSelector } from '../../hooks/hooks-redux';
import logo from './Header__images/logo.svg';

const enum AuthButtonText {
	logIn = 'Log in',
	logOut = 'Log out',
	register = 'Sign up',
}

interface HeaderProps {
	logOut: () => void;
}

interface AuthButtonProps {
	logOut: () => void;
}

export default function Header({ logOut }: HeaderProps) {
	const currentUserEmail = useAppSelector(state => state.userAuthenticationData.data.email);
	return (
		<header className='header'>
			<img src={logo} alt='Around the U.S. logo' className='header__logo' />
			<div className='header__session-toolbar'>
				<p className='header__user-email'>
					{currentUserEmail}
				</p>
				<AuthButton logOut={logOut} />
			</div>
		</header>
	);
}

function AuthButton({ logOut }: AuthButtonProps) {
	const isUserAuthorized = useAppSelector(state => state.userAuthenticationData.isAuthorized);
	const routerLinkOptions
		= location.pathname === RoutesPaths.signUp
			? {
				route: RoutesPaths.logIn,
				text: AuthButtonText.logIn,
			}
			: {
				route: RoutesPaths.signUp,
				text: AuthButtonText.register,
			};

	return (
		// eslint-disable-next-line operator-linebreak
		isUserAuthorized ?
			<button
				type='button'
				className='header__button_logout'
				onClick={() => {
					logOut();
				}}
			>
				{AuthButtonText.logOut}
			</button>
			: <Link to={routerLinkOptions.route} className='header__link_auth'>{routerLinkOptions.text}</Link>
	);
}
