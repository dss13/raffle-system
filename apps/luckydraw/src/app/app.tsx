import styles from './app.module.scss';

import { ReactComponent as Logo } from './logo.svg';
import star from './star.svg';

import { Route, Link } from 'react-router-dom';
import Login from './components/login';
import { Dashboard } from './components/dashboard';
import { AdminDashboard } from './components/admin-dashboard';
import { AdminLogin } from './components/admin-login';

export function App() {
  return (

      <div className={styles.app}>
        <Route
          path="/"
          exact
          component={Login}
        />
        <Route
          path="/admin"
          exact
          component={AdminLogin}
        />
        <Route
          path="/admin/dashboard"
          exact
          component={AdminDashboard}
        />
        <Route
            path="/dashboard"
            exact
            component={Dashboard}
        />
        {/* END: routes */}
      </div>

  );
}

export default App;
