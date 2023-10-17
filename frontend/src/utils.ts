enum RoutesPaths {
	home = '/',
	logIn = '/signin',
	signUp = '/signup',
}
function isSuccessCode(status: number) {
	if (status >= 200 && status < 300) {
		return true;
	}

	return false;
}

export { RoutesPaths, isSuccessCode };
