

let tasks=JSON.parse(localStorage.getItem('tasks'))||[];

updateTaskList();
updateStats();

const saveTasks=()=>{
    localStorage.setItem('tasks',JSON.stringify(tasks));
}


function addTask()
{
    let taskInput=document.getElementById('taskInput');
    let text=taskInput.value;
    if(text)
    {
        tasks.push({text:text,completed:false});

    }
    console.log(tasks);
    
    updateTaskList();
    updateStats();
    saveTasks();
    
}

function deleteTask(index)
{
    tasks=tasks.filter((value,i)=>i!==index);
    
    updateTaskList();
    updateStats();
    saveTasks();

}

function editTask(index)
{
    const taskInput=document.getElementById('taskInput');
    taskInput.value=tasks[index].text;
    tasks.splice(index,1);
   
    updateTaskList();
    updateStats();
    saveTasks();
}



const toggleTaskComplete=(index)=>{
    tasks[index].completed =(!tasks[index].completed);
    console.log(tasks[index]);

    updateTaskList();
    updateStats();
    saveTasks();

}

function updateStats()
{
    const completedTask=tasks.filter((task)=>task.completed===true).length;
    const totalTask=tasks.length;
    const percentage=Math.floor((completedTask*100)/totalTask);
    console.log(percentage);
    const progressBar=document.getElementById('progress');
    progressBar.style.width=`${percentage}%`;
    document.getElementById('numbers').innerHTML=`${completedTask}/${totalTask}`
}

function updateTaskList()
{
    const taskList=document.getElementById('taskList');
    taskList.innerHTML='';

    tasks.forEach((task,index)=>{
const listItem=document.createElement('li');
listItem.innerHTML=`
<div class='taskItem'>
<div class="task ${task.completed ? 'completed':''}">
<input type="checkbox" class="checkbox" ${task.completed ?"checked":''}/>
<p>${task.text}</p>
</div>
<div class="icons">
<i class="fa-regular fa-pen-to-square update" onclick="editTask(${index})"></i>
<i class="fa-solid fa-trash delete" onclick="deleteTask(${index})"></i>
</div>
</div>`
listItem.addEventListener("change",function(){
    toggleTaskComplete(index);
   
});



taskList.appendChild(listItem);
    });

    
}
document.getElementById('newTask').addEventListener("click",function(event){
    event.preventDefault();
    addTask();
})