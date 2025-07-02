// ===================== INPUT TABLE GENERATOR =====================
// Handles dynamic creation of price input tables for both companies

function generateTable() {

    // -------- User Input Extraction --------
    // Get analysis parameters from DOM
    let period = document.getElementById("timeInput").value;       // Number of periods
    let timeframe = document.getElementById("timeframe").value;    // Daily/Weekly/Monthly
    let company1 = document.getElementById("company1").value || "Company 1";    // Company 1 name or Default name
    let company2 = document.getElementById("company2").value || "Company 2";    // Company 2 name or Default name

    // -------- Input Validation --------
    if (period < 1) {
        alert("Please enter a valid number of periods.");  // Basic input sanity check
        return;
    }

    // -------- Timeframe Label Handling --------
    let label;  // Column header text based on selection
    if (timeframe === "daily") {
        label = "Day";     // Daily price analysis
    }
    else if (timeframe === "weekly") {
        label = "Week";    // Weekly price analysis
    }
    else {
        label = "Month";   // Monthly price analysis
    }

    // -------- Table Construction --------
    // Create table headers with dynamic labels
    let tableHTML = `<table>
                        <tr>
                            <th>${label}</th>               <!-- Time period column -->
                            <th>${company1} Price</th>      <!-- Company 1 header -->
                            <th>${company2} Price</th>      <!-- Company 2 header -->
                        </tr>`;

    // Generate input rows for specified periods
    for (let i = 1; i <= period; i++) {
        tableHTML += `<tr>
                        <td>${label} ${i}</td>                          <!-- Period label -->
                        <td><input type='number' id='c1_${i}'></td>     <!-- Company 1 price -->
                        <td><input type='number' id='c2_${i}'></td>     <!-- Company 2 price -->
                      </tr>`;
    }
    tableHTML += "</table>";

    // -------- DOM Update --------
    // Insert generated table into container
    document.getElementById("tableContainer").innerHTML = tableHTML;

    // -------- Calculation Button Management --------
    // Remove existing calculate button if present
    let existingButton = document.getElementById("calcButton");
    if (existingButton) {
        existingButton.remove();  // Prevent duplicate buttons
    }

    // Add new calculate button after table
    document.getElementById("tableContainer").after(
        Object.assign(document.createElement("div"), {
            innerHTML: `<button id="calcButton" onclick="calculateStats()">Calculate Stats</button>`,
            style: "text-align: center;"  // Center-align button
        })
    );

}