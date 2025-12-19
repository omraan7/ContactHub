var fullName = document.getElementById("fullName");
var phoneNumber = document.getElementById("phoneNumber");
var emailAddress = document.getElementById("emailAddress");
var address = document.getElementById("address");
var groupSelect = document.getElementById("groupSelect");
var Notes = document.getElementById("Notes");
var checkbox = document.getElementsByName("checkbox");
var cardDisplay = document.getElementById("cardDisplay");
var total = document.getElementById("total");
var htmlFavorite = document.getElementById("htmlFavorite");
var htmlEmr = document.getElementById("htmlEmar");
var emergencyLign = document.getElementById("emergencyLign");
var favoritLign = document.getElementById("favoritLign");
var photoInput = document.getElementById("photoInput");
var previewImg = document.getElementById("preview");
var imgPlace = document.getElementById("imgPlace");
var btnAdd = document.getElementById("btnAdd");
var btnEdit = document.getElementById("btnEdit");
var qq = document.getElementById("qq");

let indexUpdate;

// console.log(checkbox);
// console.log(emailAddress);
// console.log(address);
// console.log(groupSelect);
// console.log(Notes);
// console.log(Favorite);
// console.log(Emergency);
var allContact = [];

if (localStorage.getItem("allContact")) {
  allContact = JSON.parse(localStorage.getItem("allContact"));
  displayContact();
}

function changePhoto() {
  var file = photoInput.files[0];

  if (file) {
    var reader = new FileReader();
    reader.onload = function (e) {
      previewImg.src = e.target.result;
      previewImg.classList.remove("d-none");
      imgPlace.classList.add("d-none");
    };

    reader.readAsDataURL(file);
  }
}

function condition() {
  var checkboxArray = [];
  for (let i = 0; i < checkbox.length; i++) {
    if (checkbox[i].checked) {
      checkboxArray.push(checkbox[i].value);
    }
  }
  return checkboxArray;
}

regex = {
  name: /^[A-Za-z\s]{5,50}$/,
  phoneNumber: /^(010|011|012|015)[0-9]{8}$/,
  emailAddress: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
};

function inPutValedation(element,key) {
  var resalt = regex[key].test(element.value.trim());
  if (resalt) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.add("d-none");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    element.nextElementSibling.classList.remove("d-none");
  }
  return resalt;
}
function isValed() {
  var nameValid = inPutValedation(fullName, "name");
  var phoneValid = inPutValedation(phoneNumber, "phoneNumber");
  var emailValid = emailAddress.value ? inPutValedation(emailAddress, "emailAddress") : true;
  return nameValid && phoneValid && emailValid;
}

function addContact() {
  if (!isValed()) {
    Swal.fire({
      title: "Error!",
      text: "Please fix the Input.",
      icon: "error",
      draggable: true
    });
    return;
  }
  var contact = {
    fullName: fullName.value,
    phoneNumber: phoneNumber.value,
    emailAddress: emailAddress.value,
    address: address.value,
    groupSelect: groupSelect.value,
    Notes: Notes.value,
    checkbox: condition(),
    photo: previewImg.src || "images/1.avif",
  };

  allContact.push(contact);
  localStorage.setItem("allContact", JSON.stringify(allContact));
  displayContact();
  clear();
  Swal.fire({
    title: "ADDED!",
    icon: "success",
    draggable: true,
  });
}

function clear() {
  fullName.value = "";
  phoneNumber.value = "";
  emailAddress.value = "";
  address.value = "";
  groupSelect.value = "";
  Notes.value = "";
  for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].checked = false;
  }
  previewImg.src = "";
  previewImg.classList.add("d-none");
  imgPlace.classList.remove("d-none");
  photoInput.value = "";
}

function displayContact() {
  var container = "";
  var conFavort = "";
  var conEmar = "";
  var favoriteCount = 0;
  var emergencyCount = 0;
  var tttt = 0;

  for (let i = 0; i < allContact.length; i++) {
    container += htmlCard(i);
    tttt++;
    if (allContact[i].checkbox.includes("Favorite")) {
      conFavort += htmlFavorit(i);
      favoriteCount++;
    }

    if (allContact[i].checkbox.includes("Emergency")) {
      conEmar += htmlEmar(i);
      emergencyCount++;
    }
  }
  qq.innerHTML = tttt;
  total.innerHTML = tttt;
  cardDisplay.innerHTML = container;
  htmlFavorite.innerHTML = conFavort;
  htmlEmr.innerHTML = conEmar;
  favoritLign.innerHTML = favoriteCount;
  emergencyLign.innerHTML = emergencyCount;
}

function htmlFavorit(i) {
  return `
  <div class="favorite-item d-flex flex-wrap  " >
  <div class="d-flex justify-content-between w-100">
    <div class="favorite-info">
      <img width="60px" src="${
        allContact[i].photo ? allContact[i].photo : "images/1.avif"
      }"   alt="" />
      <div>
        <div class="fav-name">${allContact[i].fullName}</div>
        <div class="fav-phone">${allContact[i].phoneNumber}</div>
      </div>
    </div>
    <div class="fav-action call-green">
      <i class="fa fa-phone"></i>
    </div>
  </div>
  </div>
  `;
}
function htmlEmar(i) {
  return `
  <div class="favorite-item d-flex flex-wrap  " >
  <div class="d-flex justify-content-between w-100">
    <div class="favorite-info">
      <img width="60px" src="${
        allContact[i].photo ? allContact[i].photo : "images/1.avif"
      }" alt="" />
      <div>
        <div class="fav-name">${allContact[i].fullName}</div>
        <div class="fav-phone">${allContact[i].phoneNumber}</div>
      </div>
    </div>
    <div class="fav-action call-red">
      <i class="fa fa-phone"></i>
    </div>
  </div>
</div>
  `;
}

function htmlCard(i) {
  return `
  <div class="card mt-4 custom-card">
  <div class="d-flex align-items-center">
    <div class="img-cart">
      <img src="${
        allContact[i].photo ? allContact[i].photo : "images/1.avif"
      }" class="card-img" />
      ${
        allContact[i].checkbox.includes("Favorite")
          ? `<div class="star-badge"><i class="fa fa-star"></i></div>`
          : ""
      }
      ${
        allContact[i].checkbox.includes("Emergency")
          ? `<div class="emarg-badge"><i class="fa fa-heartbeat"></i></div>`
          : ""
      }
    </div>

    <div class="name-cart">
      <h3>${allContact[i].fullName}</h3>
      <span class="d-flex align-items-center">
        <i class="fa-solid fa-phone phone-icon"></i>
        <p>${allContact[i].phoneNumber}</p>
      </span>
    </div>
  </div>

  <div class="card-body">
    <div class="info">
      <div>
        <div class="icon-box icon-mail">
          <i class="fa fa-envelope"></i>
        </div>
        ${allContact[i].emailAddress}        </div>
      <div>
        <div class="icon-box icon-location">
          <i class="fa fa-location-dot"></i>
        </div>
        ${allContact[i].address}
        </div>
        <span class="omkk">friend</span>
        ${
          allContact[i].checkbox.includes("Emergency")
            ? `<span class="omk">Emergency</span>`
            : ""
        }

      

    </div>

    <div class="footer-card d-flex justify-content-between">
      <div class="d-flex">
        <button class="action-icon icon-call">
        <a href="tel:${
          allContact[i].phoneNumber
        }">  <i class="fa fa-phone"></i></a>
        </button>
        <button class="action-icon icon-mail-btn">
        <a href="mailto:${
          allContact[i].emailAddress
        }">   <i class="fa fa-envelope"></i></a>
        </button>
      </div>
${i}
      <div class="d-flex">
      <button class="action-icon ifa-staar ${
        allContact[i].checkbox.includes("Favorite") ? "icon-starr" : ""
      }" onclick="toggleType(${i}, 'Favorite')">
        <i class="fa fa-star  "></i>
      </button>
      
      <button class="action-icon icon-heart ${
        allContact[i].checkbox.includes("Emergency") ? "a-heart" : ""
      }" onclick="toggleType(${i}, 'Emergency')">
        <i class="fa fa-heartbeat"></i>
      </button>
      
        <button   data-bs-toggle="modal"
        data-bs-target="#exampleModal" onclick="editContact(${allContact.indexOf(
          allContact[i]
        )})"class="action-icon icon-edit">
          <i class="fa fa-pen"></i>
        </button>
        <button onclick="deleteContact(${allContact.indexOf(
          allContact[i]
        )})" class="action-icon icon-delete">
          <i class="fa fa-trash"></i>
        </button>
      </div>
    </div>
  </div>
</div>`;
}

function deleteContact(index) {
  allContact.splice(index, 1);
  localStorage.setItem("allContact", JSON.stringify(allContact));
  displayContact();
}
function editContact(index) {
  indexUpdate = index;
  fullName.value = allContact[index].fullName;
  phoneNumber.value = allContact[index].phoneNumber;
  emailAddress.value = allContact[index].emailAddress;
  address.value = allContact[index].address;
  groupSelect.value = allContact[index].groupSelect;
  Notes.value = allContact[index].Notes;
  // for (let i = 0; i < checkbox.length; i++) {
  //   checkbox[i].checked = false;
  // }
  for (let i = 0; i < checkbox.length; i++) {
    if (allContact[index].checkbox.includes(checkbox[i].value)) {
      checkbox[i].checked = true;
    }
  }
  if (allContact[index].photo) {
    previewImg.src = allContact[index].photo;
    previewImg.classList.remove("d-none");
    imgPlace.classList.add("d-none");
  } else {
    previewImg.classList.add("d-none");
    imgPlace.classList.remove("d-none");
  }

  btnAdd.classList.add("d-none");
  btnEdit.classList.remove("d-none");
}

function updateData(index) {
  allContact[index].fullName = fullName.value;
  allContact[index].phoneNumber = phoneNumber.value;
  allContact[index].emailAddress = emailAddress.value;
  allContact[index].address = address.value;
  allContact[index].groupSelect = groupSelect.value;
  allContact[index].Notes = Notes.value;
  allContact[index].checkbox = condition();
  allContact[index].photo = previewImg.src || "images/1.avif";

  localStorage.setItem("allContact", JSON.stringify(allContact));

  displayContact();

  clear();

  btnAdd.classList.remove("d-none");
  btnEdit.classList.add("d-none");
  Swal.fire({
    title: "UPDATE!",
    icon: "success",
    draggable: true,
  });
}

function searchData(searchValue) {
  var box = "";
  for (let i = 0; i < allContact.length; i++) {
    if (
      allContact[i].fullName.toLowerCase().includes(searchValue.toLowerCase())
    ) {
      box += htmlCard(i);
    }
  }
  cardDisplay.innerHTML = box;
}

function toggleType(index, type) {
  if (allContact[index].checkbox.includes(type)) {
      allContact[index].checkbox.splice(
      allContact[index].checkbox.indexOf(type),
      1
    );
  } else {
    allContact[index].checkbox.push(type);
  }
  localStorage.setItem("allContact", JSON.stringify(allContact));
  displayContact();
}

