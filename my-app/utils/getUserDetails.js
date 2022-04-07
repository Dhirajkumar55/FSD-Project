import {USER_DETAILS} from "../graphql/client/queries";
import {client} from "../graphql/client/clientSetup"

async function getUser(email){
    console.log(email);
    const {data,loading} = await client.query({
        query:USER_DETAILS,
        variables: {
            email: "dhirajkumar.c19@iiits.in"
        }
    })
    
    //console.log(userData);

    return userData;
}

function getUserDetails(email){
    const user = getUser(email);
    return user;
}

export {getUserDetails};