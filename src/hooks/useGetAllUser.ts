import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
const useGetUser = () => {
	const [user, setUser] = useState<Object>({});
	const [loading, setLoading] = useState<Boolean>(false);
	const getUser = async () => {
		axios
			.get(`${process.env.NEXT_PUBLIC_BACKEND}/api/v1/users/get-userbyusername`)
			.then((response: AxiosResponse) => {
				console.log(response.data);
			});
	};
};
