// run on page load
window.onload = function() {
    show();
    document.getElementById('addbtn').onclick = add;
    document.getElementById('cleartodaybtn').onclick = cleartoday;
    document.getElementById('taskinput').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') add();
    });
};

// get all tasks from localstorage
function get() {
    return JSON.parse(localStorage.getItem('tasks') || '[]');
}

// save tasks array to localstorage
function save(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// add a new task for today
function add() {
    let input = document.getElementById('taskinput');
    let text = input.value.trim();
    if (!text) return;
    let today = new Date().toISOString().slice(0, 10);
    let tasks = get();
    tasks.push({ text: text, date: today });
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

// show stats and task lists
function show() {
  let today = new Date().toISOString().slice(0, 10);
  let yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

  let tasks = get();
  let todaytasks = tasks.filter(t => t.date === today);
  let yesterdaytasks = tasks.filter(t => t.date === yesterday);

  // update counters
  document.getElementById('todaycount').textContent = todaytasks.length;
  document.getElementById('yesterdaycount').textContent = yesterdaytasks.length;

  // compare productivity (don't show message if no tasks yesterday)
  let percent = 0;
  document.getElementById('compare').textContent =
    yesterdaytasks.length === 0
      ? ''
      : percent > 0
        ? `you were ${percent}% more productive than yesterday!`
        : percent < 0
          ? `you were ${Math.abs(percent)}% less productive than yesterday!`
          : 'same productivity as yesterday!';
  if (yesterdaytasks.length > 0)
    percent = Math.round((todaytasks.length - yesterdaytasks.length) / yesterdaytasks.length * 100);

    // show today's tasks
    let todaylist = document.getElementById('todaytasks');
    todaylist.innerHTML = '';
    if (todaytasks.length === 0) {
        document.getElementById('emptytodaymsg').textContent = 'no tasks yet today!';
    } else {
        document.getElementById('emptytodaymsg').textContent = '';
        todaytasks.forEach(t => {
            let li = document.createElement('li');
            li.textContent = t.text;
            todaylist.appendChild(li);
     });
    }

    // show yesterday's tasks
    let yestlist = document.getElementById('yesterdaytasks');
    yestlist.innerHTML = '';
    if (yesterdaytasks.length === 0) {
        document.getElementById('emptyyestmsg').textContent = 'no tasks yesterday!';
    } else {
        document.getElementById('emptyyestmsg').textContent = '';
        yesterdaytasks.forEach(t => {
            let li = document.createElement('li');
            li.textContent = t.text;
            yestlist.appendChild(li);
        });
    }
}