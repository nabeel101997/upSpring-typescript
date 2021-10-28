import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';

function Layout(props: any) {

  const publicRoutes = ["/", "/login"]
  const [data, setData] = useState(null);
  const router = useRouter();
  const successStatus = 200;

  useEffect(() => {
    if (!data) {
      const user = getUser().then(async (userData) => {
        return await userData;
      });

    }
  },)
  const getUser = async () => {
    const token = localStorage.getItem('accessToken');
    const headers = {
      'Content-type': 'application/json',
      'token': 'Bearer ' + token
    }
    const userData = await fetch('http://localhost:8080/users/dashboard', {
      method: 'GET',
      headers: headers
    });
    const userDataRes = await userData.json();
    // if (userDataRes.status === successStatus) {
    //   if (publicRoutes.includes(router.pathname)) {
    //     router.push("/home")
    //   }
    // } else {
    //   router.push("/")
    // }
    return userDataRes;
  }

  return (
    <Fragment>
      <MainNavigation data={data} />
      <main className={classes.main}>{props.children}</main>
    </Fragment>
  );
}

export default Layout;
