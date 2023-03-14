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
const taskContents = document.querySelector(".task__contents")
const taskModal = document.querySelector(".task__modal__body")

// getting some js element to html use "$".....
const htmlTaskContent = ({ id, title , description, type, url })=>`
    <div class='col-md-6 col-lg-4 mt-3' id=${id}>
        <div class="card shadow-sm task__card " >
        <div class="card-header d-flex justify-content-end task__card__header">
        
        // to have edit and del button from right to left ...we have justify-content-end here
        
        <button type= "button" class="btn btn-outline-info mr=1.5" name= ${id}>
        <i class="fas fa-pencil-alt name=${id}"></i>
        </button>
        <button type= "button" class="btn btn-outline-danger mr=1.5" name= ${id}>
        <i class="fas fa-trash-alt name=${id}"></i>
        </button>
        </div>
        
        <div class="card-body">
        ${
            url && 
            `<img width=100% src=${url} alt="Card Image" class="card-img-top md-3 rounded-lg " />`
        }
        <h4 class="card-title task__card__title">${title}</h4>
        <p class="description trim-3-lines text-muted">${description}</p>
        <div class='tags text-white d-flex flex-wrap'>
        <span class="badge bg-primary m-1">${type}</span>
        </div>
        </div>
       
        <div class="card-footer">
        <button type="button" class="btn btn-outline-primary float-right" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Open Task 
        </button>
        </div>
        </div>
    </div>
`;
// Modal Body on >> clk of Open Task
const htmlModalContent = ({ id, title , description, type, url })=>{
    const date =new Date(parseInt(id));
    return`
    <div id=${id}>
    ${
        url && 
        `<img width=100% src=${url} alt="Card Image" class="img-fluid place__holder__image mb-3"/>`
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

if(localStorageCopy) state.taskList = localStorageCopy.task;

state.taskList.map((cardDate)=>{
    taskContents.innerAdjacentHTML("beforeend", htmlTaskContent(cardDate));//innerAdjacentHTML => to get the cards side by side
});
};

// when we edit or update we need to save
// to give submit(save changes) to the particular card we need to denote the card with ID
// getting some html stuffs to js that is while clicking submit in html output(i.e., card)
// we have to store those changes in js.....

const handleSubmit=(event)=>{   
    const id= `${Date.now()}`;
    const input={
        url:document.getElementById("imageUrl").value,  //url : https.... now the url will be user given input url
        title:document.getElementById("taskTitle").value,
        tags:document.getElementById("tags").value,
        taskDescription:document.getElementById("taskDescription").value,  
    };        // to display both updated and non updated cards in UI
    if(input.title==""||input.tags==""||input.taskDescription==""){
        return alert("Please fill all the necessary fields ...");
    }
    taskContents.innerAdjacentHTML("beforeend",htmlTaskContent({...input, id}));
    state.taskList.push({...input, id});       //store this updated data in array
    updateLocalStorage();
};

// while we update and click "save changes" button all the datas should be saved...so we have to call the method
// "handleSubmit" in html ...to save the changes.