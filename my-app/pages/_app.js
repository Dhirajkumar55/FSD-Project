import "../styles/header.css";
import "../styles/footer.css"
import {ApolloProvider} from "@apollo/client";
import {client} from "../graphql/client/clientSetup"
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
