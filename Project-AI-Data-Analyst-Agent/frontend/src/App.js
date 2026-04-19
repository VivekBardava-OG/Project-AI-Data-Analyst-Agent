import React, { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer,
  BarChart, Bar,
  PieChart, Pie, Cell
} from "recharts";

function App() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444"];

  const { getRootProps, getInputProps } = useDropzone({
    accept: ".csv",
    onDrop: (files) => setFile(files[0])
  });

  const handleUpload = async () => {
    if (!file) return alert("Upload CSV first");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await axios.post("http://127.0.0.1:8000/analyze", formData);
      setData(res.data);
    } catch {
      alert("Backend not running");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] to-[#0f172a] text-white px-8 py-10">

      {/* TITLE */}
      <h1 className="text-4xl font-bold mb-6">🚀 AI Data Analyst</h1>

      {/* UPLOAD */}
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-500 rounded-xl p-10 text-center mb-4 hover:border-blue-400 transition cursor-pointer"
      >
        <input {...getInputProps()} />
        <p>{file ? file.name : "Drag & Drop CSV here"}</p>
      </div>

      <button
        onClick={handleUpload}
        className="bg-blue-600 px-6 py-2 rounded-lg mb-10"
      >
        {loading ? "Analyzing..." : "Analyze Dataset"}
      </button>

      {data && (
        <>
          {/* QUICK STATS */}
          <h2 className="text-2xl mb-4">📊 Quick Stats</h2>

          <div className="grid grid-cols-4 gap-6 mb-10">
            {Object.entries(data.stats).map(([col, val]) => (
              <div key={col} className="bg-gray-800 p-5 rounded-xl">
                <h3 className="mb-2 font-semibold">{col}</h3>
                <p>Mean: {val.mean?.toFixed(2)}</p>
                <p>Max: {val.max}</p>
                <p>Min: {val.min}</p>
              </div>
            ))}
          </div>

          {/* LINE CHARTS */}
          <h2 className="text-2xl mb-4">📈 Trends</h2>

          {Object.keys(data.charts).map((col) => (
            <div key={col} className="mb-10">
              <h3 className="mb-2">{col}</h3>

              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={data.charts[col].map((v, i) => ({
                    index: i,
                    value: v
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="index" />
                  <YAxis />
                  <Tooltip />
                  <Line dataKey="value" stroke="#3b82f6" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ))}

          {/* BAR CHART */}
          <h2 className="text-2xl mb-4">📊 Bar Chart (Means)</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={Object.entries(data.stats).map(([k, v]) => ({
                name: k,
                mean: v.mean
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="mean" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>

          {/* PIE CHART */}
          <h2 className="text-2xl mt-10 mb-4">🥧 Distribution</h2>

          <PieChart width={300} height={300}>
            <Pie
              data={Object.entries(data.stats).map(([k, v]) => ({
                name: k,
                value: v.mean
              }))}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
            >
              {COLORS.map((c, i) => (
                <Cell key={i} fill={c} />
              ))}
            </Pie>
          </PieChart>

          {/* AI INSIGHTS */}
          <h2 className="text-2xl mt-10 mb-4">🤖 AI Insights</h2>

          <div className="bg-gray-800 p-6 rounded-xl whitespace-pre-wrap">
            {data.ai_insights}
          </div>

          {/* DOWNLOAD BUTTON */}
          <button className="mt-6 bg-purple-600 px-6 py-2 rounded-lg">
            Download Report (PDF)
          </button>
        </>
      )}
    </div>
  );
}

export default App;