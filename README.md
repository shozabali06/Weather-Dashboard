# Weather Dashboard 🌦️

A clean, modern, and responsive web application that provides real-time weather information and a 3-day forecast for any city in the world. This project is built with vanilla HTML, CSS, and JavaScript, focusing on a clean UI and a great user experience.

![Weather Dashboard Screenshot](https://i.ibb.co/xtJ7gpxR/127-0-0-1-3000-index-html.png)

## ✨ Features

- **City Search**: Get the current weather and forecast for any city using the search bar.
- **Geolocation**: Instantly fetch weather data for your current location with a single click.
- **Current Weather Details**: View a comprehensive summary of the current conditions, including:
  - Temperature and "feels like" temperature
  - Weather description (e.g., "Partly cloudy")
  - Visibility, Humidity, Wind Speed, and Air Pressure
- **3-Day Forecast**: See a summary of the weather for the next three days, including high/low temperatures and weather icons.
- **Responsive Design**: A mobile-first design that looks great on any device, from desktops to smartphones.
- **Dynamic UI**: Includes loading and error states to provide a smooth and informative user experience.

---

## 🛠️ Technologies Used

- **HTML5**: For the structure of the web page.
- **CSS3**: For styling, including Flexbox and Grid for layout, and a responsive design with media queries.
- **JavaScript (ES6+)**: For all the application logic, including `async/await` for handling API calls.
- **OpenWeatherMap API**: Used as the data source for all geographical and weather data.
- **Font Awesome**: For icons used throughout the user interface.

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You will need a modern web browser and a code editor of your choice.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/shozabali06/weather-dashboard.git
    ```
2.  **Get your API Key:**
    - Sign up on [OpenWeatherMap](https://openweathermap.org/api) to get a free API key. This is required to fetch weather data.
3.  **Add the API Key to your script:**
    - Open the `script.js` file.
    - Find the `apiKey` constant and replace the placeholder value with your own key.
    ```javascript
    // script.js
    const apiKey = "YOUR_API_KEY_HERE";
    ```
4.  **Run the application:**
    - Simply open the `index.html` file in your web browser. You can do this by double-clicking the file or using a live server extension in your code editor (like Live Server for VS Code).

---

## 📂 Project Structure

├── index.html # The main HTML file
├── styles.css # All CSS styles for the application
└── script.js # The JavaScript logic and API handling

---

## 👤 Author

**Shozab Ali**

- GitHub: [@shozabali06](https://github.com/shozabali06)
