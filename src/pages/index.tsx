import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { Heading, Text, Container } from '@chakra-ui/react';
import { LinkIcon } from '@chakra-ui/icons';
import User from '@/components/user';
import LoadingScreen from '@/components/loadinScreen';
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	return (
		<>
			<main>
				<div>
					<Head>
						<title>PulseChat</title>
					</Head>
				</div>
				<Container mt={7}>
					<Heading textAlign={'center'}>
						PulseChat <LinkIcon w={6} h={6}></LinkIcon>{' '}
					</Heading>
					<Text textAlign={'center'}>Chat in groups or with friend's</Text>
				</Container>
				<Container mt={20}>
					<User></User>
				</Container>
				<LoadingScreen></LoadingScreen>
			</main>
		</>
	);
}
