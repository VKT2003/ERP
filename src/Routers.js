import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import TeachersPage from './Components/TeachersPage';
import StudentsPage from './Components/StudentsPage';
import Login from './Components/Login';
import Register from './Components/Register';
import AdminDashboard from './Components/Admin/AdminDashboard';
import Analysis from './Components/Admin/Analysis';
// import { MenuContext, menu } from './Context/OpenMenu';
import { jwtDecode } from "jwt-decode";

const Routers = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [token,setToken] = useState('')
  const [session,setSession] = useState('')

  useEffect(()=>{
    setToken(localStorage.getItem('token'));
    try{
      if(token){
        setSession(jwtDecode(token));
        if((location.pathname === '/' || location.pathname === '/register') && session.role === 'Admin'){
          navigate('/admin')
        }
        if(session.role === 'teacher'){
          navigate('/teacher')
        }
        if(session.role === 'student'){
          navigate('/student')
        }
      }
    }catch(error){
      console.error(error)
    }
  },[token,navigate])

  useEffect(() => {
    // Function to fetch user details
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/adminData`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const res = await response.json();
        console.log(res)
        if(res.message === 'Failed to authenticate token'){
          localStorage.removeItem('token');
          navigate('/')
        }
        if (response.ok) {
          const data = await response.json();
        } else {
          console.error('Failed to fetch user details');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    if (token) {
      fetchUserDetails();
    }
  }, [token]);

  useEffect(()=>{
    if(token === null){
      navigate('/')
    }
  },[token])

  useEffect(() => {
    if ((location.pathname === '/login') && !token) {
      navigate('/');
    }
  }, [location, navigate,token]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/teacher" element={<TeachersPage />} />
      <Route path="/student" element={<StudentsPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<AdminDashboard token={token} session={session}/>} />
      <Route path="/admin/analysis" element={<Analysis />} />
    </Routes>
  );
};

const AppRouters = ({token}) => (
  <Router>
    <Routers token={token} />
  </Router>
);

export default AppRouters;
