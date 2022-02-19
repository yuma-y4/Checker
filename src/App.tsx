import { Routes, Route } from 'react-router-dom';
import { VFC } from 'react';
import SignUp from './component/SignUp';
import SignIn from './component/SignIn';
import Dashboard from './component/Dashboard';
import NoMatch from './component/NoMatch';

const App: VFC = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/signin" element={<SignIn />} />
    <Route path="*" element={<NoMatch />} />
  </Routes>
);

export default App;
