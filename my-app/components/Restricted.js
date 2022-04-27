import styled from "styled-components";
import image from '../public/accessdenied.svg'
import Image from 'next/image'
import {useState} from 'react';
import {useRouter} from 'next/router';

function Restricted(){

    const [counter,setCounter] = useState(5);
    const router  = useRouter();
    const timer = () =>{
        const interval = setInterval(() =>{
            setCounter(counter-1);
            if(counter == 1){
                setCounter(0);
                clearInterval(interval);
                router.push('/newPost');
            }
        },1000)
    }
    timer();

    return(
        <center style={{display:'grid', placeItems: 'center',height: '100vh'}}>
            
            <div style={{display:'flex',flexDirection:'column',justifyContent:'center',placeItems:'center'}}>
                <Image height="500rem" width = "500rem" src = {image} alt="AccessDenied"/>
                <p style={{paddingTop:'2rem'}}>Access denied, Redirecting to the Posts page {counter}s</p>
            </div> 
        </center>
      
    )

}

export default Restricted;

const Container = styled.div`
    display: grid;
    place-items: center;

`; 

