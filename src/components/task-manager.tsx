import TaskFilter from './search-filter';
import TaskList from './task-list';
import AddTaskButton from './add-task-button';
import { useTaskManagerContext } from '../context/task-context';

export default function TaskManager() {
  const { tasks } = useTaskManagerContext();

  return (
    <div className="wrapper">
      <h1 id="heading">Task Manager ({tasks.length} total task(s))</h1>
      <AddTaskButton />
      <TaskFilter />
      <TaskList />
    </div>
  );
}
