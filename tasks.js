const fs = require('fs');
let fileName = 'database.json';

if(process.argv[2]){
  fileName = process.argv[2];
}

try{
  let tasklists = fs.readFileSync(fileName);
  var tasks = JSON.parse(tasklists).tasks;
}catch{
  var tasks = [];
  let data = JSON.stringify({tasks: tasks});
  fs.writeFileSync(fileName, data);
}


/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}

/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  if (text === 'quit\n' || text === 'exit\n') {
    quit();
  }
  else if(text.trim().split(" ")[0] === 'hello'){
    if(text.trim().split(" ")[1] !== undefined){
      hello(text.trim().split(" ")[1]); 
    }else{
      hello("");
    }
  }
  else if(text === 'help\n'){
    help();
  }
  else if(text === 'list\n'){
    list();
  }
  else if(text.trim().split(" ")[0] === 'add'){
    add(text.trim());
  }
  else if(text.trim().split(" ")[0] === 'remove'){
    remove(text.trim());
  }
  else if(text.trim().split(" ")[0] === 'edit'){
    edit(text.trim());
  }
  else if(text.trim().split(" ")[0] === 'check'){
    check(text.trim());
  }
  else if(text.trim().split(" ")[0] === 'uncheck'){
    uncheck(text.trim());
  }
  else{
    unknownCommand(text);
  }
}

/**
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function add(text){
  var task = text.trim().split(" ");
  task.shift();
  task = task.join(' ');
  if(task.trim()){
    let item ={
      task : task.trim(),
      status: false
    }
    tasks.push(item);
    console.log(`task added [${task}]`);
  }
  else{
    console.log("Please enter a task to add");
  }
}

/**
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
 function remove(text){
   if(text.trim().split(" ")[1]){
    var number = text.trim().split(" ")[1];
    var nbtasks = tasks.length;
    for(let i=0 ; i<tasks.length ;i++){
      if(i == number-1){
        tasks.splice(i,1);
        console.log(`task ${number} removed`);
        break;
      }
    }
    if(nbtasks === tasks.length){
      console.log(`Task ${number} is not exist`);
    }

   }
   else{
     tasks.pop();
     console.log("Last task removed");
   }
  
}

/**
 * to edit the tasks
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
 function edit(text){
  var task = text.trim().split(" ");
  task.shift();
  if(isNaN(Number(task[0]))){
    task = task.join(' ');
    if(task.trim()){
      tasks[tasks.length-1].task = task;
      console.log(`Last task edited to [${task}]`);
      list();
    }
    else{
      console.log("Please enter the new edited task");
    }
  }else{
    let number = Number(task[0]);
    task.shift();
    task = task.join(' ');
    if(task.trim()){
      if(number <= tasks.length){
        tasks[number-1].task = task;
        console.log(`Task ${number} edited to [${task}]`);
        list();
      }
      else{
        console.log("The number of task is not exist");
      }
    }
    else{
      console.log("Please enter the new edited task");
    }
  }
  
}


/**
 * to check the tasks
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
 function check(text){
  var task = text.trim().split(" ");
  task.shift();
  if(isNaN(Number(task[0]))){
    console.log('Enter the number of task that you want to check');

  }else{
    let number = Number(task[0]);
    tasks[number-1].status = true;
    console.log("Checked");
    list();
  }
  
}

/**
 * to uncheck the tasks
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
 function uncheck(text){
  var task = text.trim().split(" ");
  task.shift();
  if(isNaN(Number(task[0]))){
    console.log('Enter the number of task that you want to uncheck');

  }else{
    let number = Number(task[0]);
    tasks[number-1].status = false;
    console.log("Unchecked");
    list();
  }
  
}

/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


/**
 * Says hello
 *
 * @param  {string} name the name received
 * @returns {void}
 */
function hello(name){
  if(name){
    console.log(`hello ${name}!`);
  }else{
    console.log(`hello!`);
  }

}


/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!')
  try {
    fs.writeFile(fileName, JSON.stringify({tasks: tasks}), function writeJSON(err) {
      if (err) console.log(err);
      console.log(`Data saved in ${fileName} file`);
      process.exit();
    });
  } catch (error) {
    console.error('Data not saved');
  }
}

/**
 * Help to display All the commands
 *
 * @returns {void}
 */
 function help(){
  console.log(`
  'hello <any name>' to say hello with the name added 
  'quit' or 'exit' to quit
  'help' to list the commands
  'list' to list all the added tasks
  'add <task>' to add new tasks
  'remove' to remove the last task
  'remove <number>' to remove numbered task
  'check <number>' to make the numbered task checked
  'uncheck <number>' to make the numbered task unchecked`);
}

/**
 * List the tasks
 *
 * @returns {void}
 */
 function list(){
  if(tasks.length){
    tasks.map((item,index) => {
      if(item.status){
        console.log(`${index+1} - [✔] ${item.task}`);
      }
      else{
        console.log(`${index+1} - [ ] ${item.task}`);
      }
  
    })
  }else{
    console.log("No tasks to list, add some tasks using add command");
  }
}

// The following line starts the application
startApp("Zaynab Abd El Nabi")
