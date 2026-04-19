# 🚀 AI Data Analyst

A modern full-stack web app that transforms raw CSV data into **insights, statistics, and visualizations** using **AI + Data Science tools**.

---

## ✨ Features

* 📂 Upload CSV datasets (Drag & Drop supported)
* 📊 Automatic statistical analysis (mean, min, max, etc.)
* 📈 Interactive charts (Line, Bar, Pie)
* 🤖 AI-generated insights & recommendations
* 📉 Data trends visualization
* 🎯 Clean modern UI (dark theme)
* 📄 Export-ready report (PDF button included)

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Recharts (charts)
* Axios
* React Dropzone

### Backend

* FastAPI
* Pandas
* NumPy
* Matplotlib (optional)
* OpenAI / LLM API (for AI insights)

---

## 📂 Project Structure

```
Project-AI-Data-Analyst-Agent/
│
├── backend/
│   ├── main.py
│   ├── .env
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```
git clone https://github.com/your-username/ai-data-analyst.git
cd ai-data-analyst
```

---

### 2️⃣ Backend Setup (FastAPI)

```
cd backend

python -m venv venv
venv\Scripts\activate   # Windows

pip install -r requirements.txt
```

Run server:

```
uvicorn main:app --reload
```

Backend runs on:

```
http://127.0.0.1:8000
```

---

### 3️⃣ Frontend Setup (React)

```
cd frontend

npm install
npm start
```

Frontend runs on:

```
http://localhost:3000
```

---

## 📊 How It Works

1. Upload a CSV file
2. Backend processes data using Pandas
3. Generates:

   * Summary statistics
   * Cleaned dataset insights
4. AI model generates:

   * Key insights
   * Patterns
   * Recommendations
5. Frontend displays:

   * Charts (Line, Bar, Pie)
   * Stats cards
   * AI insights

---

## 📸 Screenshots

> Add your UI screenshots here

---

## 🚀 Future Improvements

* 📄 Export full PDF reports
* 📊 Advanced analytics (correlation, regression)
* 🔍 Column filters & search
* 📁 Multiple file uploads
* 📉 Real-time dashboards
* 🌐 Deploy on Vercel + Render

---

## 🧠 Example Insights

* Most workouts are around **60 minutes**
* Higher duration → higher calories burned
* Pulse remains stable across sessions
* Outliers detected in long-duration records

---

## 🧪 Sample Dataset

You can test with a simple CSV like:

```
Duration,Pulse,Maxpulse,Calories
60,110,130,409
45,117,145,479
30,103,135,340
```

---

## 🤝 Contributing

Pull requests are welcome!
For major changes, open an issue first.

---

## 📜 License

MIT License

---

## 👨‍💻 Author

**Vivek**
AI Engineer | Hackathon Builder 🚀

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
