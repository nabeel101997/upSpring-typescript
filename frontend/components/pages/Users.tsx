import { useQueryClient, useMutation } from 'react-query';
import classes from './Users.module.css';
import swal from 'sweetalert';


function Dashboard(props: any) {
  const data = props.users;

  console.log(data);
  const queryClient = useQueryClient();
  function editHandler(record: any) {
    console.log("Record", record)

  }

  async function deleteHandler(record: any) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Record!",
      icon: "warning",
      dangerMode: true,
    })
      .then(async (willDelete) => {
        { isError && <div>An error occurred: {error}</div> }
        if (willDelete) {
          const response = await fetch(`http://localhost:8080/users/${record.id}`, {
            method: 'DELETE',
            body: JSON.stringify(record),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          swal("Poof! Your Record has been deleted!", {
            icon: "success",
          });
          const data = await response.json();
          queryClient.invalidateQueries("records")
          return data;
        } else {
          swal("Your Record is safe!");
        }
      });
  }

  const mutation = useMutation((record) => deleteHandler(record), { mutationKey: "delete" });
  const { isLoading, isError, error, isSuccess } = mutation;

  return (
    <>
      <table className={classes.table}>
        <thead>
          <tr>
            <th className={classes.th}>User Name</th>
            <th className={classes.th} >Role</th>
            <th className={classes.th}>Permissions</th>
            <th className={classes.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props?.users?.map((record: any) => (
            <tr key={record.id}>
              <td className={classes.td}>{record.firstName}</td>
              <td className={classes.td}>{record.roles.map((role: any) => role.name)}</td>
              <td className={classes.td}>{record.roles.map((role: any) => role.permissions.map((permission: any) => permission.map((obj: any) => obj.name + " ")))}</td>
              <td className={classes.td}>
                {props?.role.includes("Admin") ?
                  <>
                    <button className={classes.button} onClick={() => editHandler(record)}>Edit</button>
                    {props.user.data.id === record.id ? <></> :
                      <button className={classes.button} onClick={() => mutation.mutate(record)}>Delete</button>
                    }

                  </> : <></>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Dashboard;
