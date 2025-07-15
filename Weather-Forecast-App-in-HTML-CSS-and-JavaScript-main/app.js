/* Created by Tivotal */

let moreBtn = document.querySelector(".more-btn");
let input = document.querySelector("input");
let key = "7d5e74e7b112e34001dc87b79a2fc7c3";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

moreBtn.addEventListener("click", () => {
  document.querySelector(".more").classList.toggle("active");
});

function getWeather(loc) {
  let url = apiUrl + loc + `&appid=${key}`;
  fetch(url).then((res) => {
    if (!res.ok) {
      document.querySelector(
        ".data-wrapper"
      ).innerHTML = `<h2 class="error">Unable to fetch data</h2>`;
      return new Error("Unable to fetch data");
    } else {
      res.json().then((data) => {
        console.log(data);
        let type = data.weather[0].main;
        let icon = document.querySelector(".icon");
        switch (type) {
          case "Clouds":
            icon.className = "bx bx-cloud icon";
            break;
          case "Rain":
            icon.className = "bx bx-cloud-rain icon";
            break;
          case "Snow":
            icon.className = "bx bx-cloud-snow icon";
            break;
        }
        document.querySelector(".temp").textContent =
          Math.floor(data.main.temp) + "°C";

        document.querySelector(".city").textContent = data.name;

        document.querySelector(".min-temp").textContent =
          data.main.temp_min + "°C";

        document.querySelector(".max-temp").textContent =
          data.main.temp_max + "°C";

        document.querySelector(".humidity").textContent =
          data.main.humidity + "%";

        document.querySelector(".wind").textContent = data.wind.speed + "km/h";

        let pressure = data.main.pressure / 1013.25;
        document.querySelector(".pressure").textContent =
          (Math.floor(pressure * 100) / 100).toFixed(2) + "atm";
      });
    }
  });
}

document.querySelector(".btn").addEventListener("click", () => {
  let inputVal = input.value;
  if (inputVal) {
    getWeather(inputVal);
    input.value = "";
  }
});
getWeather("bengaluru");

