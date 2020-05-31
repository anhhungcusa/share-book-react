import React, { useEffect } from 'react';
import './App.css';
import { DataProvider } from './context/DataProvider';
import { Header } from './components/Header/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { LoginPage } from './pages/Login/Login';
import { RegisterPage } from './pages/Register/Register';

function App() {
  useEffect(() => {
    document.title = 'Share Book'
  }, [])
  return (
    <div className="App">
      <Router>
        <DataProvider>
          <Header title='Share Book' />
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/register">
              <RegisterPage />
            </Route>
          </Switch>
        </DataProvider>
      </Router>
    </div>
  );
}

export default App;
