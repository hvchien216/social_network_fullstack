import userApi from '@/api/userApi';
import useAuth from '@/contexts/auth';
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  makeStyles,
  TextField,
  Theme,
  Typography
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect } from 'react';
import GoogleLogin from 'react-google-login';
import CustomField from 'src/components/CustomField';
import {
  buttonLinkProps,
  loginProps,
  LoginType,
  refButtonLink
} from 'src/typings';
import * as Yup from 'yup';
const { withTranslation } = require('../utils/i18n');

export const ButtonLink = React.forwardRef<
  refButtonLink,
  buttonLinkProps
>(({ className, href, hrefAs, children, prefetch }, ref) => {
  return (
    <Link href={href} as={hrefAs} prefetch>
      <a ref={ref} className={className}>
        {children}
      </a>
    </Link>
  );
});

function Login({ t }: loginProps) {
  const { login, error, isAuthenticated } = useAuth();
  const router = useRouter();
  if (isAuthenticated) {
    router.replace('/');
  }

  const classes = useStyles();
  const validationSchemaSignIn = Yup.object().shape({
    email: Yup.string()
      .required(t('text-err-email-empty'))
      .email(t('text-err-email-invalid')),

    password: Yup.string().required(t('text-err-pwd-empty'))
  });

  const responseGG = async (res: any): Promise<any> => {
    const { name, email, imageUrl } = res.profileObj;
    const data = {
      typeLogin: LoginType.google,
      email,
      name,
      imageUrl
    };
    await login(data);
  };
  const OAuthLogin: JSX.Element = (
    <div
      style={{
        marginBottom: 20,
        marginTop: 20,
        justifyContent: 'space-around',
        display: 'flex'
      }}>
      <GoogleLogin
        clientId={process.env.NEXT_PUBLIC_GG_CLIENT_ID as string}
        render={({ onClick, disabled }) => (
          <button
            style={{
              border: 'none',
              outline: 'none',
              fontSize: '32px',
              background: 'transparent',
              cursor: 'pointer',
              color: '#db4437'
            }}
            onClick={onClick}
            disabled={disabled}>
            <i className="fab fa-google-plus-g"></i>
          </button>
        )}
        onSuccess={responseGG}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );

  const handleSubmit = async ({
    email,
    password
  }: {
    email: string;
    password: string;
  }): Promise<any> => {
    const data = {
      typeLogin: LoginType.common,
      email,
      password
    };
    await login(data);
  };
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h3" variant="h3">
          {t('text-signin')}
        </Typography>
        {OAuthLogin}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: 2,
            background: '#80808040'
          }}></div>
        <Formik
          initialValues={{
            email:
              process.env.NODE_ENV === 'development'
                ? 'chien@gmail.com'
                : '',
            password:
              process.env.NODE_ENV === 'development' ? 'chien' : ''
          }}
          validationSchema={validationSchemaSignIn}
          onSubmit={(values) => handleSubmit(values)}>
          {(formikProps) => {
            const { isSubmitting } = formikProps;
            return (
              <Form className={classes.form}>
                <CustomField
                  name="email"
                  type="text"
                  label="Email"
                  autoComplete="off"
                />
                <CustomField
                  name="password"
                  type="password"
                  label={t('text-pwd')}
                />
                <p style={{ color: 'red' }}>{error}</p>
                <Grid item xs={12} className={classes.submitBox}>
                  <Button
                    fullWidth
                    type="submit"
                    disabled={isSubmitting}
                    variant="contained"
                    color="primary">
                    {isSubmitting ? (
                      <CircularProgress size={23} />
                    ) : (
                      t('text-signin')
                    )}
                  </Button>
                </Grid>
                <Grid item xs={12} className={classes.submitBox}>
                  <Button
                    fullWidth
                    color="secondary"
                    component={ButtonLink}
                    href="/register">
                    {t('text-dont-have-acc-siginup')}
                  </Button>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Container>
  );
}
const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  submitBox: {
    marginTop: theme.spacing(2)
  }
}));

Login.getInitialProps = async () => {
  return {
    namespacesRequired: ['login-page']
  };
};

export default withTranslation('login-page')(Login);
