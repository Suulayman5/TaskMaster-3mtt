let token = '';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const taskManager = document.getElementById('task-manager');
  const loginBtn = document.getElementById('login-btn');
  const signupBtn = document.getElementById('signup-btn');
  const logoutBtn = document.getElementById('logout-btn');
  const switchToSignup = document.getElementById('switch-to-signup');
  const switchToLogin = document.getElementById('switch-to-login');
  const messageDisplay = document.getElementById('message-display');
  const homepage = document.getElementById('homepage');

  switchToSignup.addEventListener('click', () => {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
  });

  switchToLogin.addEventListener('click', () => {
    signupForm.style.display = 'none';
    homepage.style.display = 'none'
    loginForm.style.display = 'block';
  });

  loginBtn.addEventListener('click', async () => {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch('https://taskmaster-3mtt.onrender.com/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (response.ok) {
      token = data.token;
      loginForm.style.display = 'none';
      taskManager.style.display = 'block';
      fetchTasks();
      displayMessage('Login successful!', 'success');
    } else {
      displayMessage(data.message, 'error');
    }
  });

  signupBtn.addEventListener('click', async () => {
    const email = document.getElementById('signup-email').value;
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
  
    if (!email || !username || !password) {
      displayMessage('All fields are required', 'error');
      return;
    }
  
    try {
      const response = await fetch('https://taskmaster-3mtt.onrender.com/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        displayMessage('Sign-up successful! Please log in.', 'success');
        signupForm.style.display = 'none';
        taskManager.style.display = 'block';
      } else {
        displayMessage(data.message || 'Sign-up failed. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Network error:', error);
      displayMessage('An error occurred. Please check your network connection.', 'error');
    }
  });
  

  logoutBtn.addEventListener('click', () => {
    token = '';
    taskManager.style.display = 'none';
    loginForm.style.display = 'block';
    displayMessage('Logged out successfully.', 'success');
  });

  document.getElementById('create-task-btn').addEventListener('click', async () => {
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-desc').value;
    const deadline = document.getElementById('task-deadline').value;
    const priority = document.getElementById('task-priority').value;

    const response = await fetch('https://taskmaster-3mtt.onrender.com/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
      body: JSON.stringify({ title, description, deadline, priority })
    });

    if (response.ok) {
      displayMessage('Task created successfully!', 'success');
      fetchTasks();
    } else {
      displayMessage('Error creating task', 'error');
    }
  });

  async function fetchTasks() {
    const response = await fetch('https://taskmaster-3mtt.onrender.com/tasks', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const tasks = await response.json();
    const tasksContainer = document.getElementById('tasks-container');
    tasksContainer.innerHTML = '';

    tasks.forEach(task => {
      const taskDiv = document.createElement('div');
      taskDiv.className = 'task-item';
      taskDiv.textContent = `${task.title} - ${task.description} (${task.priority})`;
      tasksContainer.appendChild(taskDiv);
    });
  }
  
  const displayMessage = (message) => {
    const messageElement = document.getElementById('message-display');
    if (messageElement) {
      messageElement.textContent = message;
    } else {
      console.warn("The 'message' element was not found in the DOM.");
    }
  };
  
});

