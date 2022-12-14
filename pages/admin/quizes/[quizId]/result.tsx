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
	Button,
	Image,
	Spacer,
	Stack,
	IconButton,
	useDisclosure,
	Input,
	Textarea,
	SimpleGrid,
	Tooltip,
	FormLabel,
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
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
import React, { ReactElement, useState } from 'react';
import { NextPageWithLayout } from '../../../_app';
import LayoutAdmin from '../../../../src/components/layout_admin';
import {
	DeleteRequest,
	feedbackList,
	PostRequest,
	resultList,
	UpdateRequest,
} from '../../../../src/services/api';
import { Paginator } from 'primereact/paginator';
import { Formik } from 'formik';
import { myDirectionState } from '../../../../Atoms/localAtoms';
import { useRecoilState } from 'recoil';
import router, { useRouter } from 'next/router';
import { mutate } from 'swr';
import quize from '../../../quize';
import Link from 'next/link';

const ResultsAdmin: NextPageWithLayout = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isEdit, setIsEdit] = useState(false);
	const [index, setIndex] = useState(0);
	const [idResult, setIdResult] = useState(0);
	const [basicFirst, setBasicFirst] = useState(0);
	const [basicRows, setBasicRows] = useState(10);
	const [dirState, setDirState] = useRecoilState(myDirectionState);
	const [pageNum, setPageNum] = useState(1);
	const router = useRouter();
	const { quizId } = router.query;
	const {
		isOpen: isDeleteOpen,
		onOpen: onDeleteOpen,
		onClose: onDeleteClose,
	} = useDisclosure();

	let resultResponse = resultList(pageNum, -1, quizId);
	const onBasicPageChange = (event) => {
		setBasicFirst(event.first);
		setBasicRows(event.rows);
		setPageNum(event.page + 1);
	};

	 function refresh(response: any) {
		onClose();
		mutate(
			`/admin/quize/${quizId}/results/?page=${pageNum}&pageSize=${-1}`
		);
	}
	function openModal() {
		onOpen();
		setIsEdit(true);
	}
	function openEditModal(
		indexValue: number,
		idResult: number
	) {
		onOpen();
		setIsEdit(false);
		setIndex(indexValue);
		setIdResult(idResult);
	}
	function openDeleteModal(indexValue: number, idValue: number ) {
		onDeleteOpen();
		setIndex(indexValue);
		setIdResult(idValue);
	  }
	return (
		<Stack p={'10px'} margin={'2%'} dir={dirState}>
			{resultResponse.isLoading == true ? (
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
			<Breadcrumb fontWeight='medium' fontSize='sm'>
				<BreadcrumbItem>
					<Link href="/admin/quizes" shallow={true} ><Text  fontSize={['sm', 'sm', 'md', 'lg']} fontWeight={'bold'} textDecoration={"underline"}><FormattedMessage id={'quizes'} defaultMessage='quizes' ></FormattedMessage></Text> </Link>
				</BreadcrumbItem>

				<BreadcrumbItem>
					<BreadcrumbLink href='#'><Text fontSize={['sm', 'sm', 'md', 'lg']} fontWeight={'bold'}><FormattedMessage id={'results'} defaultMessage='results' /></Text></BreadcrumbLink>
				</BreadcrumbItem>
			</Breadcrumb>
				<Text fontSize={['lg', 'xl', '2xl', '3xl']} fontWeight={'bold'}>
					<FormattedMessage id={'results'} defaultMessage='result' />
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
					size={{ base: 'xs', md: 'md', lg: 'lg' }}
				>
					<TableCaption>ADHD CENTER</TableCaption>
					<Thead>
						<Tr>
							<Th fontSize={['sm', 'md', 'xl', '2xl']} fontWeight={'bold'}>
								<FormattedMessage id={'title'} defaultMessage='title' />
							</Th>
							<Th fontSize={['sm', 'md', 'xl', '2xl']} fontWeight={'bold'}>
								<FormattedMessage id={'min_point'} defaultMessage='text' />
							</Th>
							<Th fontSize={['sm', 'md', 'xl', '2xl']} fontWeight={'bold'}>
								<FormattedMessage id={'max_point'} defaultMessage='text' />
							</Th>
						</Tr>
					</Thead>
					<Tbody>
						{resultResponse.data?.data?.results?.map(
							(item: any, index: number) => (
								<Tr key={item.text}>
									<Tooltip label={item.text}>
										<Td
											fontSize={['sm', 'md', 'lg', 'xl']}
											maxWidth={'100px'}
											textOverflow={'ellipsis'}
											overflow={'hidden'}
											whiteSpace={'nowrap'}
										>
											{item.text}
										</Td>
									</Tooltip>

									<Tooltip label={item.min_point}>
										<Td
											fontSize={['sm', 'md', 'lg', 'xl']}
											maxWidth={'100px'}
											textOverflow={'ellipsis'}
											overflow={'hidden'}
											whiteSpace={'nowrap'}
										>
											{item.min_point}
										</Td>
									</Tooltip>
									<Tooltip label={item.max_point}>
										<Td
											fontSize={['sm', 'md', 'lg', 'xl']}
											maxWidth={'100px'}
											textOverflow={'ellipsis'}
											overflow={'hidden'}
											whiteSpace={'nowrap'}
										>
											{item.max_point}
										</Td>
									</Tooltip>
									<Td>
										<IconButton
											aria-label={'edit'}
											onClick={() => openEditModal(index, item.id)}
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
										onClick= { () => openDeleteModal(index, item.id) }
										icon={
											<i
												className='pi pi-trash'
												style={{ fontSize: '1em', color: 'red' }}
											></i>
										}
									></IconButton>

									<Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
										<ModalOverlay />
										<ModalContent dir={dirState}>
											<ModalHeader><FormattedMessage id={'delete_item'} defaultMessage='delete item' /></ModalHeader>
											<ModalCloseButton />
											<ModalBody>
											<FormattedMessage id={'delete_confirm'} defaultMessage='delete confirm' />
											</ModalBody>
											<ModalFooter>
												<Button variant='ghost' mr={3} onClick={onDeleteClose}>
												<FormattedMessage id={'cancel'} defaultMessage='cancel' />
												</Button>
												<Button
													colorScheme='red'
													onClick={() => {
														onDeleteClose();
														DeleteRequest(
															`/admin/quize/${quizId}/results/${idResult}/`,
															refresh
														)
													}}
												>
													<FormattedMessage id={'delete'} defaultMessage='delete' />
												</Button>
											</ModalFooter>
										</ModalContent>
									</Modal>
									</Td>
								</Tr>
							)
						)}
					</Tbody>
				</Table>
			</TableContainer>

			{isEdit == true ? (
				<Modal isOpen={isOpen} onClose={onClose}>
					<ModalOverlay />
					<ModalContent dir={dirState}>
						<ModalHeader>
							<FormattedMessage id={'add_result'} />
						</ModalHeader>
						<Formik
							initialValues={{ text: '', min_point: 0, max_point: 0 }}
							validate={(values) => {
								const errors = {};
								if (!values.text) {
									errors.text = (
										<FormattedMessage
											id={'required'}
											defaultMessage='Required'
										/>
									);
								}

								if (!values.min_point) {
									errors.min_point = (
										<FormattedMessage
											id={'required'}
											defaultMessage='required'
										/>
									);
								}
								if (!values.max_point) {
									errors.max_point = (
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
										text: values.text,
										min_point: values.min_point,
										max_point: values.max_point,
									};
									PostRequest(
										`/admin/quize/${quizId}/results/`,
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
									<ModalBody dir={dirState}>
										<Stack spacing={3}>
											<FormLabel>
												<FormattedMessage id={'text'} defaultMessage='text' />
											</FormLabel>
											<Input
												variant='outline'
												type='text'
												name='text'
												onChange={handleChange}
												onBlur={handleBlur}
												borderColor={'brand.blue'}
												value={values.text}
											/>
											<Text color={'red'}>
												{errors.text && touched.text && errors.text}
											</Text>

											<FormLabel>
												<FormattedMessage
													id={'min_point'}
													defaultMessage='min point'
												/>
											</FormLabel>
											<Input
												onChange={handleChange}
												name='min_point'
												type={'number'}
												onBlur={handleBlur}
												borderColor={'brand.blue'}
												value={values.min_point}
											/>
											<Text color={'red'}>
												{errors.min_point &&
													touched.min_point &&
													errors.min_point}
											</Text>

											<FormLabel>
												<FormattedMessage
													id={'max_point'}
													defaultMessage='max point'
												/>
											</FormLabel>
											<Input
												onChange={handleChange}
												name='max_point'
												type={'number'}
												onBlur={handleBlur}
												borderColor={'brand.blue'}
												value={values.max_point}
											/>
											<Text color={'red'}>
												{errors.max_point &&
													touched.max_point &&
													errors.max_point}
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
								id={'edit_result'}
								defaultMessage='Edit result'
							/>
						</ModalHeader>
						<Formik
							initialValues={{
								text: resultResponse.data?.data?.results[index]?.text,
								max_point: resultResponse.data?.data?.results[index]?.max_point,
								min_point: resultResponse.data?.data?.results[index]?.min_point,
							}}
							onSubmit={(values, { setSubmitting }) => {
								setTimeout(() => {

									const dataToRequestAPI = {
										text: values.text,
										max_point: values.max_point,
										min_point: values.min_point,
									};
									UpdateRequest(
										`/admin/quize/${quizId}/results/${idResult}/`,
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
									<ModalBody dir={dirState}>
										<Stack spacing={3}>
											<FormLabel>
												<FormattedMessage id={'text'} defaultMessage='text' />
											</FormLabel>
											<Input
												variant='outline'
												type='text'
												name='text'
												onChange={handleChange}
												onBlur={handleBlur}
												borderColor={'brand.blue'}
												value={values.text}
											/>
											<FormLabel>
												<FormattedMessage
													id={'min_point'}
													defaultMessage='min point'
												/>
											</FormLabel>
											<Input
												onChange={handleChange}
												name='min_point'
												type={'number'}
												onBlur={handleBlur}
												borderColor={'brand.blue'}
												value={values.min_point}
											/>
											<FormLabel>
												<FormattedMessage
													id={'max_point'}
													defaultMessage='max point'
												/>
											</FormLabel>
											<Input
												onChange={handleChange}
												name='max_point'
												type={'number'}
												onBlur={handleBlur}
												borderColor={'brand.blue'}
												value={values.max_point}
											/>
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
				p-paginator-page
				first={basicFirst}
				rows={basicRows}
				totalRecords={resultResponse.data?.data.count}
				onPageChange={onBasicPageChange}
			></Paginator> */}
		</Stack>
	);
};

ResultsAdmin.getLayout = function getLayout(page: ReactElement) {
	return <LayoutAdmin>{page}</LayoutAdmin>;
};

export default ResultsAdmin;
