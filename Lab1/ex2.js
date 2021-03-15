'use strict'

const dayjs = require('dayjs');
const sqlite = require('sqlite3')

const db = new sqlite.Database('tasks_db.db',
    (err) => {if(err) throw err;});

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
        this.add = (t) => (this.list.push(t));

        this.toString = () => (this.list.map( e => (e.toString())).join('\n'));
    }
function getAll(){
    const sql = `select * from tasks`;
    return new Promise( (resolve, reject) => {
        db.all(sql, (err, rows) => {
            if(err)
                reject(err);
            else {
                let tmp = new TaskList() ;

                for(let row of rows ) {        
                    let nt = new Task(row.id, row.desc,dayjs(new Date(row.deadline)),row.urg,row.priv);                    
                    tmp.add(nt) ;
                }

                resolve(tmp);
            }
        }) ;
    });        
}
function afterDate(date){
    const sql = `select * from tasks where deadline > '${date.format('YYYY-MM-DD')}'`;
    return new Promise( (resolve, reject) => {
        db.all(sql, (err, rows) => {
            if(err)
                reject(err);
            else {
                let tmp = new TaskList() ;
                for(let row of rows ) {        
                    let nt = new Task(row.id, row.desc,dayjs(new Date(row.deadline)),row.urg,row.priv);                    
                    tmp.add(nt) ;
                }

                resolve(tmp);
            }
        }) ;
    });
} 

function searchW(word){
    const sql = `select * from tasks where desc like '%${word}%'`;
    return new Promise( (resolve, reject) => {
        db.all(sql, (err, rows) => {
            if(err)
                reject(err);
            else {
                let tmp = new TaskList() ;
                for(let row of rows ) {        
                    let nt = new Task(row.id, row.desc,dayjs(new Date(row.deadline)),row.urg,row.priv);                    
                    tmp.add(nt) ;
                }

                resolve(tmp);
            }
        }) ;
    });
}

async function main(){

    const tl = new TaskList();
    console.log("*** Get all ***");
    let allTask = await getAll();
    console.log(allTask.toString());
    console.log("*** After a Date ***");
    let after = await afterDate(dayjs('2021-08-01'));
    console.log(after.toString());
    console.log("*** Search a Word ***");
    let search = await searchW('c');
    console.log(search.toString());


    db.close();
}
main();