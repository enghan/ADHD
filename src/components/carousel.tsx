import {Carousel} from "primereact/carousel";
import {galleriaService} from "../services/Photos";
import {Card} from "@chakra-ui/card";
import {CardBody, Stack, Image, Text, Button, IconButton, HStack, Flex, Box} from "@chakra-ui/react";
import {FormattedMessage} from "react-intl";
import {useRecoilState} from "recoil";
import { myDirectionState } from "../../Atoms/localAtoms";
import {useRouter} from "next/router";
import parse from 'html-react-parser';

const responsiveOptions = [
    {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
    },
    {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
    },
    {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
    }
];

export default function CustomCarousel(galleriaService:any) {
    const [dirState] = useRecoilState(myDirectionState);  
        return (
          
            <div className="card">
                <Carousel dir={dirState} value={galleriaService.galleriaService} itemTemplate={RelatedNewsClinic} numVisible={3} numScroll={1} responsiveOptions={responsiveOptions}
                          showIndicators={false} ></Carousel>
            </div>

        );
}


export function RelatedNewsClinic(item) {
    const [dirState] = useRecoilState(myDirectionState);
    const router = useRouter()
    async function goArticlePage(item:Number) {
        router.push( `/home/${item}/article`,  undefined, { shallow: true})
         
       
    }
     return (
        <Card w={'70%'}  bg={'brand.blue'} rounded={'3xl'} dir={dirState}>
            <CardBody  dir={dirState}>
                <Image
                    src={item?.photos_list[0]?.datafile}
                    alt=''
                    borderRadius='lg'
                    h={"60%"}
                    width="6xl"
                />
                <Stack mt='6' spacing='3'  dir={dirState}color={"brand.gray"} fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'bold'}>
                    <Text>
                    {parse(`${item.title}`)}
                    </Text>
                    <HStack onClick={() => goArticlePage(item.id)} cursor={"pointer"}    _hover={{transform: "scale(1.05, 1.05)",}}>
                        <Text fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'normal'}
                              color={'brand.white'}>
                            <FormattedMessage id={'read_article'}/>
                        </Text>
                        {dirState=="rtl" ?
                            <IconButton colorScheme='brand.blue' aria-label={"more"}  >
                            <i className="pi pi-arrow-left" style={{'fontSize': '1em'}}></i>
                        </IconButton>
                            : <IconButton colorScheme='brand.blue' aria-label={"more"} >
                            <i className="pi pi-arrow-right" style={{'fontSize': '1em'}}></i>
                        </IconButton>}

                    </HStack>

                </Stack>
            </CardBody>
        </Card>
      

    )

}
