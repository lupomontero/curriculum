import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Loading from '../Loading';
import './App.css';


// Dynamic lazy imports for code splitting based on routes.
const Home = lazy(() => import('../Home'));
const Topic = lazy(() => import('../Topic'));
const Project = lazy(() => import('../Project'));
const SignIn = lazy(() => import('../SignIn'));
const TopBar = lazy(() => import('../TopBar'));
const Track = lazy(() => import('../Track'));

const App = () => (
  <Suspense fallback={<Loading />}>
    <Router>
      <div className="App">
        <TopBar />
        <Switch>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/projects/:slug">
            <Project />
          </Route>
          <Route path="/topics/:slug">
            <Topic />
          </Route>
          <Route path="/:track">
            <Track />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  </Suspense>
);

export default App;
