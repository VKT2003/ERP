import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate} from "react-router-dom";
import Home from './Components/Home';
import TeachersPage from './Components/TeachersPage';
import StudentsPage from './Components/StudentsPage';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import { useEffect, useState } from 'react';
import Register from './Components/Register';
import AdminDashboard from './Components/Admin/AdminDashboard';
import Analysis from './Components/Admin/Analysis';
import { MenuContext,menu } from './Context/OpenMenu';
import AppRouters from './Routers';

function App() {

  const [progress, setProgress] = useState(0);

  const [openSide, setOpenSide] = useState(menu.open)

  function toggleMenu() {
    openSide === menu.open ? setOpenSide(!menu.open) : setOpenSide(menu.open)
  }

  useEffect(() => {
    const progressListener = () => {
      setProgress(100); // Set the loading bar to 100% when route changes
      setTimeout(() => setProgress(0), 500); // Reset the loading bar after a short delay
    };

    // Add event listener for route changes
    window.addEventListener('routeChangeComplete', progressListener);

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener('routeChangeComplete', progressListener);
    };
  }, []);
  return (
    <MenuContext.Provider value={{ openSide, toggleMenu }}>
      <AppRouters />
      {/* <LoadingBar color='#f11946' progress={progress} height={3} /> */}
      {/* <Navbar />  */}
    </MenuContext.Provider>
  );
}

export default App;
