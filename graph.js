// ===================== CHART VISUALIZATION ENGINE =====================
// Handles interactive price charts and volatility visualization

// ===================== PLOTLY CONFIGURATION =====================
// Chart display settings and toolbar customization

const config = {
    displaylogo: false,   // Remove Plotly logo
    modeBarButtonsToRemove: [   // Simplify toolbar buttons
                                'zoom2d', 'pan2d', 'select2d', 'lasso2d', 
                                'toggleSpikelines', 'resetViews', 'resetScale2d',
                                'hoverClosestCartesian', 'hoverCompareCartesian'
                            ],
    modeBarButtonsToAdd: [   // Keep essential tools
                             'toImage', 'zoomIn2d', 'zoomOut2d', 'autoScale2d'
                         ],
    displayModeBar: true    // Show toolbar
};

// ===================== CHART MANAGEMENT ENGINE =====================
// Handles creation/update of volatility visualization charts

function createCharts(company1Data, company2Data, timeframe) {
    
    // Determine X-axis label based on timeframe
    let label;
    if (timeframe === 'daily') {
        label = 'Day';                 // Daily price analysis
    } 
    else if (timeframe === 'weekly') {
        label = 'Week';                // Weekly price analysis
    } 
    else {
        label = 'Month';               // Monthly price analysis
    }

    // Generate X-axis labels (Day 1, Day 2, Day 3...)
    const days = [];
    for (let i = 0; i < company1Data.prices.length; i++) {
        days.push(`${label} ${i + 1}`);
    }

    // Clear previous charts
    Plotly.purge('company1Chart');      // Remove Company 1 chart
    Plotly.purge('company2Chart');      // Remove Company 2 chart

    // Create new charts
    createCompanyChart('company1Chart', company1Data, days);  // Company 1 visualization
    createCompanyChart('company2Chart', company2Data, days);  // Company 2 visualization
    
    // Activate chart container
    document.querySelector('.graphContainer').classList.add('active'); // Show graph area

}

// ===================== INDIVIDUAL CHART BUILDER =====================
// Constructs complete chart configuration for a single company

function createCompanyChart(containerId, data, days) {

    // -------- Chart Traces Configuration --------
    // Deviation legend (dummy trace for legend entry)
    const deviationLegend = {
        x: [null],                   // No actual data point
        y: [null],                   // No actual data point
        mode: 'lines',               // Line chart type
        type: 'scatter',             // Scatter plot base
        name: 'Deviation',           // Legend label
        line: { 
                 color: 'red',       // Deviation line color
                 width: 2            // Deviation line width
              },
        showlegend: true             // Include in legend
    };

    // Price trace configuration
    const priceTrace = {
        x: days,                       // X-axis labels
        y: data.prices,                // Historical prices
        type: 'scatter',               // Scatter plot
        mode: 'lines+markers',         // Lines with data points
        name: 'Stock Price',           // Legend label
        line: { 
                 color: 'blue'         // Price line color
              },       
        marker: { 
                    size: 8            // Data point size
                }            
    };

    // Mean price line configuration
    const meanLine = {
        x: days,                       // X-axis labels
        y: Array(days.length).fill(data.mean),  // Constant mean value
        mode: 'lines',                 // Line chart
        name: 'Mean',                  // Legend label
        line: { 
                 color: 'purple',         // Mean line color
                 dash: 'dash'             // Dashed line style
        }
    };

    // -------- Deviation Visualization --------
    // Error lines between mean and actual prices
    const errorLines = [];
    for (let i = 0; i < data.prices.length; i++) {
        errorLines.push({
            type: 'line',
            type: 'line',              // Line annotation
            x0: days[i],               // Vertical line
            x1: days[i],               // Vertical line
            y0: data.mean,             // Start at mean
            y1: data.prices[i],        // End at price
            line: { 
                     color: 'red',     // Error line color
                     width: 2          // Error line width
                  }
        });
    }    

    // -------- Data Labels --------
    // Standard deviation annotations
    const annotations = [];
    for (let i = 0; i < data.prices.length; i++) {
        annotations.push({
            x: days[i],             // X position
            y: (data.mean + data.prices[i]) / 2,        // Midpoint between price and mean
            text: formatSD(data.prices[i], data.mean, data.sd),     // Format SD value
            showarrow: false,       // No arrow pointers
            font: { 
                     color: 'black'     // Label color
                  }
        });
    }    

    // -------- Layout Configuration --------
    const layout = {  
        title: `<b>${data.name} Stock Price with Volatility</b>`,   // Dynamic title with company name  
        xaxis: {   
                    title: {   
                                text: `<b>${days[0].split(' ')[0]}s</b>`,  // X-axis label (Days/Weeks/Months)  
                                font: { size: 15 }                         // Title font size  
                            },  
                    tickfont: {   
                                  size: 13                              // X-axis tick label size  
                              },  
                    showgrid: true,                                     // Enable vertical grid lines  
                    gridcolor: 'rgb(175,175,175)',                    // Grid line color  
                    linecolor: 'rgb(60,60,60)',                       // X-axis line color  
                    linewidth: 2                                        // X-axis line thickness  
                },  
        yaxis: {   
                    title: {   
                                text: '<b>Price</b>',                  // Y-axis label  
                                font: { size: 15 }                     // Title font size  
                            },  
                    tickfont: {   
                                  size: 13                             // Y-axis tick label size  
                              },  
                    gridcolor: 'rgb(175,175,175)',                   // Horizontal grid lines  
                    linecolor: 'rgb(60,60,60)',                      // Y-axis line color  
                    linewidth: 2                                       // Y-axis line thickness  
                },  
        shapes: errorLines,                  // Deviation lines between mean and prices  
        annotations: annotations,            // SD value labels at midpoints  
        showlegend: true,                    // Display chart legend  
        margin: {   
                    l: 90, r: 60,            // Left/Right margins (px)  
                    b: 80, t: 100            // Bottom/Top margins (px)  
                },  
        font:  {   
                    family: 'Arial, sans-serif',     // Base font family  
                    size: 12                         // Base font size  
               },  
        plot_bgcolor: '#fff',             // Chart area background (white)  
        paper_bgcolor: 'lightgrey'        // Outer background color  
    };  

    // -------- Chart Rendering --------
    // Render chart with configured traces, layout, and global config  
    Plotly.newPlot(containerId, [priceTrace, meanLine, deviationLegend], layout, config);

}

// ===================== STANDARD DEVIATION FORMATTER =====================
// Converts price deviation into SD units display

function formatSD(price, mean, sd) {

    // Calculate deviation in SD units
    const sdValue = (price - mean) / sd;

    // Determine positive/negative sign for display
    let sign = '';
    if (sdValue >= 0) {
        sign = '+';  // Explicit '+' sign for positive deviations
    }

    // Format to 2 decimal places with SD suffix
    return sign + sdValue.toFixed(2) + ' SD';

}

// ===================== MODULE EXPORT =====================
// Make chart creation function available globally
window.createCharts = createCharts;