let taskForm = document.forms.taskForm;
let main = document.querySelector('.main');
let tasksUl = document.querySelector('#tasks')
let newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.autofocus = true;
let navLists = document.querySelector('#leftPanel');
let nav = document.querySelector('nav');
let newList = document.createElement('input');
    newList.id = "newList";
    newList.type = 'text';
let addListButton = document.createElement('button');
    addListButton.textContent = 'add';
    addListButton.addEventListener('click', async (e) => {
        await taskService.addList(e.target.parentNode.firstChild.value);
        renderTaskLists();
    })
let currentlist = 'mainList';
if (!localStorage[currentlist]) {
    localStorage[currentlist] = JSON.stringify([]);
}


class TaskService {
    async addTask(task) {
        let res = await fetch('http://localhost:3000/tasks', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                listId: currentlist,
                complete: task.complete,
                text: task.text
            })
        })
    }


    async addList(name) {
        await fetch('http://localhost:3000/lists', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: name
            })
        })
    }
    
    async deleteTask(taskNode) {
        await fetch(`http://localhost:3000/tasks/${taskNode}`, {method: "DELETE"})
    }

    async getTasksList() {
        let tasks = await fetch(`http://localhost:3000/tasks?listId=${currentlist}`);
        tasks = await tasks.json();
        return tasks;
    }

    async completeTask(taskNode) {
        //console.log(!taskNode.getAttribute('complete'));
        await fetch(`http://localhost:3000/tasks/${taskNode.getAttribute('id')}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(
        {"complete": taskNode.getAttribute('complete'), 'listId': currentlist, 'text': taskNode.getAttribute('text')})
        })
    }

    async changeTask(taskNode, newText) {
        await fetch(`http://localhost:3000/tasks/${taskNode.getAttribute('id')}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(
        {"complete": taskNode.getAttribute('complete'), "listId": currentlist, "text": newText})
        })
    }

    async getListsKeys() {
        let newList = [];
        let data = await fetch('http://localhost:3000/lists')
        data = await data.json();
        
        for (let i = 0; i < data.length; i++) {
            newList.push(data[i].id)
        }

        return newList
    }

    async deleteList(event) {
        await fetch(`http://localhost:3000/lists/${event.target.parentNode.getAttribute('text')}`, {method: "DELETE"});
    }
}

const taskService = new TaskService();

renderTaskLists();

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTask(taskForm.taskText.value);
    taskForm.taskText.value = '';
})

async function addTask(task) {
    let newTask = {text: task, complete: false};
    await taskService.addTask(newTask);
    renderList();
}

async function renderList(listName) {
    try {
        currentlist = listName.target.getAttribute('text')
    } catch {}
    if (currentlist == null) {
        currentlist = 'mainList';
    }
    let tasks = await taskService.getTasksList();
    let list = document.createElement('ul');
    list.id = 'tasks'

    tasks.forEach(element => {
        list.appendChild(createTaskLi(element));
    });
    
    main.replaceChild(list, tasksUl);
    tasksUl = list;

    for (let i = 0; i < navLists.childNodes.length; i++) {
        if (navLists.childNodes[i].getAttribute('text') == currentlist) {
            navLists.childNodes[i].classList.add('active');
        } else {
            navLists.childNodes[i].classList.remove('active');
        }
      }
    
}

function createTaskLi(task) {
    let li = document.createElement('li');
    let deleteB = document.createElement('button');
    let completeB = document.createElement('input');
    let textSpan = document.createElement('span');
    deleteB.textContent = 'DELETE';
    deleteB.addEventListener('click', deleteTask);
    completeB.type = 'checkbox';

    //console.log(task.complete);

    completeB.checked = task.complete == 'true';
    completeB.classList.add('complete-check');
    completeB.addEventListener('change', completeTask);

    textSpan.textContent = task.text;
    li.setAttribute('complete', task.complete) ;
    li.setAttribute('text', task.text);
    li.setAttribute('id', task.id)
    li.style.cursor = 'pointer';
    li.classList.add('task');
    li.addEventListener('click', changeTask);
    
    li.appendChild(completeB);
    li.appendChild(textSpan);
    li.appendChild(deleteB);
    
    return li;
}

function deleteTask(event) {
    event.stopPropagation();
    event = event.target.parentNode;
    tasksUl.removeChild(event);
    taskService.deleteTask(event.getAttribute('id'));
}

async function completeTask(event) {
    event.stopPropagation();
    event = event.target.parentNode;
    event.setAttribute('complete', !(event.getAttribute('complete') == 'true'));
    await taskService.completeTask(event);

    renderList();
}

async function changeTask(event) {
    if (event.target.tagName != 'SPAN') {return;}
    let newText = prompt('Write new text', event.target.parentNode.getAttribute('text'));

    if (!newText) {return};
    await taskService.changeTask(event.target.parentNode, newText);
    
    renderList();
}

 function renderTaskLists() {
    let lists = document.createElement('ul');
    lists.id = 'leftPanel';
    taskService.getListsKeys().then((TaskLists) => {
        for ( var i = 0, len = TaskLists.length; i < len; ++i ) {
            let li = document.createElement('li');
            li.onclick = renderList;
            li.setAttribute('text', TaskLists[i]);
            li.textContent = TaskLists[i];
            li.classList.add('nav-element')
            let deleteButton = document.createElement('button');
            deleteButton.textContent = 'DELETE';
            deleteButton.addEventListener('click', deleteList);
            li.appendChild(deleteButton);
    
            lists.appendChild(li);
        }
    
        let lastLi = document.createElement('li');
        lastLi.appendChild(newInput);
        lastLi.appendChild(addListButton);
        lastLi.classList.add('nav-element')
        lists.appendChild(lastLi);
    
        nav.replaceChild(lists, navLists);
        navLists = lists;
        renderList();
    });
}

async function deleteList(event) {
    await taskService.deleteList(event);
    renderTaskLists();
}

