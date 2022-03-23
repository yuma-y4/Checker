import { VFC, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { BrowserRouter } from 'react-router-dom';
import { Route, Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import SignUp from './component/SignUp';
import SignIn from './component/SignIn';
import Dashboard from './component/Dashboard';

const App: VFC = () => {
  const LoginUser = useSelector(selectUser);
  const dispatch = useDispatch();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
          }),
        );
      } else {
        dispatch(logout());
      }
    });
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/timeline" component={Dashboard} />
      {LoginUser.uid ? (
        <Redirect push to="/timeline" />
      ) : (
        <Redirect push to="/signin" />
      )}
    </BrowserRouter>
   );
};
export default App;
