import '../styles/globals.css'
import Layout from '../components/Layout/Layout'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {

  const router = useRouter()

  if (router.asPath == "/") {
    return (
      <Component {...pageProps} />
    )
  }


  return (
    <div>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  )
}

export default MyApp