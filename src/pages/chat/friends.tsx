import { useUser } from '@/context/UserContext';
import {
	Heading,
	Box,
	Text,
	Container,
	Tabs,
	Tab,
	TabPanels,
	TabPanel,
	TabList,
	Avatar,
} from '@chakra-ui/react';
import { Input, Button } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import { useToast } from '@chakra-ui/react';
import useGetUser from '@/hooks/useGetAllUser';
import { Search2Icon } from '@chakra-ui/icons';
import { Spinner } from '@chakra-ui/react';
// import { useUser } from '@/context/UserContext';
import { useLogout } from '@/hooks/useLogout';
import DrawerExample from '@/components/drawer';
import cookie from 'js-cookie';
import { useToast } from '@chakra-ui/react';
import Chat from '@/components/Chat';
import socket from '@/socket-manager/socket';
const Friends = () => {
	const router = useRouter();
	const { user, logoutUser } = useUser();
	const { logout } = useLogout();
	const toast = useToast();
	let [currentChat, setCurrentChat] = useState<string>('');
	let [currentFriend, setCurrentFriend] = useState<string>('');
	let [currentFriendUsername, setCurrentFriendUsername] = useState<string>('');
	const handleLogout = () => {
		logout();
	};
	const handleChatSelection = (chatId: string) => {
		setCurrentChat(chatId);
		cookie.set('chat_selected', chatId, { expires: 7 });
		// console.log(currentChat);
	};
	const handleSetCurrentFriend = (
		friend_id: string,
		friend_username: string
	) => {
		setCurrentFriend(friend_id);
		setCurrentFriendUsername(friend_username);
	};

	const user_id = cookie.get('user_id');
	// useEffect(() => {
	// 	socket.emit('addUser', user_id);
	// 	socket.on('getUsers', (users) => {
	// 		console.log(users);
	// 	});
	// }, [user_id]);
	useEffect(() => {
		const url = cookie.get('user_step');
		const id = cookie.get('chat_selected');
		const currentFriend = cookie.get('current_friend');
		const currentFriendUsername = cookie.get('current_friend_username');
		if (id) {
			setCurrentChat(id);
		}
		if (currentFriend) {
			setCurrentFriend(currentFriend);
		}
		if (currentFriendUsername) {
			setCurrentFriendUsername(currentFriendUsername);
		}

		if (!url) {
			toast({
				title: 'Error',
				description: `User Not Logged In`,
				status: 'error',
				duration: 1000,
				isClosable: true,
			});
			router.push('/');
		}
	}, []);
	return (
		<>
			<Heading textAlign={'center'} mt={'30px'}>
				PulseChat
				{/* <Box> */}
				<Box position={'absolute'} right={'10px'}>
					<Button colorScheme="teal" onClick={() => router.push('/chat/')}>
						Go To Dashboard
					</Button>

					<Button ml={'10px'} onClick={handleLogout}>
						Logout
					</Button>
				</Box>
				{/* </Box> */}
			</Heading>
			<Text>
				<DrawerExample
					onChatSelected={handleChatSelection}
					onFriendSelected={handleSetCurrentFriend}
				></DrawerExample>
			</Text>
			<Box>
				{currentChat ? (
					<Chat
						chatId={currentChat}
						currentFriend={currentFriend}
						currentFriendUsername={currentFriendUsername}
					></Chat>
				) : (
					<Text textAlign={'center'} fontSize={'18px'} mt={'10px'}>
						Start Chatting With Your Friends 😎🙌
					</Text>
				)}
			</Box>
		</>
	);
};
export default Friends;
