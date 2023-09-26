import { useOutletContext } from 'react-router-dom';
import { type TokenAuthenticationMethods } from './jwt-log-in/useTokenAuthentication';

const useAppOutletContext = useOutletContext<TokenAuthenticationMethods>;

export { useAppOutletContext };
