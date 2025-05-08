const books = [
  {
    name: "اردو ادب",
    image: "images/book1.png",
    oldPrice: 800,
    newPrice: 500
  },
  {
    name: "اسلامی تاریخ",
    image: "images/book2.png",
    oldPrice: 900,
    newPrice: 650
  },
  {
    name: "تفسیر قرآن جلد دوم",
    image: "images/book3.png",
    oldPrice: 1200,
    newPrice: 850
  },
{
  name: " نورالانوار",
  image: "images/book4.png",
  oldPrice: 500,
  newPrice: 450
},
{
    name: "تفسیر قرآن",
    image: "images/book5.png",
    oldPrice: 1200,
    newPrice: 850
  },
{
  name: "تفسیر قرآن",
  image: "images/book6.png",
  oldPrice: 1200,
  newPrice: 850
},
{
  name: "سیر قرآن",
  image: "images/book7.png",
  oldPrice: 1200,
  newPrice: 850
},
];

const container = document.getElementById("bookContainer");
const searchInput = document.getElementById("searchInput");
const showAllBtn = document.getElementById("showAll");
const showFavBtn = document.getElementById("showFav");

function loadBooks(filter = "", onlyFav = false) {
  container.innerHTML = "";
  const favList = JSON.parse(localStorage.getItem("favourites")) || [];

  books.forEach((book, index) => {
    if (
      book.name.includes(filter) &&
      (!onlyFav || favList.includes(index))
    ) {
      const div = document.createElement("div");
      div.className = "book";

      // Star icon
      const star = document.createElement("span");
      star.className = "star";
      star.innerText = favList.includes(index) ? "★"newnew     if (favList.includes(index)) star.classList.add("filled");
      star.addEventListener("click", () => {
        toggleFav(index);
      });
      div.appendChild(star);

      // Book content
      const img = document.createElement("img");
      img.src = book.image;
      img.alt = book.name;

      const h3 = document.createElement("h3");
      h3.innerText = book.name;

      const priceDiv = document.createElement("div");
      priceDiv.className = "price";
      priceDiv.innerHTML = `<span class="old">Rs ${book.oldPrice}</span> <span class="new">Rs ${book.newPrice}</span>`;

      const btn = document.createElement("button");
      btn.innerText = "ORDER";
      btn.addEventListener("click", openPopup);

      div.appendChild(img);
      div.appendChild(h3);
      div.appendChild(priceDiv);
      div.appendChild(btn);
container.insertBefore(div, container.firstChild);
}

function toggleFav(index) {
  let favList = JSON.parse(localStorage.getItem("favourites")) || [];
  if (favList.includes(index)) {
    favList = favList.filter(i => i !== index);
  } else {
    favList.push(index);
  }
  localStorage.setItem("favourites", JSON.stringify(favList));
  loadBooks(searchInput.value);
}

searchInput.addEventListener("input", () => {
  loadBooks(searchInput.value);
});

showAllBtn.addEventListener("click", () => {
  loadBooks(); // بس کتابیں دکھانی ہیں
});

showFavBtn.addEventListener("click", () => {
  loadBooks("", true);
});

function openPopup() {
  document.getElementById("orderPopup").style.display = "flex";
  history.pushState({ popup: true }, "popup", "#order"); // URL میں hash شامل
}

function closePopup() {
  document.getElementById("orderPopup").style.display = "none";
  if (location.hash === "#order") {
    history.back(); // اگر hash موجود ہے تو واپس پیچھے جائیں
  }
}
window.addEventListener("popstate", () => {
  // جب back button دبایا جائے
  document.getElementById("orderPopup").style.display = "none";
});

loadBooks();
