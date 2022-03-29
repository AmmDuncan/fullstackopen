import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { actions as usersActions } from "../reducers/users";
import { Link } from "react-router-dom";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  useEffect(() => {
    dispatch(usersActions.fetchAll());
  }, [dispatch]);

  return <React.Fragment>
    <h2>Users</h2>
    <table>
      <thead>
      <tr>
        <th />
        <th>Blogs created</th>
      </tr>
      </thead>
      <tbody>
      {users.map(user => <tr key={user.id}>
        <td><Link to={`/users/${user.id}`}>{user.name || user.username}</Link></td>
        <td>{user.blogs.length}</td>
      </tr>)}
      </tbody>
    </table>
  </React.Fragment>;
};

export default Users;
