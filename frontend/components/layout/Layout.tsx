import { Fragment, useEffect } from 'react';
import { useUser, useRole } from '../../contexts/user-context'
import Router from 'next/router';
import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';

function Layout(props: any) {

  const publicRoutes = ["/", "/signup"]
  const successStatus = 200;
  const { user, setUser } = useUser()
  const { role, setRole } = useRole()

  useEffect(() => {
    if (!user) {
      getProfile()
      getRoles()
    }
  }, [user])

  const getProfile = async () => {
    const token = localStorage.getItem('accessToken');
    var headers = {
      'Content-type': 'application/json',
      'token': 'Bearer ' + token
    }
    const response = await fetch('http://localhost:8080/users/dashboard', {
      method: 'GET',
      headers: headers
    });
    const data = await response.json();
    if (data.status === successStatus) {
      console.log("User", data)
      setUser(data)
      if (publicRoutes.includes(Router.pathname)) {
        Router.push("/home")


      }
    }
    else
      Router.push('/')
  }

  const getRoles = async () => {
    const token = localStorage.getItem('accessToken');
    var headers = {
      'Content-type': 'application/json',
      'token': 'Bearer ' + token
    }
    const response = await fetch('http://localhost:8080/assign/current-user', {
      method: 'GET',
      headers: headers
    });
    const data = await response.json();

    console.log("Roles", data)
    setRole(data)
  }

  return (
    <Fragment>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </Fragment>
  );
}

export default Layout;
