import { 
    Text, 
    Box, 
    VStack, 
    Grid,
    Image,
    GridItem,
  } from '@chakra-ui/react';
  import { ArrowForwardIcon } from '@chakra-ui/icons';
  
import './about.css';

export default function About() {
  return (
    <div className='about-style'>
      <VStack marginTop='10vh'>
        <Text as='b' fontSize='3xl'>
          So
          <Text as='span' color='#D45161' padding='0 8px'>who</Text>
          are we exactly?
        </Text>
        <Box marginRight='10px' marginTop='5vh'>
          <Image src='src/assets/Vector 5.svg' />
        </Box>
        <Grid 
          templateColumns='repeat(5, 1fr)' 
          gap={4} 
          marginTop='10vh'
          alignItems='center'
        >
        <GridItem colSpan={3}>
            <Text fontSize='lg' color='rgba(255, 255, 255, 0.5)'>
            Vibe Fest is an online platform for 
            <Text as='span' color='#ffffff'> purchasing tickets </Text>  
            to concerts internationally.
            Our services make it easy to book tickets from several booking websites and make them 
            available in one place, in a 
            <Text as='span' color='#ffffff'> single transaction</Text>
            , whether you are in the UK, the USA or Europe. 
            <Text as='span' color='#ffffff'> No fees </Text>
            are charged at the point of purchase or after your event has ended.
            </Text>
        </GridItem>
        <GridItem colEnd={6}>
        <Box marginRight='10px'>
            <Image src='src/assets/ticket_tick.svg' />
        </Box>
        </GridItem>
        </Grid>

        <Grid 
          templateColumns='repeat(5, 1fr)' 
          gap={4} 
          marginTop='20vh'
          alignItems='center'
        >
        <GridItem colSpan={2}>
        <Box marginLeft='20%'>
            <Image src='src/assets/earth.svg' />
        </Box>
        </GridItem>
        <GridItem colSpan={3}>
            <Text fontSize='lg' color='rgba(255, 255, 255, 0.5)'>
                Vibe Fest operates in all 
                <Text as='span' color='#ffffff'> EU countries, Iceland, Norway and Switzerland. </Text>  
                The founding team of Vibe Fest was made up of entrepreneurs from Malaysia. 
                The company now employs
                <Text as='span' color='#ffffff'> 120 people. </Text>  
            </Text>
        </GridItem>
        </Grid>

        <Grid 
          templateColumns='repeat(5, 1fr)' 
          gap={4} 
          margin='20vh 0'
          alignItems='center'
        >
        <GridItem colSpan={3}>
            <Text fontSize='lg' color='rgba(255, 255, 255, 0.5)'>
            In September 2020, Vibe Fest partnered with 
            <Text as='span' color='#ffffff'> TM</Text>  
            , one of Malaysia’s leading provider of internet services, for Vibe Fest’s ticket booking services, allowing the company to 
            <Text as='span' color='#ffffff'> expand its presence </Text>  
            to 2,500+ Live Nation & AXS corporate clients as well as 20,000+ independent music venues and promoters. 
            Vibe Fest has received 
            <Text as='span' color='#ffffff'> RM1.3m </Text>
            in funding from Multimedia University from 2023.
            </Text>
        </GridItem>
        <GridItem colEnd={6}>
        <Box marginRight='10px'>
            <Image src='src/assets/chart.svg' />
        </Box>
        </GridItem>
        </Grid>
      </VStack>
    </div>
  )
}