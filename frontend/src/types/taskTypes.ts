export interface TaskType {
  id: string; // For existing tasks
  title: string;
  due_date: string;
  category: string;
  notes?: string;
  completed: boolean;
}

export type CreateTaskInput = Omit<TaskType, "id">; // For new tasks without 'id'

export interface ProgressBarProps {
  completed: number;
  total: number;
}

export interface CategoryDropdownProps {
  category: string;
  tasks: TaskType[];
  onAddTask: () => void;
  onEditTask: (task: TaskType) => void;
  onDeleteTask: (id: string) => void;
  onToggleComplete: (id: string, completed: boolean) => void;
}

export interface AddEditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (taskInput: Partial<TaskType>) => void;
  initialData?: Partial<TaskType>;
}

export interface TaskRowProps {
  task: TaskType;
  onEdit: () => void;
  onDelete: () => void;
  onToggleComplete: (id: string, completed: boolean) => void; // New prop
}


