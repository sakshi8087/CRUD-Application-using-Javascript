//variables
const nameInput = document.getElementById("name-input");
const emailInput = document. getElementById("email-input");
const addBtn = document.getElementById("add-btn");
const tableBody = document.getElementById("table-body");
const updateNameInput = document.getElementById("update-name-input");
const updateEmailInput = document.getElementById("update-email-input");
const updateBtn = document.getElementById("update-btn");
const cancelBtn = document.getElementById("cancel-btn");
//JSON data stored in the localStorage object with key users
//if the data does not exit, the code will create empty array
let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUserId = null;
const validRegex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

//Functions

//Iterate over the list of users and create table rows
function renderTable(){
tableBody.innerHTML="";
for(let i=0; i<users.length; i++)
{
    const user = users[i];

    const tr = document.createElement("tr");
    const idTd = document.createElement("td");
    const nameTd = document.createElement("td");
    const emailTd = document.createElement("td");
    const actionTd= document.createElement("td");
    const editBtn =document.createElement("button");
    editBtn.className="edit-btn";
    const deleteBtn = document.createElement("button");
    deleteBtn.className="delete-btn";
    idTd.innerHTML=user.id;
    nameTd.innerHTML=user.name;
    emailTd.innerHTML=user.email;
    editBtn.innerHTML="Edit";
    deleteBtn.innerHTML="Delete";
    editBtn.addEventListener("click", ()=>{
        showUpdateForm(user.id);
    });
    deleteBtn.addEventListener("click", ()=>{
        deleteUser(user.id);
    });
    actionTd.appendChild(editBtn);
   actionTd.appendChild(deleteBtn);
    tr.appendChild(idTd);
    tr.appendChild(nameTd);
    tr.appendChild(emailTd);
    tr.appendChild(actionTd);
    tableBody.appendChild(tr);

  }
}
//addUser , gets user name and email from input fields, create new user object with unique id
//stores the updated list in local storage, clears input field 
function addUser(){
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    if(email.match(validRegex))
    {
        if(name && email !== null)
        {
            var id=1;
            var val = users.map(function(x) {return x.id}).indexOf(id);
            while(val != -1)
            {
                id++;
                val = users.map(function(x) {return x.id}).indexOf(id);
            }

            const user ={
                id:id,
                name:name,
                email:email,
            };

            users.push(user);

            localStorage.setItem("users" ,JSON.stringify(users));
            nameInput.value="";
            emailInput.value="";
            renderTable();
        }else{
            alert("Name is Required");
        }
    }
    else{
        alert("Inavlid Email address");
    }

}

//Update User, gets name and email from input fields 

function updateUser(){
    const name =updateNameInput.value;
    const email =updateEmailInput.value;

    if(email.match(validRegex))
    {
        //find the index of user to be updated
        const index =users.findIndex((user) => user.id === currentUserId);
        if(index !== -1)
        {
            users[index].name=name;
            users[index].email=email;
            localStorage.setItem("users" , JSON.stringify(users));
            hideUpdateForm();
            renderTable();
        }
    }else{
        alert("Invalid Email Address !");
    }
}

//show Update Form 
//this function is called when user clicks the edit button for a specific user

function showUpdateForm(userId)
{
   const user = users.find((user) => user.id  == userId);
   if(user){
    updateNameInput.value = user.name;
    updateEmailInput.value = user.email;

    currentUserId=user.id;
    updateBtn.addEventListener("click", updateUser);
    cancelBtn.addEventListener("click", hideUpdateForm);
    updateBtn.style.display="inline-block";
    updateBtn.style.display="inline-block";
    updateNameInput.style.display="inline-block";
    updateEmailInput.style.display="inline-block";
    document.getElementById("update-container").style.display="block";
   }
}

//hide update form
function hideUpdateForm(){
    updateNameInput.value = "";
    updateEmailInput.value="";

    currentUserId=null;
    updateBtn.removeEventListener("click", updateUser);
    cancelBtn.removeEventListener("click", hideUpdateForm);

    updateBtn.style.display = "none";
  cancelBtn.style.display = "none";
  updateNameInput.style.display = "none";
  updateEmailInput.style.display = "none";
  document.getElementById("update-container").style.display = "none";
}

function deleteUser(userId){
    users = users.filter((user) => user.id != userId);
    localStorage.setItem("users", JSON.stringify(users));
    if(users.length == 0)
    {
        hideUpdateForm();
    };

    renderTable();
}

addBtn.addEventListener("click", addUser);

renderTable();