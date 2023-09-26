import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { type RootState, type AppDispatch } from '../components/App/store';

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useAppDispatch, useAppSelector };

// React redux has hooks and typescript has types that say how those types work,
// but those hooks dont know anyhting about the specific states or the different,
// dispatch capabilities of our application it is best to create predefined versions
// of those hooks that already know the right types for our state and our dispatch.
