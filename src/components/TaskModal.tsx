import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTasks, Task } from '../contexts/TaskContext';
import { 
  X, 
  Plus, 
  Calendar, 
  User, 
  Tag, 
  AlertCircle, 
  Clock, 
  CheckCircle2,
  Circle,
  Play,
  Filter,
  Search
} from 'lucide-react';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose }) => {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const { tasks, updateTaskStatus, addTask, deleteTask } = useTasks();
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as Task['priority'],
    status: 'pending' as Task['status'],
    dueDate: '',
    assignedTo: 'super chair',
    category: '',
  });

  if (!isOpen) return null;

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || task.status === filter;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'text-red-500 bg-red-100 dark:bg-red-900/20';
      case 'medium': return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20';
      case 'low': return 'text-green-500 bg-green-100 dark:bg-green-900/20';
    }
  };

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle2 size={16} className="text-green-500" />;
      case 'in-progress': return <Play size={16} className="text-blue-500" />;
      case 'pending': return <Circle size={16} className="text-gray-400" />;
    }
  };

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      addTask(newTask);
      setNewTask({
        title: '',
        description: '',
        priority: 'medium',
        status: 'pending',
        dueDate: '',
        assignedTo: 'super chair',
        category: '',
      });
      setShowAddTask(false);
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && dueDate !== '';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div 
        className={`rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden ${
          isDark ? 'bg-[#2f2f2f] border border-gray-700' : 'bg-white border'
        }`}
      >
        {/* Header */}
        <div className={`flex justify-between items-center p-6 border-b ${
          isDark ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div>
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t('tasks.taskManagement')}
            </h2>
            <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {t('tasks.manageYourTasks')}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddTask(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Plus size={18} />
              <span className="text-sm font-medium">{t('tasks.addTask')}</span>
            </button>
            <button 
              onClick={onClose} 
              className={`p-2 rounded-full transition-colors ${
                isDark ? 'text-gray-400 hover:bg-gray-700 hover:text-white' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
              }`}
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search size={18} className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                placeholder={t('tasks.searchTasks')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-colors ${
                  isDark 
                    ? 'bg-[#212121] border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                }`}
              />
            </div>
            <div className="flex gap-2">
              {(['all', 'pending', 'in-progress', 'completed'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === status
                      ? 'bg-blue-600 text-white'
                      : isDark
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {status === 'in-progress' ? t('tasks.inProgress') : t(`tasks.${status}`)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Task List */}
        <div className="p-6 max-h-[calc(90vh-300px)] overflow-y-auto">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle size={48} className={`mx-auto mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
              <h3 className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t('tasks.noTasksFound')}
              </h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('tasks.noTasksDesc')}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-4 rounded-xl border transition-colors ${
                    isDark 
                      ? 'bg-[#212121] border-gray-600 hover:border-gray-500' 
                      : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                  } ${!task.isRead ? 'ring-2 ring-blue-500/20' : ''}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3 flex-1">
                      <button
                        onClick={() => updateTaskStatus(task.id, task.status === 'completed' ? 'pending' : 'completed')}
                        className="mt-1"
                      >
                        {getStatusIcon(task.status)}
                      </button>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-semibold ${
                            task.status === 'completed' 
                              ? 'line-through text-gray-500' 
                              : isDark ? 'text-white' : 'text-gray-900'
                          }`}>
                            {task.title}
                          </h3>
                          {!task.isRead && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                        <p className={`text-sm mb-2 ${
                          task.status === 'completed' 
                            ? 'line-through text-gray-500' 
                            : isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {task.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs">
                          <div className="flex items-center gap-1">
                            <Calendar size={12} />
                            <span className={`${
                              isOverdue(task.dueDate) && task.status !== 'completed' 
                                ? 'text-red-500 font-medium' 
                                : isDark ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {task.dueDate || 'No due date'}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User size={12} />
                            <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                              {task.assignedTo}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Tag size={12} />
                            <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                              {task.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                      <select
                        value={task.status}
                        onChange={(e) => updateTaskStatus(task.id, e.target.value as Task['status'])}
                        className={`text-xs px-2 py-1 rounded border ${
                          isDark 
                            ? 'bg-[#2f2f2f] border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      >
                        <option value="pending">{t('tasks.pending')}</option>
                        <option value="in-progress">{t('tasks.inProgress')}</option>
                        <option value="completed">{t('tasks.completed')}</option>
                      </select>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className={`p-1 rounded transition-colors ${
                          isDark ? 'hover:bg-gray-600 text-gray-400' : 'hover:bg-gray-200 text-gray-500'
                        }`}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                  {isOverdue(task.dueDate) && task.status !== 'completed' && (
                    <div className="flex items-center gap-2 mt-2 p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                      <AlertCircle size={14} className="text-red-500" />
                      <span className="text-xs text-red-600 dark:text-red-400 font-medium">
                        {t('tasks.overdue')}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Task Modal */}
        {showAddTask && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className={`rounded-xl shadow-xl w-full max-w-md ${
              isDark ? 'bg-[#2f2f2f] border border-gray-700' : 'bg-white border'
            }`}>
              <div className={`p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t('tasks.addNewTask')}
                </h3>
              </div>
              <div className="p-4 space-y-4">
                <input
                  type="text"
                  placeholder={t('tasks.taskTitle')}
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDark 
                      ? 'bg-[#212121] border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
                <textarea
                  placeholder={t('tasks.taskDescription')}
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  rows={3}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDark 
                      ? 'bg-[#212121] border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as Task['priority'] })}
                    className={`px-3 py-2 rounded-lg border ${
                      isDark 
                        ? 'bg-[#212121] border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="low">{t('tasks.low')}</option>
                    <option value="medium">{t('tasks.medium')}</option>
                    <option value="high">{t('tasks.high')}</option>
                  </select>
                  <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className={`px-3 py-2 rounded-lg border ${
                      isDark 
                        ? 'bg-[#212121] border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
                <input
                  type="text"
                  placeholder={t('tasks.category')}
                  value={newTask.category}
                  onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDark 
                      ? 'bg-[#212121] border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
              <div className={`p-4 border-t flex justify-end gap-3 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <button
                  onClick={() => setShowAddTask(false)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    isDark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                >
                  {t('common.cancel')}
                </button>
                <button
                  onClick={handleAddTask}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  {t('tasks.addTask')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskModal;