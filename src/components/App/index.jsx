import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import { useApp } from '../../lib/app';
import Loading from '../Loading';
import './App.css';


// Dynamic lazy imports for code splitting based on routes.
const Home = lazy(() => import('../Home'));
const Topics = lazy(() => import('../Topics'));
// const SignIn = lazy(() => import('../SignIn'));
const TopBar = lazy(() => import('../TopBar'));


const App = () => {
  // const { auth } = useApp();

  // if (auth.user === undefined) {
  //   return <Loading />;
  // }

  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <div className="App">
          <TopBar />
          <Switch>
            <Route path="/topics">
              <Topics />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </Suspense>
  );
};

export default App;
