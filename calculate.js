// ===================== STATISTICAL ENGINE =====================
// Core module for volatility calculations (Mean, SD, CV)

function calculateStats() {

    // -------- Data Extraction --------
    // Get analysis parameters from UI
    let timeframe = document.getElementById('timeframe').value;  // daily/weekly/monthly
    let period = document.getElementById("timeInput").value;     // number of periods
    let company1 = document.getElementById("company1").value || "Company 1"; // Company 1 name or Default name
    let company2 = document.getElementById("company2").value || "Company 2"; // Company 2 name or Default name

    // -------- Data Collection --------
    // Extract price values from input table
    let c1 = [], c2 = [];
    for (let i = 1; i <= period; i++) {
        c1.push(parseFloat(document.getElementById(`c1_${i}`).value)); // Company 1 prices
        c2.push(parseFloat(document.getElementById(`c2_${i}`).value)); // Company 2 prices
    }

    // -------- Input Validation --------
    if (c1.includes(NaN) || c2.includes(NaN)) {
        alert("Please enter valid numbers."); // Prevent calculations with missing data
        return;
    }

    // -------- Statistical Calculations --------
    // Company 1 computations
    let sum1 = calcSum(c1);                        // Σx_i
    let mean1 = calcMean(sum1,period);             // x̄ = Σx_i/n
    let sumdev1 = calcSumDev(c1, mean1);           // Σ(x_i - x̄)^2
    let sd1 = calcSD(sumdev1, period);             // SD = √(Σ(x_i - x̄)^2/n)
    let cv1 = sd1 / mean1 * 100;                   // CV = (σ/x̄)*100

    // Company 2 computations
    let sum2 = calcSum(c2);                         // Σx_i
    let mean2 = calcMean(sum2,period);              // x̄ = Σx_i/n
    let sumdev2 = calcSumDev(c2, mean2);            // Σ(x_i - x̄)^2
    let sd2 = calcSD(sumdev2, period);              // SD = √(Σ(x_i - x̄)^2/n)
    let cv2 = sd2 / mean2 * 100;                    // CV = (σ/x̄)*100

    // -------- Results Table Generation --------
    // Company 1 deviation table
    let tableComparison = `<table>
                             <tr><th colspan='3'>${company1}</th></tr>         <!-- Company 1 name header -->
                             <tr>
                                  <th>Price (x<sub>i</sub>)</th>               <!-- Individual price column -->
                                  <th>(x<sub>i</sub> - x̄)</th>                 <!-- Deviation from mean -->
                                  <th>(x<sub>i</sub> - x̄)<sup>2</sup></th>     <!-- Squared Deviation from mean -->
                             </tr>`;
    // Populate company 1 data rows
    for (let i = 0; i < period; i++) {
        let deviation1 = (c1[i] - mean1).toFixed(2);    // Calculate deviation (x_i - x̄)
        let squared1 = (deviation1 ** 2).toFixed(2);    // Square of deviation (x_i - x̄)^2
        tableComparison += `<tr>
                                 <td>${c1[i]}</td>         <!-- Original price display-->
                                 <td>${deviation1}</td>    <!-- Deviation display -->
                                 <td>${squared1}</td>      <!-- Squared Deviation display -->
                            </tr>`;
    }
    // Add summary row for company 1
    tableComparison += `<tr>
			                 <td><b>∑x<sub>i</sub></b> = ${sum1.toFixed(2)}</td>    <!-- Total prices sum -->
                             <td> </td>                                             <!-- Empty spacer cell -->
                             <td><b>∑(x<sub>i</sub> - x̄)<sup>2</sup></b> = ${sumdev1.toFixed(2)}</td>    <!-- Total squared deviations sum -->  
                        </tr>
                        </table>`;

    // Company 2 deviation table
    tableComparison += `<table>
                          <tr><th colspan='3'>${company2}</th></tr>         <!-- Company 2 name header -->
                          <tr>
                               <th>Price (x<sub>i</sub>)</th>               <!-- Individual price column -->
                               <th>(x<sub>i</sub> - x̄)</th>                 <!-- Deviation from mean -->
                               <th>(x<sub>i</sub> - x̄)<sup>2</sup></th>     <!-- Squared Deviation from mean -->
                          </tr>`;
    // Populate company 2 data rows
    for (let i = 0; i < period; i++) {
        let deviation2 = (c2[i] - mean2).toFixed(2);    // Calculate deviation (x_i - x̄)
        let squared2 = (deviation2 ** 2).toFixed(2);    // Square of deviation (x_i - x̄)^2
        tableComparison += `<tr>
                                 <td>${c2[i]}</td>         <!-- Original price display-->
                                 <td>${deviation2}</td>    <!-- Deviation display -->
                                 <td>${squared2}</td>      <!-- Squared Deviation display -->
                            </tr>`;
    }
    // Add summary row for company 2
    tableComparison += `<tr> 
                          <td><b>∑x<sub>i</sub></b> = ${sum2.toFixed(2)}</td>       <!-- Total prices sum -->
                          <td> </td>                                                <!-- Empty spacer cell -->
                          <td><b>∑(x<sub>i</sub> - x̄)<sup>2</sup></b> = ${sumdev2.toFixed(2)}</td>      <!-- Total squared deviations sum -->
                        </tr> 
                        </table>`;

    // --------------- UI Updates ---------------
    // Show tables of statsContainer
    document.getElementById("statsContainer").innerHTML = tableComparison;
    // Show equationContainer
    document.querySelector('.equationContainer').classList.add('visible');

    // ----------- Mathematical Equations ------------
    // Company 1 formulas (LaTeX via MathJax)
    document.getElementById("company1Equation").innerHTML = `\\[\\therefore \\text{Mean } \\bar{x} = \\frac{\\sum x_i}{n} = \\frac{${sum1.toFixed(2)}}{${c1.length}} = ${mean1.toFixed(2)}\\]
\\[\\therefore \\text{Standard Deviation (S.D)} = \\sqrt{\\frac{\\sum \\left(x_i - \\bar{x}\\right)^2}{n}} = \\sqrt{\\frac{${sumdev1.toFixed(2)}}{${c1.length}}} = ${sd1.toFixed(2)}\\]
\\[\\therefore \\text{Coefficiet of Variation (C.V)} = \\frac{\\text{SD}}{\\bar{x}} = \\frac{${sd1.toFixed(2)}}{${mean1.toFixed(2)}} \\text{ * 100} = ${cv1.toFixed(2)} \\text{ %}\\]`;
    // Company 2 formulas (LaTeX via MathJax)
    document.getElementById("company2Equation").innerHTML = `\\[\\therefore \\text{Mean } \\bar{x} = \\frac{\\sum x_i}{n} = \\frac{${sum2.toFixed(2)}}{${c2.length}} = ${mean2.toFixed(2)}\\]
\\[\\therefore \\text{Standard Deviation (S.D)} = \\sqrt{\\frac{\\sum \\left(x_i - \\bar{x}\\right)^2}{n}} = \\sqrt{\\frac{${sumdev2.toFixed(2)}}{${c2.length}}} = ${sd2.toFixed(2)}\\]
\\[\\therefore \\text{Coefficiet of Variation (C.V)} = \\frac{\\text{SD}}{\\bar{x}} = \\frac{${sd2.toFixed(2)}}{${mean2.toFixed(2)}} \\text{ * 100} = ${cv2.toFixed(2)} \\text{ %}\\]`;
    // Render equations in equationContainer
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);

    // ----------------- DATA VISUALIZATION & ANALYSIS -----------------
    // Prepares calculated data for charts and comparative report

    // Chart data Parent JS Object for Plotly visualization
    const chartData = {
        company1: {             // Nested JS Object for Company 1
            name: company1,     // Company name from input
            prices: c1,         // Array of historical prices
            mean: mean1,        // Calculated average price
            sd: sd1             // Standard deviation value
        },
        company2: {             // Nested JS Object for Company 2
            name: company2,     // Company name from input
            prices: c2,         // Array of historical prices
            mean: mean2,        // Calculated average price
            sd: sd2             // Standard deviation value
        }
    };
    // Function to Trigger chart generation in graph.js with both datasets
    window.createCharts(chartData.company1, chartData.company2, timeframe);     // Passes data to graph.js for chart generation

    // Function to Generate comparative risk analysis report in analysis.js
    analysisContainer(company1, company2, mean1, mean2, sd1, sd2, cv1, cv2);    // Passes data to analysis.js for report generation

}

// ---------------- STATISTICAL UTILITIES -----------------
// Helper functions for fundamental calculations

// Σx_i calculation
function calcSum(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}

// x̄ = Σx_i/n calculation
function calcMean(sum, period) {
    let mean = sum / period;
    return mean;
}

// Σ(x_i - x̄)^2 calculation
function calcSumDev(arr, mean) {
    let sumdev = 0;
    for (let i = 0; i < arr.length; i++) {
        sumdev += (arr[i] - mean) ** 2;
    }
    return sumdev;
}

// SD = √(Σ(x_i - x̄)^2/n) calculation
function calcSD(sumdev, period) {
    let variance = sumdev / period;
    let sd = Math.sqrt(variance);
    return sd;
}