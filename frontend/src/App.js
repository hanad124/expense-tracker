import logo from './logo.svg';
import './App.css';
import './resources/authentication.css'
import './resources/transactions.css'
import {Button} from 'antd';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AOS from 'aos'
import VerifyEmail from './pages/verifyEmail';
import ProtectedRoute from './components/ProtectedRoute';
import VerifyEmailLink from './pages/VerifyEmailLink';
import ResetPassword from './pages/ResetPassword';
import ResetPasswordLink from './pages/resetPasswordLink';
import LandingPage from './pages/LandingPage';
import PublicRoute from './components/PublicRoute';
import UpdateEmail from './pages/UpdateEmail';
import UpdatePassword from './pages/UpdatePassword';

function App() {
  AOS.init()
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicRoute><LandingPage/></PublicRoute>}/>
        <Route path="/login" element={<PublicRoute><Login/></PublicRoute>}/>
        <Route path="/register" element={<PublicRoute><Register/></PublicRoute>}/>
        <Route path="/verifyemail/:id" element={<PublicRoute><VerifyEmail/></PublicRoute>}/>
        <Route path="/verifyEmailLink" element={<PublicRoute><VerifyEmailLink/></PublicRoute>}/>
        <Route path="/resetPasswordLink" element={<PublicRoute><ResetPasswordLink/></PublicRoute>}/>
        <Route path="/resetpassword/:id" element={<PublicRoute><ResetPassword/></PublicRoute>}/>
        <Route path="/updateEmail" element={<ProtectedRoute><UpdateEmail/></ProtectedRoute>}/>
        <Route path="/updatePassword" element={<ProtectedRoute><UpdatePassword/></ProtectedRoute>}/>
        <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
      </Routes>
    </Router>
  );
}

export default App;
