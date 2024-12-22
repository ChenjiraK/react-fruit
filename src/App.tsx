import React from 'react';
import { ToastContainer } from './components/Alert/Alert.tsx';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Routes from './routes';

const App: React.FC = () => {
   return (
      <div id="root" className="font-medium">
         <Router basename="/react-fruit">
            <nav className='font-bold text-center py-4'>
               <Link to="/" className='px-4 underline'>Auto Delete Todo List</Link> |
               <Link to="/group-data" className='px-4 underline'>Group data from API</Link>
            </nav>
            <ToastContainer />
            <Routes />
         </Router>
      </div>
   );
};

export default App;
