import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookingPage from './BookingPage';
import AdminSidebar from './AdminSide'; 
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookingPage />} />
        <Route path="/admin" element={<AdminSidebar />} />
      </Routes>
    </Router>
  );
}

export default App;