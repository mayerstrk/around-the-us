import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Page from '../Page/Page';
import ErrorPopup from '../ErrorPopup/ErrorPopup';
import useTokenAuthentication from '../../hooks/jwt-log-in/useTokenAuthentication';

function App() {
	const { setToken, register, logOut } = useTokenAuthentication();

	return (
		<div className='app'>
			<Page>
				<Header logOut={logOut}/>
				<Outlet context={{ setToken, register } as { setToken: typeof setToken; register: typeof register }}/>
				<Footer/>
			</Page>
			<ErrorPopup/>
		</div>
	);
}

export default App;
