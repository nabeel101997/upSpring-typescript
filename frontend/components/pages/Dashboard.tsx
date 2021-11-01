import classes from './Dashboard.module.css';


function Dashboard(props: any) {
  return (
    <section className={classes.starting}>
      {props?.user?.data?.firstName === undefined ?
        <h1>You are not Logged_in</h1> :
        <h1>Welcome {props?.user?.data.firstName + " " + props?.user?.data.lastName}!</h1>
      }
    </section>
  );
}

export default Dashboard;
