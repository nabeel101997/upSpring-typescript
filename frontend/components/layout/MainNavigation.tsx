import Router from 'next/router';
import Link from 'next/link';

import { useUser } from '../../contexts/user-context';
import classes from './MainNavigation.module.css';

const MainNavigation = (props: any) => {

  const { user, setUser } = useUser()

  const logoutHandler = () => {
    window.localStorage.clear();
    setUser(props.initialUser)
    Router.replace('/');
  }

  return (
    <header className={classes.header}>
      <Link href='/'>
        <a><div className={classes.logo}>upSpring</div></a>
      </Link>
      <nav>
        <ul>
          {!user && (
            <>
              <li>
                <Link href='/signup'>
                  <a><h5>Register</h5></a>
                </Link>
              </li>
              <li>
                <a href='/'><h5>Login</h5></a>
              </li>
            </>
          )}

          {user && (
            <>
              <li>
                <a href='/dashboard'>Dashboard</a>
              </li>
              <li>
                <a href='/users'>users</a>
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
