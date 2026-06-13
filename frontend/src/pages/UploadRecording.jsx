import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function UploadRecording() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [clientName, setClientName] = useState("");
  const [duration, setDuration] = useState("");
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("clientName", clientName);
    formData.append("duration", duration);
    formData.append("recording", file);

    await API.post(
      "/recordings/upload",
      formData
    );

    alert("Recording Uploaded");

    navigate("/dashboard");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Upload Recording</h2>

      <form onSubmit={submitHandler}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <br />
        <br />

        <input
          placeholder="Client Name"
          value={clientName}
          onChange={(e) =>
            setClientName(e.target.value)
          }
        />

        <br />
        <br />

        <input
          placeholder="Duration"
          value={duration}
          onChange={(e) =>
            setDuration(e.target.value)
          }
        />

        <br />
        <br />

        <input
          type="file"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
        />

        <br />
        <br />

        <button type="submit">
          Upload
        </button>
      </form>
    </div>
  );
}

export default UploadRecording;
