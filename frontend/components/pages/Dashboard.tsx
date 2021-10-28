import classes from './Dashboard.module.css';


function Dashboard(props:any) {
  return (
    <section className={classes.starting}>
      <h1>Welcome {props?.records?.firstName + " " + props?.records?.lastName}!</h1>
    </section>
  );
}

export default Dashboard;
