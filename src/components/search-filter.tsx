import { useEffect, useState, useCallback } from 'react';
import { useDebounceValue } from 'usehooks-ts';
import { toast } from 'react-toastify';
import { useTaskManagerContext } from '../context/task-context';

export default function TaskFilter() {
  const { tasks, handleFilterTask } = useTaskManagerContext();

  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearch] = useDebounceValue(searchValue, 500);
  const [selectedPriority, setSelectedPriority] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Handle Start Date Change (Avoid unnecessary updates)
  const handleStartDateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newStartDate = e.target.value;
      if (newStartDate !== startDate) {
        setStartDate(newStartDate);
        if (endDate && new Date(newStartDate) > new Date(endDate)) {
          setError('Start date cannot be greater than end date.');
        } else {
          setError('');
        }
      }
    },
    [startDate, endDate]
  );

  // Handle End Date Change (Avoid unnecessary updates)
  const handleEndDateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newEndDate = e.target.value;
      if (newEndDate !== endDate) {
        setEndDate(newEndDate);
        if (startDate && new Date(startDate) > new Date(newEndDate)) {
          setError('Start date cannot be greater than end date.');
        } else {
          setError('');
        }
      }
    },
    [endDate, startDate]
  );

  // Reset Filters
  const resetFilters = useCallback(() => {
    setSearchValue('');
    setSelectedPriority('');
    setStartDate('');
    setEndDate('');
    setError('');
  }, []);

  // handle filter
  useEffect(() => {
    if (error) {
      handleFilterTask(tasks);
      return;
    }

    const newFilteredTasks = tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        task.description.toLowerCase().includes(debouncedSearch.toLowerCase());

      const matchesPriority = selectedPriority
        ? task.priority === selectedPriority
        : true;

      const taskDueDate = new Date(task.due);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      const matchesDate =
        (!start || taskDueDate >= start) && (!end || taskDueDate <= end);

      return matchesSearch && matchesPriority && matchesDate;
    });

    handleFilterTask(newFilteredTasks);
  }, [
    tasks,
    debouncedSearch,
    selectedPriority,
    startDate,
    endDate,
    error,
    handleFilterTask,
  ]);

  return (
    <div className="filter">
      <p>Filter Tasks:</p>
      <div>
        <label htmlFor="search">Search tasks</label>
        <input
          type="text"
          id="search"
          placeholder="Search tasks"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="priority">Select Priority</label>
        <select
          id="priority"
          value={selectedPriority}
          onChange={(e) => setSelectedPriority(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div>
        <label htmlFor="start-date">Select Start Date</label>
        <input
          id="start-date"
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
          className="border p-2 rounded w-full"
        />
      </div>
      <div>
        <label htmlFor="end-date">Select End Date</label>
        <input
          id="end-date"
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
          className="border p-2 rounded w-full"
        />
      </div>
      <button
        onClick={resetFilters}
        className="border p-2 rounded bg-gray-200 hover:bg-gray-300"
      >
        Reset Filters
      </button>
    </div>
  );
}
