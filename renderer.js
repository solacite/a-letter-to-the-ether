// renderer.js - inline edit/delete for tasks (all lowercase, concise comments)

// run on page load
window.onload = function() {
  show();
  document.getElementById('addbtn').onclick = add;
  document.getElementById('cleartodaybtn').onclick = cleartoday;
  document.getElementById('taskinput').addEventListener('keydown', function(e) {
    if (e.key === 'enter') add();
  });
};

// get tasks from localstorage, ensure every task has an id
function get() {
  let raw = JSON.parse(localStorage.getItem('tasks') || '[]');
  let changed = false;
  raw = raw.map(t => {
    if (!t.id) {
      t.id = Date.now().toString(36) + Math.random().toString(36).slice(2,8); // simple unique id
      changed = true;
    }
    return t;
  });
  if (changed) save(raw);
  return raw;
}

// save tasks to localstorage
function save(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// add a new task (new tasks get an id)
function add() {
  let input = document.getElementById('taskinput');
  let text = input.value.trim();
  if (!text) return;
  let today = new Date().toISOString().slice(0, 10);
  let tasks = get();
  tasks.push({ id: Date.now().toString(36), text: text, date: today });
  save(tasks);
  input.value = '';
  show();
}

// remove only today's tasks
function cleartoday() {
  let today = new Date().toISOString().slice(0, 10);
  let tasks = get().filter(t => t.date !== today);
  save(tasks);
  show();
}

// show stats and lists, render edit/delete controls
function show() {
  let today = new Date().toISOString().slice(0, 10);
  let yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

  let tasks = get();
  let todaytasks = tasks.filter(t => t.date === today);
  let yesterdaytasks = tasks.filter(t => t.date === yesterday);

  // update counters
  document.getElementById('todaycount').textContent = todaytasks.length;
  document.getElementById('yesterdaycount').textContent = yesterdaytasks.length;

  // compute percent and set compare text
  let percent = 0;
  if (yesterdaytasks.length > 0) {
    percent = Math.round((todaytasks.length - yesterdaytasks.length) / yesterdaytasks.length * 100);
  }
  document.getElementById('compare').textContent =
    yesterdaytasks.length === 0
      ? ''
      : percent > 0
        ? `you were ${percent}% more productive than yesterday!`
        : percent < 0
          ? `you were ${Math.abs(percent)}% less productive than yesterday!`
          : 'same productivity as yesterday!';

  // helper to render list with controls
  function renderList(listElId, items) {
    let list = document.getElementById(listElId);
    list.innerHTML = '';
    if (items.length === 0) return;
    items.forEach((t) => {
        let li = document.createElement('li');
        li.dataset.id = t.id;

        let actions = document.createElement('span');
        actions.className = 'actions';

        let editBtn = document.createElement('button');
        editBtn.textContent = 'edit';
        editBtn.onclick = () => startEdit(t.id);

        let delBtn = document.createElement('button');
        delBtn.textContent = 'delete';
        delBtn.onclick = () => deleteTask(t.id);

        actions.appendChild(editBtn);
        actions.appendChild(delBtn);

        let span = document.createElement('span');
        span.textContent = t.text;
        
        li.appendChild(span);
        li.appendChild(actions);
        list.appendChild(li);
    });
  }

  // render today's and yesterday's lists
  renderList('todaytasks', todaytasks);
  renderList('yesterdaytasks', yesterdaytasks);

  // empty messages
  document.getElementById('emptytodaymsg').textContent = todaytasks.length === 0 ? 'no tasks yet today!' : '';
  document.getElementById('emptyyestmsg').textContent = yesterdaytasks.length === 0 ? 'no tasks yesterday!' : '';
}

// start inline edit: replace li content with input + save/cancel
function startEdit(id) {
  let li = document.querySelector(`li[data-id="${id}"]`);
  if (!li) return;
  let tasks = get();
  let task = tasks.find(t => t.id === id);
  if (!task) return;

  li.innerHTML = '';

  let input = document.createElement('input');
  input.type = 'text';
  input.value = task.text;
  input.style.width = '60%';
  input.style.marginRight = '8px';

  // save button
  let saveBtn = document.createElement('button');
  saveBtn.textContent = 'save';
  saveBtn.style.marginRight = '6px';
  saveBtn.onclick = () => saveEdit(id, input.value.trim());

  // cancel button
  let cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'cancel';
  cancelBtn.onclick = () => { show(); };

  // keyboard: enter saves, esc cancels
  input.addEventListener('keydown', function(e) {
    if (e.key === 'enter') saveEdit(id, input.value.trim());
    if (e.key === 'escape') show();
  });

  li.appendChild(input);
  li.appendChild(saveBtn);
  li.appendChild(cancelBtn);
  input.focus();
}

// save the edited text to storage
function saveEdit(id, newText) {
  if (!newText) return; // don't save empty
  let tasks = get();
  let idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return;
  tasks[idx].text = newText;
  save(tasks);
  show();
}

// delete a task by id
function deleteTask(id) {
  let tasks = get().filter(t => t.id !== id);
  save(tasks);
  show();
}