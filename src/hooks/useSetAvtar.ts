import { useToast } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
// import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { useUser } from '@/context/UserContext';
export const useSetAvtar = () => {
	const toast = useToast();
	const [loading, setLoading] = useState<Boolean>(false);
	const [error, setError] = useState<Boolean>(false);
	const [message, setMessage] = useState<string>('');
	const router = useRouter();
	const { user } = useUser();
	// const user = useContext(AuthContext);
	// const user;
	// console.log('from the setAvtar', user);
	useEffect(() => {
		if (user == null) {
			setLoading(true);
		} else setLoading(false);
	}, [user]);
	let username = user?.user;
	console.log(username);
	const setAvatar = async (profile: string) => {
		console.log('Loading');
		setLoading(true);

		const postData = {
			profile: profile,
			username: 'user',
		};
		console.log('postData', postData);
		axios
			.put(
				`${process.env.NEXT_PUBLIC_BACKEND}/api/v1/users/set-avtar`,
				postData
			)
			.then((response: AxiosResponse) => {
				console.log('Success\n');
				setLoading(false);
				setError(false);
				console.log(response.data);
				toast({
					title: 'Sucess',
					description: `${response.data.message}`,
					status: 'success',
					duration: 2000,
					isClosable: true,
				});
				router.push('/chat');
			})
			.catch((error: any) => {
				console.log('fail\n');
				setError(true);
				setLoading(false);
				if (!error.response) {
					toast({
						title: 'Failure',
						description: `Server not working`,
						status: 'error',
						duration: 2000,
						isClosable: true,
					});
					return;
				}
				toast({
					title: 'Failure',
					description: `${error.response.data.message}`,
					status: 'error',
					duration: 2000,
					isClosable: true,
				});
			});
	};
	return { setAvatar, loading, error };
};