import { RoutesPaths } from '../../../utils';
import Home from '../../Home/Home';
import ProtectedComponent from '../protected-component';

function ProtectedHome() {
	return (
		<ProtectedComponent fallback={RoutesPaths.signIn}>
			<Home />
		</ProtectedComponent>
	);
}

export default ProtectedHome;
