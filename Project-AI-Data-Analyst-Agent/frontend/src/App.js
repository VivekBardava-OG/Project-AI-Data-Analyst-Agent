import React, { useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function App() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setData(null);

      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(
        "http://127.0.0.1:8000/analyze",
        formData
      );

      setData(res.data);
    } catch (err) {
      console.error(err);
      setError("❌ Failed to connect to backend. Is FastAPI running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* HEADER */}
      <h1 className="text-4xl font-bold mb-6">
        🚀 AI Data Analyst Dashboard
      </h1>

      {/* FILE INPUT */}
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
      />

      <br />

      <button
        onClick={handleUpload}
        className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg"
      >
        Analyze Dataset
      </button>

      {/* LOADING */}
      {loading && (
        <p className="mt-4 text-yellow-400 animate-pulse">
          ⏳ Analyzing dataset...
        </p>
      )}

      {/* ERROR */}
      {error && (
        <p className="mt-4 text-red-400">
          {error}
        </p>
      )}

      {/* RESULTS */}
      {data && (
        <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">

          <h2 className="text-2xl mb-4">📊 Results</h2>

          <p><b>Rows:</b> {data.rows}</p>
          <p><b>Columns:</b> {data.columns.length}</p>

          {/* BASIC INSIGHTS */}
          <h3 className="mt-4 text-lg">🧠 Basic Insights</h3>
          <ul className="list-disc ml-5">
            {data.basic_insights.map((i, idx) => (
              <li key={idx}>{i}</li>
            ))}
          </ul>

          {/* AI INSIGHTS */}
          <h3 className="mt-4 text-lg">🤖 AI Insights</h3>
          <pre className="whitespace-pre-wrap bg-gray-900 p-4 rounded">
            {data.ai_insights}
          </pre>

          {/* CHARTS */}
          <h2 className="mt-6 text-xl">📊 Visualizations</h2>

          {data?.charts &&
            Object.keys(data.charts).map((col) => (
              <div key={col} className="mt-6">
                <h3 className="mb-2 text-lg">{col}</h3>

                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={data.charts[col].map((val, i) => ({
                      index: i,
                      value: val
                    }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="index" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#3b82f6"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ))}

          {/* STATISTICS */}
          <h2 className="mt-6 text-xl">📈 Statistics</h2>

          {data?.stats &&
            Object.entries(data.stats).map(([col, values]) => (
              <div
                key={col}
                className="mt-4 bg-gray-900 p-4 rounded-lg"
              >
                <h3 className="mb-2 text-lg">{col}</h3>
                <pre className="text-sm">
                  {JSON.stringify(values, null, 2)}
                </pre>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default App;