import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookingPage from './BookingPage';
import AdminSidebar from './AdminSide'; 
import './App.css';
import HelpBot from './HelpBot';

function App() {
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <BookingPage />
              <HelpBot />
            </>
          } 
        />
        <Route path="/admin" element={<AdminSidebar />} />
      </Routes>
    </Router>
  );
}

export default App;