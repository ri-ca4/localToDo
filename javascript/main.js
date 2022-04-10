//alert('connected');

/*
    Author: Riley Eyrich
    Date: 4/02/2022
    Title: To Do w/ Local Storage
*/
//define array and storage key
var myArray = [];
var storageKey = 'myToDo';


function storageAvailable() {//function to test local storage
    try {
      var x = '__storage_test__';
      localStorage.setItem(x, x);
      localStorage.removeItem(x);
      return true;
    } catch (e) {
      return false;
    }
};

function main() { //function to get tasks from todo
    // var newUser = true;
    if (storageAvailable() === true) { //check if local storage is available
        if (localStorage.getItem(storageKey) === null) { //if there is local storage but no todo data
            newUser = true;
            alert('Welcome! This To-Do uses the local storage on your browser which means that you can keep coming back without worrying about losing your progress (no log in needed!). This also means that all of your data can be accessed offline. Go ahead and add a task to give it a try!');
            document.getElementById('paraHide').hidden = true;
            document.getElementById('newTaskForm').hidden = false;
            document.getElementById('toDoArea').hidden = true;
        }else{ //if there is local storage and there is todo data
            newUser = false;
            document.getElementById("newTaskForm").hidden = true; //hide form
            //myArray = JSON.parse(localStorage.getItem(storageKey)); //get data and parse it to array
            displayList();} //function to display data
        }else{// if there is no local storage available
            alert('It seems like this browser doesn\'t support local storage. Please switch to a new device or browser');
            document.getElementById('toDoArea').hidden = true;
            document.getElementById('newTaskForm').hidden = true;
        };
};

function getNewTask() {//creates object from user input, adds object to myArray, clears input

    var newTask = document.getElementById('taskName').value;
    var newDescrip = document.getElementById('descrip').value;
    var newPriority = document.getElementById('priority').value;
    var newDeadline = document.getElementById('deadline').value;
    
    //make user input into an object
    let toDoTask = new Object();
    toDoTask.task = newTask;
    toDoTask.descrip = newDescrip;
    toDoTask.priority = newPriority;
    toDoTask.deadline = newDeadline;

    //add task to array
    myArray.push(toDoTask);
    //send item to storage
    localStorage.setItem(storageKey, JSON.stringify(myArray));
    //"reset" input fields
    document.getElementById('taskName').value = '';
    document.getElementById('descrip').value = '';
    document.getElementById('priority').value = '3';
    document.getElementById('deadline').value = '';

                //console.log(myArray);
                // debugger;
                // var taskName = myArray[0].task;
                // var descrip = myArray[0].descrip;
                // var deadline = myArray[0].deadline;
                // var priorityLevel = myArray[0].priority;
                // var removalIndex = 0;
                // console.log(
                //     taskName, descrip, deadline, priorityLevel, removalIndex
                // )
                // debugger;

    displayList();//run display list function
}

function displayList() { //function to display data
    myArray = JSON.parse(localStorage.getItem(storageKey)); //get data and parse it to array
    var myString;
    for (var i = 0; i < myArray.length; i++) { 
        //define variables for each
                    //console.log(myArray);
                    //debugger;
        var taskName = myArray[i].task;
        var descrip = myArray[i].descrip;
        var deadline = myArray[i].deadline;
        var priorityLevel = myArray[i].priority;
        var removalIndex = i;
        //create string to be innerhtml of tododata
        var string = `<span class="priority${priorityLevel}">`
        +`<input type="checkbox" class="removeTask" value="${removalIndex}">`
        +`<p class="taskItem">${taskName}</p>`
        +`<p id="taskDescrip">${descrip}</p>`
        +`<p class=deadline>${deadline}</p></span>`;
        // append string to mystring
        myString += string;
        // set innerhtml to mystring
        document.getElementById('toDoData').innerHTML = myString;
    };
    //display todoarea
    document.getElementById('toDoArea').hidden = false;//show todoarea
    document.getElementById('newTaskForm').hidden = true;//hide form
    //set class for priority
};
    
function removeCompleted() {//function to remove checked items
    var checkBox = document.getElementsByClassName("removeTask");
    var del = [];
    for (var i = 0; checkBox[i]; i++) {
        if (checkBox[i].checked) {
        index = checkBox[i].value;
        del.push(index);
        }
    };
            //console.log(del);
    while (del.length > 0) {
        var i = del.pop();
        myArray.splice(i, 1);
      };
    
    if (myArray.length === 0){//clear tododata div if there are no tasks
        document.getElementById('toDoData').innerHTML = null;
    }
    //save changes in local storage
    localStorage.setItem(storageKey, JSON.stringify(myArray));
    displayList();
};

        // //event listener for deleting task
        // var complete = document.getElementById(removeTasks);
        // complete.addEventListener('click', removeCompleted());

//event listener for submit button
var submitBtn = document.getElementById("submitTask");
submitBtn.addEventListener('click', function(e){
    e.preventDefault();
    getNewTask();
} );

//event listener for showing form
var showForm = document.getElementById('showForm');
showForm.addEventListener('click', function(){
    document.getElementById('toDoArea').hidden = true;//hide todo
    document.getElementById('newTaskForm').hidden = false;//show form
});

//event listener for hiding form
var hideForm = document.getElementById('hideForm');
hideForm.addEventListener('click', function(){
    document.getElementById('toDoArea').hidden = false;//show todo
    document.getElementById('newTaskForm').hidden = true;//hide form
});

