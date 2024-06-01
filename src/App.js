
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PersistentDrawerLeft from './components/layout/Layout';
import Home from './pages/Home';
import UserForm from "./pages/UserForm";
import SignInSide from './components/sign-in/SignIn';
import SingUpInSide from './components/sign-up/sign-up';
import Todays_Visitor from './pages/totalvisitor/Today';
import ThisWeekVisitor from './pages/totalvisitor/ThisWeek';
import ThisMonthVisitor from './pages/totalvisitor/ThisMonth';
import TokenRefresh from './components/refreshToken';
import PrivateRoutes from './components/Protected';
import VisitorStatus from './pages/totalvisitor/AllVisitors';
import VisitedPurpose from './pages/totalvisitor/VisitedPurpose';
import VisitedDepartment from './pages/totalvisitor/VisitedDepartment';
import VisitedStatus from './pages/totalvisitor/VisitorStatus';
import VisitorActivity from './pages/visitorEntry/VisitorEntry';
import AddPreVisitors from './pages/visitorEntry/AddPreVisitors';
import AddInstantVisitors from './pages/visitorEntry/AddinstantVisitors';
import PreRequest from './pages/visitorEntry/PreRequest';
import ViewDepartment from './pages/settings/department/ViewDepartment';
import ViewContact from './pages/settings/department/Contact';
import User from './pages/settings/department/User';
import Purpose from './pages/startingup/Purpose';
import Plant from './pages/startingup/Plant';
import UnitSettings from './pages/startingup/UnitSettings';
import SummaryReport from './pages/startingup/SummaryReport';
import DriverLicence from './pages/startingup/DriverLicence';
import VehicleLicence from './pages/startingup/VehicleLicence';
import UserProfile from './pages/userdetails/UserProfile';
import UserFeedback from './pages/userdetails/UserFeedback';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <TokenRefresh>
          <Routes>
            {/* <Route element={<PrivateRoutes />}> */}
            <Route path='/' element={<SignInSide />} />
            <Route path='/signup' element={<SingUpInSide />} />
            <Route path='/' element={<PersistentDrawerLeft />}>
              <Route path="/home" element={<Home />} >
                <Route path='/home/today' element={<Todays_Visitor />} />
                <Route path="/home/week" element={<ThisWeekVisitor />} />
                <Route path="/home/month" element={<ThisMonthVisitor />} />
              </Route>
              <Route path='/userform' element={<UserForm />} />
              <Route path='/dashboard/visitorsstatus' element={<VisitorStatus />}>
                <Route path='/dashboard/visitorsstatus/status' element={<VisitedStatus />} />
                <Route path='/dashboard/visitorsstatus/purpose' element={<VisitedPurpose />} />
                <Route path='/dashboard/visitorsstatus/department' element={<VisitedDepartment />} />
              </Route>
              <Route path="/visitor/visitoractivity" element={<VisitorActivity />} >
                <Route path="/visitor/visitoractivity" element={<AddInstantVisitors />} />
                <Route path="/visitor/visitoractivity/addprevisitors" element={<AddPreVisitors />} />
              </Route>
              <Route path='/visitor/prerequest' element={<PreRequest />} />
              <Route path='/settings/department' element={<ViewDepartment />} />
              <Route path='/settings/contact' element={<ViewContact />} />
              <Route path='/settings/user' element={<User />} />
              <Route path='/startingup/purpose' element={<Purpose />} />
              <Route path='/startingup/plant' element={<Plant />} />
              <Route path='/startingup/unit' element={<UnitSettings />} />
              <Route path='/startingup/summary' element={<SummaryReport />} />
              <Route path='/startingup/dl' element={<DriverLicence />} />
              <Route path='/startingup/vl' element={<VehicleLicence />} />
              <Route path='/userprofile' element={<UserProfile />} />
              <Route path='/userfeedback' element={<UserFeedback />} />
            </Route>
            {/* </Route> */}
          </Routes>
        </TokenRefresh>
      </BrowserRouter>
    </div>
  );
}

export default App;
