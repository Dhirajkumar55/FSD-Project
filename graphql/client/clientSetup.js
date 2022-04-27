import { ApolloClient,createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: 'https://fsd-project.vercel.app/api/graphqlServer',
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    let token = "";
    if(typeof window !== 'undefined'){
        token = localStorage.getItem('jwtToken');
    }
    // return the headers to the context so httpLink can read them
  
    return {
  
      headers: {
  
        ...headers,
  
        authorization: token ? `Bearer ${token}` : "",
  
      }
  
    }
  
});

const client = new ApolloClient({

    link: authLink.concat(httpLink),
  
    cache: new InMemoryCache(),

    fetchOptions:{
      mode:'no-cors'
    }
  
  });

export {client};

