const API_KEY = "035df4563c9f50555b21c4f36874facd";
const form = document.querySelector("#form");
const weatherDiv = document.querySelector("#weather");

form.addEventListener("submit", function(event) {
  event.preventDefault();
  const city = form.elements.city.value;
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      const days = [];
      data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const day = date.toLocaleDateString("en-US", { weekday: "long" });
        if (!days.includes(day)) {
          days.push(day);
        }
      });

      let html = "";
      days.forEach(day => {
        html += `
          <div class="day">
            <h2>${day}</h2>
            <p>Temperature: ${data.list[0].main.temp} °F</p>
            <p>Humidity: ${data.list[0].main.humidity} %</p>
            <p>Weather: ${data.list[0].weather[0].description}</p>
          </div>
        `;
      });
      weatherDiv.innerHTML = html;
    })
    .catch(error => console.error(error));
});

