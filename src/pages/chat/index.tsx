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
import { useToast } from '@chakra-ui/react';
import useGetUser from '@/hooks/useGetAllUser';
import { Search2Icon } from '@chakra-ui/icons';
import { Spinner } from '@chakra-ui/react';
// interface User {}
import useGetAllSentInvitations from '@/hooks/useGetAllSentInvitations';
import useGetAllreceivedInvitation from '@/hooks/useGetAllreceivedInvitation';
import useCreateInvite from '@/hooks/useCreateInvite';
import SentInvitations from '@/components/sentInvitaions';
import ReceivedInvitations from '@/components/receivedinvitaions';
import { useLogout } from '@/hooks/useLogout';
import cookie from 'js-cookie';
export default function Chat() {
	const router = useRouter();
	const toast = useToast();
	const [counter, setCounter] = useState<number>(0);
	const [serachUser, setsearchUser] = useState<string>('');
	const { user } = useUser();
	let { getUser, loading, ruser } = useGetUser();
	let { createInvite, loadingI } = useCreateInvite();
	let { GetAllSentInvitations, sentInvitaions, loadingII } =
		useGetAllSentInvitations();
	let { GetAllreceivedInvitations, receivedInvitaions, loadingIII } =
		useGetAllreceivedInvitation();
	let { logout } = useLogout();
	// useEffect(() => {
	// 	if (typeof window !== 'undefined') {
	// 		if (user?.step !== '/chat') {
	// 			toast({
	// 				title: 'Loading...',
	// 				description: `First Select Profile Image!`,
	// 				status: 'warning',
	// 				duration: 1000,
	// 				isClosable: true,
	// 			});
	// 			router.push('/dashboard');
	// 		}
	// 	}
	// }, []);
	useEffect(() => {
		const url = cookie.get('user_step');
		if (url) {
			router.push(url);
		} else {
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
	useEffect(() => {
		const hd = async () => {
			await GetAllSentInvitations();
		};
		const hd1 = async () => {
			await GetAllreceivedInvitations();
		};
		hd();
		hd1();
	}, [counter]);
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		const vl = event.target.value.trim();
		console.log(vl);
		setsearchUser((prevUserName) => vl);
		console.log(serachUser);
	};
	const handleClick = async (event: React.FormEvent) => {
		event.preventDefault();
		if (serachUser.trim() === '') {
			toast({
				title: 'Error',
				description: 'Username Cannot be empty',
				status: 'error',
				duration: 2000,
				isClosable: true,
			});
			return;
		}
		// setsearchUser('');
		await getUser(serachUser);
	};
	const getListAndCreateInvitaion = async () => {
		await createInvite(ruser._id);
		await GetAllSentInvitations();
		setCounter((prev) => prev + 1);
	};
	const handleLogout = () => {
		logout();
	};
	// console.log(user);
	return (
		<>
			<Heading textAlign={'center'} mt={'30px'}>
				PulseChat
				{/* <Box> */}
				<Box position={'absolute'} right={'10px'}>
					<Button
						colorScheme="teal"
						onClick={() => router.push('/chat/friends')}
					>
						Go To Friends
					</Button>
					<Button ml={'10px'} colorScheme="teal">
						{user?.user}
					</Button>
					<Button ml={'10px'} onClick={handleLogout}>
						Logout
					</Button>
				</Box>
				{/* </Box> */}
			</Heading>
			<Box
				className="chat-container"
				display={'flex'}
				padding={'30px'}
				flexWrap={'wrap'}
			>
				<Box
					className="search-func"
					flex={'2'}
					// width={'45%'}
					height={'100%'}
					// background={'orange.400'}
				>
					<Text mt={'40px'} fontSize={'20px'}>
						Search User With Username
					</Text>
					<Box
						mt={'40px'}
						display={'flex'}
						flexDirection={'row'}
						// width={'70%'}
						// as="form"
					>
						<Input
							placeholder="search user..."
							onChange={handleChange}
							value={serachUser}
							name="input-user"
							type="text"
						></Input>
						<Button ml={'10px'} onClick={handleClick}>
							Search
						</Button>
					</Box>
					<Box
						className="Showing User"
						// width={'60%'}
						// background={'teal'}
						// border={'1px solid black'}
						borderRadius={'lg'}
						mt={'40px'}
					>
						{/* <Box
							height={'50px'}
							padding={'5px'}
							display={'flex'}
							flexDirection={'row'}
						>
							<Image
								src="/favicon.ico"
								boxSize={'40px'}
								borderRadius={'full'}
							></Image>
							<Heading fontSize={'20px'} textAlign={'center'} padding={'5px'}>
								UserName
								<Text padding={'2px'} fontSize={'9px'}>
									Email jpcc@gmail.com
								</Text>
							</Heading>
						</Box> */}
						{loading ? (
							<Spinner></Spinner>
						) : (
							<Box>
								{ruser.username && (
									<Box
										// height={'50px'}
										padding={'5px'}
										display={'flex'}
										flexDirection={'row'}
										border={'0.5px solid teal'}
										borderRadius={'lg'}
									>
										<Avatar
											src={`${ruser.profile}`}
											// boxSize={'0px'}
											// borderRadius={'full'}
										></Avatar>
										<Heading
											fontSize={'20px'}
											textAlign={'center'}
											padding={'5px'}
										>
											{ruser.username}
											<Text padding={'2px'} fontSize={'9px'}>
												Email :{ruser.email}
											</Text>
											<Text padding={'2px'} fontSize={'9px'}>
												User Id :{ruser._id}
											</Text>
										</Heading>
										<Box display={'flex'}>
											<Button
												colorScheme={'teal'}
												onClick={getListAndCreateInvitaion}
												isLoading={Boolean(loadingI)}
											>
												Send Invite{' '}
											</Button>
										</Box>
									</Box>
								)}
							</Box>
						)}
					</Box>
					{/* <Box>
						<Heading fontSize={'12px'} color={'red'}>
							No user Found!{' '}
						</Heading>
					</Box> */}
				</Box>
				<Box
					className="search-func"
					flex={'3'}
					height={'100%'}
					justifyContent={'flex-end'}
					mt={'40px'}
					// background={'orange.400'}
				>
					<Text fontSize={'20px'} textAlign={'center'}>
						Invitaions
					</Text>
					<Container mt={'20px'}>
						<Tabs variant="soft-rounded" colorScheme="green" isFitted>
							<TabList>
								<Tab>Sent Invitations</Tab>
								<Tab>received Invitaions</Tab>
							</TabList>

							<TabPanels>
								<TabPanel>
									<SentInvitations
										sentInvitaions={sentInvitaions}
										loadingI={Boolean(loadingII)}
										key={counter}
									></SentInvitations>
								</TabPanel>
								<TabPanel>
									<ReceivedInvitations key={counter}></ReceivedInvitations>
								</TabPanel>
							</TabPanels>
						</Tabs>
					</Container>
				</Box>
			</Box>
		</>
	);
}
