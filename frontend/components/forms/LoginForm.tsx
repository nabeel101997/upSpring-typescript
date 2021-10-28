import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import Card from '../ui/Card';
import { Formik, Form } from 'formik';
import { userLogin } from '../../queries';
import { useRouter } from 'next/router';
import classes from './LoginForm.module.css';
import * as Yup from 'yup';
import { TextField } from './TextField';
import 'react-toastify/dist/ReactToastify.css';


function LoginForm() {

  interface LoginData {
    email: string;
    password: string
  }
  const router = useRouter();

  const initialValues = {
    email: '',
    password: '',
  }

  const mutation = useMutation((newLogin: LoginData) => userLogin(newLogin), { mutationKey: "login" });
  const { data, isLoading, isError, error, isSuccess } = mutation;
  toast(data?.message);
  if (data?.status === 200) {
    window.localStorage.setItem("accessToken", data?.accessToken);
    router.push('/home');
  }

  function submitHandler(values: LoginData) {
    const loginData = {
      email: values.email,
      password: values.password,
    };
    mutation.mutate(loginData);
  }

  const validate = Yup.object().shape({
    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
    password: Yup.string().max(255).required('Password is required'
    )
  });

  return (
    <Card>
      <Formik
        initialValues={initialValues}
        validationSchema={validate}
        onSubmit={(values) => submitHandler(values)}
        enableReinitialize
        validateOnMount
      >
        {formik => (
          <Form className={classes.form} id='myForm'>
            <TextField type="hidden" name="id" />
            <div className={classes.control}>
              <label htmlFor='email'>Email</label>
              <TextField type="email" name="email" />
            </div>
            <div className={classes.control}>
              <label htmlFor='password'>Password</label>
              <TextField type="password" name="password" />
            </div>
            <div className={classes.actions}>
              <button disabled={!formik.isValid}>Login</button>
            </div>
            <div className={classes.display}>
              <h4 className={classes.h4}>Dont have an Account?</h4>
              <a className={classes.a} href='/signup'>SignUp</a>
            </div>
          </Form>
        )}
      </Formik>
    </Card>
  );
}

export default LoginForm;
