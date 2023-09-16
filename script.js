// tabs event

document.addEventListener("DOMContentLoaded", function (event) {
  let tab;

  const menuLinks = document.querySelectorAll(".menu-btn");

  for (const menuLink of menuLinks) {
    menuLink.addEventListener("click", function (event) {
      tab = menuLink.getAttribute("alt");

      openContent(tab);
    });
  }
});

function openContent(tabName) {
  let i;
  let content;

  content = document.getElementsByClassName("content");
  for (i = 0; i < content.length; i++) {
    content[i].style.display = "none";
  }

  document.getElementById(tabName).style.display = "block";
}

openContent("profile");

// menu open/close section

const menuButton = document.querySelector(".menu");
const navBar = document.querySelector(".panel-nav");
const mainDisplay = document.querySelector(".main-display-info");

menuButton.addEventListener("click", openMenu);
mainDisplay.addEventListener("click", closeMenu);

function openMenu() {
  if ((navBar.style.marginLeft = "-80px")) {
    navBar.style.marginLeft = "0px";
  } else {
    navBar.style.marginLeft = "-80px";
  }
}

function closeMenu() {
  if ((navBar.style.marginLeft = "0px")) {
    navBar.style.marginLeft = "-80px";
  } else {
    navBar.style.marginLeft = "0px";
  }
}

// getting users from api

const userList = document.querySelector(".user-boxes");

function getUsers() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((users) => {
      userList.innerHTML = "";
      users.forEach((user) => appendUser(user));
    });
}

function appendUser(user) {
  const userBox = document.createElement("div");
  userBox.classList.add("user-box");
  userBox.innerHTML = `
  <div class="user-box">
  <div class="dots">
    <div></div>
    <div></div>
    <div></div>
  </div>
  <img src="img/profile-user.png" width="70" height="70" alt="" />
  <div class="user-info">
    <h2>${user.name}</h2>
    <p>${user.email}</p>
    <p class="userName">${user.username}</p>
    <button class="edit-btn user-btn" data-id="${user.id}">Edit</button>
    <button class="delete-btn user-btn" data-id="${user.id}">Delete</button>
  </div>
</div>
    `;
  userList.appendChild(userBox);

  const editBtn = userBox.querySelector(".edit-btn");
  editBtn.addEventListener("click", editUser);
  const deleteBtn = userBox.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", deleteUser);
}

getUsers();

function deleteUser(e) {
  const userId = e.target.getAttribute("data-id");
  fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, { method: "DELETE" }).then((response) => {
    if (response.status === 200) {
      const userCard = e.target.parentElement.parentElement.parentElement;
      userCard.remove();
    }
  });
}

// edit user section

function editUser(e) {
  const userId = e.target.getAttribute("data-id");
  const userCard = e.target.parentElement.parentElement.parentElement;
  const editPopup = document.querySelector(".edit-popup");
  const closeEditPopup = document.querySelector(".close-edit-popup");

  editPopup.style.display = "flex";
  mainContent.style.filter = "blur(3px)";

  closeEditPopup.addEventListener("click", () => {
    editPopup.style.display = "none";
    mainContent.style.filter = "blur(0)";
  });

  const name = userCard.querySelector("h2").innerText;
  const email = userCard.querySelector("p").innerText;
  const userName = userCard.querySelector(".userName").innerText;

  editPopup.querySelector(".modal-content").innerHTML = `
  <h2>Edit User : ${name}</h2>
  <div class="inputs-add-user">
  <label for="modal-fullName" class="add-label">Full Name</label>
  <input type="text" class="add-input" name="modal-fullName" id="modal-fullName" value="${name}" />
  <label for="modal-email" class="add-label">Email Address</label>
  <input type="email" class="add-input" name="modal-email" id="modal-email" value="${email}"  />
  <label for="modal-userName" class="add-label">User Name</label>
  <input type="text" class="add-input" name="modal-userName" id="modal-userName" value="${userName}" />
</div>
<button class="modal-edit-btn">Update User</button>
</div>
    
  `;

  // edit user validation

  const nameInput = editPopup.querySelector("#modal-fullName");
  const emailInput = editPopup.querySelector("#modal-email");
  const userNameInput = editPopup.querySelector("#modal-userName");
  const modalEditBtn = editPopup.querySelector(".modal-edit-btn");

  nameInput.addEventListener("keyup", () => {
    validateEditUser();
  });
  emailInput.addEventListener("keyup", () => {
    validateEditUser();
  });
  userNameInput.addEventListener("keyup", () => {
    validateEditUser();
  });

  function validateEditUser() {
    if (validateFullName(nameInput) && validateEmail(emailInput) && validateUserName(userNameInput)) {
      modalEditBtn.disabled = false;
    } else {
      modalEditBtn.disabled = true;
    }
  }
  // sending changes

  modalEditBtn.addEventListener("click", () => {
    editedName = editPopup.querySelector("#modal-fullName").value;
    editedEmail = editPopup.querySelector("#modal-email").value;
    editedUserName = editPopup.querySelector("#modal-userName").value;

    const UpdateUser = {
      name: editedName,
      email: editedEmail,
      userName: editedUserName,
    };

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(UpdateUser),
    }).then((response) => {
      if (response.status === 200) {
        editPopup.style.display = "none";
        mainContent.style.filter = "blur(0)";
        userCard.querySelector("h2").innerText = UpdateUser.name;
        userCard.querySelector("p").innerText = UpdateUser.email;
        userCard.querySelector(".userName").innerText = UpdateUser.userName;
      }
    });
  });
}

// add user popUp

const closeAddingUserBtn = document.querySelector(".close-add-popup");
const addPopUp = document.querySelector(".add-popup");
const addUser = document.querySelector(".add-user-btn");
const mainContent = document.querySelector(".main-content");

addUser.addEventListener("click", openPopup);
closeAddingUserBtn.addEventListener("click", closePopUp);

function openPopup() {
  addPopUp.style.display = "flex";
  mainContent.style.filter = "blur(3px)";
  mainContent.style.pointerEvents = "none";
  addingButton.disabled = true;
  addingButton.style.cursor = "unset";
}
function closePopUp() {
  addPopUp.style.display = "none";
  mainContent.style.filter = "blur(0)";
  mainContent.style.pointerEvents = "auto";
}

// add user validation

const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const userName = document.getElementById("userName");
const addingButton = document.querySelector(".adding-btn");

fullName.addEventListener("keyup", validateInputs);
email.addEventListener("keyup", validateInputs);
userName.addEventListener("keyup", validateInputs);

addingButton.disabled = true;

function validateFullName(fullName) {
  let fullNameRegex = /^[a-zA-Z\s]+$/;
  if (fullName.value == "" || fullNameRegex.test(fullName.value) == false || fullName.value.length < 5) {
    fullName.style.borderColor = "#5454d0";
  } else {
    fullName.style.borderColor = "#dedede";
    return true;
  }
}

function validateEmail(email) {
  let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (email.value == "" || emailRegex.test(email.value) == false || email.value.length < 5) {
    email.style.borderColor = "#5454d0";
  } else {
    email.style.borderColor = "#dedede";
    return true;
  }
}

function validateUserName(userName) {
  let userNameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  if (userName.value == "" || userNameRegex.test(userName.value) == false || userName.value.length < 5) {
    userName.style.borderColor = "#5454d0";
  } else {
    userName.style.borderColor = "#dedede";
    return true;
  }
}

function validateInputs() {
  if (validateFullName(fullName) && validateEmail(email) && validateUserName(userName)) {
    addingButton.disabled = false;
    addingButton.style.cursor = "pointer";
  }
}

// adding user
addingButton.addEventListener("click", addUserToList);

function addUserToList() {
  const addName = fullName.value;
  const addEmail = email.value;
  const addUserName = userName.value;

  const newUserPayLoad = {
    name: addName,
    email: addEmail,
    username: addUserName,
  };

  fetch(`https://jsonplaceholder.typicode.com/users`, {
    method: "POST",
    body: JSON.stringify(newUserPayLoad),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((user) => {
      addName.value = "";
      addEmail.value = "";
      addUserName.value = "";
      closePopUp();
      appendUser(user);
    });
}

// profile section

const firsName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const profileEmail = document.getElementById("profileEmail");
const phoneNumber = document.getElementById("phone");
const city = document.getElementById("city");
const state = document.getElementById("state");
const country = document.getElementById("country");
const postCode = document.getElementById("postCode");
const updateBtn = document.querySelector(".update-btn");
const updateMessage = document.querySelector(".profileUpdatedMassage");

firsName.addEventListener("input", validateInputsProfile);
lastName.addEventListener("input", validateInputsProfile);
profileEmail.addEventListener("input", validateInputsProfile);
phoneNumber.addEventListener("input", validateInputsProfile);
city.addEventListener("input", validateInputsProfile);
state.addEventListener("input", validateInputsProfile);
country.addEventListener("input", validateInputsProfile);
postCode.addEventListener("input", validateInputsProfile);

updateBtn.addEventListener("click", () => {
  firsName.value = "";
  lastName.value = "";
  profileEmail.value = "";
  phoneNumber.value = "";
  city.value = "";
  state.value = "";
  country.value = "";
  postCode.value = "";
  updateMessage.style.display = "block";
});

function validateInputsProfile() {
  if (
    GlobalValidation(firsName) &&
    GlobalValidation(lastName) &&
    profileEmailValidation(profileEmail) &&
    phoneNumberValidation(phoneNumber) &&
    GlobalValidation(city) &&
    GlobalValidation(state) &&
    GlobalValidation(country) &&
    postCodeValidation(postCode)
  ) {
    updateBtn.disabled = false;
    updateBtn.style.cursor = "pointer";
  }
}

updateBtn.disabled = true;

function GlobalValidation(global) {
  let globalRegex = /^[a-zA-Z\s]+$/;
  if (global.value == "" || globalRegex.test(global.value) == false || global.value.length < 3) {
    global.style.borderColor = "red";
  } else {
    global.style.borderColor = "#d8d8d8";
    return true;
  }
}

function profileEmailValidation(email) {
  let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (email.value == "" || emailRegex.test(email.value) == false || email.value.length < 5) {
    email.style.borderColor = "red";
  } else {
    email.style.borderColor = "#d8d8d8";
    return true;
  }
}

function phoneNumberValidation(phoneNumber) {
  let phoneNumberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  if (phoneNumber.value == "" || phoneNumberRegex.test(phoneNumber.value) == false || phoneNumber.value.length < 8) {
    phoneNumber.style.borderColor = "red";
  } else {
    phoneNumber.style.borderColor = "#d8d8d8";
    return true;
  }
}

function postCodeValidation(postCode) {
  let postCodeRegex = /^[0-9]{7}$/;
  if (postCode.value == "" || postCodeRegex.test(postCode.value) == false || postCode.value.length < 6) {
    postCode.style.borderColor = "red";
  } else {
    postCode.style.borderColor = "#d8d8d8";
    return true;
  }
}
