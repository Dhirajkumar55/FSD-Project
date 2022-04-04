import "../styles/header.css";
import {ApolloProvider} from "@apollo/client";
import {client} from "../graphql/client/clientSetup"


function MyApp({ Component, pageProps }) {

  return (
    <ApolloProvider client = {client}>
      <Component {...pageProps} />
    </ApolloProvider> 
  )
}

export default MyApp
