
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

var tasks=["task 1", "task 2"]

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
  else{
    unknownCommand(text);
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
  process.exit();
}

/**
 * Help to display All the commands
 *
 * @returns {void}
 */
 function help(){
  console.log("'hello <any name>' to say hello with the name added \n'quit' or 'exit' to quit \n'help' to list the commands")
}

/**
 * List the tasks
 *
 * @returns {void}
 */
 function list(){
  tasks.map((task,index) => {
    console.log(`${index+1} : ${task}`);
  })

}

// The following line starts the application
startApp("Zaynab Abd El Nabi")
