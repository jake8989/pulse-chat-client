import React, { useState } from 'react';
import { useRouter } from 'next/router';
// import { useAuthContext } from './useAuthContext';
import { useUser } from '@/context/UserContext';
import { BooleanLiteral } from 'typescript';
export const useLogout = () => {
	const router = useRouter();
	// const { dispatch } = useAuthContext();
	const { logoutUser } = useUser();
	const [loggedOut, setLoggedOut] = useState<Boolean>(Boolean(false));
	const logout = () => {
		logoutUser();
	};
	return { logout, loggedOut };
};
