
import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AutenticacaoProvider } from '../contexts/AutenticacaoContext';
import GlobalStyle from '../../styles/globals'
import { ThemesProvider } from '../contexts/ThemeContext'
import { Loading } from '../components/Loading';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemesProvider>
        <GlobalStyle />
        <AutenticacaoProvider>
          <Loading/>
          <Component {...pageProps} />
        </AutenticacaoProvider>

      </ThemesProvider>
    </>

  )
}

export default MyApp
