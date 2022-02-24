import styled from "styled-components";
import teamImg from "../../public/team.png";
import  Link from "next/link";

const style = {
    width: '110vh',
    height: '80vh',
}

function Banner(){
    
    return(
        <BannerContainer>
            <Container>
                <TextContainer>
                    <h3 style = {{"fontSize":"2.5rem","fontWeight":"normal"}}>Start Together ..</h3>
                    <h2 style = {{"fontSize":"3rem","fontWeight":"normal"}}>Learn Together ...</h2>
                    <h1 style = {{"fontSize":"3.5rem","fontWeight":"normal"}}>Grow Together ....</h1>
                    <SameContainer>
                        <h1 style = {{"fontSize":"2rem","fontWeight":"normal","paddingTop":"3.75rem"}}>So let&apos;s find you a team</h1>
                        <Link href = "/newPost">
                            <a>
                                <WhiteButton>Let&apos;s Go</WhiteButton>
                            </a>
                        </Link>
                    </SameContainer>
                    
                </TextContainer>
                <ImageContainer>
                    {/* eslint-disable-next-line*/}
                    <img src="../team.png" alt="team" style = {style}/>
                </ImageContainer>
                
                
            </Container>
        </BannerContainer>
        
    )
}

export default Banner;


const BannerContainer = styled.div`
    background-color: #0EA0FF;
    height:auto;
`;

const Container = styled.div`
    display:flex;
    flex: 1;
    justify-content:space-between;
    text-align: left;
`;

const ImageContainer = styled.div`
`;

const TextContainer = styled.div`
    color: #FFFFFF;
    margin-left:4rem;
    margin-top: 9rem;
    font-family:Roboto;
`;

const WhiteButton = styled.div`
    background-color: #FFFFFF;
    text-align: center;
    border-radius: 5rem;
    float: right;
    text-decoration: none;
    color: #0EA0FF;
    padding : 1rem 1rem;
    animation: all 0.3s ease-in;
    margin-top:5rem;
    margin-left: 1rem;
    :hover{
        color :#0e9fffc5;
    }
`;

const SameContainer = styled.div`
    display: flex;
    position: relative;
    justify-content:space-between;
    text-align:center;
`;