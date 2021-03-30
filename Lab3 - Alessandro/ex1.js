'use strict'
const isBetween = window.dayjs_plugin_isBetween;
dayjs.extend(isBetween);

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

        this.add = (task) => this.list.push(task);
        this.populateWebPage = (new_tab) => {
            if(this.list.length === 0){
                let col = document.createElement('td')
                let trow = document.createElement('tr');
                col.textContent = "No task for " + new_tab.table_tit.textContent;
                col.classList = 'fst-italic'
                trow.appendChild(col);
                new_tab.tbody.appendChild(trow);                    
            }
            this.list.forEach(task => {
                    let trow = document.createElement('tr');
                    let cols = []
                    cols.push(document.createElement('td'));
                    cols.push(document.createElement('td'));
                    cols.push(document.createElement('td'));
                    cols[0].className = 'col-3'
                    cols[1].className = 'text-center col-3';
                    cols[2].className = 'text-end col-3';
                    
                    let checkb = document.createElement('input');
                    checkb.setAttribute('type', 'checkbox');
                    checkb.className = 'm-1';
                        
                    cols[0].innerHTML += `<input type="checkbox" class="m-1"></input> ` + task.desc;
                    if(task.urg){
                        cols[0].style = 'color:red; font-weight:bold';        
                    }
                    if(task.priv){
                        cols[1].innerHTML += `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-square" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z"/>
                        </svg>`;
                    }
                    cols[2].innerText = task.deadline.format('DD-MM-YYYY');
                    
                    trow.appendChild(cols[0]);
                    trow.appendChild(cols[1]);
                    trow.appendChild(cols[2]);
                    new_tab.tbody.appendChild(trow);                    
            })
            main.appendChild(new_tab.table_tit);
            main.appendChild(new_tab.table);
            const btn = document.getElementById('plus-btn');
            new_tab.table.after(btn);
        }
       
        this.getUrgentTasks = () => {
            const urg_tasks = new TaskList();
            this.list.filter(el => el.urg).forEach(el => urg_tasks.add(el));
            return urg_tasks;
        }
        this.getPrivateTasks = () => {
            const priv_tasks = new TaskList();
            this.list.filter(el => el.priv).forEach(el => priv_tasks.add(el));
            return priv_tasks;
        }
        this.getTodayTasks = () => {
            const today_tasks = new TaskList();
            this.list.filter(el => el.deadline.isSame(dayjs(), 'date')).forEach(el => today_tasks.add(el));
            return today_tasks;
        }
        this.getWeekTasks = () => {
            const week = new TaskList();
            const next_week = dayjs().add(7, 'day');
            this.list.filter(el => el.deadline.isBetween(dayjs(), next_week, 'date', '[]'))
                .forEach(el => week.add(el));
            return week;
        }


        this.toString = () => (this.list.map( e => (e.toString())).join('\n'));
}

