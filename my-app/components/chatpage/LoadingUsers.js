import { CircularProgress} from "@mui/material";


function Loading(){

    return (
        <center style={{display:'grid', placeItems: 'center',height: '50vh'}}>
            
            <div style={{display:'flex',flexDirection:'column',justifyContent:'center',placeItems:'center'}}>
                <CircularProgress/>
            </div>
            
            
        </center>
    )



}

export default Loading;