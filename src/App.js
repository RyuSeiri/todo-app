import React, { useState, useEffect, useRef } from 'react';

// 自定义图标组件
const PlusIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} fill="none" stroke={color} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
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

const TrashIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} fill="none" stroke={color} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const SearchIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} fill="none" stroke={color} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const XIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} fill="none" stroke={color} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  
  const longPressTimer = useRef(null);
  const touchStartTime = useRef(0);

  // 移动端样式
  const styles = {
    app: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      color: '#1f2937',
      touchAction: 'manipulation',
      userSelect: 'none',
      WebkitUserSelect: 'none',
      overflowX: 'hidden'
    },
    container: {
      maxWidth: '430px',
      margin: '0 auto',
      minHeight: '100vh',
      background: '#f8fafc',
      position: 'relative',
      boxShadow: '0 0 20px rgba(0,0,0,0.1)'
    },
    header: {
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      color: 'white',
      padding: '20px 20px 30px',
      textAlign: 'center',
      position: 'relative'
    },
    title: {
      fontSize: '1.8rem',
      fontWeight: '700',
      margin: '0 0 8px 0'
    },
    subtitle: {
      opacity: 0.9,
      fontSize: '0.9rem',
      margin: 0
    },
    stats: {
      display: 'flex',
      justifyContent: 'space-around',
      padding: '20px 15px',
      background: 'white',
      margin: '-15px 15px 0',
      borderRadius: '16px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      position: 'relative',
      zIndex: 10
    },
    stat: {
      textAlign: 'center',
      flex: 1
    },
    statNumber: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '4px'
    },
    statLabel: {
      fontSize: '0.75rem',
      color: '#6b7280'
    },
    content: {
      padding: '20px 15px'
    },
    section: {
      background: 'white',
      borderRadius: '16px',
      padding: '20px',
      marginBottom: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
    },
    inputGroup: {
      display: 'flex',
      gap: '10px'
    },
    input: {
      flex: 1,
      padding: '16px',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      fontSize: '16px',
      outline: 'none',
      transition: 'all 0.2s'
    },
    addBtn: {
      padding: '16px 20px',
      background: '#6366f1',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      transition: 'all 0.2s',
      minWidth: '80px',
      justifyContent: 'center'
    },
    searchWrapper: {
      position: 'relative',
      marginBottom: '16px'
    },
    searchInput: {
      width: '100%',
      padding: '16px 20px 16px 50px',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      fontSize: '16px',
      outline: 'none',
      boxSizing: 'border-box'
    },
    searchIcon: {
      position: 'absolute',
      left: '18px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#9ca3af',
      zIndex: 2
    },
    filters: {
      display: 'flex',
      gap: '8px',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    filterBtn: {
      padding: '12px 20px',
      border: '2px solid #e5e7eb',
      borderRadius: '20px',
      background: 'white',
      color: '#6b7280',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.2s',
      flex: 1,
      textAlign: 'center',
      minWidth: '80px'
    },
    filterBtnActive: {
      background: '#6366f1',
      color: 'white',
      borderColor: '#6366f1'
    },
    clearBtn: {
      background: '#fee2e2',
      color: '#dc2626',
      borderColor: '#fecaca'
    },
    todoItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '15px',
      padding: '16px 0',
      borderBottom: '1px solid #f3f4f6'
    },
    checkbox: {
      width: '24px',
      height: '24px',
      border: '2px solid #d1d5db',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      flexShrink: 0,
      marginTop: '2px',
      transition: 'all 0.2s'
    },
    checkboxCompleted: {
      background: '#10b981',
      borderColor: '#10b981',
      color: 'white'
    },
    todoContent: {
      flex: 1,
      minWidth: 0
    },
    todoText: {
      fontSize: '16px',
      lineHeight: '1.5',
      marginBottom: '6px',
      wordWrap: 'break-word',
      margin: 0
    },
    todoTextCompleted: {
      color: '#6b7280',
      textDecoration: 'line-through'
    },
    todoDate: {
      fontSize: '12px',
      color: '#9ca3af',
      margin: 0
    },
    todoActions: {
      display: 'flex',
      gap: '8px',
      flexShrink: 0,
      marginTop: '2px'
    },
    actionBtn: {
      width: '36px',
      height: '36px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s'
    },
    editBtn: {
      background: '#e0e7ff',
      color: '#6366f1'
    },
    deleteBtn: {
      background: '#fee2e2',
      color: '#dc2626'
    },
    saveBtn: {
      background: '#dcfce7',
      color: '#16a34a'
    },
    cancelBtn: {
      background: '#f3f4f6',
      color: '#6b7280'
    },
    editInput: {
      width: '100%',
      padding: '12px',
      border: '2px solid #6366f1',
      borderRadius: '8px',
      fontSize: '16px',
      outline: 'none',
      boxSizing: 'border-box'
    },
    emptyState: {
      textAlign: 'center',
      padding: '40px 20px',
      color: '#6b7280'
    },
    emptyIcon: {
      width: '60px',
      height: '60px',
      background: '#f3f4f6',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 16px'
    },
    progressHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '12px'
    },
    progressBar: {
      height: '8px',
      background: '#e5e7eb',
      borderRadius: '4px',
      overflow: 'hidden'
    },
    progressFill: {
      height: '100%',
      background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
      transition: 'width 0.5s ease'
    },
    installPrompt: {
      position: 'fixed',
      bottom: '20px',
      left: '15px',
      right: '15px',
      background: '#1f2937',
      color: 'white',
      padding: '16px 20px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
      zIndex: 1000
    },
    installText: {
      flex: 1,
      fontSize: '14px'
    },
    installBtn: {
      background: '#6366f1',
      color: 'white',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '8px',
      fontSize: '14px',
      cursor: 'pointer'
    },
    closeBtn: {
      background: 'none',
      border: 'none',
      color: '#9ca3af',
      cursor: 'pointer',
      padding: '4px'
    }
  };

  // 数据加载和保存
  useEffect(() => {
    try {
      const saved = localStorage.getItem('mobile-todos');
      if (saved) {
        const loadedTodos = JSON.parse(saved).map(todo => ({
          ...todo,
          createdAt: new Date(todo.createdAt)
        }));
        setTodos(loadedTodos);
      } else {
        const sampleTodos = [
          { id: 1, text: '欢迎使用移动端TodoApp', completed: false, createdAt: new Date() },
          { id: 2, text: '长按任务可以编辑', completed: false, createdAt: new Date() },
          { id: 3, text: '滑动操作更流畅', completed: true, createdAt: new Date() }
        ];
        setTodos(sampleTodos);
        localStorage.setItem('mobile-todos', JSON.stringify(sampleTodos));
      }
    } catch (error) {
      console.error('数据加载失败:', error);
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('mobile-todos', JSON.stringify(todos));
    }
  }, [todos]);

  // PWA安装提示
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setShowInstallPrompt(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  // 触觉反馈
  const vibrate = (pattern) => {
    if (navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  };

  // 添加任务
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
      vibrate(50);
    }
  };

  // 切换完成状态
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
    vibrate(30);
  };

  // 删除任务
  const deleteTodo = (id) => {
    if (window.confirm('确定删除这个任务吗？')) {
      setTodos(todos.filter(todo => todo.id !== id));
      vibrate([50, 50, 50]);
    }
  };

  // 编辑任务
  const startEdit = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = (id) => {
    if (editText.trim()) {
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, text: editText.trim() } : todo
      ));
    }
    setEditingId(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  // 长按处理
  const handleTouchStart = (id, text) => {
    touchStartTime.current = Date.now();
    longPressTimer.current = setTimeout(() => {
      startEdit(id, text);
      vibrate(100);
    }, 500);
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };

  // 清空所有任务
  const clearAllTodos = () => {
    if (window.confirm('确定要清空所有任务吗？')) {
      setTodos([]);
      localStorage.removeItem('mobile-todos');
      vibrate([100, 50, 100]);
    }
  };

  // 过滤任务
  const filteredTodos = todos.filter(todo => {
    const matchesFilter = filter === 'all' ||
      (filter === 'completed' && todo.completed) ||
      (filter === 'pending' && !todo.completed);
    const matchesSearch = todo.text.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // 统计信息
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const pendingTodos = totalTodos - completedTodos;

  return (
    <div style={styles.app}>
      <div style={styles.container}>
        {/* 头部 */}
        <div style={styles.header}>
          <h1 style={styles.title}>📱 TodoApp</h1>
          <p style={styles.subtitle}>移动端待办事项管理</p>
        </div>

        {/* 统计卡片 */}
        <div style={styles.stats}>
          <div style={styles.stat}>
            <div style={{ ...styles.statNumber, color: '#6366f1' }}>{totalTodos}</div>
            <div style={styles.statLabel}>总计</div>
          </div>
          <div style={styles.stat}>
            <div style={{ ...styles.statNumber, color: '#10b981' }}>{completedTodos}</div>
            <div style={styles.statLabel}>完成</div>
          </div>
          <div style={styles.stat}>
            <div style={{ ...styles.statNumber, color: '#f59e0b' }}>{pendingTodos}</div>
            <div style={styles.statLabel}>待办</div>
          </div>
        </div>

        <div style={styles.content}>
          {/* 添加任务 */}
          <div style={styles.section}>
            <div style={styles.inputGroup}>
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                placeholder="添加新任务..."
                style={styles.input}
              />
              <button
                onClick={addTodo}
                style={styles.addBtn}
                onTouchStart={(e) => e.target.style.transform = 'scale(0.98)'}
                onTouchEnd={(e) => e.target.style.transform = 'scale(1)'}
              >
                <PlusIcon />
              </button>
            </div>
          </div>

          {/* 搜索和筛选 */}
          <div style={styles.section}>
            <div style={styles.searchWrapper}>
              <div style={styles.searchIcon}>
                <SearchIcon />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="搜索任务..."
                style={styles.searchInput}
              />
            </div>

            <div style={styles.filters}>
              {[
                { key: 'all', label: '全部', count: totalTodos },
                { key: 'pending', label: '待办', count: pendingTodos },
                { key: 'completed', label: '完成', count: completedTodos }
              ].map(({ key, label, count }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  style={{
                    ...styles.filterBtn,
                    ...(filter === key ? styles.filterBtnActive : {})
                  }}
                  onTouchStart={(e) => e.target.style.transform = 'scale(0.98)'}
                  onTouchEnd={(e) => e.target.style.transform = 'scale(1)'}
                >
                  {label} ({count})
                </button>
              ))}
              
              {totalTodos > 0 && (
                <button
                  onClick={clearAllTodos}
                  style={{ ...styles.filterBtn, ...styles.clearBtn }}
                  onTouchStart={(e) => e.target.style.transform = 'scale(0.98)'}
                  onTouchEnd={(e) => e.target.style.transform = 'scale(1)'}
                >
                  🗑️ 清空
                </button>
              )}
            </div>
          </div>

          {/* 任务列表 */}
          <div style={styles.section}>
            {filteredTodos.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>
                  <CheckIcon size={24} />
                </div>
                <div style={{ fontSize: '16px', marginBottom: '8px' }}>
                  {searchTerm ? '没有找到匹配的任务' : '暂无任务'}
                </div>
                <div style={{ fontSize: '14px', color: '#9ca3af' }}>
                  {searchTerm ? '试试其他关键词' : '添加第一个任务开始吧！'}
                </div>
              </div>
            ) : (
              filteredTodos.map((todo, index) => (
                <div
                  key={todo.id}
                  style={{
                    ...styles.todoItem,
                    ...(index === filteredTodos.length - 1 ? { borderBottom: 'none' } : {})
                  }}
                >
                  {/* 完成状态按钮 */}
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    style={{
                      ...styles.checkbox,
                      ...(todo.completed ? styles.checkboxCompleted : {})
                    }}
                    onTouchStart={(e) => e.target.style.transform = 'scale(0.9)'}
                    onTouchEnd={(e) => e.target.style.transform = 'scale(1)'}
                  >
                    {todo.completed && <CheckIcon />}
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
                        onBlur={() => saveEdit(todo.id)}
                        style={styles.editInput}
                        autoFocus
                      />
                    ) : (
                      <div>
                        <div
                          style={{
                            ...styles.todoText,
                            ...(todo.completed ? styles.todoTextCompleted : {})
                          }}
                          onTouchStart={() => handleTouchStart(todo.id, todo.text)}
                          onTouchEnd={handleTouchEnd}
                          onTouchCancel={handleTouchEnd}
                        >
                          {todo.text}
                        </div>
                        <div style={styles.todoDate}>
                          {todo.createdAt.toLocaleDateString('zh-CN')}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 操作按钮 */}
                  <div style={styles.todoActions}>
                    {editingId === todo.id ? (
                      <>
                        <button
                          onClick={() => saveEdit(todo.id)}
                          style={{ ...styles.actionBtn, ...styles.saveBtn }}
                          onTouchStart={(e) => e.target.style.transform = 'scale(0.9)'}
                          onTouchEnd={(e) => e.target.style.transform = 'scale(1)'}
                        >
                          <CheckIcon />
                        </button>
                        <button
                          onClick={cancelEdit}
                          style={{ ...styles.actionBtn, ...styles.cancelBtn }}
                          onTouchStart={(e) => e.target.style.transform = 'scale(0.9)'}
                          onTouchEnd={(e) => e.target.style.transform = 'scale(1)'}
                        >
                          <XIcon />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEdit(todo.id, todo.text)}
                          style={{ ...styles.actionBtn, ...styles.editBtn }}
                          onTouchStart={(e) => e.target.style.transform = 'scale(0.9)'}
                          onTouchEnd={(e) => e.target.style.transform = 'scale(1)'}
                        >
                          <EditIcon />
                        </button>
                        <button
                          onClick={() => deleteTodo(todo.id)}
                          style={{ ...styles.actionBtn, ...styles.deleteBtn }}
                          onTouchStart={(e) => e.target.style.transform = 'scale(0.9)'}
                          onTouchEnd={(e) => e.target.style.transform = 'scale(1)'}
                        >
                          <TrashIcon />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* 进度条 */}
          {totalTodos > 0 && (
            <div style={styles.section}>
              <div style={styles.progressHeader}>
                <span style={{ fontWeight: '500' }}>完成进度</span>
                <span style={{ color: '#6b7280' }}>
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

        {/* 安装提示 */}
        {showInstallPrompt && (
          <div style={styles.installPrompt}>
            <div style={styles.installText}>
              将此应用添加到主屏幕，获得更好的体验！
            </div>
            <button style={styles.installBtn}>安装</button>
            <button
              style={styles.closeBtn}
              onClick={() => setShowInstallPrompt(false)}
            >
              <XIcon />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;