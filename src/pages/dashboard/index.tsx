import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import {
	Heading,
	Text,
	Container,
	Button,
	Box,
	useStatStyles,
} from '@chakra-ui/react';
import { LinkIcon } from '@chakra-ui/icons';
import User from '@/components/user';
const inter = Inter({ subsets: ['latin'] });
import { BiUser } from 'react-icons/bi';
import { ChangeEvent, useState } from 'react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
export default function dashBoard() {
	const [preview, setPreview] = useState<string>('');
	const [avtar, setAvtar] = useState<any>();
	const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		if (event.target.files === null) {
			return;
		}
		const file = event.target.files[0];
		if (file.size > 1024 * 100) {
			return alert('File size greater than 100KB');
		}
		console.log(event.target.files[0]);
		let reader = new FileReader();
		reader.readAsDataURL(file);
		setPreview(URL.createObjectURL(file));
		reader.onload = () => {
			console.log(reader.result);
			setAvtar(reader.result);
		};
		reader.onerror = () => {
			console.log(reader.error?.message);
			return alert('Error In converting File into Base 64');
		};
	};
	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
	};
	return (
		<>
			<main>
				<Heading textAlign={'center'} mt={20}>
					Choose Your Avtar
					<Button ml={5}>
						<BiUser></BiUser>
					</Button>
				</Heading>
				<Container mt={90}>
					<Text>Upload Your Avtar. </Text>
					<Box mt={8}>
						<img
							alt="Preview"
							className={styles.img}
							src={preview ? preview : '/favicon.ico'}
							style={{ height: '150px', width: '150px' }}
						></img>
						<Box mt={20} onSubmit={handleSubmit}>
							<label htmlFor="preview">
								{/* upload */}
								<input
									id="preview"
									name="preview"
									accept="image/*"
									hidden
									multiple
									type="file"
									onChange={(e) => {
										handleImage(e);
									}}
								/>
								<Button
									colorScheme="teal"
									m={'auto'}
									as={'span'}
									cursor={'pointer'}
								>
									Upload
								</Button>
								<Button
									ml={9}
									colorScheme="teal"
									onClick={() => {
										setPreview('');
									}}
								>
									Remove
								</Button>
							</label>
						</Box>
					</Box>
					<Button
						colorScheme="teal"
						mt={17}
						rightIcon={<ArrowForwardIcon />}
						onClick={handleSubmit}
						type="submit"
						isLoading={true}
					>
						Continue
					</Button>
				</Container>
			</main>
		</>
	);
}
