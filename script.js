window.addEventListener('load', () => {
    const form = document.querySelector('#task-form');
    const input = document.querySelector("#new-task");
    const taskList = document.querySelector("#tasks")
    
    form.addEventListener('submit',(e) => { // to prevent the the page from refreshing
        e.preventDefault();

        const task = input.value;
        let alertMsg = document.getElementById("alert");

        if(!task) {
            alertMsg.innerHTML = "You have not added any task, please add one!";
            return;
        } else {
            alertMsg.innerHTML= "Task added Succesfuly";
            return;
        }
    })

    
})