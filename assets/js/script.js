const url = 'https://online-movie-database.p.rapidapi.com/auto-complete?q=Avengers';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '78a6737bf0msh512c51f3b45bc1cp117602jsndaa6a14db3f3',
		'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
	}
};

const fetchData = async () => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const list = data.d;

    list.forEach(item => {
      const name = item.l;
      const poster = item.i.imageUrl;
      const movie = `<li><img src="${poster}"><h2>${name}</h2></li>`;
      document.querySelector('.movies').innerHTML += movie;
    });
  } catch (error) {
    console.error(error);
  }
};

fetchData();

const menuButton = document.getElementById("menu-button");
const dropdownMenu = document.querySelector(".absolute.right-0");

menuButton.addEventListener("click", function () {
  const expanded = menuButton.getAttribute("aria-expanded") === "true" || false;
  menuButton.setAttribute("aria-expanded", !expanded);
  dropdownMenu.style.display = expanded ? "none" : "block";
});
