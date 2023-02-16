//ПОЛУЧАЕМ ДАННЫЕ С СЕРВЕРА
const response = await fetch(
  "https://jsonplaceholder.typicode.com/posts/?_start=0&_limit=7"
);
const data = await response.json();
let selectArr = data;
let selected = 0;

const wrap = document.querySelector(".cards__wrapper");
const card = document.querySelector(".card");
const form = document.querySelector(".form");
const checkbox = document.querySelector(".card__check");
const count = document.querySelector(".selected");

//ОТКЛЮЧЕНИЕ БАЗОВОГО ПОВЕДЕНИЯ ЭЛЕМЕНТОВ ФОРМЫ
form.addEventListener("submit", (ev) => {
  ev.preventDefault();
});

//ПЕРЕКРАСКА ВЫБРАННОЙ ПО ЧЕКБОКСУ КАРТОЧКИ И ПОДСЧЕТ ВЫБРАННЫХ
function invertCard(evnt) {
  evnt.currentTarget.parentElement.classList.toggle("invert");
  if (evnt.currentTarget.checked) {
    selected++;
    count.innerHTML = `${selected}`;
  } else {
    selected--;
    count.innerHTML = `${selected}`;
  }
}

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
  newCard.append(checkbox);
  checkbox.addEventListener("change", invertCard);
  return newCard;
}

//КОРРЕКТОРОВКА МАССИВА КАРТОЧЕК ПО ПОИСКУ
function searchFunction(event) {
  document.querySelector(".selected").innerHTML = "0";
  selected = 0;
  wrap.innerHTML = "";
  let value = event.target.value.trim().toLowerCase();
  selectArr
    .filter((elem) => elem.title.trim().toLowerCase().includes(value))
    .forEach((elem) => wrap.append(createCard(elem)));
}
form.addEventListener("change", searchFunction);
selectArr.forEach((newCard) => wrap.append(createCard(newCard)));
