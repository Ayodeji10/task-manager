export type TTask = {
  id: string;
  title: string;
  description: string;
  due: string;
  priority: 'low' | 'medium' | 'high';
  status: 'to-do' | 'in-progress' | 'done';
};
