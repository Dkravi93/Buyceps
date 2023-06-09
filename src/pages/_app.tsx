import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apolloClient';

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(null);
  return     (<ApolloProvider client={apolloClient}>
  <Component {...pageProps} />
</ApolloProvider>)
}
