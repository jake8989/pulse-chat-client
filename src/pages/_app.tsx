import '@/styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { extendTheme, Button } from '@chakra-ui/react';
// import Head from 'next/head';
import { UserProvider } from '@/context/UserContext';
// 2. Extend the theme to include custom colors, fonts, etc
import Head from 'next/head';
// import { Footer } from '@/components/footer';
const colors = {
	brand: {
		900: '#1a365d',
		800: '#153e75',
		700: '#2a69ac',
	},
};
const theme = extendTheme({ colors });
export default function App({ Component, pageProps }: AppProps) {
	return (
		<UserProvider>
			<div>
				<Head>
					<title>PulseChat</title>
				</Head>
			</div>
			<ChakraProvider theme={theme}>
				{/* <Head></Head> */}
				{/* <Button>Logout</Button> */}
				<Component {...pageProps} />
				{/* <Footer></Footer> */}
			</ChakraProvider>
		</UserProvider>
	);
}
