import AddTaskModal from './add-task-modal';
import { useToggle } from 'usehooks-ts';

export default function AddTaskButton() {
  const [addTaskModal, toggleAddTaskModal] = useToggle();

  return (
    <>
      <button className="add-task-btn" onClick={toggleAddTaskModal}>
        Add Task
      </button>
      <AddTaskModal open={addTaskModal} close={toggleAddTaskModal} />
    </>
  );
}
