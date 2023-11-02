import { RoutesPaths } from '../../../utils';
import Home from '../../Home/Home';
import ProtectedComponent from '../protected-component';

function ProtectedHome() {
	return (
		console.log('ProtectedHome rendered'),
		(
			<ProtectedComponent fallback={RoutesPaths.signIn}>
				<Home />
			</ProtectedComponent>
		)
	);
}

export default ProtectedHome;
