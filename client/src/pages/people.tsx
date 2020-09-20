import Head from 'next/head';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { ProtectRoute } from '@/contexts/auth';
const { withTranslation, i18n } = require('./../utils/i18n');
// import { withTranslation, i18n } from '@utils/i18n';
import Layout from '@/components/Layout';
interface IHomeProps {
  t: any;
}

function People({ t }: IHomeProps) {
  return (
    <Layout>
      <h1>{t('h1')}</h1>
      <button type="button" onClick={() => i18n.changeLanguage('en')}>
        ENGLISH
      </button>
      <button type="button" onClick={() => i18n.changeLanguage('vi')}>
        VIET NAM
      </button>
    </Layout>
  );
}

People.getInitialProps = async () => {
  return {
    namespacesRequired: ['common']
  };
};

// export default ProtectRoute(withTranslation('common')(Home));
export default withTranslation('common')(People);
