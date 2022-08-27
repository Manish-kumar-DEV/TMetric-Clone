import {  Box, Button, Checkbox, Divider, Fade, Flex, Input, Text, useDisclosure } from '@chakra-ui/react';
import React, { useState,useEffect} from 'react'
import {AiOutlineRight,AiOutlineLeft} from "react-icons/ai"
import {TiMediaRecord} from "react-icons/ti"
import {FaPlay} from "react-icons/fa"
import {FaStop} from "react-icons/fa"

import TimePicker from 'react-time-picker'
import Clock from './Clock';
import Menus from './Menus';
import ActiveProject from './ActiveProject';


const Time = () => {
    const { isOpen, onOpen, onClose} = useDisclosure()
    const[play, setPlay]=useState(false)
    const[uptime, setUptime]=useState(0)
    let [value, onChange] = useState("8:00");
    let [value1, onChange1] = useState("8:00");
    let [clock2 ,setClock2]=useState()

    // console.log(clock2)
    // console.log(value)
    const[data ,setData]=useState([])
    const [form,setForm]=useState({
      description:"",
      project:"",
      start:value,
      end:clock2,
    })
    // console.log(form)
    const handleChange=(e)=>{
      const {name,value}=e.target;
      // console.log(value)
      setForm({
        ...form,[name]:value,
      })
    }

    const Addproject=(e)=>{
      e.preventDefault()
      setData([...data,form])
      setUptime(uptime+1)
      onClose();
    }
    const [shour,setshour]=useState([])
    const [ehour,setehour]=useState([])
    
    useEffect(()=>{
      setshour(value.trim().split(":").map(Number));
    },[value])
    useEffect(()=>{
      setehour(value1.trim().split(":").map(Number));
    },[value1])
      
     
  return (
<Box  w="80%" p="0.5rem">

{/* Upper Part */}

<Flex justifyContent="space-between">
  {/*left section Time*/}
  <Box display={"flex"} gap="10px" border={""}>
      {/*button*/}
      <Flex gap="5px">
      <Button bg="#17c22e" disabled={play===true}  colorScheme='#17c22e' borderRadius="49%"><FaPlay color='white'/></Button>
      <Button bg="red" disabled={play===false}  colorScheme='red' borderRadius="49%"><FaStop color='white'/></Button>
      </Flex>

      {/*select Team*/}
      <Flex ml={"10px"}>
          <Text fontSize='3xl'>My Time</Text>
          <Box h="30px" mt={"10px"} ml={"13px"} borderLeft="1px solid"></Box>
          <Menus />
        
      </Flex>
  </Box>
  
  
  <Box display={"flex"} gap="10px" >
      <Input type="date" ></Input>
      <Text fontSize={"2xl"}>Today</Text>
      <Flex mt="14px" gap="10px">
      <Text as='samp'><AiOutlineLeft/></Text>
      <Text as='samp'><TiMediaRecord/></Text>
      <Text as='samp'><AiOutlineRight/></Text>
      </Flex>
  </Box>
</Flex>

{/*Middle part*/}

<Box border={"1px solid #d0d6db"} mt="0.5rem" p={"1rem"}>
<Box >
    <Text textAlign={"left"}>Total</Text>
    <Flex mt="-2" justifyContent={"space-between"}>
        <Text fontSize={"3xl"} fontWeight="medium">{uptime?`${uptime}h:0mint`:"0 mint"}</Text>
        <Text>...</Text>
    </Flex>
</Box>
</Box>

{/*down part*/}

<Box border={"1px solid #d0d6db"} mt="0.5rem" borderRadius="6px">

<Box>
    <Flex gap="10px" p={"1rem"}>
    <Checkbox isDisabled></Checkbox>
    <Button onClick={onOpen}>Add Time Entry</Button>      
    </Flex>

    {/* Active Project */}

    {
      data.map((e)=>{
        return <ActiveProject props={e} setPlay={setPlay} play={play}/>
      })
    }
    


    {/* Add Time entey */}
    <form action="">
    <Fade in={isOpen} >
    <Divider  />
        <Box
          color='black'
          w="100%"
          rounded='md' 
          boxShadow='xs'
          p={"1rem"}
          pt="3rem"
          
        >
          
        {/* First Flex*/}

          <Flex mt={"-3%"}  justifyContent="space-between">
            <Box w="50%">
                <Text textAlign={"left"}>Description</Text>
                <Input w="100%" h="30px" name="description" onChange={(e)=>handleChange(e)} placeholder='Description'></Input>
            </Box>
            <Box>
                <Text textAlign={"left"}>Start Time</Text>
                <TimePicker onChange={onChange} value={value}/>
            </Box>
            <Box>
            <Text textAlign={"left"}>End Time</Text>
            <TimePicker onChange={onChange1} value={value1}/>
                {/* <Clock setClock2={setClock2}/> */}
            </Box>
        
            <Box  w="12%">
                <Text textAlign={"left"}>Duration</Text>
                <Text border="1px solid" borderRadius={"3px"}>{ehour[0]-shour[0]}h : {ehour[1]-shour[1]}m</Text>
            </Box>
          </Flex>

        {/* Second Flex*/}
          <Flex mt="30px" w="60%" justifyContent={"space-between"}>
            <Box w="55%">
              <Text textAlign={"left"}>Add Project</Text>
            <Input name="project" onChange={(e)=>handleChange(e)} placeholder='Add project'/>
            </Box>
            <Box w="40%">
            <Text textAlign={"left"}>Add Tags</Text>
            <Input placeholder='Add Tags'/>
            </Box>
          </Flex>



          {/* Form End */}
          <Flex  gap="20px" textAlign={"left"} mt="20px">
          <Button bg="blue" type='submit' onClick={Addproject} colorScheme='facebook'>Save</Button>
          <Button onClick={onClose} color="black">Cancel</Button>
          </Flex>
                
        </Box>
    </Fade>
    </form>
    
</Box>

</Box>

    </Box>
  )
}

export default Time;