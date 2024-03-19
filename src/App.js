import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import Index from './components/index';
import UserLogin from './components/user.login';
import UserRegistration from './components/user.registration';
import UserProfile from './components/user.profile';
import About from './components/user.About';
import Admin from './components/Admin/admin';
import AdminLogin from './components/Admin/admin.login';
import AdminReg from './components/Admin/admin.reg';
import RequestEvent from './components/userAdmin/requestEvent';
import EventBudget from './components/userAdmin/eventBudget';
import Payment from './components/userAdmin/payment';
import Paymentdashboard from './components/Admin/paymentdashboard';
import UserAdminDashboard from './components/userAdmin/userAdminDashboard';
import UserDashboard from './components/Admin/userDashboard';
import ReqEventDashboard from './components/Admin/reqEventDashboard';
import FeedBack from './components/userAdmin/feedback';
import FinanceDashboard from './components/Admin/finanaceManagement';
import PlaceDashboard from './components/Admin/placeDashboard';
import Feedbackdashboard from './components/Admin/feedbackdashboard';


function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" >
          <Index />
        </Route>
        <Route path="/Feedbackdashboard" exact component={Feedbackdashboard} />
        <Route path="/PlaceDashboard" exact component={PlaceDashboard} />
        <Route path="/RequestEvent" exact component={RequestEvent} />
        <Route path="/EventBudget" exact component={EventBudget} />
        <Route path="/FinanceDashboard" exact component={FinanceDashboard} />
        <Route path="/ReqEventDashboard" exact component={ReqEventDashboard} />
        <Route path="/Payment" exact component={Payment} />
        <Route path="/Paymentdashboard" exact component={Paymentdashboard} />
        <Route path="/UserDashboard" exact component={UserDashboard} />
        <Route path="/UserAdminDashboard" exact component={UserAdminDashboard} />
        <Route path="/UserLogin" exact component={UserLogin} />
        <Route path="/UserRegistration" exact component={UserRegistration} />
        <Route path="/About" exact component={About} />
        <Route path="/Admin" exact component={Admin} />
        <Route path="/AdminLogin" exact component={AdminLogin} />
        <Route path="/AdminReg" exact component={AdminReg} />
        <Route path="/UserProfile" exact component={UserProfile} />
        <Route path="/FeedBack" exact component={FeedBack} />
      </div>
    </Router>
  );
}

export default App;
