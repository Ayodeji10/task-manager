import { useState } from 'react';
import { useTaskManagerContext } from '../context/task-context';
import NoDataPlaceHolder from './no-data-placeholder';
import TaskCard from './task-card';
import Table from 'react-bootstrap/Table';
import DeleteTaskButton from './delete-task-button';
import EditTaskModal from './edit-task-modal';

export default function TaskList() {
  const { tasks, filteredTasks } = useTaskManagerContext();
  const [view, setView] = useState<'card' | 'table'>('card');

  if (tasks.length === 0)
    return (
      <NoDataPlaceHolder text="You have no task, click add button to add tasks" />
    );

  return (
    <>
      {filteredTasks.length === 0 ? (
        <NoDataPlaceHolder />
      ) : (
        <div>
          <div className="toggle">
            <p>Toggle view</p>
            <div>
              <button
                className={view === 'card' ? 'active' : ''}
                id="card"
                onClick={() => setView('card')}
              >
                Cards
              </button>
              <button
                className={view === 'table' ? 'active' : ''}
                id="table"
                onClick={() => setView('table')}
              >
                Table
              </button>
            </div>
          </div>
          <TaskView view={view} />
        </div>
      )}
    </>
  );
}

const TaskView = ({ view }: { view: string }) => {
  const {
    filteredTasks,
    handleSelectedTask,
    editTaskModal,
    toggleEditTaskModal,
  } = useTaskManagerContext();

  return (
    <>
      {view === 'card' ? (
        <div className="task-list">
          {filteredTasks.map((t, i) => (
            <TaskCard key={t.id} taskNumber={i + 1} task={t} />
          ))}
        </div>
      ) : (
        <>
          <Table bordered responsive className="mt-5">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th style={{ width: '40%' }}>Description</th>
                <th>Status</th>
                <th>priority</th>
                <th>Due Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((t, i) => (
                <tr
                  key={i}
                  onClick={() => {
                    handleSelectedTask(t);
                    toggleEditTaskModal();
                  }}
                >
                  <td>{i + 1}</td>
                  <td>{t.title}</td>
                  <td>{t.description}</td>
                  <td>{t.status}</td>
                  <td className={t.priority}>{t.priority}</td>
                  <td>{t.due}</td>
                  <td>
                    <DeleteTaskButton id={t.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
      <EditTaskModal open={editTaskModal} close={toggleEditTaskModal} />
    </>
  );
};
