import React from 'react';
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actions as userActions } from "../reducers/user";

const NavBar = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const logout = () => dispatch(userActions.logout());
  const routes = [
    {path: '/', name: 'Home'},
    {path: '/users', name: 'Users'},
  ]

 return <nav className='navbar radius-2'>
   <div className="logo"><Link to='/'>🗞 Blogs</Link></div>
   <ul>
     {routes.map((route) => <li key={route.path}>
       <NavLink to={route.path}>{route.name}</NavLink>
     </li>)}
   </ul>

   {user && <p className='user-info'>
     {user.name || user.username} is logged in
     <button onClick={logout} className="link">Logout</button>
   </p>}
 </nav>
}

export default NavBar
