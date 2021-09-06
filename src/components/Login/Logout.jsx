import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../Actions/user';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { Redirect } from 'react-router-dom';

const Logout = ({ history}) => {


    const user = useSelector(state => state.user)
    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.removeItem('token')
        dispatch(clearUser())
        history.push('/')
    }, [])

    if(isEmpty(user)) {return <Redirect to="/"/>}

    return null;
}
 
export default Logout;