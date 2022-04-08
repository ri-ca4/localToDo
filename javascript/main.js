//alert('connected');

/*
    Author: Riley Eyrich
    Date: 4/02/2022
    Title: To Do w/ Local Storage
*/
//define array and storage key
var myArray = [];
var storageKey = 'myToDo';


function main(storageKey) { //function to get tasks from todo
    var newUser = true;
    if (window.localStorage = true) { //check if local storage is available
        if (localStorage.getItem(storageKey) === null) { //if there is local storage but no todo data
            newUser = true;
            alert('Welcome! This To-Do uses the local storage on your browser which means that you can keep coming back without worrying about losing your progress (no log in needed!). This also means that all of your data can be accessed offline. Go ahead and add a task to give it a try!');
            document.getElementById('paraHide').hidden = true;
            document.getElementById('toDoArea').hidden = true;
        }else{ //if there is local storage and there is todo data
            newUser = false;
            document.getElementById("newTaskForm").hidden = true; //hide form
            myArray = JSON.parse(localStorage.getItem(storageKey)); //get data and parse it to array
            displayList();} //function to display data
        }else{// if there is no local storage available
            alert('It seems like this browser doesn\'t support local storage. Please switch to a new device or browser');
            document.getElementById('toDoArea').hidden = true;
            document.getElementById('newTaskForm').hidden = true;
        };
    }

    function displayList() { //function to display data
        for (var i = 0; i <= myArray.length; i++) { 
            //define string
            var myString = "";
            //define variables for each
            var taskName = myArray[i].task;
            var descrip = myArray[i].descrip;
            var deadline = myArray[i].deadline;
            var priorityLevel = myArray[i].priority;
            var removalIndex = i;
            //create string to be innerhtml of tododata
            var string = `<div class=listTask><span class="priority${priorityLevel}"><input type="checkbox" class="removeTask" value="${removalIndex}"><p class="taskItem">${taskName}</p><p id="taskDescrip">${descrip}</p><p class=deadline>${deadline}</p></span></div>`;
            // append string to mystring
            string += myString;
            // set innerhtml to mystring
            document.getElementById('toDoData').innerHTML = myString;
        };
        //display todoarea
        document.getElementById('toDoArea').hidden = false;

        //set class for priority
    };

    function getNewTask() {

        var newTask = document.getElementById('taskName').value;
        var newDescrip = document.getElementById('descrip').value;
        var newPriority = document.getElementById('priority').value;
        var newDeadline = document.getElementById('deadline').value;
        
        var toDoTask = new Object ();
        toDoTask.task = newTask;
        toDoTask.descrip = newDescrip;
        toDoTask.priority = newPriority;
        toDoTask.deadline = newDeadline;

        myArray.push(toDoTask);

        document.getElementById('taskName').value = '';
        document.getElementById('descrip').value = '';
        document.getElementById('priority').value = '3';
        document.getElementById('deadline').value = '';

        displayList();
        //document.getElementById('newTaskForm').hidden = true;
        console.log(myArray);
    }

var submitBtn = document.getElementById('submitTask');
submitBtn.addEventListener('click', function(e){
    e.preventDefault();
    getNewTask();
} );

