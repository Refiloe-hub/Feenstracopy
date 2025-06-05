import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookingPage from './BookingPage';
import AdminSidebar from './AdminSide'; 
import './App.css';
import HelpBot from './HelpBot';
import LeaseAutomation from './LeaseAutomation';
import RegistrationForm from './RegistrationForm'
import PersonalInformation from './PersonalInfo';
import InstitutionInfo from './InstitutionInfo';
import GuarantorInfo from './Guarantor';
import ApplicationPeriod from './ApplicationPeriod'




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
        <Route path="/lease-automation" element={<LeaseAutomation />} />
        <Route path="/registration-form" element={<RegistrationForm />} />
        <Route path="/personal-infomation" element={<PersonalInformation />} />
        <Route path="/institution-info" element={<InstitutionInfo />} />
        <Route path="/guarantor-info" element={<GuarantorInfo />}  />
        <Route path="/application-period" element={<ApplicationPeriod />} />
    
       
        
        
      </Routes>
    </Router>
  );
}

export default App;
