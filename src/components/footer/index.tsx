import {
	ButtonGroup,
	Container,
	IconButton,
	Stack,
	Text,
} from '@chakra-ui/react';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';

export const Footer = () => (
	<Container as="footer" role="contentinfo" py={{ base: '12', md: '16' }}>
		<Stack spacing={{ base: '4', md: '5' }}>
			<Stack justify="space-between" direction="row" align="center">
				{/* <Logo /> */}
				<Text fontSize={'22px'}>
					Pulse
					<span color={'teal'} style={{ fontSize: '22px', color: 'teal' }}>
						<strong>Chat</strong>
					</span>{' '}
				</Text>
				<ButtonGroup variant="tertiary">
					<IconButton
						as="a"
						href="https://www.linkedin.com/in/jayant-dhakad-8a5517233/"
						fontSize={'20px'}
						aria-label="LinkedIn"
						icon={<FaLinkedin />}
					/>
					<IconButton
						as="a"
						href="https://github.com/jake8989"
						aria-label="GitHub"
						fontSize={'20px'}
						icon={<FaGithub />}
					/>
					<IconButton
						as="a"
						href="https://www.instagram.com/_j.yant/"
						aria-label="Instagram"
						fontSize={'20px'}
						icon={<FaInstagram />}
					/>
				</ButtonGroup>
			</Stack>
			<Text fontSize="sm" color="fg.subtle">
				&copy; {new Date().getFullYear()} UI Developed In Chakra UI
			</Text>
		</Stack>
	</Container>
);
