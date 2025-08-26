import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Task {
  id: number;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  dueDate: string;
  assignedTo: string;
  category: string;
  createdAt: string;
  isRead: boolean;
}

interface TaskContextType {
  tasks: Task[];
  unreadTaskCount: number;
  markTasksAsRead: () => void;
  updateTaskStatus: (taskId: number, status: Task['status']) => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'isRead'>) => void;
  deleteTask: (taskId: number) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Review Q4 Sales Report',
      description: 'Analyze quarterly sales performance and prepare summary for board meeting',
      priority: 'high',
      status: 'pending',
      dueDate: '2024-01-20',
      assignedTo: 'super chair',
      category: 'Sales',
      createdAt: '2024-01-15',
      isRead: false,
    },
    {
      id: 2,
      title: 'Update Product Catalog',
      description: 'Add new furniture items to the company catalog with pricing and specifications',
      priority: 'medium',
      status: 'in-progress',
      dueDate: '2024-01-25',
      assignedTo: 'super chair',
      category: 'Product Management',
      createdAt: '2024-01-14',
      isRead: false,
    },
    {
      id: 3,
      title: 'Client Follow-up Call',
      description: 'Follow up with ABC Corp regarding their office furniture requirements',
      priority: 'high',
      status: 'pending',
      dueDate: '2024-01-18',
      assignedTo: 'super chair',
      category: 'Client Relations',
      createdAt: '2024-01-13',
      isRead: false,
    },
    {
      id: 4,
      title: 'Prepare Marketing Materials',
      description: 'Create brochures and digital assets for the new chair collection',
      priority: 'medium',
      status: 'in-progress',
      dueDate: '2024-01-30',
      assignedTo: 'super chair',
      category: 'Marketing',
      createdAt: '2024-01-12',
      isRead: true,
    },
    {
      id: 5,
      title: 'Inventory Audit',
      description: 'Conduct monthly inventory check and update stock levels',
      priority: 'low',
      status: 'pending',
      dueDate: '2024-01-22',
      assignedTo: 'super chair',
      category: 'Operations',
      createdAt: '2024-01-11',
      isRead: false,
    },
  ]);

  const unreadTaskCount = tasks.filter(task => !task.isRead && task.status !== 'completed').length;

  const markTasksAsRead = () => {
    setTasks(prevTasks => 
      prevTasks.map(task => ({ ...task, isRead: true }))
    );
  };

  const updateTaskStatus = (taskId: number, status: Task['status']) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status } : task
      )
    );
  };

  const addTask = (newTask: Omit<Task, 'id' | 'createdAt' | 'isRead'>) => {
    const task: Task = {
      ...newTask,
      id: Math.max(...tasks.map(t => t.id)) + 1,
      createdAt: new Date().toISOString().split('T')[0],
      isRead: false,
    };
    setTasks(prevTasks => [task, ...prevTasks]);
  };

  const deleteTask = (taskId: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      unreadTaskCount,
      markTasksAsRead,
      updateTaskStatus,
      addTask,
      deleteTask,
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};