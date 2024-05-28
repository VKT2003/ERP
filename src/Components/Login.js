import React, { useState } from 'react';
import styles from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();

  const [selectRole, setSelectRole] = useState('');
  const [role, setRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [rollNo, setRollNo] = useState(undefined);
  const [password, setPassword] = useState('');

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setSelectRole(selectedRole);

    if (selectedRole === 'admin') {
      setRole('admin');
    } else if (selectedRole === 'teacher') {
      setRole('teacher');
    } else if (selectedRole === 'student') {
      setRole('student');
    } else {
      setRole('');
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    }
    if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
    if (e.target.name === 'rollNo') {
      setRollNo(e.target.value);
    }
  };

  const submitForm = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const data = {
      role,
      email,
      rollNo,
      password
    };

    if (role === 'admin') {
      try {
        const response = await axios.post(`http://localhost:5000/AdminLogin`, data, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        console.log("Response:", response.status);
        if (response.status === 400) {
          setIsLoading(false);
          toast.error("Login failed. Please try again.");
        } else {
          setIsLoading(false);
          const { admin, token } = response.data;
          localStorage.setItem('token', token);
          toast.success("Logged in successfully!");
          setTimeout(() => {
            navigate('/admin');
          }, 3000);
        }
      } catch (error) {
        setIsLoading(false);
        toast.error("An error occurred. Please try again.");
        console.error(error);
      }
    } else {
      setIsLoading(false);
      toast.error("Please select a role.");
    }
  };

  return (
    <div className='main pt-5'>
      <ToastContainer />
      <div className={`${styles.container}`}>
        <div className={`${styles.left}`}>
          <h1>Sign In to Student Attendance Management System</h1>
          <img src="/animated.png" alt="animated" width={400} height={400} />
        </div>
        <div className={`${styles.right}`}>
          <form action="submit" onSubmit={submitForm}>
            <h3 className='text-center'>Login</h3>
            <div className={`form-check d-flex radio ${styles.role}`}>
              <div>
                <select name="role" value={selectRole} id="role" onChange={handleRoleChange}>
                  <option value="Select">--Select Role</option>
                  <option value="admin">admin</option>
                  <option value="teacher">teacher</option>
                  <option value="student">student</option>
                </select>
              </div>
            </div>
            {(role === 'admin' || role === 'teacher') && (
              <div className={`${styles.input}`}>
                <div>
                  <input type="text" id='email' name='email' value={email} required='required' onChange={handleChange} />
                  <span><label htmlFor="email">Email</label></span>
                </div>
                <div>
                  <input type="password" id='password' name='password' value={password} required='required' onChange={handleChange} />
                  <span><label htmlFor="password">Password</label></span>
                </div>
              </div>
            )}
            {role === 'student' && (
              <div className={`${styles.input}`}>
                <div>
                  <input type="text" id='roleNo' name='rollNo' value={rollNo} required='required' onChange={handleChange} />
                  <span><label htmlFor="roleNo">Roll Number</label></span>
                </div>
                <div>
                  <input type="text" id='email' name='email' value={email} required='required' onChange={handleChange} />
                  <span><label htmlFor="email">Email</label></span>
                </div>
                <div>
                  <input type="password" id='password' name='password' value={password} required='required' onChange={handleChange} />
                  <span><label htmlFor="password">Password</label></span>
                </div>
              </div>
            )}
            <div className={`form-check d-flex ${styles.checkbox}`}>
              <div>
                <input className={`${styles.checkboxinput}`} type="checkbox" value="" id="flexCheckDefault" />
                <label className={`form-check-label ${styles.checklabel}`} htmlFor="flexCheckDefault">
                  Keep Me Signed In
                </label>
              </div>
              <div>
                <Link to='/forgotpassword' className={`${styles.forgot}`}>Forgot Password?</Link>
              </div>
            </div>
            <button type="submit" className={`${styles.button}`} >
              {isLoading ? <ColorRing
                visible={true}
                height="40"
                width="40"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={['white', 'white', 'white', 'white', 'white']}
              /> : 'Login'}
            </button>
            <div className={`${styles.noAccount}`}>
              <p>Don't have an Account <Link to={'/register'} className={`${styles.button1}`}>Register</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
