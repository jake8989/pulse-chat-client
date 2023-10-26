import { Main } from 'next/document';
import React, { useEffect } from 'react';
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Text,
	Box,
	Avatar,
	Spinner,
} from '@chakra-ui/react';
import { Button, Input } from '@chakra-ui/react';
import { ChakraProvider, CSSReset, extendTheme } from '@chakra-ui/react';
import cookies from 'js-cookie';
import useGetChats from '@/hooks/useGetChats';
import chatStyles from '../styles/ChatBox.module.css';
import { useRef } from 'react';
const customTheme = extendTheme({
	styles: {
		global: {
			'::-webkit-scrollbar': {
				width: '2px',
			},
			'::-webkit-scrollbar-thumb': {
				backgroundColor: 'teal.500', // Color of the thumb
				borderRadius: 'full',
			},
		},
	},
});
interface chatProps {
	chatId: string;
}
const Chat: React.FC<chatProps> = ({ chatId }) => {
	const { getChats, messages, loading } = useGetChats();
	useEffect(() => {
		console.log(chatId);
	}, [chatId]);
	useEffect(() => {
		const chats = async () => {
			await getChats(chatId);
		};
		chats();
	}, [chatId]);
	if (loading) {
		return <Spinner></Spinner>;
	}
	return (
		<ChakraProvider theme={customTheme}>
			<Box display={'flex'} justifyContent={'center'} mt={'50px'}>
				<Card width={'84%'} maxHeight={'500px'} overflowY={'scroll'}>
					<Text textAlign={'center'} fontSize={'12px'}>
						{' '}
						ChatId: {chatId}
					</Text>
					<CardBody>
						{/* <Text>Hii</Text>
					<Text>Hii</Text>
					<Text>Hii</Text>
					<Text>Hii</Text>
					<Text>Hii</Text>
					<Text>Hii</Text>
					<Text>Hii</Text>
					<Text>Hii</Text>
					<Text>Hii</Text>
					<Text>Hii</Text>
					<Text>Hii</Text>
					<Text>Hii</Text>
					<Text>Hii</Text> */}
						<Box display={'flex'} flexDirection={'column'}>
							{/* {loading && <Spinner></Spinner>} */}
							{messages.map((message) => (
								<Card
									className={
										message.sender !== cookies.get('user_id')
											? chatStyles.receiveMessage
											: chatStyles.sentMessage
									}
								>
									<Text fontSize={'8px'}>{message.senderUsername}</Text>
									<Text fontSize={'16px'} textAlign={'left'}>
										{message.content}
									</Text>
								</Card>
							))}
						</Box>
					</CardBody>
				</Card>
			</Box>
			<Box
				width={'100%'}
				display={'flex'}
				mb={'10px'}
				mt={'5px'}
				justifyContent={'center'}
				alignItems={'center'}
				flexDirection={'row'}
			>
				<Box
					width={'80%'}
					display={'flex'}
					flexDirection={'row'}
					justifyContent={'center'}
				>
					<Input placeholder="Type Message..."></Input>
					<Button>Send</Button>
				</Box>
			</Box>
		</ChakraProvider>
	);
};

export default Chat;
