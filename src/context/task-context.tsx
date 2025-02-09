import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useLocalStorage, useToggle } from 'usehooks-ts';
import { TTask } from '../types';
import { TASKS_KEY } from '../contants';
import { toast } from 'react-toastify';

type TTaskManagerContext = {
  tasks: TTask[];
  filteredTasks: TTask[];
  handleAddTask: (task: TTask) => void;
  handleRemoveTask: (taskId: string) => void;
  handleFilterTask: (tasks: TTask[]) => void;
  selectedTask: TTask | null;
  handleSelectedTask: (task: TTask) => void;
  editTaskModal: boolean;
  toggleEditTaskModal: () => void;
  handleEditTask: (id: string, task: TTask) => void;
};

export const TaskManagerContext = createContext<TTaskManagerContext | null>(
  null
);

export const TaskManagerContextProvider = ({ children }: PropsWithChildren) => {
  const [pageLoading, setPageLoading] = useState(true);
  const [tasks, setTasks] = useLocalStorage<TTask[]>(TASKS_KEY, []);
  const [filteredTasks, setFilteredTasks] = useState<TTask[]>([]);
  const [selectedTask, setSelectedTask] = useState<TTask | null>(null);
  const [editTaskModal, toggleEditTaskModal] = useToggle();

  useEffect(() => {
    if (tasks) {
      setPageLoading(false);
    }
  }, [tasks]);

  // add task
  const handleAddTask = (task: TTask) => {
    setTasks((prev: TTask[]) => [...prev, task]);
    toast.success('Task added successfully');
  };

  // remove task
  const handleRemoveTask = (taskId: string) => {
    const filteredTasks = tasks.filter((t) => t.id !== taskId);
    setTasks(filteredTasks);
    toast.success('Task removed');
  };

  // handle filter tasks
  const handleFilterTask = useCallback((tasks: TTask[]) => {
    setFilteredTasks(tasks);
  }, []);

  // select task
  const handleSelectedTask = (task: TTask) => {
    setSelectedTask(task);
  };

  // edit task
  const handleEditTask = (id: string, task: TTask) => {
    const editedTasks = tasks.map((t) => (t.id === id ? task : t));
    setTasks(editedTasks);
    toast.success('Task edited successfully');
  };

  if (pageLoading) return <p>loading...</p>;

  return (
    <TaskManagerContext.Provider
      value={{
        tasks,
        filteredTasks,
        handleAddTask,
        handleRemoveTask,
        handleFilterTask,
        selectedTask,
        handleSelectedTask,
        editTaskModal,
        toggleEditTaskModal,
        handleEditTask,
      }}
    >
      {children}
    </TaskManagerContext.Provider>
  );
};

export function useTaskManagerContext() {
  const context = useContext(TaskManagerContext);
  if (!context) {
    throw new Error(
      "'useTaskManagerContext' must be used within 'TaskManager'"
    );
  }
  return context;
}
