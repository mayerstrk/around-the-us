import { RoutesPaths } from '../../../utills';
import Home from '../../Home/Home';
import ProtectedComponent from '../ProtectedComponent';

function ProtectedHome() {
	return (
		console.log('ProtectedHome rendered'),
		(
			<ProtectedComponent fallback={RoutesPaths.logIn}>
				<Home />
			</ProtectedComponent>
		)
	);
}

export default ProtectedHome;
