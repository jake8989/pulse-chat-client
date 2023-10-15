import React from 'react';
import { useRouter } from 'next/router';
// import { useAuthContext } from './useAuthContext';
export const useLogout = () => {
	const router = useRouter();
	// const { dispatch } = useAuthContext();
	const [isLoggedout, setisLoggedout] = React.useState(false);
	const logout = () => {
		localStorage.removeItem('user');
		// dispatch({ type: 'LOGOUT' });
		setisLoggedout(true);
		router.push('/');
	};
	return { logout, isLoggedout };
};
