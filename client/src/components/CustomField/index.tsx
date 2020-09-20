import { useField } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > input': {
      cursor: 'pointer'
    }
  }
}));

function CustomField({ label, disabled, ...props }: any) {
  const classes = useStyles();
  const [field, meta] = useField(props);
  const { error, touched } = meta;
  const isError = error && touched;
  return (
    <>
      <TextField
        {...props}
        {...field}
        className={classes.root}
        variant="outlined"
        margin="normal"
        fullWidth
        error={isError}
        helperText={error}
        label={label && label}
        disabled={disabled}
      />
    </>
  );
}

export default CustomField;
