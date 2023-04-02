// creating an object -->state
// var state={
// creating an array taskList
// taskList: [
//     {
//         imageUrl: "",
//         taskTitle: "",
//         taskType: "",
//         taskDescription: "",
//     },
//     {
//         imageUrl: "",
//         taskTitle: "",
//         taskType: "",
//         taskDescription: "",
//     },
//     {
//         imageUrl: "",
//         taskTitle: "",
//         taskType: "",
//         taskDescription: "",
//     },
//     {
//         imageUrl: "",
//         taskTitle: "",
//         taskType: "",
//         taskDescription: "",
//     },
//     {
//         imageUrl: "",
//         taskTitle: "",
//         taskType: "",
//         taskDescription: "",
//     },
// ]
// };
// This array taskList is a backup storage
const state={
    taskList:[],
};

// DOM Operations
const taskContents = document.querySelector(".task__contents");
const taskModal = document.querySelector(".task__modal__body");

// getting some js element to html use "$".....
//to have edit and del button from right to left ...we have justify-content-end here in 49th line
const htmlTaskContent = ({ id, title, description, type, url})=>`
    <div class='col-md-6 col-lg-4 mt-3' id=${id} key=${id}>
        <div class="card shadow-sm task__card">         
        <div class="card-header d-flex justify-content-end task__card__header">
        
        <button type= "button" class="btn btn-outline-info mr=1.5" name= ${id} onclick="editTask()">
        <i class="fas fa-pencil-alt name=${id}"></i>
        </button>
        <button type= "button" class="btn btn-outline-danger mr=1.5" name= ${id} onclick="deleteTask()">
        <i class="fas fa-trash-alt name=${id}"></i>
        </button>
        </div>
        
        <div class="card-body">
        ${
            // url && 
            // `<img width=100% src=${url} alt="Card Image" class="card-img-top md-3 rounded-lg" />`
            url 
            ? `<img width='100%' src=${url} alt="Card Image" class="card-img-top md-3 rounded-lg" />`
            :`<img width='100%' src="./default img.png" alt="Card Image" class="card-img-top md-3 rounded-lg" />`
        }
        <h4 class='card-title task__card__title'>${title}</h4>
        <p class='description trim-3-lines text-muted'>${description}</p>
        <div class='tags text-white d-flex flex-wrap'>
        <span class='badge bg-primary m-1'>${type}</span>
        </div>
        </div>
       
        <div class="card-footer">
        <button type="button" class="btn btn-outline-primary float-right" data-bs-toggle="modal" 
        data-bs-target="#showTask" onclick='openTask()' id=${id}>
        Open Task 
        </button>
        </div>
        </div>
    </div>
`;
// Modal Body on >> clk of Open Task
const htmlModalContent = ({ id, title, description, url })=>{
    const date =new Date(parseInt(id));
    return`
    <div id=${id}>
    ${
        // url && 
        // `<img width=100% src=${url} alt="Card Image" class="img-fluid place__holder__image mb-3"/>`
         // url && 
            // `<img width=100% src=${url} alt="Card Image" class="card-img-top md-3 rounded-lg" />`
            url 
            ? `<img width=100% src=${url} alt="Card Image" class="img-fluid place__holder__image mb-3"/>`
            :`<img width=100% src="./default img.png" alt="Card Image" class="img-fluid place__holder__image mb-3"/>`
        
    }
    <strong class="text-muted text-sm">Created on :${date.toDateString()}</strong>
    <h2 class="my-3">${title}</h2>
    <p class="text-muted">${description}</p>
    </div>
    `;
};
// we convert json to str (i.e., for local storage)
const updateLocalStorage = () => {
    localStorage.setItem(
     "task",  
     JSON.stringify({
        tasks: state.taskList,
     })
    //  here we key:value as ---> task : tasks
    );
};
// Load Initial Data
// we convert string to json (i.e., for getting cards on the screen)
const LoadInitialData = () => {
const localStorageCopy = JSON.parse(localStorage.task);

if(localStorageCopy) state.taskList = localStorageCopy.tasks;

state.taskList.map((cardDate)=>{
    taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardDate));//innerAdjacentHTML => to get the cards side by side
});
};

// when we edit or update we need to save
// to give submit(save changes) to the particular card we need to denote the card with ID
// getting some html stuffs to js that is while clicking submit in html output(i.e., card)
// we have to store those changes in js.....


// for savechanges
const handleSubmit=(event)=>{   
    const id= `${Date.now()}`;
    const input={
        url:document.getElementById("imageUrl").value,  //url : https.... now the url will be user given input url
        title:document.getElementById("taskTitle").value,
        type:document.getElementById("tags").value,
        description:document.getElementById("taskDescription").value,  
    };        // to display both updated and non updated cards in UI
    if(input.title===""||input.type===""||input.description===""){
        return alert("Please fill all the necessary fields ...");
    }
    taskContents.insertAdjacentHTML("beforeend",htmlTaskContent({ ...input, id }));
    state.taskList.push({ ...input, id});       //store this updated data in array
    updateLocalStorage();
};

// while we update and click "save changes" button all the datas should be saved...so we have to call the method
// "handleSubmit" in html ...to save the changes.


// open task
const openTask=(e)=>{
    if(!e) e=window.event;     //default

    const getTask = state.taskList.find(({id}) => id === e.target.id);
    taskModal.innerHTML = htmlModalContent(getTask);
};
// delete task
const deleteTask = (e) =>{
    if(!e) e=window.event;     //default
    const targetId =e.target.getAttribute("name"); // gets the id of that particular card
    // console.log(targetId);
    const type=e.target.tagName;  //type means it says whether we are clicking on delete icon[I](trash) or that button[button] 
    //console.log(type);
    const removeTask = state.taskList.filter(({id}) => id!== targetId); 
    // console.log(removeTask);
    // All the id(cards with other id's) will be updated except the id(card) which is clicked by the user
    updateLocalStorage();
    //to delete in localstorage and tasklist
    if(type === "BUTTON"){
        // to delete in (remove from) UI
        console.log(e.target.parentNode.parentNode.parentNode.parentNode)
        
        // from line 56 you have to go four times back .parent.parent.parent.parent to reach line 48.
        return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
        e.target.parentNode.parentNode.parentNode);
    }
    return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
        e.target.parentNode.parentNode.parentNode.parentNode); 
};

const editTask =(e) =>{
    if(!e) e=window.event;

    const targetId =e.target.id;
    const type=e.target.tagName;
    
    let parentNode;
    let taskTitle;
    let taskDescription;
    let taskType;
    let submitButton;
    
    if(type=="BUTTON"){
       parentNode=e.target.parentNode.parentNode;
    }
    else{
        parentNode=e.target.parentNode.parentNode.parentNode;
    }
    // edit taskTitle

    // taskTitle=parentNode.childNodes;
    // console.log(taskTitle);
    // In childNodes we have "card-body" at 3rd index
    // hence parentNode.childNodes[3] --------> gives "card-body"

    // taskTitle=parentNode.childNodes[3].childNodes;
    // console.log(taskTitle);
    // In childNodes[3].childNodes we have all the contents of "card-body" at odd indices 
    // taskTitle at index 3, and so on...

    taskTitle = parentNode.childNodes[3].childNodes[3];
    taskDescription = parentNode.childNodes[3].childNodes[5];
    // taskType = parentNode.childNodes[3].childNodes[7];
    taskType = parentNode.childNodes[3].childNodes[7].childNodes[1];   //to get the exact destination
    submitButton=parentNode.childNodes[5].childNodes[1];  // childNodes[5]-------> footer
    console.log(taskTitle,taskDescription,taskType,submitButton);

    // to edit we have setAttribute method with 2 params "contenteditable","true (or) false"
    taskTitle.setAttribute("contenteditable","true");
    taskDescription.setAttribute("contenteditable","true");
    taskType.setAttribute("contenteditable","true");
    submitButton.setAttribute("onclick","saveEdit.apply(this,arguments)");

    // when we click openTask a new modal is opened by the attributes==> data-bs-toggle , data-bs-target
    // hence we have to remove those attributes from submitbutton ==> in ordet not to show the modal
    submitButton.removeAttribute("data-bs-toggle");
    submitButton.removeAttribute("data-bs-target");    
    submitButton.innerHTML="Save Changes";   //innerHtml==> to change the html content
};
const saveEdit = (e) =>{
    if(!e) e=window.event;

    const targetId =e.target.id;
    const parentNode=e.target.parentNode.parentNode;
    //console.log(parentNode);
    const taskTitle = parentNode.childNodes[3].childNodes[3];
    const taskDescription = parentNode.childNodes[3].childNodes[5];
    const taskType = parentNode.childNodes[3].childNodes[7].childNodes[1];
    const submitButton=parentNode.childNodes[5].childNodes[1];   

    const updateData ={
        taskTitle: taskTitle.innerHTML,
        taskDescription: taskDescription.innerHTML,
        taskType: taskType.innerHTML
    };
    let stateCopy = state.taskList;
    stateCopy=stateCopy.map((task)=>task.id===targetId ? {
        id : task.id,
        title:updateData.taskTitle,
        description:updateData.taskDescription,
        type:updateData.taskType,
        url: task.url,
    }
    : task
    );    
    state.taskList= stateCopy;
    updateLocalStorage();

    taskTitle.setAttribute("contenteditable","false");
    taskDescription.setAttribute("contenteditable","false");
    taskType.setAttribute("contenteditable","false");

    submitButton.setAttribute("onclick","openTask.apply(this.arguments)");
    submitButton.setAttribute("data-bs-toggle","modal");  
    submitButton.setAttribute("data-bs-target","#showTask");
    submitButton.innerHTML="Open Task";

};
//search
const searchTask=(e)=>{
    if(!e) e=window.event;
    while(taskContents.firstChild){
        taskContents.removeChild(taskContents.firstChild);
    }
    const resultData =state.taskList.filter(({title})=>
        title.toLowerCase().includes(e.target.value.toLowerCase()) 
    );
    console.log(resultData);
    resultData.map((cardData) =>
         //taskContents.insertAdjacentHTML("beforeend",htmlModalContent(cardData))
        taskContents.insertAdjacentHTML("beforeend",htmlTaskContent(cardData))
    );
};

