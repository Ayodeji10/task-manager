import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { newTaskSchema, TNewTaskSchema } from '../validations/task';
import { useTaskManagerContext } from '../context/task-context';
import { v4 as uuidv4 } from 'uuid';

type AddTaskModalProps = {
  open: boolean;
  close: () => void;
};

export default function AddTaskModal({ open, close }: AddTaskModalProps) {
  const { handleAddTask } = useTaskManagerContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TNewTaskSchema>({
    resolver: zodResolver(newTaskSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: TNewTaskSchema) => {
    const id = uuidv4();
    handleAddTask({
      id,
      ...data,
    });
    close();
    reset();
  };

  const formattedToday = new Date().toISOString().split('T')[0];

  return (
    <Modal show={open} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label>Title:</label> <input {...register('title')} />
            {errors.title && <p>{errors.title.message}</p>}
          </div>
          <div>
            <label>Description:</label>{' '}
            <textarea {...register('description')}></textarea>
            {errors.description && <p>{errors.description.message}</p>}
          </div>
          <div>
            <label>Due Date:</label>{' '}
            <input type="date" {...register('due')} min={formattedToday} />
            {errors.due && <p>{errors.due.message}</p>}
          </div>
          <div>
            <label className="block font-medium">Priority</label>
            <select {...register('priority')}>
              <option value="" disabled>
                -- Select Priority --
              </option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            {errors.priority && (
              <p className="text-red-500 text-sm">{errors.priority.message}</p>
            )}
          </div>
          <div>
            <label className="block font-medium">Status</label>
            <select {...register('status')}>
              <option value="" disabled>
                -- Select status --
              </option>
              <option value="to-do">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            {errors.priority && (
              <p className="text-red-500 text-sm">{errors.priority.message}</p>
            )}
          </div>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
