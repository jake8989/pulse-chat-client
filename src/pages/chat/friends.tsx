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
// import { useUser } from '@/context/UserContext';
import { useLogout } from '@/hooks/useLogout';
import DrawerExample from '@/components/drawer';
const Friends = () => {
	const router = useRouter();
	const { user, logoutUser } = useUser();
	const { logout } = useLogout();
	const handleLogout = () => {
		logout();
	};
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
				<DrawerExample></DrawerExample>
			</Text>
		</>
	);
};
export default Friends;
