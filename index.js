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
const state={
    taskList:[],
};
const taskContents = document.querySelector(".task__contents")
const taskModal = document.querySelector(".task__modal__body")
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

