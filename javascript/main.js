//alert('connected');

/*
    Author: Riley Eyrich
    Date: 4/02/2022
    Title: To Do w/ Local Storage
*/

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
    if (storageAvailable() === true) { //check if local storage is available
        if (localStorage.getItem(storageKey) === null) { //if there is local storage but no todo data
////////////alert('Welcome! This To-Do uses the local storage on your browser which means that you can keep coming back without worrying about losing your progress (no log in needed!). This also means that all of your data can be accessed offline. Go ahead and add a task to give it a try!');
            document.getElementById('paraHide').hidden = true;
            document.getElementById('newTaskForm').hidden = false;
            document.getElementById('toDoArea').hidden = true;
        }else{ //if there is local storage and there is todo data
            document.getElementById("newTaskForm").hidden = true; //hide form
            displayList();}
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

    displayList();
}

function displayList() { //function to display data
    myArray = JSON.parse(localStorage.getItem(storageKey)); //get data and parse it to array
    var myString = '';
        if (myArray.length == 0){
            alert('You have no current tasks!');
            document.getElementById('paraHide').hidden = true;
            document.getElementById('newTaskForm').hidden = false;
            document.getElementById('toDoArea').hidden = true;
        }else{
            for (var i = 0; i < myArray.length; i++) { 
                var taskName = myArray[i].task;
                var descrip = myArray[i].descrip;
                var deadline = myArray[i].deadline;
                var priorityLevel = myArray[i].priority;
                var removalIndex = i;
                //create string to be innerhtml of tododata and append
                var string = `<span class="priority${priorityLevel}">`
                +`<input type="checkbox" class="removeTask" value="${removalIndex}">`
                +`<p class="taskItem">${taskName}</p>`
                +`<p id="taskDescrip">${descrip}</p>`
                +`<p class=deadline>${deadline}</p></span>`;
                myString += string;
                document.getElementById('toDoData').innerHTML = myString;
            };
            document.getElementById('toDoArea').hidden = false;
            document.getElementById('newTaskForm').hidden = true;
        };
};
    
function removeCompleted() {//function to remove checked items
    var checkBox = document.getElementsByClassName("removeTask");
    var del = [];
    for (var i = 0; checkBox[i]; i++) {//get indexes of checked boxes
        if (checkBox[i].checked) {
        index = checkBox[i].value;
        del.push(index);
        }
    };
    while (del.length > 0) {//pop checked tasks
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

//event listener for sort priority
var sortP = document.getElementById('sortPriority');
sortP.addEventListener('click', function(){
    myArray.sort(function(a, b) {
        return a.priority - b.priority;
      });
    localStorage.setItem(storageKey, JSON.stringify(myArray));
    displayList();
});

//event listener for sort date
var sortD = document.getElementById('sortDate');
sortD.addEventListener('click', function(){
    myArray.sort(function(a, b) {
        return new Date(a.deadline) - new Date(b.deadline);
      });
    localStorage.setItem(storageKey, JSON.stringify(myArray));
    displayList();
});
