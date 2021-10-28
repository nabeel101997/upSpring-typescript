import Layout from '../components/layout/Layout';
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClient, QueryClientProvider } from 'react-query'
import type { AppProps } from 'next/app'
import '../styles/globals.css'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    )

}

export default MyApp
