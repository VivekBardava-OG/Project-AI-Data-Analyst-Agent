import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post(
      "http://127.0.0.1:8000/analyze",
      formData
    );

    setData(res.data);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">
        🚀 AI Data Analyst
      </h1>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
      />

      <br />

      <button
        onClick={handleUpload}
        className="bg-blue-500 px-4 py-2 rounded"
      >
        Analyze Dataset
      </button>

      {data && (
        <div className="mt-6 bg-gray-800 p-4 rounded">
          <h2 className="text-xl mb-2">📊 Results</h2>

          <p><b>Rows:</b> {data.rows}</p>
          <p><b>Columns:</b> {data.columns.length}</p>

          <h3 className="mt-4">🧠 Basic Insights</h3>
          <ul className="list-disc ml-5">
            {data.basic_insights.map((i, idx) => (
              <li key={idx}>{i}</li>
            ))}
          </ul>

          <h3 className="mt-4">🤖 AI Insights</h3>
          <pre className="whitespace-pre-wrap bg-gray-900 p-3 rounded">
            {data.ai_insights}
          </pre>
        </div>
      )}
    </div>
  );
}

export default App;