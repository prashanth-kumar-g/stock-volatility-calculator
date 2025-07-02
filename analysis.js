// ===================== COMPARATIVE ANALYSIS ENGINE =====================
// Generates risk/reward comparison report for both companies

function analysisContainer(company1, company2, mean1, mean2, sd1, sd2, cv1, cv2) {
    
    // -------- Volatility Determination --------
    // Compare Standard Deviation (SD) and Coefficient of Variation (CV)
    const isSDEqual = (sd1 === sd2);  // Check if SDs are equal
    const useCV = isSDEqual;          // Use CV only when SDs are equal

    // Determine which company is more volatile
    let company1MoreVolatile, company2MoreVolatile;
    if (useCV) {
        // Compare Coefficient of Variation (CV) when Standard Deviations are equal
        company1MoreVolatile = (cv1 > cv2);  // True if Company 1's CV is higher
        company2MoreVolatile = (cv2 > cv1);  // True if Company 2's CV is higher
    } 
    else {
        // Default comparison using Standard Deviation (SD)
        company1MoreVolatile = (sd1 > sd2);  // True if Company 1's SD is higher
        company2MoreVolatile = (sd2 > sd1);  // True if Company 2's SD is higher
    }

    // -------- Report Generation --------
    // Construct HTML for comparative analysis
    const analysisHTML = `     
        <!-- Report Container -->
        <div class="report-section">
            <center><h3 class="report-title">Report</h3></center>   <!-- Report header -->
           
            <div class="company-comparison">    <!-- Dual-column comparison container -->
               
                <!-- ========== COMPANY 1 ANALYSIS ========== -->
                <div class="company-analysis">
                    <h4>${company1}</h4>    <!-- Company 1 name -->
                    <ul class="analysis-list">

                        <!-- Core Metrics -->
                        <li>
                            <strong>Mean (Average Price):</strong> ₹${mean1.toFixed(2)}     <!-- Display mean value -->
                        </li>
                        <li>
                            <strong>Standard Deviation:</strong> ₹${sd1.toFixed(2)}      <!-- Display SD value -->
                        </li>
                        <li>
                            <strong>Coeffiecient of Variation:</strong> ${cv1.toFixed(2)}%      <!-- Display CV value -->   
                        </li>

                        <!-- Volatility Analysis -->
                        <li>
                            <!-- Determines volatility using SD/CV comparison -->
                            <strong>Volatility:</strong> ${isSDEqual ? 
                            /* When SDs are equal: Compare CV */
                            `Equal SD but ${company1MoreVolatile ? 'higher' : 'lower'} CV means ${company1MoreVolatile ? 'more' : 'less'}` : 
                            /* Default: Compare SD */
                            `${company1MoreVolatile ? 'Higher' : 'Lower'} SD means ${company1MoreVolatile ? 'more' : 'less'}`} 
                            price swings from average mean price.
                        </li>

                        <!-- Risk Assessment -->
                        <li>
                            <!-- Evaluates risk level based on volatility -->
                            <strong>Risk:</strong> ${company1MoreVolatile ? 'More' : 'Less'} price swings means 
                            ${company1MoreVolatile ? 'less' : 'more'} stability and ${company1MoreVolatile ? 'higher' : 'lower'} risk.
                        </li>

                        <!-- Return Potential -->
                        <li>
                            <!-- Evaluates return potential based on volatility level -->
                            <strong>Returns:</strong> ${company1MoreVolatile ? 
                            'High volatility means higher returns with higher risk.' : 
                            'Low volatility means stable returns with lower risk.'}
                        </li>

                        <!-- Investment Conclusion -->
                        <li class="conclusion-item">
                            <!-- Generates investment recommendation based on volatility level -->
                            <strong>Conclusion:</strong> ${company1MoreVolatile ? 
                            `If you are looking for higher potential returns and are willing to take on more risk on investment, then ${company1} is the better choice` : 
                            `If you are looking for stable returns with consistent growth and less risk on investment, then ${company1} is the better choice`}.
                        </li>
                    </ul>
                </div>

                <!-- ========== COMPANY 2 ANALYSIS ========== -->
                <div class="company-analysis">
                    <h4>${company2}</h4>    <!-- Company 2 name -->
                    <ul class="analysis-list">

                        <!-- Core Metrics -->
                        <li>
                            <strong>Mean (Average Price):</strong> ₹${mean2.toFixed(2)}     <!-- Display mean value -->
                        </li>
                        <li>
                            <strong>Standard Deviation:</strong> ₹${sd2.toFixed(2)}      <!-- Display SD value -->
                        </li>
                        <li>
                            <strong>Coeffiecient of Variation:</strong> ${cv2.toFixed(2)}%      <!-- Display CV value -->   
                        </li>

                        <!-- Volatility Analysis -->
                        <li>
                            <!-- Determines volatility using SD/CV comparison -->
                            <strong>Volatility:</strong> ${isSDEqual ? 
                            /* When SDs are equal: Compare CV */
                            `Equal SD but ${company2MoreVolatile ? 'higher' : 'lower'} CV means ${company2MoreVolatile ? 'more' : 'less'}` : 
                            /* Default: Compare SD */
                            `${company2MoreVolatile ? 'Higher' : 'Lower'} SD means ${company2MoreVolatile ? 'more' : 'less'}`} 
                            price swings from average mean price.
                        </li>

                        <!-- Risk Assessment -->
                        <li>
                            <!-- Evaluates risk level based on volatility -->
                            <strong>Risk:</strong> ${company2MoreVolatile ? 'More' : 'Less'} price swings means 
                            ${company2MoreVolatile ? 'less' : 'more'} stability and ${company2MoreVolatile ? 'higher' : 'lower'} risk.
                        </li>

                        <!-- Return Potential -->
                        <li>
                            <!-- Evaluates return potential based on volatility level -->
                            <strong>Returns:</strong> ${company2MoreVolatile ? 
                            'High volatility means higher returns with higher risk.' : 
                            'Low volatility means stable returns with lower risk.'}
                        </li>

                        <!-- Investment Conclusion -->
                        <li class="conclusion-item">
                            <!-- Generates investment recommendation based on volatility level -->
                            <strong>Conclusion:</strong> ${company2MoreVolatile ? 
                            `If you are looking for higher potential returns and are willing to take on more risk on investment, then ${company2} is the better choice` : 
                            `If you are looking for stable returns with consistent growth and less risk on investment, then ${company2} is the better choice`}.
                        </li>
                        
                    </ul>
                </div>

            </div>

        </div>
    `;
   
    // -------- DOM Update --------
    // Insert generated report into analysis container
    document.getElementById("analysisContainer").innerHTML = analysisHTML;

}

// ===================== SYSTEM RESET HANDLER =====================
// Clears all user inputs and calculated results

function resetCalculator() {

    // -------- Input Clearing --------
    document.getElementById("company1").value = "";  // Reset company 1 name
    document.getElementById("company2").value = "";  // Reset company 2 name
    document.getElementById("timeInput").value = ""; // Clear period input value
    
    // -------- UI Cleanup --------
    document.getElementById("tableContainer").innerHTML = ""; // Remove input price table

    // Remove Calculate Stats button if exists
    let existingButton = document.getElementById("calcButton");
    if (existingButton) {
        existingButton.remove();
    }

    // -------- Results Clearing --------
    document.getElementById("statsContainer").innerHTML = ""; // Wipe stats tables
    
    // -------- Equation Cleanup --------
    document.getElementById("company1Equation").innerHTML = ""; // Clear company 1 math
    document.getElementById("company2Equation").innerHTML = ""; // Clear company 2 math
    document.querySelector('.equationContainer').classList.remove('visible'); // Hide equation container

    // -------- Visualization Reset --------
    Plotly.purge('company1Chart');  // Remove company 1 chart
    Plotly.purge('company2Chart');  // Remove company 2 chart
    document.querySelector('.graphContainer').classList.remove('active'); // Hide chart area

    // -------- Analysis Report Removal --------
    document.getElementById("analysisContainer").innerHTML = ""; // Clear comparison

}