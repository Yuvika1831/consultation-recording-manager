import { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";

function Dashboard() {
  const [recordings, setRecordings] = useState([]);

  const fetchRecordings = async () => {
    try {
      const res = await API.get("/recordings");
      setRecordings(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRecording = async (id) => {
    try {
      await API.delete(`/recordings/${id}`);
      fetchRecordings();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRecordings();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Consultation Recording Manager</h1>

      <Link to="/upload">
        <button>Upload Recording</button>
      </Link>

      <hr />

      {recordings.length === 0 ? (
        <h3>No Recordings Found</h3>
      ) : (
        recordings.map((recording) => (
          <div
            key={recording._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px"
            }}
          >
            <h3>{recording.title}</h3>

            <p>Client: {recording.clientName}</p>

            <p>Duration: {recording.duration}</p>

            <a
              href={`http://localhost:5000/${recording.filePath}`}
              target="_blank"
            >
              View Recording
            </a>

            <br />
            <br />

            <button
              onClick={() =>
                deleteRecording(recording._id)
              }
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;
