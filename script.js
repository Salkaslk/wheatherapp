// script.js - simple mock weather lookup and UI update

const mockData = {
  "london": {
    city: "London, UK",
    date: "Friday, September 19, 2025",
    temp: 20,
    cond: "Partly Cloudy",
    icon: "🌤️",
    humidity: "65%",
    wind: "15 km/h",
    rain: "0 mm",
    uv: "4 (Moderate)",
    sunrise: "6:30 AM",
    sunset: "7:15 PM"
  },
  "new york": {
    city: "New York, US",
    date: "Friday, September 19, 2025",
    temp: 26,
    cond: "Sunny",
    icon: "☀️",
    humidity: "50%",
    wind: "12 km/h",
    rain: "0 mm",
    uv: "6 (High)",
    sunrise: "6:50 AM",
    sunset: "7:05 PM"
  },
  "mumbai": {
    city: "Mumbai, IN",
    date: "Friday, September 19, 2025",
    temp: 30,
    cond: "Humid & Cloudy",
    icon: "🌥️",
    humidity: "78%",
    wind: "10 km/h",
    rain: "2 mm",
    uv: "7 (High)",
    sunrise: "6:10 AM",
    sunset: "6:50 PM"
  },
  "delhi": {
    city: "Delhi, IN",
    date: "Friday, September 19, 2025",
    temp: 33,
    cond: "Hot",
    icon: "🔥",
    humidity: "40%",
    wind: "8 km/h",
    rain: "0 mm",
    uv: "8 (Very High)",
    sunrise: "6:05 AM",
    sunset: "6:40 PM"
  }
};

const form = document.getElementById("searchForm");
const input = document.getElementById("cityInput");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const raw = input.value.trim();
  if (!raw) {
    showSample("Please enter a city name — showing sample.");
    return;
  }
  showWeatherFor(raw);
});

function showWeatherFor(raw) {
  const key = raw.toLowerCase();
  // try exact city match or partial
  let found = null;
  if (mockData[key]) found = mockData[key];
  else {
    // partial match: check if any mock city contains token
    for (const k of Object.keys(mockData)) {
      if (k.includes(key) || mockData[k].city.toLowerCase().includes(key)) {
        found = mockData[k];
        break;
      }
    }
  }

  if (!found) {
    // not in dataset: show a generated sample so clicking always updates UI
    showSample(`No exact match for "${raw}". Showing a sample result.`);
  } else {
    updateCard(found);
  }
}

function showSample(message) {
  // create a lightweight sample based on random values
  const temp = 18 + Math.floor(Math.random() * 15);
  const sample = {
    city: "Sample City",
    date: new Date().toLocaleString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    temp,
    cond: temp > 28 ? "Hot" : (temp > 22 ? "Sunny" : "Partly Cloudy"),
    icon: temp > 28 ? "🔥" : (temp > 22 ? "☀️" : "⛅"),
    humidity: `${45 + Math.floor(Math.random() * 40)}%`,
    wind: `${5 + Math.floor(Math.random() * 20)} km/h`,
    rain: `${Math.floor(Math.random() * 3)} mm`,
    uv: `${3 + Math.floor(Math.random() * 6)} (Moderate)`,
    sunrise: "6:20 AM",
    sunset: "7:00 PM"
  };
  updateCard(sample);
  // small visual feedback in the location header
  flashMessage(message);
}

function updateCard(data) {
  document.getElementById("location").textContent = `Current Weather in ${data.city}`;
  document.getElementById("date").textContent = data.date || "-";
  document.getElementById("temperature").textContent = `${data.temp}°C`;
  document.getElementById("condition").textContent = data.cond;
  document.getElementById("weatherIcon").textContent = data.icon || "🌤️";
  document.getElementById("humidity").textContent = data.humidity || "-";
  document.getElementById("wind").textContent = data.wind || "-";
  document.getElementById("rain").textContent = data.rain || "-";
  document.getElementById("uv").textContent = data.uv || "-";
  document.getElementById("sunrise").textContent = data.sunrise || "-";
  document.getElementById("sunset").textContent = data.sunset || "-";
}

// tiny message feedback shown in the location header for a moment
function flashMessage(msg) {
  const loc = document.getElementById("location");
  const original = loc.textContent;
  loc.textContent = msg;
  setTimeout(() => { loc.textContent = original; }, 2000);
}

// show a default city at load
window.addEventListener("load", () => {
  updateCard(mockData["london"]);
});
