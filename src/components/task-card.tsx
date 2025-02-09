import { TTask } from '../types';
import { useTaskManagerContext } from '../context/task-context';
import DeleteTaskButton from './delete-task-button';

export default function TaskCard({
  taskNumber,
  task,
}: {
  taskNumber: number;
  task: TTask;
}) {
  const { handleSelectedTask, toggleEditTaskModal } = useTaskManagerContext();

  return (
    <>
      <div
        className="task"
        onClick={() => {
          handleSelectedTask(task);
          toggleEditTaskModal();
        }}
      >
        <div className="task-bar">
          <h5>{taskNumber}</h5>
          <DeleteTaskButton id={task.id} />
        </div>
        <div className="task-body">
          <div>
            <h3>Title</h3>
            <p>{task.title}</p>
          </div>
          <div>
            <h3>Description</h3>
            <p>{task.description}</p>
          </div>
          <div>
            <h3>Status</h3>
            <p>{task.status}</p>
          </div>
          <div>
            <h3>Priority</h3>
            <p className={task.priority}>{task.priority}</p>
          </div>
          <div>
            <h3>Date Due</h3>
            <p>{task.due}</p>
          </div>
        </div>
      </div>
    </>
  );
}
