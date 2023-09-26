import { RoutesPaths } from '../../../utills';
import Main from '../../Main/Main';
import ProtectedComponent from '../ProtectedComponent';

function ProtectedMain() {
	return (
		<ProtectedComponent component={<Main/>} fallback={RoutesPaths.logIn}/>
	);
}

export default ProtectedMain;
