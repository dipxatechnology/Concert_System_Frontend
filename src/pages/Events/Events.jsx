import { 
    Text, 
    Stack, 
    Image,
    Card,
    CardBody,
    Divider,
    SimpleGrid, 
    Icon,
    Flex,
    Heading,
  } from '@chakra-ui/react';

import { CalendarIcon } from '@chakra-ui/icons';
import { FaTicket } from "react-icons/fa6";

import AllData from './Data';

import './events.css';

export default function Events() {
    return(
        <div className='event-style'>
            <Heading as='h1' size='2xl' margin='20px 0'>All Events</Heading>
            <SimpleGrid columns={3} spacing={10}>
                {AllData.map((data, index) => {
                    return (
                        <Card 
                            key={index} 
                            color='white' 
                            borderRadius='xl' 
                            width='auto' 
                            bg='rgba(85, 85, 85, 0.5)'
                            marginTop='5vh'
                        >
                            <CardBody>
                                <Image
                                    src={data.src}
                                    alt='Retro Music Fest Poster'
                                    borderRadius='xl'
                                />
                                <Divider mt='5' borderWidth='1px' />
                                <Stack mt='3' textAlign='center'> 
                                    <Text fontSize='2xl' color='#D45161'>{data.name}</Text>
                                    <Text>{data.location}</Text>
                                    <Flex justifyContent='center' alignItems="center" marginTop='5px'>
                                        <CalendarIcon color='brand.100' boxSize="20px" marginRight='10px' />
                                        <Text> {data.month} | {data.time} </Text>
                                    </Flex>
                                    <Flex justifyContent='center' alignItems="center">
                                        <Icon as={FaTicket} color='brand.100' boxSize="20px"  marginRight='10px' />
                                        <Text>From: {data.amount}</Text>
                                    </Flex>
                                </Stack>
                            </CardBody>
                        </Card>
                    )
                })}
            </SimpleGrid>
        </div>
    )
}