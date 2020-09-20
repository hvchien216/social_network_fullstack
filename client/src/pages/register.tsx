import useAuth from '@/contexts/auth';
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  makeStyles,
  Theme,
  Typography
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import CustomField from 'src/components/CustomField';
import * as Yup from 'yup';
import { ButtonLink } from './login';
const { withTranslation } = require('../utils/i18n');

export interface registerProps {
  t: (text: string) => string;
}

function Register({ t }: registerProps) {
  const classes = useStyles();
  const router = useRouter();
  const { register, error, isAuthenticated } = useAuth();
  if (isAuthenticated) {
    router.replace('/');
  }
  const validationSchemaSignIn = Yup.object().shape({
    name: Yup.string().required(t('text-err-name-empty')),
    email: Yup.string()
      .required(t('text-err-email-empty'))
      .email(t('text-err-email-invalid')),
    password: Yup.string().required(t('text-err-pwd-empty'))
  });

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {t('text-signup')}
        </Typography>

        <Formik
          initialValues={{
            name: '',
            email: '',
            password: ''
          }}
          validationSchema={validationSchemaSignIn}
          onSubmit={async (values) => {
            await register(values);
          }}>
          {(formikProps) => {
            const { isSubmitting } = formikProps;
            return (
              <Form className={classes.form}>
                <CustomField
                  name="name"
                  type="text"
                  label={t('text-name')}
                  autoComplete="off"
                />
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
                      t('text-signup')
                    )}
                  </Button>
                </Grid>
                <Grid item xs={12} className={classes.submitBox}>
                  <Button
                    fullWidth
                    color="secondary"
                    component={ButtonLink}
                    href="/login">
                    {t('back-to-signin-page')}
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
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },

  submitBox: {
    marginTop: theme.spacing(2)
  }
}));

Register.getInitialProps = async () => {
  return {
    namespacesRequired: ['register-page']
  };
};

export default withTranslation('register-page')(Register);
