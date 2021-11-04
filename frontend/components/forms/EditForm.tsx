import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Card from '../ui/Card';
import { Formik, Form, FieldArray, Field } from 'formik';
import * as Yup from 'yup';
import { TextField } from './TextField';
import classes from './SignUpForm.module.css';
import 'react-toastify/dist/ReactToastify.css';
import { RolesDocument } from '../../Types';


function EditForm(props: any) {
  const { query } = useRouter();
  const [record, setRecord] = useState<RolesDocument>()
  const userId = query.record;
  const user = props.user;

  useEffect(() => {
    if (!record) {
      getRoles()
    }
  }, [record])


  const getRoles = async () => {

    var headers = {
      'Content-type': 'application/json',
    }
    const response = await fetch(`http://localhost:8080/assign/detail/${userId}`, {
      method: 'GET',
      headers: headers
    });
    const data = await response.json();
    console.log("Data", data)
    setRecord(data);
  }
  console.log("Roles", record)
  interface EnteredData {
    firstName: String;
    lastName: String;
    email: String;
    password: String;
  }

  const router = useRouter();
  let userRoles = record?.roles;

  const initialValues = {
    firstName: record?.name,
    roles: record?.roles,
  }


  const queryClient = useQueryClient();

  const addRecord = async (enteredMeetupData: any) => {
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


  const mutation = useMutation((newRecord: any) => addRecord(newRecord), { mutationKey: "signUp" });
  const { data, isLoading, isError, error, isSuccess } = mutation;
  toast(data?.message);
  if (data?.status === 201) {
    router.push('/')
  }

  function submitHandler(values: any) {
    const meetupData = record
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
        render={({ values }) => (
          <Form className={classes.form}>
            <div className={classes.control}>
              <label htmlFor='userName'>UserName</label>
              <TextField type="text" name="firstName" />
            </div>
            <FieldArray
              name="roles"
              render={arrayHelpers => (
                <div>
                  {values.roles && values.roles.length > 0 ? (
                    values.roles.map((role: any, indexA: number) => (
                      <div key={indexA}>
                        <div className={classes.control}>
                          <label htmlFor='role'>Role</label>
                          <Field name={`roles.${indexA}.name`} />
                          <FieldArray
                            name={`roles.${indexA}.permissions`}
                            render={arrayHelpers => (
                              <div>
                                {role.permissions && role.permissions.length > 0 ? (
                                  role.permissions.map((permission: any, indexB: number) => (
                                    <div key={indexB}>
                                      <div className={classes.control}>
                                        <label htmlFor='permission'>Permission</label>
                                        <Field name={`roles.${indexA}.permissions.${indexB}.name`}  />
                                        <div className={classes.actions}>
                                          <button
                                            type="button"
                                            onClick={() => arrayHelpers.remove(indexB)} // remove a friend from the list
                                          >
                                            Remove Permission
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  <div className={classes.actions}>
                                    <button type="button" onClick={() => arrayHelpers.push('')}>
                                      {/* show this when user has removed all friends from the list */}
                                      Add a Permission
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                          />
                          {/* {role.permissions.map((permission: any, indexB: number) => (
                            <div key={indexB}>
                              <label htmlFor='permission'>Permissions</label>
                              <Field name={`roles.${indexA}.permissions.${indexB}.name`} />
                              <div className={classes.actions}>
                                <button
                                  type="button"
                                  onClick={() => console.log("ArrayHelpers",arrayHelpers)} // remove a friend from the list
                                >
                                  Remove Permission
                                </button>
                              </div>
                            </div>
                          ))
                          } */}
                          <div className={classes.actions}>
                            <button
                              type="button"
                              onClick={() => arrayHelpers.remove(indexA)} // remove a friend from the list
                            >
                              Remove Role
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className={classes.actions}>
                      <button type="button" onClick={() => arrayHelpers.push('')}>
                        {/* show this when user has removed all friends from the list */}
                        Add a role
                      </button>
                    </div>
                  )}

                  <div className={classes.actions}>
                    <button type="submit">Submit</button>
                  </div>
                </div>
              )}
            />
          </Form>
        )
        }
      />

      {/* <Form className={classes.form} id='myForm'>
        <div className={classes.control}>
          <label htmlFor='userName'>UserName</label>
          <TextField type="text" name="firstName" />
        </div>
        <FieldArray
          name="roles"
          render={arrayHelpers => (
            < div >
              {record?.roles.map((role: any, indexA: any) => (
                <div key={indexA}>
                  <div className={classes.control}>
                    <label htmlFor='role'>Role</label>
                    <Field type="text" name={`roles.${indexA}`} />
                    <button
                      type="button"
                      onClick={() => arrayHelpers.remove(indexA)} // remove a role from the list
                    >
                      -
                    </button>
                  </div>
                  {role?.permissions.map((permission: any, indexB: any) => (
                    <div key={indexB}>
                      <div className={classes.control}>
                        <label htmlFor='permission'>Permissions</label>
                        <input type="text" name={`permissions.${indexB}`} />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        />
        <div className={classes.actions}>
          <button type='submit' disabled={!formik.isValid}>Save</button>
        </div>
      </Form> */}
      {/* )} */}
      {/* </Formik> */}
    </Card >
  );
}

export default EditForm;

// export const FriendList = () => (
//   <div>
//     <h1>Friend List</h1>
//     <Formik
//       initialValues={{ friends: ['jared', 'ian', 'brent'] }}
//       onSubmit={values =>
//         setTimeout(() => {
//           alert(JSON.stringify(values, null, 2));
//         }, 500)
//       }
//       render={({ values }) => (
//         <Form>
//           <FieldArray
//             name="friends"
//             render={arrayHelpers => (
//               <div>
//                 {values.friends && values.friends.length > 0 ? (
//                   values.friends.map((friend, index) => (
//                     <div key={index}>
//                       <Field name={`friends.${index}`} />
//                       <button
//                         type="button"
//                         onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
//                       >
//                         -
//                       </button>
//                       <button
//                         type="button"
//                         onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
//                       >
//                         +
//                       </button>
//                     </div>
//                   ))
//                 ) : (
//                   <button type="button" onClick={() => arrayHelpers.push('')}>
//                     {/* show this when user has removed all friends from the list */}
//                     Add a friend
//                   </button>
//                 )}
//                 <div>
//                   <button type="submit">Submit</button>
//                 </div>
//               </div>
//             )}
//           />
//         </Form>
//       )}
//     />
//   </div>
// );
