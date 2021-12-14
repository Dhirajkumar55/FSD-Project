import styled from "styled-components";
import { CircularProgress} from "@mui/material";


function Loading(){

    return (
        <center style={{display:'grid', placeItems: 'center',height: '100vh'}}>
            
            <div style={{display:'flex',flexDirection:'column',justifyContent:'center',placeItems:'center'}}>
                <CircularProgress/>
                <a style={{paddingTop:'2rem'}}>Please wait while we take you there ...</a>
            </div>
            
            
        </center>
    )



}

export default Loading;

