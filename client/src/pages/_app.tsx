import { AuthProvider } from '@/contexts/auth';
import { DarkModeProvider } from '@/contexts/darkmode';
import store from '@/redux/store';
import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
const { appWithTranslation } = require('@/utils/i18n');
const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <DarkModeProvider>
        <Provider store={store}>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </Provider>
      </DarkModeProvider>
    </>
  );
};

MyApp.getInitialProps = async (ctx: AppContext) => ({
  ...(await App.getInitialProps(ctx))
});

export default appWithTranslation(MyApp);
