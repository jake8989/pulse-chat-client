import { Main } from 'next/document';
import React, { ChangeEvent, useEffect, useState } from 'react';
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
import axios from 'axios';
import cookie from 'js-cookie';
import { useToast } from '@chakra-ui/react';
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
	const toast = useToast();
	const [newMessage, setNewMessage] = useState<string>('');
	const [ll, setLL] = useState<boolean>(false);
	useEffect(() => {
		console.log(chatId);
	}, [chatId]);
	useEffect(() => {
		const chats = async () => {
			await getChats(chatId);
		};
		chats();
	}, [chatId]);
	const messageHandler = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		setNewMessage(event.target.value);
	};
	const messageSendButtonHandler = async (event: React.FormEvent) => {
		event.preventDefault();
		if (newMessage.trim() === '') {
			toast({
				title: 'Warning',
				description: `Empty Message`,
				status: 'warning',
				duration: 2000,
				isClosable: false,
			});
			return;
		}
		const postData = {
			chatId: chatId,
			content: newMessage,
		};
		setLL(true);
		try {
			const result = await axios.post(
				`${process.env.NEXT_PUBLIC_BACKEND}/auth/v1/chat/save-chat`,
				postData,
				{
					headers: {
						Authorization: `Bearer ${cookie.get('token')}`,
					},
				}
			);
			setLL(false);
			setNewMessage('');
			await getChats(chatId);
			console.log(result.data);
		} catch (error) {
			setNewMessage('');
			setLL(false);
			console.log(error);
		}
	};
	const chatRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (chatRef.current) {
			chatRef.current.scrollTop = chatRef.current.scrollHeight;
		}
	}, [messages]);

	return (
		<ChakraProvider theme={customTheme}>
			<Box display={'flex'} justifyContent={'center'} mt={'20px'}>
				<Card
					width={'84%'}
					maxHeight={'500px'}
					overflowY={'scroll'}
					ref={chatRef}
				>
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
					<Input
						placeholder="Type Message..."
						onChange={messageHandler}
						value={newMessage}
					></Input>
					<Button onClick={messageSendButtonHandler} isLoading={ll}>
						{' '}
						Send
					</Button>
				</Box>
			</Box>
		</ChakraProvider>
	);
};

export default Chat;
