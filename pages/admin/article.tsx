import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableCaption,
	TableContainer,
	HStack,
	Text,
	Box,
	Button,
	Image,
	Stack,
	IconButton,
	useDisclosure,
	Input,
	Textarea,
	Card,
	CardBody,
	SimpleGrid,
	Tooltip,
	FormLabel,
	Accordion,
	AccordionPanel,
	AccordionIcon,
	AccordionItem,
	AccordionButton,
	ModalCloseButton,
} from '@chakra-ui/react';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
} from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';
import React, { ReactElement, useMemo, useRef, useState } from 'react';
import { Galleria } from 'primereact/galleria';
import {
	articlesList,
	DeleteRequest,
	PostRequest,
	UpdateRequest,
} from '../../src/services/api';
import { Paginator } from 'primereact/paginator';
import { Formik } from 'formik';
import LayoutAdmin from '../../src/components/layout_admin';
import { NextPageWithLayout } from '../_app';
import { useRecoilState } from 'recoil';
import { myDirectionState } from '../../Atoms/localAtoms';
import { useRouter } from 'next/router';
import Gridphotot from '../../src/components/grid_photo';
import { myImagesState, myListImagesState } from '../../Atoms/imagesAtom';
import { Editor } from 'primereact/editor';
import parse from 'html-react-parser';
import { mutate } from 'swr';

const ArticleAdmin: NextPageWithLayout = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isEdit, setIsEdit] = useState(false);
	const [isImageModal, setIsImageModal] = useState(false);
	const [displayMaximizable, setDisplayMaximizable] = useState(false);
	const [index, setIndex] = useState(0);
	const [id, setId] = useState(0);
	const [basicFirst, setBasicFirst] = useState(1);
	const [basicRows, setBasicRows] = useState(10);
	const [pageNum, setPageNum] = useState(1);
	const articlesResponse = articlesList(pageNum, -1);
	const [dirState] = useRecoilState(myDirectionState);
	const [imageState, setimageState] = useRecoilState(myListImagesState);
	const [text1, setText1] = useState<string>('');
	console.log("dir state....."+dirState)
	const {
		isOpen: isDeleteOpen,
		onOpen: onDeleteOpen,
		onClose: onDeleteClose,
	} = useDisclosure();

	const router = useRouter();
	const onBasicPageChange = (event) => {
		setBasicFirst(event.first);
		setBasicRows(event.rows);
		setPageNum(event.page + 1);
	};

	async function refresh(response: any) {
		onClose();
		mutate(`/admin/articles/?page=${pageNum}&page_size=${-1}`);
		
	}

	function openModal() {
		onOpen();
		setIsEdit(true);
		setIsImageModal(true);
		setText1("");
	}

	function openEditModal(indexValue: number, idValue: number) {
		onOpen();
		setIsEdit(false);
		setIndex(indexValue);
		setId(idValue);
		setText1("");
	}
	const dialogFuncMap = {
		displayMaximizable: setDisplayMaximizable,
	};
	function openDeleteModal(indexValue: number, idValue: number) {
		onDeleteOpen();
		setIndex(indexValue);
		setId(idValue);
		setText1("");
	  }
	const responsiveOptions = [
		{
			breakpoint: '1024px',
			numVisible: 5,
		},
		{
			breakpoint: '768px',
			numVisible: 3,
		},
		{
			breakpoint: '560px',
			numVisible: 1,
		},
	];

	return (
		<Stack p={'10px'} dir={dirState} margin={'2%'}>
			{articlesResponse.isLoading == true ? (
				<div id='globalLoader'>
					<Image
						src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif'
						alt=''
					/>
				</div>
			) : (
				<></>
			)}

			<HStack justify={'space-between'} m={'10px'}>
				<Text fontSize={['lg', 'xl', '2xl', '3xl']} fontWeight={'bold'}>
					<FormattedMessage id={'article'} defaultMessage='article' />
				</Text>
				<Button
					variant='outline'
					colorScheme='brand'
					onClick={openModal}
					fontSize={['sm', 'md', 'lg', 'xl']}
				>
					<i
						className='pi pi-plus'
						style={{ fontSize: '1em', marginRight: '12px', marginLeft: '12px' }}
					></i>
					<FormattedMessage id={'import'} defaultMessage='import' />
				</Button>
			</HStack>
			<TableContainer w={'full'}>
				<Table
					variant='striped'
					border={'1px'}
					colorScheme={'gray'}
					borderColor={'brand.dark'}
					size={{ base: 'xs', md: 'md', lg: 'lg' }}
				>
					<TableCaption>ADHD CENTER</TableCaption>
					<Thead>
						<Tr>
							<Th fontSize={['sm', 'md', 'xl', '2xl']} fontWeight={'bold'}>
								<FormattedMessage id={'images'} defaultMessage='images' />
							</Th>
							<Th fontSize={['sm', 'md', 'xl', '2xl']} fontWeight={'bold'}>
								<FormattedMessage id={'title'} defaultMessage='title' />
							</Th>
							<Th fontSize={['sm', 'md', 'xl', '2xl']} fontWeight={'bold'}>
								<FormattedMessage id={'sluge'} defaultMessage='sluge' />
							</Th>
							<Th fontSize={['sm', 'md', 'xl', '2xl']} fontWeight={'bold'}>
								<FormattedMessage id={'body'} defaultMessage='body' />
							</Th>
							<Th fontSize={['sm', 'md', 'xl', '2xl']} fontWeight={'bold'}></Th>
							<Th fontSize={['sm', 'md', 'xl', '2xl']} fontWeight={'bold'}></Th>
						</Tr>
					</Thead>
					<Tbody>
						{articlesResponse.data?.data.results.map((item, index) => (
							<Tr key={item.id}>
								<Td w={'15%'} h={'15%'}>
									<Galleria
										value={
											articlesResponse.data?.data?.results[index]?.photos_list
										}
										responsiveOptions={responsiveOptions}
										numVisible={5}
										showThumbnails={false}
										showIndicators
										changeItemOnIndicatorHover
										item={itemGalleryTemplate}
									/>
								</Td>
								<Tooltip label={item.title}>
									<Td
										fontSize={['sm', 'md', 'lg', 'xl']}
										maxWidth={'100px'}
										textOverflow={'ellipsis'}
										overflow={'hidden'}
										whiteSpace={'nowrap'}
									>
										{item.title}
									</Td>
								</Tooltip>
								<Tooltip label={item.slug}>
									<Td
										fontSize={['sm', 'md', 'lg', 'xl']}
										maxWidth={'100px'}
										textOverflow={'ellipsis'}
										overflow={'hidden'}
										whiteSpace={'nowrap'}
									>
										{item.slug}
									</Td>
								</Tooltip>
								<Tooltip label={parse(`${item.body}`)}>
									<Td
										fontSize={['sm', 'md', 'lg', 'xl']}
										maxWidth={'100px'}
										textOverflow={'ellipsis'}
										overflow={'hidden'}
										whiteSpace={'nowrap'}
									>
										{parse(`${item.body}`)}
									</Td>
								</Tooltip>
								<Td>
									<IconButton
										aria-label={'edit'}
										onClick={() =>  openEditModal(index, item.id)}
										icon={
											<i
												className='pi pi-pencil'
												style={{ fontSize: '1em', color: 'green' }}
											></i>
										}
									></IconButton>
								</Td>
								<Td>
									<IconButton
										aria-label={'delete'}
										onClick={() => openDeleteModal(index, item.id)}
										icon={
											<i
												className='pi pi-trash'
												style={{ fontSize: '1em', color: 'red' }}
											></i>
										}
									></IconButton>

									<Modal isOpen={isDeleteOpen} onClose={onDeleteClose} >
										<ModalOverlay />
										<ModalContent dir={dirState}>
											<ModalHeader>
												<FormattedMessage
													id={'delete_item'}
													defaultMessage='delete item'
												/>
											</ModalHeader>
											<ModalCloseButton />
											<ModalBody>
												<FormattedMessage
													id={'delete_confirm'}
													defaultMessage='delete confirm'
												/>
											</ModalBody>
											<ModalFooter>
												<Button variant='ghost' mr={3} onClick={onDeleteClose}>
													<FormattedMessage
														id={'cancel'}
														defaultMessage='cancel'
													/>
												</Button>
												<Button
													colorScheme='red'
													onClick={(e) => {
														onDeleteClose();
														DeleteRequest(
															`/admin/articles/${id}/`,
															refresh
														);
													}}
												>
													<FormattedMessage
														id={'delete'}
														defaultMessage='delete'
													/>
												</Button>
											</ModalFooter>
										</ModalContent>
									</Modal>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>

			{isEdit == true ? (
				<Modal isOpen={isOpen} onClose={onClose} size={'5xl'}>
					<ModalOverlay />
					<ModalContent dir={dirState}>
						<ModalHeader>
							<FormattedMessage id={'add_article'} />
						</ModalHeader>
						<Formik
							initialValues={{
								title: '',
								sluge: '',
								body: '',
								photos: [...imageState],
								keywords: '',
							}}
							validate={(values) => {
								const errors = {};
								if (!values.title) {
									errors.title = (
										<FormattedMessage
											id={'required'}
											defaultMessage='Required'
										/>
									);
								}
								if (!values.sluge) {
									errors.sluge = (
										<FormattedMessage
											id={'required'}
											defaultMessage='required'
										/>
									);
								}
								if (!values.keywords) {
									errors.keywords = (
										<FormattedMessage
											id={'required'}
											defaultMessage='required'
										/>
									);
								}
								return errors;
							}}
							onSubmit={(values, { setSubmitting }) => {
								setTimeout(() => {
									const dataToRequestAPI = {
										title: values.title,
										slug: values.sluge,
										body: text1,
										photos: imageState,
										keywords: values.keywords,
									};
									PostRequest('/admin/articles/', dataToRequestAPI, refresh);
									setimageState([]);
									setSubmitting(false);
								}, 400);
							}}
						>
							{({
								values,
								errors,
								touched,
								handleChange,
								handleBlur,
								handleSubmit,
								isSubmitting,
							}) => (
								<form onSubmit={handleSubmit}>
									<ModalBody>
										<Stack spacing={3}>
											<FormLabel>
												<FormattedMessage id={'title'} defaultMessage='title' />
											</FormLabel>

											<Input
												variant='outline'
												type='text'
												name='title'
												onChange={handleChange}
												onBlur={handleBlur}
												borderColor={'brand.blue'}
												value={values.title}
											/>

											<Text color={'red'}>
												{errors.title && touched.title && errors.title}
											</Text>

											<FormLabel>
												<FormattedMessage id={'sluge'} defaultMessage='slug' />
											</FormLabel>
											<Input
												variant='outline'
												type='text'
												name='sluge'
												onChange={handleChange}
												onBlur={handleBlur}
												borderColor={'brand.blue'}
												value={values.sluge}
											/>
											<Text color={'red'}>
												{errors.sluge && touched.sluge && errors.sluge}
											</Text>

											<FormLabel>
												<FormattedMessage
													id={'Key_words'}
													defaultMessage='key words'
												/>
											</FormLabel>
											<Input
												variant='outline'
												type='text'
												name='keywords'
												onChange={handleChange}
												onBlur={handleBlur}
												borderColor={'brand.blue'}
												value={values.keywords}
											/>
											<Text color={'red'}>
												{errors.keywords && touched.keywords && errors.keywords}
											</Text>

											<FormLabel>
												<FormattedMessage id={'body'} defaultMessage='body' />
											</FormLabel>
											<Editor
												style={{ height: '220px' }}
												value={values.body}
												name='body'
												onChange={handleChange}
												onTextChange={(e) => setText1(e.htmlValue)}
											/>
											<Text color={'red'}>
												{errors.body && touched.body && errors.body}
											</Text>

											{/* <Dialog header="Header" visible={displayMaximizable} Maximizable style={{ width: '50vw' }} footer={renderFooter('Maximizable')} onHide={() => onHide('Maximizable')}>
   <Gridphotot />
</Dialog> */}
											{isImageModal == true ? (
												<Accordion defaultIndex={[1]} allowMultiple>
													<AccordionItem>
														<h2>
															<AccordionButton
																_expanded={{
																	bg: 'brand.blue',
																	color: 'white',
																	fontsize: 'lg',
																}}
															>
																<Box as='span' flex='1' textAlign='left'>
																	<FormLabel>
																		<FormattedMessage
																			id={'choose_file'}
																			defaultMessage='choose file'
																		/>
																	</FormLabel>
																</Box>
																<AccordionIcon />
															</AccordionButton>
														</h2>
														<AccordionPanel pb={4}>
															<Gridphotot isMulti={true}></Gridphotot>
														</AccordionPanel>
													</AccordionItem>
												</Accordion>
											) : (
												<></>
											)}

											{/* <div>
									<SimpleGrid
										spacing={5}
										columns={[2, 3]}
										templateColumns='repeat(3, 1fr)'
										w='full%'
									>
										{imgsSrc.map((link) => (
											<Image src={link} />
										))}
									</SimpleGrid>
								</div> */}
										</Stack>
									</ModalBody>

									<ModalFooter>
										<Button variant='outline' mr={3} ml={3} onClick={onClose}>
											{<FormattedMessage id={'close'} defaultMessage='close' />}
										</Button>
										<Button
											variant='primary'
											type='submit'
											disabled={isSubmitting}
										>
											{
												<FormattedMessage
													id={'upload'}
													defaultMessage='upload'
												/>
											}
										</Button>
									</ModalFooter>
								</form>
							)}
						</Formik>
					</ModalContent>
				</Modal>
			) : (
				<Modal isOpen={isOpen} onClose={onClose}>
					<ModalOverlay />
					<ModalContent dir={dirState}>
						<ModalHeader>
							<FormattedMessage
								id={'edit_article'}
								defaultMessage='Edit article'
							/>
						</ModalHeader>
						<Formik
							initialValues={{
								title: articlesResponse.data?.data?.results[index]?.title,
								sluge: articlesResponse.data?.data?.results[index]?.slug,
								body: articlesResponse.data?.data?.results[index]?.body,
								photos: [],
								keywords: articlesResponse.data?.data?.results[index]?.keywords,
							}}
							onSubmit={(values, { setSubmitting }) => {
								setTimeout(() => {
									const dataToRequestAPI = {
										title: values.title ,
										slug: values.sluge ,
										body: ( text1==""? values.body:text1),
										keywords: values.keywords,
									};
									UpdateRequest(
										`/admin/articles/${id}/`,
										dataToRequestAPI,
										refresh
									);
									
									setSubmitting(false);
								}, 400);
							}}
						>
							{({
								values,
								errors,
								touched,
								handleChange,
								handleBlur,
								handleSubmit,
								isSubmitting,
							}) => (
								<form onSubmit={handleSubmit}>
									<ModalBody>
										<Stack spacing={3}>
											<FormLabel>
												<FormattedMessage id={'title'} defaultMessage='title' />
											</FormLabel>

											<Input
												variant='outline'
												type='text'
												name='title'
												onChange={handleChange}
												onBlur={handleBlur}
												borderColor={'brand.blue'}
												value={values.title}
											/>

											<Text color={'red'}>
												{errors.title && touched.title && errors.title}
											</Text>

											<FormLabel>
												<FormattedMessage id={'sluge'} defaultMessage='sluge' />
											</FormLabel>
											<Input
												variant='outline'
												type='text'
												name='sluge'
												onChange={handleChange}
												onBlur={handleBlur}
												borderColor={'brand.blue'}
												value={values.sluge}
											/>
											<Text color={'red'}>
												{errors.sluge && touched.sluge && errors.sluge}
											</Text>

											<FormLabel>
												<FormattedMessage
													id={'Key_words'}
													defaultMessage='key words'
												/>
											</FormLabel>
											<Input
												variant='outline'
												type='text'
												name='keywords'
												onChange={handleChange}
												onBlur={handleBlur}
												borderColor={'brand.blue'}
												value={values.keywords}
											/>
											<Text color={'red'}>
												{errors.keywords && touched.keywords && errors.keywords}
											</Text>

											<FormLabel>
												<FormattedMessage id={'body'} defaultMessage='body' />
											</FormLabel>
											<Editor
												style={{ height: '220px' }}
												value={values.body}
												name='body'
												onChange={handleChange}
												onTextChange={(e) => setText1(e.htmlValue)}
											/>

											<Text color={'red'}>
												{errors.body && touched.body && errors.body}
											</Text>
										</Stack>
									</ModalBody>

									<ModalFooter>
										<Button variant='outline' mr={3} ml={3} onClick={onClose}>
											{<FormattedMessage id={'close'} defaultMessage='close' />}
										</Button>
										<Button
											variant='primary'
											type='submit'
											disabled={isSubmitting}
										>
											{<FormattedMessage id={'edit'} defaultMessage='edit' />}
										</Button>
									</ModalFooter>
								</form>
							)}
						</Formik>
					</ModalContent>
				</Modal>
			)}
			{/* <Paginator
				first={basicFirst}
				rows={basicRows}
				totalRecords={articlesResponse.data?.data.count}
				onPageChange={onBasicPageChange}
			></Paginator> */}
		</Stack>
	);
};
ArticleAdmin.getLayout = function getLayout(page: ReactElement) {
	return <LayoutAdmin>{page}</LayoutAdmin>;
};

export default ArticleAdmin;

const itemGalleryTemplate = (item) => {
	return (
	
				<Image
					src={item.datafile}
					onError={(e) =>
						(e.target.src =
							'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
					}
					alt={item.name}
					style={{ width: '100%', height: '100%', display: 'block' }}
				/>
	);
};
