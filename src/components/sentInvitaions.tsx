import useGetAllSentInvitations from '@/hooks/useGetAllSentInvitations';
import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Text, Avatar, Spinner } from '@chakra-ui/react';
interface sentInvitaionsProps {
	sentInvitaions: Array<{
		invitation_id: string;
		receiver_id: string;
		receiver_profile: string;
		receiver_username: string;
		sender_id: string;
		sender_profile: string;
		sender_username: string;
	}>;
	loadingI: boolean;
}
const SentInvitations: React.FC<sentInvitaionsProps> = ({
	sentInvitaions,
	loadingI,
}) => {
	if (loadingI) {
		return <Spinner></Spinner>;
	}
	return sentInvitaions.map((invitation: any) => (
		<Box
			border={'1px solid teal'}
			borderRadius={'lg'}
			mt={'14px'}
			padding={'6px'}
			key={invitation.invitation_id}
			// overflow={'hidden'}
		>
			<Box>
				{' '}
				<Avatar src={`${invitation.receiver_profile}`}></Avatar>
				{/* <Avatar src={`${invitation.sender_profile}`}></Avatar> */}
			</Box>

			<Text fontSize={'10px'}>
				{' '}
				Invitation ID: <strong>{invitation.invitation_id}</strong>{' '}
			</Text>
			<Text fontSize={'10px'}>
				{' '}
				receiver: <strong color="teal">
					{invitation.receiver_username}
				</strong>{' '}
			</Text>
			{/* <Text fontSize={'10px'}>
				{' '}
				Status: <strong color="teal">PENDING</strong>{' '}
			</Text> */}
		</Box>
	));
};
export default SentInvitations;
