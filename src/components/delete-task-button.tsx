import { TrashIcon } from '../icons';
import { useTaskManagerContext } from '../context/task-context';

export default function DeleteTaskButton({ id }: { id: string }) {
  const { handleRemoveTask } = useTaskManagerContext();

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleRemoveTask(id);
      }}
    >
      <TrashIcon height={22} width={22} />
    </button>
  );
}
