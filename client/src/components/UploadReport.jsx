import { useState, useEffect } from 'react';
import axios from 'axios';

export default function UploadReport() {
  const [file, setFile] = useState(null);
  const [reports, setReports] = useState([]);
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    const res = await axios.get("http://localhost:8080/api/reports");
    setReports(res.data);
  };

  const handleUpload = async () => {
  if (!file) return alert("Please select a PDF to upload");

  const formData = new FormData();
  formData.append("report", file);  // ✅ Correct field name
  formData.append("uploadedBy", email);
  formData.append("role", role);

  await axios.post("http://localhost:8080/api/upload-report", formData);
  setFile(null);
  fetchReports();
};


  return (
    <div style={{ marginTop: "2rem", width: "100%", maxWidth: 600 }}>
      {role === "analyst" && (
        <div style={{ marginBottom: "1.5rem", display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            style={{
              border: "1px solid #ccc",
              borderRadius: "6px",
              padding: "8px",
              flex: 1,
              fontSize: "0.9rem",
            }}
          />
          <button
            onClick={handleUpload}
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              padding: "8px 14px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer"
            }}
          >
            Upload Report
          </button>
        </div>
      )}

      <h5 style={{ marginBottom: "1rem" }}>Uploaded Reports:</h5>
      <ul style={{ paddingLeft: 0, listStyleType: "none" }}>
        {reports.length === 0 && <li style={{ color: "#888" }}>No reports uploaded yet.</li>}
        {reports.map((r, i) => (
          <li key={i} style={{
            background: "#f1f1f1",
            marginBottom: "0.75rem",
            padding: "10px 12px",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <span>
              <strong>{r.filename}</strong><br />
              <small>Uploaded by: {r.uploadedBy}</small>
            </span>
            <a
              href={`http://localhost:8080/uploads/${r.filename}`}
              download
              style={{
                backgroundColor: "#28a745",
                color: "#fff",
                padding: "6px 10px",
                borderRadius: "6px",
                textDecoration: "none"
              }}
            >
              Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
