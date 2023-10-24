import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Button,
	Input,
	useDisclosure,
	Box,
	Avatar,
	Text,
	Spinner,
} from '@chakra-ui/react';
import React from 'react';
import useGetFriends from '@/hooks/useGetFriends';
function DrawerExample() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = React.useRef<HTMLButtonElement | null>(null);
	const { getFriends, loadingI, usersFriends } = useGetFriends();
	React.useEffect(() => {
		const hd = async () => {
			await getFriends();
		};
		hd();
	}, []);
	console.log(usersFriends);
	if (loadingI) {
		<Spinner></Spinner>;
	}
	return (
		<>
			<Button
				ref={btnRef}
				colorScheme="teal"
				onClick={onOpen}
				m={'10px'}
				width={'20%'}
				// _fullScreen={}
			>
				Friends
			</Button>
			<Drawer
				isOpen={isOpen}
				placement="left"
				onClose={onClose}
				finalFocusRef={btnRef}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>My Friends</DrawerHeader>

					<DrawerBody>
						{usersFriends.map((friend) => (
							<Box
								border={'1px solid teal'}
								borderRadius={'lg'}
								mt={'14px'}
								padding={'6px'}
								key={friend._id}
								display={'flex'}
								flexDirection={'row'}
								// overflow={'hidden'}
							>
								<Box>
									{' '}
									<Avatar src={`${friend.friendProfile}`}></Avatar>
									{/* <Avatar src={`${invitation.sender_profile}`}></Avatar> */}
								</Box>
								<Box ml={'20px'}>
									<Text fontSize={'14px'} color="teal">
										Username: <strong>{friend.friendUsername}</strong>
									</Text>
									<Text fontSize={'14px'} color="teal">
										Email: <strong>{friend.friendEmail}</strong>
									</Text>
								</Box>

								{/* <Text fontSize={'10px'}>
                        {' '}
                        Status: <strong color="teal">PENDING</strong>{' '}
                     </Text> */}
							</Box>
						))}
					</DrawerBody>

					<DrawerFooter>
						<Button colorScheme="blue" onClick={onClose}>
							Close
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
}
export default DrawerExample;
