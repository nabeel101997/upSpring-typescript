import { useRouter } from 'next/router';
import Link from 'next/link';
import classes from './MainNavigation.module.css';



const MainNavigation = (props:any) => {
  const data = props?.data?.firstName;
  console.log(data);
  const router = useRouter();
  const logoutHandler = () => {
    window.localStorage.clear();
    props.setData(null);
    router.push('/login')
  }
  return (
    <header className={classes.header}>
      <Link href='/'>
        <a><div className={classes.logo}>upSpring</div></a>
      </Link>
      <nav>
        <ul>
          {!data && (
            <>
              <li>
                <Link href='/'>
                  <a><h5>Register</h5></a>
                </Link>
              </li>
              <li>
                <a href='/login'><h5>Login</h5></a>
              </li>
            </>
          )}

          {data && (
            <>
              <li>
                <a href='/dashboard'>Dashboard</a>
              </li>
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            </>
          )}

        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
