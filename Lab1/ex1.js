'use strict'
const dayjs = require('dayjs');

function Task(id, desc, deadline, urg = false, priv = true){
    this.id = id;
    this.desc = desc;
    this.urg = urg;
    this.priv = priv;
    this.deadline = deadline;

    this.toString = () => (`Id = ${this.id} - "${this.desc}" - Deadline: ${this.deadline.format('DD-MM-YYYY')} - isUrgent: ${this.urg} - isPrivate: ${this.priv}`);
}

function TaskList(){
    this.list = [];

    this.add = (task) => (this.list.push(task));
    this.sortAndPrint = () => {
        let tmp = Array.from(this.list);
        tmp.sort((a,b) => a.deadline - b.deadline);
        console.log('*** Task Sorted ***');
        tmp.forEach(e => console.log(e.toString()));
    }
    this.filterAndPrint = () => {
        console.log("*** Task Filtered ***");
        let filtered = this.list.filter(a => a.urg === true);
        filtered.forEach(a => console.log(a.toString()));
    }

    this.toString = () => (this.list.map( e => (e.toString())).join('\n'));
}

const t1 = new Task('01', "Cibo Cani", dayjs(new Date(2021, 5, 28)), undefined, undefined);
const t2 = new Task('03', "Cambiare nome al peluche", dayjs(new Date(2025, 8, 10)), true, false);
const t3 = new Task('02', "Andare al bar", dayjs(new Date(2018, 3, 22)), true, true);
const taskList = new TaskList();

taskList.add(t1);
taskList.add(t2);
taskList.add(t3);
console.log(taskList.toString());

taskList.sortAndPrint();
taskList.filterAndPrint();

