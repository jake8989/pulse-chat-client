import {
	Box,
	Container,
	Stack,
	InputGroup,
	InputLeftElement,
	Input,
	InputRightElement,
	Button,
} from '@chakra-ui/react';
import { EmailIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useToast } from '@chakra-ui/react';
interface formInput {
	user: { username: string; password: string };
}
export default function Login() {
	const router = useRouter();
	const toast = useToast();
	const [formData, setFormData] = useState<formInput>({
		user: {
			username: '',
			password: '',
		},
	});
	const handleSubmit = (event: any): void => {
		event.preventDefault();
		if (formData.user.username.trim() === '') {
			// alert('User name cannot be empty');
			toast({
				title: 'username',
				description: 'username cannot be empty',
				status: 'error',
				duration: 2000,
				isClosable: true,
			});
			return;
		}
		if (
			formData.user.password.trim() === '' ||
			formData.user.password.trim().length < 6
		) {
			// alert('password length should be 6');
			toast({
				title: 'Password',
				description: 'min length of the password should be 6',
				status: 'error',
				duration: 2000,
				isClosable: true,
			});
			return;
		}
		console.log(formData);
	};
	const handleChange = (event: any): void => {
		event.preventDefault();
		console.log('dp');
		setFormData({
			user: { ...formData.user, [event.target.name]: event.target.value },
		});
	};
	return (
		<form action="" id="form-data">
			<Container maxW="container.sm">
				<Box>
					<Stack spacing={4}>
						<InputGroup>
							<Input
								name="username"
								placeholder="Username"
								value={formData.user.username}
								required={true}
								onChange={handleChange}
							/>
						</InputGroup>

						<InputGroup>
							<Input
								required
								type="password"
								name="password"
								placeholder="Password"
								value={formData.user.password}
								onChange={handleChange}
							/>
						</InputGroup>
					</Stack>
				</Box>
				<Container>
					<Button
						mt={10}
						width={'100%'}
						colorScheme="teal"
						isLoading={false}
						onClick={handleSubmit}
						loadingText={'Logging..'}
					>
						Login
					</Button>
				</Container>
			</Container>
		</form>
	);
}
