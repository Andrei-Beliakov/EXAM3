// const response = await fetch("https://emoji.ymatuhin.workers.dev/");

//ПОЛУЧАЕМ ДАННЫЕ С СЕРВЕРА
const response = await fetch(
  "https://jsonplaceholder.typicode.com/posts/?_start=0&_limit=7"
);
const data = await response.json();
// console.log(data[0].id);

let selectArr = data;
// console.log(selectArr);

const wrap = document.querySelector(".cards__wrapper");
const card = document.querySelector(".card");
const form = document.querySelector(".form");
const checkbox = document.querySelector(".card__check");

//ОТКЛЮЧЕНИЕ БАЗОВОГО ПОВЕДЕНИЯ ЭЛЕМЕНТОВ ФОРМЫ
form.addEventListener("submit", (ev) => {
  ev.preventDefault();
});

function invertCard(evnt) {
  evnt.currentTarget.parentElement.classList.toggle("invert");
  // Когда данная функция используется в качестве обработчика события: this === e.currentTarget
}

// function invertCard(id) {
//   console.log(id);
//   const card = document.querySelector(".card");
// console.log(id);
// if (checkbox.checked) checkedNum++;
// else if (!checkbox.checked) checkedNum--;
// console.log(checkedNum);
//   card.classList.toggle("invert");
// }

//ОТРИСОВКА КАРТОЧКИ
function createCard(obj) {
  const newCard = document.createElement("div");
  newCard.className = "card";
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "card__check";
  newCard.innerHTML = `
<h2 class="card__title">${obj.title}</h2>
            <p class="card__text">${obj.body}</p>`;

  // <input type="checkbox" class="card__check" />`;

  // if (obj.userId === 1) {
  // }

  newCard.append(checkbox);
  checkbox.addEventListener("change", invertCard);
  return newCard;
}

//КОРРЕКТОРОВКА МАССИВА КАРТОЧЕК ПО ПОИСКУ И ВЫЗОВ ОТРИСОВКИ
function searchFunction(event) {
  wrap.innerHTML = "";
  let value = event.target.value.trim().toLowerCase();
  selectArr
    .filter((elem) => elem.title.trim().toLowerCase().includes(value))
    .forEach((elem) => wrap.append(createCard(elem)));
  // console.log(selectArr);
}
form.addEventListener("change", searchFunction);
selectArr.forEach((newCard) => wrap.append(createCard(newCard)));

// checkbox.addEventListener("change", invertCard);
// const checkbox = document.querySelector(".card__check");
// checkbox.addEventListener("change", () => console.log("click"));
// checkbox.addEventListener("change", invertCard);
//ОБРАБОТКА МАССИВА ТУДУШЕК ПРИ НАЖАТИИ НА CHECKBOX
