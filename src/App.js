import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import Index from './components/index';
import UserLogin from './components/user.login';
import UserRegistration from './components/user.registration';
import UserProfile from './components/user.profile';

import About from './components/user.About';
import Admin from './components/Admin/admin';
import AdminLogin from './components/Admin/admin.login';
import AdminReg from './components/Admin/admin.reg';


import { BrowserRouter as Router, Route } from 'react-router-dom'
import RequestEvent from './components/userAdmin/requestEvent';
import AppointmentEdit from './components/userAdmin/appoimentEdit';
import HaircareDashboard from './components/Admin/haircareDashboard';
import Haircare from './components/userAdmin/haircare';
import Nailpedicare from './components/userAdmin/nailpedicare';
import NailpedicareDashboard from './components/Admin/nailpedicareDashboard';
import DressDashboard from './components/Admin/dressDashboard';
import Dress from './components/userAdmin/dress';
import Booking from './components/userAdmin/booking';
import Paymentdashboard from './components/Admin/paymentdashboard';
import UserAdminDashboard from './components/userAdmin/userAdminDashboard';
import ProductDashboard from './components/Admin/productDashboard';
import Product from './components/userAdmin/product';
import PacakageDashboard from './components/Admin/pacakageDashboard';
import Package from './components/userAdmin/package';
import Ownpackage from './components/userAdmin/ownpackage';
import LeaveDashboard from './components/Admin/leaveDashboard';
import AllleavesDashboard from './components/Admin/allleavesDashboard';
import UserDashboard from './components/Admin/userDashboard';
import ReqEventDashboard from './components/Admin/reqEventDashboard';
//devshan


function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" >
          <Index />
        </Route>
        <Route path="/RequestEvent" exact component={RequestEvent} />
        <Route path="/ReqEventDashboard" exact component={ReqEventDashboard} />
        <Route path="/ProductDashboard" exact component={ProductDashboard} />
        <Route path="/AppointmentEdit" exact component={AppointmentEdit} />
        <Route path="/HaircareDashboard" exact component={HaircareDashboard} />
        <Route path="/Haircare" exact component={Haircare} />
        <Route path="/Nailpedicare" exact component={Nailpedicare} />
        <Route path="/NailpedicareDashboard" exact component={NailpedicareDashboard} />
        <Route path="/DressDashboard" exact component={DressDashboard} />
        <Route path="/Dress" exact component={Dress} />
        <Route path="/Booking" exact component={Booking} />
        <Route path="/Paymentdashboard" exact component={Paymentdashboard} />
        <Route path="/Product" exact component={Product} />
        <Route path="/PacakageDashboard" exact component={PacakageDashboard} />
        <Route path="/Package" exact component={Package} />
        <Route path="/Ownpackage" exact component={Ownpackage} />
        <Route path="/LeaveDashboard" exact component={LeaveDashboard} />
        <Route path="/UserDashboard" exact component={UserDashboard} />
        <Route path="/AllleavesDashboard" exact component={AllleavesDashboard} />
        <Route path="/UserAdminDashboard" exact component={UserAdminDashboard} />
        <Route path="/UserLogin" exact component={UserLogin} />
        <Route path="/UserRegistration" exact component={UserRegistration} />
        <Route path="/About" exact component={About} />
        <Route path="/Admin" exact component={Admin} />
        <Route path="/AdminLogin" exact component={AdminLogin} />
        <Route path="/AdminReg" exact component={AdminReg} />
        <Route path="/UserProfile" exact component={UserProfile} />
      </div>
    </Router>
  );
}

export default App;
