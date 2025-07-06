# stock-volatility-calculator

---

📋 Table of Contents

- [Overview](#-overview)  
- [Demo Video](#-demo-video)  
- [Tech Stack](#-tech-stack)  
- [Features](#-features)  
- [Screenshots](#%EF%B8%8F-screenshots)  
- [Getting Started](#-getting-started)  
- [Developer Notes](#-developer-notes)  
- [Contributing](#-contributing)  
- [License](#-license)  
- [Copyright](#%EF%B8%8F-copyright)

---

## 🎯 Overview
✨ Stock Volatility Calculator is a single‑page web application built with HTML, CSS, and JavaScript to compare two companies’ stock price volatility. Enter two company names, select a timeframe (daily/weekly/monthly) and the number of periods to generate dynamic input tables for historical prices. Instantly view detailed tables of prices, deviations, and squared deviations; statistical analysis (Mean, SD, CV); interactive Plotly charts to visualize volatility; and a side‑by‑side comparative report with risk and investment insights.

---

## 🎥 Demo Video

<div>
  <a href="https://youtu.be/7dHxhGESmEw" target="_blank">
    <img src="https://github.com/user-attachments/assets/e45381f8-c40b-4712-acf8-2243ba08f434" alt="StockVolatilityCalculator Demo" width="480">
  </a>
</div>

> ▶️ Click the thumbnail above to watch the full walkthrough of the Stock Volatility Calculator website on YouTube.

📘 This demo video walks through launching the Stock Volatility Calculator, entering inputs, generating tables, computing statistics (Mean, SD, CV), visualizing via Plotly charts, and reviewing the side‑by‑side risk and investment report. If you’re new or need a quick overview, please watch it before using the website.

---

🛠 Tech Stack

- **Language:** HTML, CSS, JavaScript
- **Math Rendering:** MathJax
- **Visualization:** Plotly.js
- **Hosting:** GitHub Pages

---

## ✨ Features

- 🗂 **Dynamic Input Tables**
Generate tables for entering historical stock prices of two companies.

- 🧮 **Statistical Analysis**
Compute and display prices, deviations, and squared deviations tables; render Mean, Standard Deviation (SD), and Coefficient of Variation (CV) with MathJax.

- 📈 **Interactive Charts**
Visualize price trends with Plotly.js—mean lines, deviation markers, and toolbar options for zooming, autoscaling, and downloading.

- 📋 **Comparative Report**
View side‑by‑side summaries of statistical results, volatility, risk level, return potential, and tailored investment recommendations.

- 🔄 **Reset Functionality**
Clear all inputs, results, charts, and reports to start a fresh analysis.

---

## 🖼️ Screenshots

Below are complete interface screenshots from the Stock Volatility Calculator website, covering all key views and workflows — including inputs entry, dynamic input tables, statistical output, interactive chart visualization, and the comparative risk & investment report.

<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/2fa741af-f37c-4daa-ade7-e775c0b19286" width="800"/></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/7648c216-e888-4556-a05b-d95edfdf25ff" width="800"/></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/24d65042-d275-4280-a2ca-481e6da3be9f" width="800"/></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/5c3dad19-cb93-4dae-ac23-79c63aded70e" width="800"/></td>
  </tr>
</table>

> 🖼️ This gallery showcases the main interface and analysis steps for full visual context.

---

## 🚀 Getting Started

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/prashanth-kumar-g/stock-volatility-calculator.git
   cd stock-volatility-calculator
   
2. **Open Locally**
   - Simply double‑click the index.html file in your file explorer
   - OR serve via a local HTTP server (e.g., npx http-server or the Live Server extension in VS Code)

3. **Or Visit the Live Website**
    Visit the GitHub Pages site:
    https://prashanth-kumar-g.github.io/stock-volatility-calculator/

> 💡 No additional installation or backend required — everything runs right in your browser.

---

## 🧑‍💻 Developer Notes

Developers can find more details here.

**Source Files:**
- `index.html` – Main page structure  
- `input.js`, `calculate.js`, `graph.js`, `analysis.js` – Application logic  
- `input.css`, `calculate.css`, `graph.css`, `analysis.css` – Styles by module  

**MathJax Equations:**  
Located in `<div class="equationContainer">` and rendered via the MathJax CDN.

**Charting:**  
`createCharts()` in `graph.js` uses Plotly.js; toolbar options can be customized in its `config` object.

> ⚠️ End users do not need this section. This is for developers who wish to explore or customize the project.

---

## 🤝 Contributing

Contributions are welcome!

If you'd like to improve this Stock Volatility Calculator website, fix bugs, or add new features:

- Fork the repository  
- Create a new branch for your changes  
- Submit a pull request with a clear explanation  

You can also open issues for suggestions or questions.  
Thank you for supporting this project!

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).  
You may use and modify this code for personal or educational purposes—see `LICENSE` for full details.

---

## ©️ Copyright

© 2025 Prashanth Kumar G. All rights reserved.  
Unauthorized commercial use or redistribution is prohibited without prior written consent.

---
