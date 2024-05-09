import './Layout.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../../../pages/home/Home';
import Zipcode from '../../../pages/zipcode/Zipcode';
import GenericToast from '../../../shared/components/toast/Toast';

export default Layout;

function Layout() {

    return (
        <Router>
            <div className='layout-container'>
                <GenericToast/>
                <div className="page-content">
                <Routes>
                    <Route path="/" element={<Zipcode/>} />
                    <Route path="/home" element={<Home/>} />
                </Routes>
                </div>
            </div>
        </Router>
    );
}