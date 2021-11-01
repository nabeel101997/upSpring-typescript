import { UserProvider } from '../contexts/user-context'
import Layout from '../components/layout/Layout';
import { ToastContainer } from 'react-toastify';
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClient, QueryClientProvider } from 'react-query'
import type { AppProps } from 'next/app'

import '../styles/globals.css'
import { parseFilterArgs } from 'react-query/types/core/utils';

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider initialUser={pageProps?.user}>
        <div>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <ToastContainer />
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </UserProvider>
    </QueryClientProvider >
  )

}

export default MyApp
