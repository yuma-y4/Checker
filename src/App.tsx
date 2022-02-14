import { Route, Routes } from 'react-router';
import { VFC } from 'react';
import SignUp from './component/SignUp';
import SignIn from './component/SignIn';
import Dashboard from './component/Dashboard';

const App: VFC = () => (
  <div>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  </div>
);
export default App;
