
const studentName = document.getElementById("name");
const studentId = document.getElementById("studentId");
const branch = document.getElementById("branch");
const contact = document.getElementById("contact");
const email = document.getElementById("email");

const recordContainer =document.getElementById("recordContainer");



function addRecord(){
    // conditions checking before submitting the record
    if (!studentName.value || !studentId.value || !branch.value || !contact.value || !contact.value || !email.value ){
        alert("Please fill all the fields!");
    }
    else if (!studentName.validity.valid) {
        alert("Please enter a valid name. Only alphabetic characters and spaces are allowed.");
    } else if (!studentId.validity.valid) {
        alert("Please enter a valid Student ID. It should be a 7-digit number.");
    } else if (!contact.validity.valid) {
        alert("Please enter a valid Contact No. It should be a 10-digit number.");
    } else if (!email.validity.valid) {
        alert("Please enter a valid Email ID.");
    }
    else{
        //  Create main container div for each record
        let mainDiv = document.createElement("div");
        recordContainer.appendChild(mainDiv);
        mainDiv.classList.add("flex");

        // for name
        let div1 = document.createElement("div");
        mainDiv.appendChild(div1);
        div1.classList.add("min-w-36", "w-36", "overflow-x-auto", "pb-1");
        let p1 = document.createElement("p");
        p1.innerHTML = studentName.value;
        div1.appendChild(p1);
        p1.classList.add("record-data-style");
        studentName.value = "";

        // for id
        let p2 = document.createElement("p");
        p2.innerHTML = studentId.value;
        mainDiv.appendChild(p2);
        p2.classList.add("record-data-style", "min-w-24");
        studentId.value = "";

        // for branch
        let p3 = document.createElement("p");
        p3.innerHTML = branch.value;
        mainDiv.appendChild(p3);
        p3.classList.add("record-data-style", "min-w-32", "w-32");
        branch.value = "";

        // for contact
        let p4 = document.createElement("p");
        p4.innerHTML = contact.value;
        mainDiv.appendChild(p4);
        p4.classList.add("record-data-style", "min-w-24", "w-28");
        contact.value = "";

        // for email
        let div2 = document.createElement("div");
        mainDiv.appendChild(div2);
        div2.classList.add("min-w-32", "w-32", "overflow-x-auto");
        let p5 = document.createElement("p");
        div2.appendChild(p5);
        p5.innerHTML = email.value;
        p5.classList.add("record-data-style");
        email.value = "";

        // for buttons
        let editButton = document.createElement("button");
        mainDiv.appendChild(editButton);
        editButton.classList.add("record-button-style");
        editButton.innerText = "Edit";

        let deleteButton = document.createElement("button");
        mainDiv.appendChild(deleteButton);
        deleteButton.classList.add("record-button-style");
        deleteButton.innerText = "Delete";
 
        // adding event listener to edit button
        editButton.addEventListener("click", () => editData(mainDiv, p1, p2, p3, p4, p5));

        // adding event listener to the delete button
        deleteButton.addEventListener("click", () => deleteData(mainDiv));

        alert("Form Submitted Successfully!");
    }
    saveRecord();
}

//  Deleting the record div
function deleteData(mainDiv) {
    if (confirm("Are you sure you want to delete this record?")) {
        mainDiv.remove();
    }
    saveRecord();
}

function editData(mainDiv, p1, p2, p3, p4, p5){
    // Setting the input fields with their respective recorded data
    studentName.value = p1.innerText;
    studentId.value = p2.innerText;
    branch.value = p3.innerText;
    contact.value = p4.innerText;
    email.value = p5.innerText;

    // and removing the current record from the list to add the new added data
    mainDiv.remove();
    saveRecord();
}

    // saving the data in local storage   
function saveRecord(){
    localStorage.setItem("record",recordContainer.innerHTML)
}    

//showing the record on opening the webpage again
// adding event listeners on reloading of webpage
function showRecord() {
    if (localStorage.getItem("record")) {
        recordContainer.innerHTML = localStorage.getItem("record");
        document.querySelectorAll('.record-button-style').forEach((button, index) => {
            if (button.innerText === 'Edit') {
                button.addEventListener('click', () => {
                    let mainDiv = button.parentElement;
                    let p1 = mainDiv.children[0].querySelector('p');
                    let p2 = mainDiv.children[1];
                    let p3 = mainDiv.children[2];
                    let p4 = mainDiv.children[3];
                    let p5 = mainDiv.children[4].querySelector('p');
                    editData(mainDiv, p1, p2, p3, p4, p5);
                });
            } else if (button.innerText === 'Delete') {
                button.addEventListener('click', () => {
                    let mainDiv = button.parentElement;
                    deleteData(mainDiv);
                });
            }
        });
    }
}

showRecord();