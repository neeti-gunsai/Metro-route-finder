# 🚇 Ahmedabad-Gandhinagar Metro Route Finder

A smart and responsive metro journey planner that helps users find the best route across the Ahmedabad-Gandhinagar Metro network using graph algorithms.

This project combines frontend development with data structures by representing the metro network as a graph and applying route-finding algorithms to calculate travel paths.

---

## ✨ What This Project Does

The Metro Route Finder allows users to select a source and destination station, then instantly calculates a suitable metro route.

Users can choose between:

- **Shortest Time Route**
- **Minimum Stops Route**

The app then displays the complete journey details, including stations, travel time, stops, lines used, and interchange points.

---

## 🎯 Key Highlights

- Interactive metro route planner
- Ahmedabad-Gandhinagar metro network support
- Shortest-time route using **Dijkstra Algorithm**
- Minimum-stops route using **Breadth-First Search**
- Automatic interchange detection
- Total stops and estimated time display
- Responsive design for desktop and mobile
- Official metro map references
- Built with pure HTML, CSS, and JavaScript

---

## 🧠 Why This Project Is Useful

Metro systems are naturally graph-based.

In this project:

- Stations are treated as **nodes**
- Tracks between stations are treated as **edges**
- Travel time is treated as **edge weight**

This makes the project a practical example of how data structures and algorithms are used in real-world navigation systems.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Website structure |
| CSS3 | Styling and responsive layout |
| JavaScript | Route logic and interactivity |
| Dijkstra Algorithm | Shortest-time path |
| BFS Algorithm | Minimum-stops path |
| Git & GitHub | Version control and hosting |

---

## 🚉 Metro Lines Included

The application currently supports:

- Blue Line
- Red Line
- Gandhinagar Line
- GIFT City Branch

---

## ⚙️ Algorithms Used

### 1. Dijkstra Algorithm

Used for finding the route with the minimum travel time.

Each connection between stations has a time value, and Dijkstra's algorithm calculates the path with the lowest total time.

### 2. Breadth-First Search

Used for finding the route with the minimum number of stops.

BFS explores nearby stations first and finds the path that reaches the destination using the fewest station-to-station moves.

---

## 🧩 Main Features

### Route Finder

Users can select any two stations and calculate a route based on time or number of stops.

### Journey Summary

The result includes:

- Full station path
- Total travel time
- Total stops
- Metro lines used
- Interchange stations

### Interchange Detection

The app automatically detects when the user needs to change from one metro line to another.

### Metro Map View

Official route map PDFs are included for better visual understanding of the metro network.

---

## 📁 Project Structure

```text
MetroMap/
│
├── Metro-Website/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── assets/
│       ├── ahmedabad-metro-route-map.pdf
│       └── ahmedabad-gandhinagar-phase-2-map.pdf
│
└── README.md
