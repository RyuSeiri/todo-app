import React, { useState, useEffect } from 'react';

// 自定义图标组件
const PlusIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} fill="none" stroke={color} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const TrashIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} fill="none" stroke={color} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const CheckIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} fill="none" stroke={color} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const EditIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} fill="none" stroke={color} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const XIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} fill="none" stroke={color} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const CalendarIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} fill="none" stroke={color} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ClockIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} fill="none" stroke={color} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const SearchIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} fill="none" stroke={color} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  // 样式对象
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e0e7ff 0%, #ffffff 50%, #e0f2fe 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      color: '#1f2937'
    },
    wrapper: {
      maxWidth: '1024px',
      margin: '0 auto',
      padding: '2rem 1rem'
    },
    title: {
      textAlign: 'center',
      marginBottom: '2rem'
    },
    titleText: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#1f2937',
      margin: '0 0 0.5rem 0'
    },
    subtitle: {
      color: '#6b7280',
      fontSize: '1rem',
      margin: 0
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1rem',
      marginBottom: '2rem'
    },
    statCard: {
      background: 'white',
      borderRadius: '0.75rem',
      padding: '1.5rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #f3f4f6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    statInfo: {
      display: 'flex',
      flexDirection: 'column'
    },
    statLabel: {
      fontSize: '0.875rem',
      color: '#6b7280',
      marginBottom: '0.25rem'
    },
    statNumber: {
      fontSize: '1.875rem',
      fontWeight: 'bold',
      margin: 0
    },
    statIcon: {
      width: '3rem',
      height: '3rem',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    mainPanel: {
      background: 'white',
      borderRadius: '1rem',
      padding: '1.5rem',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      border: '1px solid #f3f4f6',
      marginBottom: '1.5rem'
    },
    inputSection: {
      display: 'flex',
      gap: '0.75rem',
      marginBottom: '1.5rem',
      flexWrap: 'wrap'
    },
    inputWrapper: {
      flex: 1,
      minWidth: '250px'
    },
    mainInput: {
      width: '100%',
      padding: '0.75rem 1rem',
      border: '2px solid #e5e7eb',
      borderRadius: '0.75rem',
      fontSize: '1rem',
      outline: 'none',
      transition: 'all 0.2s',
      boxSizing: 'border-box'
    },
    addButton: {
      padding: '0.75rem 1.5rem',
      background: '#6366f1',
      color: 'white',
      border: 'none',
      borderRadius: '0.75rem',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.2s',
      whiteSpace: 'nowrap'
    },
    controls: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '1.5rem',
      flexWrap: 'wrap'
    },
    searchWrapper: {
      flex: 1,
      minWidth: '250px',
      position: 'relative'
    },
    searchInput: {
      width: '100%',
      padding: '0.75rem 1rem 0.75rem 2.5rem',
      border: '2px solid #e5e7eb',
      borderRadius: '0.75rem',
      outline: 'none',
      transition: 'all 0.2s',
      boxSizing: 'border-box'
    },
    searchIcon: {
      position: 'absolute',
      left: '0.75rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#9ca3af'
    },
    filterButtons: {
      display: 'flex',
      gap: '0.5rem',
      flexWrap: 'wrap'
    },
    filterButton: {
      padding: '0.5rem 1rem',
      border: '2px solid transparent',
      borderRadius: '0.5rem',
      background: '#f9fafb',
      color: '#6b7280',
      cursor: 'pointer',
      fontWeight: '500',
      transition: 'all 0.2s',
      whiteSpace: 'nowrap'
    },
    filterButtonActive: {
      background: '#e0e7ff',
      color: '#3730a3',
      borderColor: '#c7d2fe'
    },
    todosList: {
      minHeight: '200px'
    },
    todoItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '1rem',
      marginBottom: '0.75rem',
      border: '2px solid #e5e7eb',
      borderRadius: '0.75rem',
      background: 'white',
      transition: 'all 0.2s'
    },
    todoItemCompleted: {
      background: '#f0fdf4',
      borderColor: '#bbf7d0'
    },
    todoCheckbox: {
      width: '1.5rem',
      height: '1.5rem',
      border: '2px solid #d1d5db',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.2s',
      flexShrink: 0
    },
    todoCheckboxCompleted: {
      background: '#10b981',
      borderColor: '#10b981',
      color: 'white'
    },
    todoContent: {
      flex: 1
    },
    todoText: {
      fontSize: '1.125rem',
      marginBottom: '0.25rem',
      margin: 0
    },
    todoTextCompleted: {
      color: '#059669',
      textDecoration: 'line-through'
    },
    todoDate: {
      fontSize: '0.75rem',
      color: '#6b7280',
      margin: 0
    },
    todoActions: {
      display: 'flex',
      gap: '0.5rem'
    },
    actionButton: {
      padding: '0.5rem',
      border: 'none',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      transition: 'all 0.2s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    editButton: {
      background: '#e0e7ff',
      color: '#3730a3'
    },
    deleteButton: {
      background: '#fee2e2',
      color: '#dc2626'
    },
    saveButton: {
      background: '#dcfce7',
      color: '#16a34a'
    },
    cancelButton: {
      background: '#f3f4f6',
      color: '#6b7280'
    },
    editInput: {
      width: '100%',
      padding: '0.5rem',
      border: '2px solid #c7d2fe',
      borderRadius: '0.5rem',
      outline: 'none',
      fontSize: '1rem',
      boxSizing: 'border-box'
    },
    emptyState: {
      textAlign: 'center',
      padding: '3rem 1rem'
    },
    emptyIcon: {
      width: '4rem',
      height: '4rem',
      background: '#f3f4f6',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 1rem'
    },
    emptyTitle: {
      fontSize: '1.125rem',
      color: '#6b7280',
      marginBottom: '0.5rem'
    },
    emptySubtitle: {
      fontSize: '0.875rem',
      color: '#9ca3af'
    },
    progressSection: {
      background: 'white',
      borderRadius: '0.75rem',
      padding: '1.5rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #f3f4f6'
    },
    progressHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '0.75rem'
    },
    progressTitle: {
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#374151'
    },
    progressStats: {
      fontSize: '0.875rem',
      color: '#6b7280'
    },
    progressBar: {
      width: '100%',
      height: '0.75rem',
      background: '#e5e7eb',
      borderRadius: '0.375rem',
      overflow: 'hidden'
    },
    progressFill: {
      height: '100%',
      background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
      borderRadius: '0.375rem',
      transition: 'width 0.5s ease-out'
    }
  };

  // 从本地存储加载数据
  useEffect(() => {
    try {
      const savedTodos = JSON.parse(localStorage.getItem('todolist-todos') || '[]');
      
      // 如果有保存的数据，则使用保存的数据
      if (savedTodos.length > 0) {
        // 恢复日期对象
        const todosWithDates = savedTodos.map(todo => ({
          ...todo,
          createdAt: new Date(todo.createdAt)
        }));
        setTodos(todosWithDates);
      } else {
        // 如果没有保存的数据，使用示例数据
        const sampleTodos = [
          { id: 1, text: '学习React Hooks', completed: false, createdAt: new Date() },
          { id: 2, text: '完成项目文档', completed: true, createdAt: new Date(Date.now() - 86400000) },
          { id: 3, text: '准备明天的会议', completed: false, createdAt: new Date() }
        ];
        setTodos(sampleTodos);
        localStorage.setItem('todolist-todos', JSON.stringify(sampleTodos));
      }
    } catch (error) {
      console.error('加载待办事项失败:', error);
      // 如果出错，使用默认数据
      const sampleTodos = [
        { id: 1, text: '学习React Hooks', completed: false, createdAt: new Date() },
        { id: 2, text: '完成项目文档', completed: true, createdAt: new Date(Date.now() - 86400000) },
        { id: 3, text: '准备明天的会议', completed: false, createdAt: new Date() }
      ];
      setTodos(sampleTodos);
    }
  }, []);

  // 监听todos变化，自动保存到本地存储
  useEffect(() => {
    if (todos.length > 0) {
      try {
        localStorage.setItem('todolist-todos', JSON.stringify(todos));
      } catch (error) {
        console.error('保存待办事项失败:', error);
      }
    }
  }, [todos]);

  // 添加新任务
  const addTodo = () => {
    if (newTodo.trim()) {
      const todo = {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date()
      };
      setTodos([...todos, todo]);
      setNewTodo('');
    }
  };

  // 切换完成状态
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // 删除任务
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // 开始编辑
  const startEdit = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  // 保存编辑
  const saveEdit = (id) => {
    if (editText.trim()) {
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, text: editText.trim() } : todo
      ));
    }
    setEditingId(null);
    setEditText('');
  };

  // 取消编辑
  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  // 过滤和搜索todos
  const filteredTodos = todos.filter(todo => {
    const matchesFilter = filter === 'all' || 
                         (filter === 'completed' && todo.completed) ||
                         (filter === 'pending' && !todo.completed);
    const matchesSearch = todo.text.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // 清空所有数据的功能
  const clearAllTodos = () => {
    if (window.confirm('确定要清空所有待办事项吗？此操作不可撤销。')) {
      setTodos([]);
      localStorage.removeItem('todolist-todos');
    }
  };

  // 统计信息
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const pendingTodos = totalTodos - completedTodos;

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        {/* 标题区域 */}
        <div style={styles.title}>
          <h1 style={styles.titleText}>我的待办事项</h1>
          <p style={styles.subtitle}>保持高效，管理你的日常任务</p>
          <p style={{...styles.subtitle, fontSize: '0.75rem', marginTop: '0.5rem', fontStyle: 'italic'}}>
            💾 数据自动保存到浏览器本地存储
          </p>
        </div>

        {/* 统计卡片 */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statInfo}>
              <p style={styles.statLabel}>总任务</p>
              <p style={{...styles.statNumber, color: '#1f2937'}}>{totalTodos}</p>
            </div>
            <div style={{...styles.statIcon, background: '#dbeafe'}}>
              <CalendarIcon size={24} color="#2563eb" />
            </div>
          </div>
          
          <div style={styles.statCard}>
            <div style={styles.statInfo}>
              <p style={styles.statLabel}>已完成</p>
              <p style={{...styles.statNumber, color: '#059669'}}>{completedTodos}</p>
            </div>
            <div style={{...styles.statIcon, background: '#dcfce7'}}>
              <CheckIcon size={24} color="#059669" />
            </div>
          </div>
          
          <div style={styles.statCard}>
            <div style={styles.statInfo}>
              <p style={styles.statLabel}>待完成</p>
              <p style={{...styles.statNumber, color: '#ea580c'}}>{pendingTodos}</p>
            </div>
            <div style={{...styles.statIcon, background: '#fed7aa'}}>
              <ClockIcon size={24} color="#ea580c" />
            </div>
          </div>
        </div>

        {/* 主要操作区域 */}
        <div style={styles.mainPanel}>
          {/* 添加新任务 */}
          <div style={styles.inputSection}>
            <div style={styles.inputWrapper}>
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                placeholder="添加新的待办事项..."
                style={{
                  ...styles.mainInput,
                  ':focus': {
                    borderColor: '#6366f1',
                    boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.1)'
                  }
                }}
              />
            </div>
            <button
              onClick={addTodo}
              style={styles.addButton}
              onMouseOver={(e) => e.target.style.background = '#5b21b6'}
              onMouseOut={(e) => e.target.style.background = '#6366f1'}
            >
              <PlusIcon size={20} />
              添加
            </button>
          </div>

          {/* 搜索和筛选 */}
          <div style={styles.controls}>
            <div style={styles.searchWrapper}>
              <div style={styles.searchIcon}>
                <SearchIcon size={16} />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="搜索任务..."
                style={styles.searchInput}
              />
            </div>
            
            <div style={styles.filterButtons}>
              {[
                { key: 'all', label: '全部', count: totalTodos },
                { key: 'pending', label: '待完成', count: pendingTodos },
                { key: 'completed', label: '已完成', count: completedTodos }
              ].map(({ key, label, count }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  style={{
                    ...styles.filterButton,
                    ...(filter === key ? styles.filterButtonActive : {})
                  }}
                >
                  {label} ({count})
                </button>
              ))}
              
              {/* 清空按钮 */}
              {totalTodos > 0 && (
                <button
                  onClick={clearAllTodos}
                  style={{
                    ...styles.filterButton,
                    background: '#fef2f2',
                    color: '#dc2626',
                    borderColor: '#fecaca'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = '#fee2e2';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = '#fef2f2';
                  }}
                >
                  🗑️ 清空
                </button>
              )}
            </div>
          </div>

          {/* 任务列表 */}
          <div style={styles.todosList}>
            {filteredTodos.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>
                  <CheckIcon size={32} color="#9ca3af" />
                </div>
                <p style={styles.emptyTitle}>
                  {searchTerm ? '没有找到匹配的任务' : '暂无任务'}
                </p>
                <p style={styles.emptySubtitle}>
                  {searchTerm ? '尝试修改搜索条件' : '添加一个新任务开始吧！'}
                </p>
              </div>
            ) : (
              filteredTodos.map(todo => (
                <div
                  key={todo.id}
                  style={{
                    ...styles.todoItem,
                    ...(todo.completed ? styles.todoItemCompleted : {})
                  }}
                >
                  {/* 完成状态按钮 */}
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    style={{
                      ...styles.todoCheckbox,
                      ...(todo.completed ? styles.todoCheckboxCompleted : {})
                    }}
                  >
                    {todo.completed && <CheckIcon size={16} />}
                  </button>

                  {/* 任务内容 */}
                  <div style={styles.todoContent}>
                    {editingId === todo.id ? (
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') saveEdit(todo.id);
                          if (e.key === 'Escape') cancelEdit();
                        }}
                        style={styles.editInput}
                        autoFocus
                      />
                    ) : (
                      <div>
                        <p style={{
                          ...styles.todoText,
                          ...(todo.completed ? styles.todoTextCompleted : {})
                        }}>
                          {todo.text}
                        </p>
                        <p style={styles.todoDate}>
                          创建于 {todo.createdAt.toLocaleDateString('zh-CN')}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* 操作按钮 */}
                  <div style={styles.todoActions}>
                    {editingId === todo.id ? (
                      <>
                        <button
                          onClick={() => saveEdit(todo.id)}
                          style={{...styles.actionButton, ...styles.saveButton}}
                        >
                          <CheckIcon size={16} />
                        </button>
                        <button
                          onClick={cancelEdit}
                          style={{...styles.actionButton, ...styles.cancelButton}}
                        >
                          <XIcon size={16} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEdit(todo.id, todo.text)}
                          style={{...styles.actionButton, ...styles.editButton}}
                        >
                          <EditIcon size={16} />
                        </button>
                        <button
                          onClick={() => deleteTodo(todo.id)}
                          style={{...styles.actionButton, ...styles.deleteButton}}
                        >
                          <TrashIcon size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 进度条 */}
        {totalTodos > 0 && (
          <div style={styles.progressSection}>
            <div style={styles.progressHeader}>
              <span style={styles.progressTitle}>完成进度</span>
              <span style={styles.progressStats}>
                {completedTodos}/{totalTodos} ({Math.round((completedTodos / totalTodos) * 100)}%)
              </span>
            </div>
            <div style={styles.progressBar}>
              <div
                style={{
                  ...styles.progressFill,
                  width: `${(completedTodos / totalTodos) * 100}%`
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoApp;