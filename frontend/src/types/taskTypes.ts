export interface Task {
  id: number;
  name: string;
  dueDate: string;
  completed: boolean;
}

export interface TaskCategory {
  id: number;
  title: string;
  tasks: Task[];
}
