import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Card from '../ui/Card';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextField } from './TextField';
import classes from './SignUpForm.module.css';
import 'react-toastify/dist/ReactToastify.css';


function SignUpForm() {

  interface EnteredData {
    firstName: String;
    lastName: String;
    email: String;
    password: String;
  }

  const router = useRouter();

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  }
  const queryClient = useQueryClient();

  const addRecord = async (enteredMeetupData: EnteredData) => {
    const response = await fetch('http://localhost:8080/users', {
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    queryClient.invalidateQueries("records");
    return data;
  }

  const mutation = useMutation((newRecord: EnteredData) => addRecord(newRecord), { mutationKey: "signUp" });
  const { data, isLoading, isError, error, isSuccess } = mutation;
  toast(data?.message);
  if (data?.status === 201) {
    router.push('/login')
  }

  function submitHandler(values:EnteredData) {
    const meetupData = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,

    };
    mutation.mutate(meetupData);
  }

  const validate = Yup.object().shape({
    firstName: Yup.string().min(2, "Must be more then one character").max(255).required('First Name is required'),
    lastName: Yup.string().min(2, "Must be more than 10 characters").max(255),
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
            <div className={classes.control}>
              <label htmlFor='name'>First Name</label>
              <TextField type="text" name="firstName" />
            </div>
            <div className={classes.control}>
              <label htmlFor='name'>Last Name</label>
              <TextField type="text" name="lastName" />
            </div>
            <div className={classes.control}>
              <label htmlFor='email'>Email</label>
              <TextField type="email" name="email" />
            </div>
            <div className={classes.control}>
              <label htmlFor='password'>Password</label>
              <TextField type="password" name="password" />
            </div>
            <div className={classes.actions}>
              <button disabled={!formik.isValid}>Sign up</button>
            </div>
            <div className={classes.display}>
              <h4 className={classes.h4}>Already have an Account?</h4>
              <a className={classes.a} href='/'>Login</a>
            </div>
          </Form>
        )}
      </Formik>
    </Card>
  );
}

export default SignUpForm;
