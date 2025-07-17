import React, { useState } from 'react';
import axios from 'axios';

function AudioUploader() {
    const [file, setFile] = useState(null);
    const [transcription, setTranscription] = useState("");
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };
    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await axios.post('http://localhost:8080/api/transcribe', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setTranscription(response.data);
        } catch (error) {
            console.error("Error uploading file:", error);
            setTranscription("Failed to transcribe audio.");
        }
    }

  return (
    <div className='container'>
        <h1>Audio To Text Transcribor</h1>
        <div className='file-input'>
            <input type="file" accept="audio/*" onChange={handleFileChange}/>
        </div>
        <button className="upload-button" onClick={handleUpload}>Upload & Transcribe</button>
        <div className='transcription-result'>
            <h2>Transcription Result</h2>
            <p>{transcription}</p>
        </div>
    </div>
  )
}

export default AudioUploader;