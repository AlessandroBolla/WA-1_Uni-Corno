'use strict'

const main = document.querySelector('main');
const list_group = [...document.querySelectorAll('.list-group-item')];

function Table(title){
    this.table_tit = document.createElement('h1');
    this.table_tit.textContent = title;
    this.table_tit.id = 'tit-table';
    this.table = document.createElement('table');
    this.table.id = 'main-table'; 
    this.table.className = 'table table-striped m-1 table-hover';
    
    this.tbody = document.createElement('tbody');
    this.tbody.className = 'row-cols-3';
    this.table.appendChild(this.tbody);
}

const t1 = new Task('01', "Cibo Cani", dayjs(new Date(2021, 2, 30)), undefined, undefined);
const t2 = new Task('03', "Cambiare nome al peluche", dayjs(new Date(2025, 8, 10)), false, false);
const t3 = new Task('02', "Andare al bar", dayjs(new Date(2021, 3, 2)), true, true);
const taskList = new TaskList();

taskList.add(t1);
taskList.add(t2);
taskList.add(t3);

for(let i = 0; i < 30; i++)
    taskList.add(new Task('02', "Andare al bar", dayjs(new Date(2021, 3, 2)), true, true));

list_group[0].classList.add('active');
taskList.populateWebPage(new Table('All'));

list_group[0].addEventListener('click', (event) => {
    const active = document.querySelector('.list-group-item.active');
    active.classList.remove('active');
    main.removeChild(document.getElementById('tit-table'));
    main.removeChild(document.getElementById('main-table'));
    
    list_group[0].classList.add('active');
    taskList.populateWebPage(new Table(list_group[0].textContent));
})
list_group[1].addEventListener('click', (event) => {
    const active = document.querySelector('.list-group-item.active');
    active.classList.remove('active');
    main.removeChild(document.getElementById('tit-table'));
    main.removeChild(document.getElementById('main-table'));
    
    taskList.getUrgentTasks().populateWebPage(new Table(list_group[1].textContent));
    list_group[1].classList.add('active');
})
list_group[2].addEventListener('click', (event) => {
    const active = document.querySelector('.list-group-item.active');
    active.classList.remove('active');
    main.removeChild(document.getElementById('tit-table'));
    main.removeChild(document.getElementById('main-table'));
    
    taskList.getTodayTasks().populateWebPage(new Table(list_group[2].textContent));
    list_group[2].classList.add('active');
})
list_group[3].addEventListener('click', (event) => {
    const active = document.querySelector('.list-group-item.active');
    active.classList.remove('active');
    main.removeChild(document.getElementById('tit-table'));
    main.removeChild(document.getElementById('main-table'));
    
    taskList.getWeekTasks().populateWebPage(new Table(list_group[3].textContent));
    list_group[3].classList.add('active'); 
})
list_group[4].addEventListener('click', (event) => {
    const active = document.querySelector('.list-group-item.active');
    active.classList.remove('active');
    main.removeChild(document.getElementById('tit-table'));
    main.removeChild(document.getElementById('main-table'));

    taskList.getPrivateTasks().populateWebPage(new Table(list_group[4].textContent));
    list_group[4].classList.add('active');
})
