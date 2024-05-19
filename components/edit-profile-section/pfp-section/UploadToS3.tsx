"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import FetchPFP from "./FetchPFP";
import UpdatePFP from "./UpdatePFP";

export default function UploadToS3() {
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    // Check if the selected file is a JPG image
    if (selectedFile && selectedFile.type === "image/jpeg") {
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreviewURL(url);
      console.log(file);
    } else {
      // Reset the file state if the selected file is not a JPG image
      setFile(null);
      alert("Please select a JPG image.");
    }
  };

  const handleSubmit = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      // Send formData to your server-side API using fetch or any other HTTP client
      try {
        const response = await fetch("/api/s3", {
          method: "POST",
          body: formData,
        });
        // Handle response from the server
        UpdatePFP();
        console.log("Image uploaded successfully:", response);
        location.reload();
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      alert("Please select an image to upload.");
    }
    return false;
  };

  return (
    <div className="border-solid border-4 border-white">
      <h2 className="text-xl mx-5">Choose a new profile picture:</h2>
      <form action={handleSubmit} className="flex flex-row justify-start items-center content-center w-full py-5">
        <input type="file" accept="image/jpeg" onChange={handleFileChange} className="mx-5"/>
        <button type="submit" className="mx-5">Upload Image</button>
        {previewURL && (
        <div className="flex flex-row items-center content-center">
          <h4>Upload Preview:</h4>
          <Image
            width={65}
            height={65}
            src={previewURL}
            alt="preview of image to be uploaded"
            className="p-2 rounded-full"
          />
        </div>
      )}
      </form>
    </div>
  );
}
