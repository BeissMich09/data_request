document.addEventListener("DOMContentLoaded", () => {
  /* получаем див, где будут храниться все пользователи */
  const usersList = document.getElementById("users");
  /* получаем ссылку на кнопки-сортировки */
  const buttonName = document.getElementById("titleListTableName");
  const buttonSurname = document.getElementById("titleListTableSurname");
  const buttonEmail = document.getElementById("titleListTableEmail");
  const bottonPhone = document.getElementById("titleListTablePhone");

  let windows = document.getElementById("modalWindows");

//    Фильтрация: кнопка и инпут для ввода 
  const buttonFilter = document.getElementById("button");
  const inputFilter = document.getElementById("input");

  /* очищаем контейнер с пользователями */
  function clearUsersList() {
    usersList.innerHTML = "";
  }

  function sortUp(array, field) {
    array.sort(function (a, b) {
      if (a[field] > b[field]) return 1;
      if (a[field] === b[field]) return 0;
      if (a[field] < b[field]) return -1;
    });
  }

  function sortDown(array, field) {
    array.sort(function (a, b) {
      if (a[field] < b[field]) return 1;
      if (a[field] === b[field]) return 0;
      if (a[field] > b[field]) return -1;
    });
  }

  function createArray(array) {
    array.forEach(function (user, index) {
      let userRow = document.createElement("div");
      userRow.className = "user";
      userRow.id = index;
      const pName = document.createElement("p");
      pName.innerText = user.firstName;
      userRow.append(pName);

      const pSurname = document.createElement("p");
      userRow.append(pSurname);
      pSurname.innerText = user.lastName;

      const pEmail = document.createElement("p");
      userRow.append(pEmail);
      pEmail.innerText = user.email;

      const pPhone = document.createElement("p");
      userRow.append(pPhone);
      pPhone.className = "phone";
      pPhone.innerText = user.phone;

      const deleteUser = document.createElement("span");
      userRow.append(deleteUser);
      deleteUser.className = "deleteUser";
      deleteUser.innerHTML = "x";
      deleteUser.onclick = function (e) {
        if (confirm("Вы уверены, что хотите удалить пользователя?")) {
          usersArray.splice(index, 1);
          clearUsersList();
          createArray(usersArray);
        }
      };

      //   Вызов модального окна по клику

      pPhone.onclick = () => createModal(user);
      pEmail.onclick = () => createModal(user);
      pSurname.onclick = () => createModal(user);
      pName.onclick = () => createModal(user);

      usersList.append(userRow);
    });
  }

  let clicksName = 0;
  buttonName.onclick = function () {
    clearUsersList();
    clicksName++;
    if (clicksName === 1) {
      sortUp(usersArray, "firstName");
    } else if (clicksName === 2) {
      sortDown(usersArray, "firstName");
    } else if (clicksName > 2) {
      clicksName = 1;
      sortUp(usersArray, "firstName");
    }
    createArray(usersArray);
  };
  let clicksSurname = 0;
  buttonSurname.onclick = function () {
    clearUsersList();
    clicksSurname++;
    if (clicksSurname === 1) {
      sortUp(usersArray, "lastName");
    } else if (clicksSurname === 2) {
      sortDown(usersArray, "lastName");
    } else if (clicksSurname > 2) {
      clicksSurname = 1;
      sortUp(usersArray, "lastName");
    }
    createArray(usersArray);
  };
  let clicksEmail = 0;
  buttonEmail.onclick = function () {
    clearUsersList();
    clicksEmail++;
    if (clicksEmail === 1) {
      sortUp(usersArray, "email");
    } else if (clicksEmail === 2) {
      sortDown(usersArray, "email");
    } else if (clicksEmail > 2) {
      clicksEmail = 1;
      sortUp(usersArray, "email");
    }
    createArray(usersArray);
  };
  let clicksPhone = 0;
  bottonPhone.onclick = function () {
    clearUsersList();
    clicksPhone++;
    if (clicksPhone === 1) {
      sortUp(usersArray, "phone");
    } else if (clicksPhone === 2) {
      sortDown(usersArray, "phone");
    } else if (clicksPhone > 2) {
      clicksPhone = 1;
      sortUp(usersArray, "phone");
    }
    createArray(usersArray);
  };
  let usersArray;
  fetch(
    "https://cors-anywhere.herokuapp.com///www.filltext.com/?rows=50&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"
  )
    .then((res) => res.json())
    .then((users) => (usersArray = users))
    .then(() => {
      createArray(usersArray);
    });

  buttonFilter.onclick = function () {
    let inputValue = inputFilter.value;
    let newArr = usersArray.filter(
      (user) =>
        user.firstName.toLowerCase().includes(inputValue.toLowerCase()) ||
        user.lastName.toLowerCase().includes(inputValue.toLowerCase()) ||
        user.email.toLowerCase().includes(inputValue.toLowerCase()) ||
        user.phone.toLowerCase().includes(inputValue.toLowerCase())
    );
    clearUsersList();
    createArray(newArr);
  };
  inputFilter.onblur = function () {
    if (inputFilter.value === "") {
      clearUsersList();
      createArray(usersArray);
    }
  };

  // Создение модального окна

  function createModal(user) {
    const modal = document.createElement("div");
    const address = document.createElement("p");
    modal.append(address);
    const {
      description,
      address: { city, state, streetAddress, zip },
    } = user;
    address.innerText = `Address:   ${city}, ${state}, ${streetAddress}, ${zip}`;

    const descriptionP = document.createElement("p");
    modal.append(descriptionP);
    descriptionP.innerText = "Description: " + description;

    modal.className = "modal_window";
    windows.innerHTML = "";
    windows.append(modal);
    return modal;
  }
});
