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
  const messageDisplay = document.getElementById('message-display'); // Assuming you have a <p> tag with this ID for messages

  switchToSignup.addEventListener('click', () => {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
  });

  switchToLogin.addEventListener('click', () => {
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
  });

  loginBtn.addEventListener('click', async () => {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch('https://task-master-3mtt.vercel.app/auth/signin', {
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

    const response = await fetch('https://task-master-3mtt.vercel.app/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, username, password })
    });

    const data = await response.json();
    if (response.ok) {
      displayMessage('Sign-up successful! Please log in.', 'success');
      signupForm.style.display = 'none';
      loginForm.style.display = 'block';
    } else {
      displayMessage(data.message, 'error');
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

    const response = await fetch('https://task-master-3mtt.vercel.app/tasks', {
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
    const response = await fetch('https://task-master-3mtt.vercel.app/tasks', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const tasks = await response.json();
    const tasksContainer = document.getElementById('tasks-container');
    tasksContainer.innerHTML = ''; // Clear existing tasks

    tasks.forEach(task => {
      const taskDiv = document.createElement('div');
      taskDiv.className = 'task-item'; // Optional: add a class for styling
      taskDiv.textContent = `${task.title} - ${task.description} (${task.priority})`;
      tasksContainer.appendChild(taskDiv);
    });
  }

  function displayMessage(message, type) {
    messageDisplay.textContent = message;
    messageDisplay.className = type === 'success' ? 'message-success' : 'message-error';
  }
});

