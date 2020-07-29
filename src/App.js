import React from 'react';
import './App.css';
import AddProject from './components/projects/AddProject';
import ProjectList from './components/projects/ProjectsList';
import NavBar from './components/NavBar';
import { Switch, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import ProjectDetails from './components/projects/ProjectDetails';
import TaskDetails from './components/tasks/TaskDetails';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/">
          <h1>Homepage</h1>
        </Route>
        <Route exact path="/projects" component={ProjectList} />
        <Route exact path="/projects/:id" component={ProjectDetails} />
        <Route exact path="/projects/:id/tasks/:taskId" component={TaskDetails} />
      </Switch>
    </div>
  );
}

export default App;
