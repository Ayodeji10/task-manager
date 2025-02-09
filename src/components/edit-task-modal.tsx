import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { newTaskSchema, TNewTaskSchema } from '../validations/task';
import { useTaskManagerContext } from '../context/task-context';
import { useEffect } from 'react';

type EditTaskModalProps = {
  open: boolean;
  close: () => void;
};

export default function EditTaskModal({ open, close }: EditTaskModalProps) {
  const { selectedTask, handleEditTask } = useTaskManagerContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<TNewTaskSchema>({
    resolver: zodResolver(newTaskSchema),
  });

  const onSubmit = (data: TNewTaskSchema) => {
    if (selectedTask) {
      handleEditTask(selectedTask.id, { id: selectedTask.id, ...data });
    }
    close();
    reset();
  };

  useEffect(() => {
    if (selectedTask) {
      setValue('title', selectedTask.title);
      setValue('description', selectedTask.description);
      setValue('priority', selectedTask.priority);
      setValue('status', selectedTask.status);
      setValue('due', selectedTask.due);
    }
  }, [selectedTask, setValue]);

  const formattedToday = new Date().toISOString().split('T')[0];

  return (
    <Modal show={open} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)} className="edit-task space-y-4">
          <p>
            Title: <span>{selectedTask?.title}</span>
          </p>
          <p>
            Description: <span>{selectedTask?.description}</span>
          </p>
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
            Save
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
