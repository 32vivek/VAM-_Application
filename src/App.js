
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
            </Route>
            {/* </Route> */}
          </Routes>
        </TokenRefresh>
      </BrowserRouter>
    </div>
  );
}

export default App;
