import '../styles/globals.css';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import Theme from '../staticTheme/Theme';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={Theme}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default MyApp;
