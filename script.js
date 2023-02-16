// const response = await fetch("https://emoji.ymatuhin.workers.dev/");
const response = await fetch(
  "https://jsonplaceholder.typicode.com/posts/?_start=0&_limit=7"
);
const data = await response.json();
console.log(data[0]);
const form = document.querySelector(".form");
//ОТКЛЮЧЕНИЕ БАЗОВОГО ПОВЕДЕНИЯ ЭЛЕМЕНТОВ ФОРМЫ
form.addEventListener("submit", (ev) => {
  ev.preventDefault();
});

const wrap = document.querySelector(".cards__wrapper");
const search = document.querySelector(".cards__input");

function createCard(obj) {
  let checkedTitle = [...new Set(obj.title.split(" "))].join(" ");
  const newCard = document.createElement("div");
  newCard.className = "cards__item";
  newCard.innerHTML = `<p class="item__emoji">${obj.symbol}</p> 
     <p class="item__title">${obj.title}</p>
     <p class="item__title">${checkedTitle}</p>`;
  return newCard;
}

function searchFunction(event) {
  wrap.innerHTML = "";
  console.log(event.target.value);
  let value = event.target.value.trim().toLowerCase();
  data
    .filter((elem) => elem.title.trim().toLowerCase().includes(value))
    .forEach((elem) => wrap.append(createCard(elem)));
}
search.addEventListener("input", searchFunction);
data.forEach((newCard) => wrap.append(createCard(newCard)));
