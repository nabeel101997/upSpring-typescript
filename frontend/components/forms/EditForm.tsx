import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Card from '../ui/Card';
import { Formik, Form, FieldArray, Field } from 'formik';
import Select from 'react-select'
import * as Yup from 'yup';
import { TextField } from './TextField';
import classes from './SignUpForm.module.css';
import 'react-toastify/dist/ReactToastify.css';
import { RolesDocument, AllRolesDocument } from '../../Types';

function EditForm(props: any) {
  const { query } = useRouter();
  const [record, setRecord] = useState<RolesDocument>()
  const [allRoles, setAllRoles] = useState<AllRolesDocument>()
  const [allPermissions, setAllPermissions] = useState<AllRolesDocument>()
  const userId = query.record;
  const queryClient = useQueryClient();
  const router = useRouter();

  const initialValues = {
    firstName: record?.name,
    roles: record?.roles,
  }

  const suggestions: any = [];

  allPermissions?.users.map((user: any) => (
    suggestions.push({ value: user._id, label: user.name })
  ))

  useEffect(() => {
    if (!record) {
      getSlectedUserRoles()
      getAllRoles()
      getAllPermissions()
    }
  }, [record, allRoles, allPermissions])


  const getSlectedUserRoles = async () => {
    var headers = {
      'Content-type': 'application/json',
    }
    const response = await fetch(`http://localhost:8080/assign/detail/${userId}`, {
      method: 'GET',
      headers: headers
    });
    const selectedUserRoles = await response.json();
    console.log("SelectedUserRoles", selectedUserRoles)
    setRecord(selectedUserRoles);
  }
  const getAllRoles = async () => {

    var headers = {
      'Content-type': 'application/json',
    }
    const response = await fetch(`http://localhost:8080/roles`, {
      method: 'GET',
      headers: headers
    });
    const allRoles = await response.json();
    console.log("AllRoles", allRoles)
    setAllRoles(allRoles);
  }

  const getAllPermissions = async () => {
    var headers = {
      'Content-type': 'application/json',
    }
    const response = await fetch(`http://localhost:8080/permissions`, {
      method: 'GET',
      headers: headers
    });
    const allPermissions = await response.json();
    console.log("AllPermissions", allPermissions)
    setAllPermissions(allPermissions)
  }

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
    console.log("current Values", values)
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
        onSubmit={(values, formikHelpers) => {
          console.log("current", values)
          formikHelpers.resetForm();
          submitHandler(values)
        }}
        enableReinitialize
        validateOnMount
        render={({ values }) => (
          <Form className={classes.form}>
            <div className={classes.control}>
              <label htmlFor='userName'>UserName</label>
              <TextField type="text" name="firstName" />
            </div>
            <div className={classes.control}>
              <FieldArray
                name="roles"
                render={arrayHelpers => (
                  <div>
                    {values.roles && values.roles.length > 0 ? (
                      values.roles.map((role: any, indexA: number) => (
                        <div key={indexA}>
                          <label htmlFor='role'>Role</label>
                          <Field name={`roles.${indexA}.name`} />
                          <label htmlFor='permission'>Permissions</label>
                          <FieldArray
                            name={`roles.${indexA}.permissions`}
                            render={arrayHelpers => (
                              <div className={classes.control}>
                                {role.permissions && role.permissions.length > 0 ? (
                                  <Select isMulti options={suggestions} defaultValue={role.permissions} />
                                )
                                  : (
                                    <div className={classes.actions}>
                                      <button type="button" onClick={() => arrayHelpers.push('')}>
                                        {/* show this when user has removed all permissions from the list */}
                                        Add a Permission
                                      </button>
                                    </div>
                                  )}
                              </div>
                            )}
                          />
                          <div className={classes.actions}>
                            <button
                              type="button"
                              onClick={() => arrayHelpers.remove(indexA)} // remove a role from the list
                            >
                              Remove Role
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className={classes.actions}>
                        <button type="button" onClick={() => arrayHelpers.push('')}>
                          {/* show this when user has removed all roles from the list */}
                          Add a role
                        </button>
                      </div>
                    )}
                    <div className={classes.actions}>
                      <button type="submit" onClick={() => { console.log("currentValues", values) }}>Submit</button>
                    </div>
                  </div>
                )}
              />
            </div>
          </Form >
        )}
      />
    </Card >
  );
}
export default EditForm;