import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import EmployeeDetail from './components/EmployeeDetail';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { AuthProvider } from './components/AuthProvider';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/add" element={<EmployeeForm />} />
          <Route path="/edit/:id" element={<EmployeeForm />} />
          <Route path="/detail/:id" element={<EmployeeDetail />} />
          <Route path="/signup" element={<SignUp />} />
          <Route exact path='/' element={<EmployeeList />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
