import { useUser } from '@/context/UserContext';
import { Heading, Box, Text } from '@chakra-ui/react';
import { Input, Button } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useToast } from '@chakra-ui/react';
export default function Chat() {
	const router = useRouter();
	const toast = useToast();
	const { user } = useUser();
	useEffect(() => {
		if (typeof window !== 'undefined') {
			if (user?.step !== '/chat') {
				toast({
					title: 'Loading...',
					description: `First Select Profile Image!`,
					status: 'warning',
					duration: 1000,
					isClosable: true,
				});
				router.push('/dashboard');
			}
		}
	}, []);
	return (
		<>
			<Heading textAlign={'center'} mt={'30px'}>
				PulseChat
			</Heading>
			<Box className="chat-container" display={'flex'} padding={'30px'}>
				<Box
					className="search-func"
					flex={'3'}
					height={'100%'}
					// background={'orange.400'}
				>
					<Text ml={'20px'} fontSize={'18px'}>
						Search User With Username
					</Text>
					<Box mt={'40px'} display={'flex'} flexDirection={'row'} width={'70%'}>
						<Input placeholder="search user"></Input>
						<Button ml={'10px'}>Search</Button>
					</Box>
					<Box
						className="Showing User"
						width={'60%'}
						// background={'teal'}
						border={'1px solid black'}
						borderRadius={'lg'}
						mt={'40px'}
					>
						<Box
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
						</Box>
					</Box>
					<Box>
						<Heading fontSize={'12px'} color={'red'}>
							No user Found!{' '}
						</Heading>
					</Box>
				</Box>
				<Box className="chat-func" flex={'6'}>
					Chat
				</Box>
				<Box className="menu-func" flex={'3'}>
					Menu
				</Box>
			</Box>
		</>
	);
}
