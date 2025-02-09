import './App.css';
import TaskManager from './components/task-manager';
import { TaskManagerContextProvider } from './context/task-context';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <TaskManagerContextProvider>
      <ToastContainer />
      <TaskManager />
    </TaskManagerContextProvider>
  );
}

export default App;
