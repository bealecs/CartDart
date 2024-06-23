"use client";
import Image from "next/image";
import { useState } from "react";
import UpdatePFP from "./UpdatePFP";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

export default function UploadToS3({ pfp }: { pfp: string }) {
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [editting, setEditting] = useState<boolean>(false);

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
        const response = await fetch("/api/pfp-s3", {
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
    <div className="flex">
      {!editting ? (<>
        <Image src={pfp} width={150} height={150} className="rounded-full" alt="user profile picture" />
        <button onClick={() => setEditting(!editting)}><EditIcon fontSize="large" /></button>
      </>
      ) : (
        <form
          action={handleSubmit}
          className="h-[150px] content-center"
        >
          <input type="file" accept="image/jpeg" className="block w-fit" onChange={handleFileChange} />
          <button type="submit" className="border-2 border-white bg-btn-background rounded-md mt-2"><CheckIcon /></button>
          <button className="border-2 border-white bg-red-700 rounded-md mx-2 mt-2" onClick={() => setEditting(!editting)}><ClearIcon /></button>
          {previewURL && (
            <div className="flex flex-row items-center content-center">
              <h4>Preview:</h4>
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
      )}
    </div>
  );
}
