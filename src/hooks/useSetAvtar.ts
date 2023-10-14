import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';
export const useSetAvtar = () => {
	const toast = useToast();
	const [loading, setLoading] = useState<Boolean>(false);
	const [error, setError] = useState<Boolean>(false);
	const [message, setMessage] = useState<string>('');
	const setAvatar = (avtar: string) => {
		console.log('Loading');
		setLoading(true);
	};
};
