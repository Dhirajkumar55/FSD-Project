import "../styles/header.css";
import {ApolloProvider} from "@apollo/client";
import {client} from "../graphql/client/clientSetup"
import {UserAuthProvider} from "../context/UserAuthProvider"
import {AuthProvider} from "../context/auth"

function MyApp({ Component, pageProps }) {

  return (
    
      <ApolloProvider client = {client}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ApolloProvider> 
    
  )
}

export default MyApp
