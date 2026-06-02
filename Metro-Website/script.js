const metro = {};

function addConnection(station1, station2, time, line) {
    if (!metro[station1]) metro[station1] = [];
    if (!metro[station2]) metro[station2] = [];

    metro[station1].push({ station: station2, time, line });
    metro[station2].push({ station: station1, time, line });
}

function buildMetroMap() {
    addConnection("Vastral Gam", "Nirant Cross Road", 2, "Blue Line");
    addConnection("Nirant Cross Road", "Vastral", 2, "Blue Line");
    addConnection("Vastral", "Rabari Colony", 2, "Blue Line");
    addConnection("Rabari Colony", "Amraiwadi", 2, "Blue Line");
    addConnection("Amraiwadi", "Apparel Park", 2, "Blue Line");
    addConnection("Apparel Park", "Kankaria East", 2, "Blue Line");
    addConnection("Kankaria East", "Kalupur Railway Station", 2, "Blue Line");
    addConnection("Kalupur Railway Station", "Ghee Kanta", 2, "Blue Line");
    addConnection("Ghee Kanta", "Shahpur", 2, "Blue Line");
    addConnection("Shahpur", "Old High Court", 2, "Blue Line");
    addConnection("Old High Court", "SP Stadium", 2, "Blue Line");
    addConnection("SP Stadium", "Commerce Six Road", 2, "Blue Line");
    addConnection("Commerce Six Road", "Gujarat University", 2, "Blue Line");
    addConnection("Gujarat University", "Gurukul Road", 2, "Blue Line");
    addConnection("Gurukul Road", "Doordarshan Kendra", 2, "Blue Line");
    addConnection("Doordarshan Kendra", "Thaltej", 2, "Blue Line");
    addConnection("Thaltej", "Thaltej Gam", 2, "Blue Line");

    addConnection("APMC", "Jivraj Park", 2, "Red Line");
    addConnection("Jivraj Park", "Rajivnagar", 2, "Red Line");
    addConnection("Rajivnagar", "Shreyas", 2, "Red Line");
    addConnection("Shreyas", "Paldi", 2, "Red Line");
    addConnection("Paldi", "Gandhigram", 2, "Red Line");
    addConnection("Gandhigram", "Old High Court", 2, "Red Line");
    addConnection("Old High Court", "Usmanpura", 2, "Red Line");
    addConnection("Usmanpura", "Vijay Nagar", 2, "Red Line");
    addConnection("Vijay Nagar", "Vadaj", 2, "Red Line");
    addConnection("Vadaj", "Ranip", 2, "Red Line");
    addConnection("Ranip", "Sabarmati Railway Station", 2, "Red Line");
    addConnection("Sabarmati Railway Station", "AEC", 2, "Red Line");
    addConnection("AEC", "Sabarmati", 2, "Red Line");
    addConnection("Sabarmati", "Motera Stadium", 2, "Red Line");

    addConnection("Motera Stadium", "Koteshwar Road", 2, "Gandhinagar Line");
    addConnection("Koteshwar Road", "Vishwakarma College", 2, "Gandhinagar Line");
    addConnection("Vishwakarma College", "Tapovan Circle", 2, "Gandhinagar Line");
    addConnection("Tapovan Circle", "Narmada Canal", 2, "Gandhinagar Line");
    addConnection("Narmada Canal", "Koba Circle", 2, "Gandhinagar Line");
    addConnection("Koba Circle", "Juna Koba", 2, "Gandhinagar Line");
    addConnection("Juna Koba", "Koba Gam", 2, "Gandhinagar Line");
    addConnection("Koba Gam", "GNLU", 2, "Gandhinagar Line");
    addConnection("GNLU", "Raysan", 2, "Gandhinagar Line");
    addConnection("Raysan", "Randesan", 2, "Gandhinagar Line");
    addConnection("Randesan", "Dholakuva Circle", 2, "Gandhinagar Line");
    addConnection("Dholakuva Circle", "Infocity", 2, "Gandhinagar Line");
    addConnection("Infocity", "Sector-1", 2, "Gandhinagar Line");
    addConnection("Sector-1", "Sector-10A", 2, "Gandhinagar Line");
    addConnection("Sector-10A", "Sachivalaya", 2, "Gandhinagar Line");
    addConnection("Sachivalaya", "Akshardham", 2, "Gandhinagar Line");
    addConnection("Akshardham", "Juna Sachivalaya", 2, "Gandhinagar Line");
    addConnection("Juna Sachivalaya", "Sector-16", 2, "Gandhinagar Line");
    addConnection("Sector-16", "Sector-24", 2, "Gandhinagar Line");
    addConnection("Sector-24", "Mahatma Mandir", 2, "Gandhinagar Line");

    addConnection("GNLU", "PDEU", 2, "GIFT City Branch");
    addConnection("PDEU", "GIFT City", 2, "GIFT City Branch");
}

function getStations() {
    return Object.keys(metro).sort();
}

function dijkstra(source, destination) {
    const distances = {};
    const parent = {};
    const lineUsed = {};
    const visited = new Set();
    const stations = getStations();

    stations.forEach((station) => {
        distances[station] = Infinity;
    });

    distances[source] = 0;

    while (visited.size < stations.length) {
        let currentStation = null;
        let bestDistance = Infinity;

        stations.forEach((station) => {
            if (!visited.has(station) && distances[station] < bestDistance) {
                bestDistance = distances[station];
                currentStation = station;
            }
        });

        if (currentStation === null || currentStation === destination) {
            break;
        }

        visited.add(currentStation);

        metro[currentStation].forEach((edge) => {
            const newDistance = distances[currentStation] + edge.time;

            if (newDistance < distances[edge.station]) {
                distances[edge.station] = newDistance;
                parent[edge.station] = currentStation;
                lineUsed[edge.station] = edge.line;
            }
        });
    }

    if (distances[destination] === Infinity) {
        return null;
    }

    return buildResult(source, destination, parent, lineUsed, distances[destination]);
}

function bfsMinimumStops(source, destination) {
    const queue = [source];
    const visited = new Set([source]);
    const parent = {};
    const lineUsed = {};
    let found = false;

    while (queue.length > 0) {
        const currentStation = queue.shift();

        if (currentStation === destination) {
            found = true;
            break;
        }

        metro[currentStation].forEach((edge) => {
            if (!visited.has(edge.station)) {
                visited.add(edge.station);
                parent[edge.station] = currentStation;
                lineUsed[edge.station] = edge.line;
                queue.push(edge.station);
            }
        });
    }

    if (!found) {
        return null;
    }

    return buildResult(source, destination, parent, lineUsed, null);
}

function buildResult(source, destination, parent, lineUsed, totalTime) {
    const path = [];
    let station = destination;

    while (station !== source) {
        path.push(station);
        station = parent[station];
    }

    path.push(source);
    path.reverse();

    const lines = [];

    for (let i = 1; i < path.length; i++) {
        lines.push(lineUsed[path[i]]);
    }

    return {
        path,
        lines,
        totalTime,
        stops: path.length - 1,
        interchanges: getInterchanges(path, lines),
    };
}

function getInterchanges(path, lines) {
    const interchanges = [];

    for (let i = 1; i < lines.length; i++) {
        if (lines[i] !== lines[i - 1]) {
            interchanges.push({
                station: path[i],
                from: lines[i - 1],
                to: lines[i],
            });
        }
    }

    return interchanges;
}

function lineClass(line) {
    return line.toLowerCase().replaceAll(" ", "-");
}

function populateStationDropdowns() {
    const sourceSelect = document.getElementById("sourceStation");
    const destinationSelect = document.getElementById("destinationStation");
    const stationCount = document.getElementById("stationCount");

    getStations().forEach((station) => {
        sourceSelect.add(new Option(station, station));
        destinationSelect.add(new Option(station, station));
    });

    stationCount.textContent = getStations().length;
}

function getSelectedStations() {
    const source = document.getElementById("sourceStation").value;
    const destination = document.getElementById("destinationStation").value;

    if (!source || !destination) {
        showMessage("Missing stations", "Please select both source and destination stations.");
        return null;
    }

    if (source === destination) {
        showMessage("Same station selected", "Source and destination should be different stations.");
        return null;
    }

    return { source, destination };
}

function showMessage(title, message) {
    document.getElementById("resultTitle").textContent = title;
    document.getElementById("resultContent").className = "empty-state";
    document.getElementById("resultContent").textContent = message;
}

function renderResult(title, result) {
    document.getElementById("resultTitle").textContent = title;

    const uniqueLines = [...new Set(result.lines)];
    const timeMetric = result.totalTime === null ? "By BFS" : `${result.totalTime} min`;

    document.getElementById("resultContent").className = "route-summary";
    document.getElementById("resultContent").innerHTML = `
        <div class="metrics">
            <div class="metric">
                <strong>${timeMetric}</strong>
                <span>Total Time</span>
            </div>
            <div class="metric">
                <strong>${result.stops}</strong>
                <span>Total Stops</span>
            </div>
            <div class="metric">
                <strong>${result.interchanges.length}</strong>
                <span>Interchanges</span>
            </div>
        </div>

        <div>
            <h3 class="section-title">Route</h3>
            <ul class="path-list">
                ${result.path.map((station) => `<li>${station}</li>`).join("")}
            </ul>
        </div>

        <div>
            <h3 class="section-title">Lines Used</h3>
            <div class="line-badges">
                ${uniqueLines.map((line) => `<span class="line-badge ${lineClass(line)}">${line}</span>`).join("")}
            </div>
        </div>

        <div>
            <h3 class="section-title">Interchanges</h3>
            ${
                result.interchanges.length === 0
                    ? "<p>No interchange needed.</p>"
                    : `<ol class="interchange-list">
                        ${result.interchanges
                            .map((item) => `<li>Change from ${item.from} to ${item.to} at ${item.station}</li>`)
                            .join("")}
                       </ol>`
            }
        </div>
    `;
}

function resetPlanner() {
    document.getElementById("routeForm").reset();
    showMessage("Choose a route", "Select source and destination stations, then choose a route type.");
}

function wireEvents() {
    document.getElementById("shortestTimeBtn").addEventListener("click", () => {
        const selected = getSelectedStations();
        if (!selected) return;

        const result = dijkstra(selected.source, selected.destination);

        if (!result) {
            showMessage("No route found", "There is no available path between these stations.");
            return;
        }

        renderResult("Shortest Route by Time", result);
    });

    document.getElementById("minimumStopsBtn").addEventListener("click", () => {
        const selected = getSelectedStations();
        if (!selected) return;

        const result = bfsMinimumStops(selected.source, selected.destination);

        if (!result) {
            showMessage("No route found", "There is no available path between these stations.");
            return;
        }

        renderResult("Minimum Stops Route", result);
    });

    document.getElementById("resetBtn").addEventListener("click", resetPlanner);
}

buildMetroMap();
populateStationDropdowns();
wireEvents();