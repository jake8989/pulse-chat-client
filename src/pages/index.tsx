import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { Heading, Text, Container } from '@chakra-ui/react';
import { LinkIcon } from '@chakra-ui/icons';
import User from '@/components/user';
import LoadingScreen from '@/components/loadinScreen';
const inter = Inter({ subsets: ['latin'] });
import { AiOutlineWechat } from 'react-icons/ai';
import { Footer } from '@/components/footer';
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
					<Heading textAlign={'center'}>PulseChat</Heading>
					{/* <Text textAlign={'center'}>Chat in groups with friend's</Text> */}
				</Container>
				<Container mt={20}>
					<User></User>
				</Container>
				{/* <LoadingScreen></LoadingScreen> */}
				<Footer></Footer>
			</main>
		</>
	);
}
