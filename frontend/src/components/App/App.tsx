import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Page from '../Page/Page';
import ErrorPopup from '../ErrorPopup/ErrorPopup';
import Main from '../Main/Main';

function App() {
	return (
		<div className="app">
			<Page>
				<Header />
				<Main>
					<Outlet />
				</Main>
				<Footer />
			</Page>
			<ErrorPopup />
		</div>
	);
}

export default App;
