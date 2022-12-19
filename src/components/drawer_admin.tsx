import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
	Button,
	HStack,
	Text,
	Divider,
	Link,
} from '@chakra-ui/react';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { myLocalState } from '../../Atoms/localAtoms';
export function DrawerAdmin() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = React.useRef();
	const router = useRouter();
	const [localState,setLocalState] = useRecoilState(myLocalState);
    const localValue = `${localState} `;
	return (
		<>
			<Button
				variant='primary'
				ref={btnRef}
				colorScheme='teal'
				onClick={onOpen}
				m={'5px'}
			>
				<i className='pi pi-bars' style={{ fontSize: '1em' }}></i>
			</Button>
			<Drawer
				isOpen={isOpen}
				placement='right'
				onClose={onClose}
				finalFocusRef={btnRef}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>
						{' '}
						<FormattedMessage id={'mange_your_clinic'} defaultMessage='mange your clinic' />
					</DrawerHeader>

					<DrawerBody >
					
						<HStack
							justify={'space-between'}
							p={'8px'}
							cursor={"pointer"}
							_hover={{transform: "scale(1.05,1.05)"}}
							onClick={ ()=> router.push('/admin/article_admin', '/admin/article_admin', { locale: localValue.trim(),shallow: true })}>
							<Text fontSize={['sm', 'md', 'lg', 'xl']}>
								<FormattedMessage id={'article'} defaultMessage='article' />
							</Text>
							<i className='pi pi-book' style={{ fontSize: '2em' ,color: 'lightblue' }}></i>
						</HStack>
						
						<Divider />
					
							<HStack
								justify={'space-between'}
								p={'8px'}
								mt={'10px'}
								cursor={"pointer"}
								_hover={{transform: "scale(1.05,1.05)"}}
								onClick={ ()=> router.push('/admin/certificates_admin', '/admin/certificates_admin', { locale: localValue.trim(),shallow: true })}>
							
								<Text fontSize={['sm', 'md', 'lg', 'xl']}>
									<FormattedMessage
										id={'certificate'}
										defaultMessage='certificate'
									/>
								</Text>
								<i className='pi pi-bookmark' style={{ fontSize: '2em',color: 'lightblue'  }}></i>
							</HStack>
							<Divider />
							<HStack
								justify={'space-between'}
								p={'8px'}
								mt={'10px'}
								cursor={"pointer"}
								_hover={{transform: "scale(1.05,1.05)"}}
								onClick={ ()=> router.push('/admin/sliders_admin', '/admin/sliders_admin', { locale: localValue.trim(),shallow: true })}>
							
								<Text fontSize={['sm', 'md', 'lg', 'xl']}>
									<FormattedMessage
										id={'slider'}
										defaultMessage='slider'
									/>
								</Text>
								<i className='pi pi-images' style={{ fontSize: '2em',color: 'lightblue'  }}></i>
							</HStack>
						<Divider />

						<HStack
								justify={'space-between'}
								p={'8px'}
								mt={'10px'}
								cursor={"pointer"}
								_hover={{transform: "scale(1.05,1.05)"}}
								onClick={ ()=> router.push('/admin/information_admin', '/admin/information_admin', { locale: localValue.trim(),shallow: true })}>
							
								<Text fontSize={['sm', 'md', 'lg', 'xl']}>
									<FormattedMessage
										id={'information'}
										defaultMessage='information'
									/>
								</Text>
								<i className='pi pi-user' style={{ fontSize: '2em',color: 'lightblue' }}></i>
							</HStack>
						<Divider />

						<HStack
								justify={'space-between'}
								p={'8px'}
								mt={'10px'}
								cursor={"pointer"}
								_hover={{transform: "scale(1.05,1.05)"}}
								onClick={ ()=> router.push('/admin/feedback_admin', '/admin/feedback_admin', { locale: localValue.trim(),shallow: true })}>
							
								<Text fontSize={['sm', 'md', 'lg', 'xl']}>
									<FormattedMessage
										id={'feedback'}
										defaultMessage='feedback'
									/>
								</Text>
								<i className='pi pi-star' style={{ fontSize: '2em' ,color: 'lightblue' }}></i>
							</HStack>
						<Divider />

					</DrawerBody>

					<DrawerFooter>
						<Button variant='outline' mr={3} onClick={onClose}>
							Cancel
						</Button>
						<Button colorScheme='blue'>Save</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
}