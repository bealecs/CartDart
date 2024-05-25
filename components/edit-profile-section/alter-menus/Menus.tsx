"use client";
import { useEffect, useState } from "react";
import UpdateMenu from "./UpdateMenus";
import Image from "next/image";
import FetchMenus from "./FetchMenus";
import InsertMenu from "./InsertMenu";
import DeleteMenuFromDB from "./DeleteMenuFromDB";
import DeleteMenuFromS3 from "./DeleteMenuFromS3";

export default function AddMenu() {
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [menuArray, setMenuArray] = useState<string[]>([]);
  const [itemToDelete, setItemToDelete] = useState<string>(null);
  const [menuClicked, setMenuClicked] = useState<boolean>(false);

  useEffect(() => {
    FetchMenus().then((menuList) => {
      if (menuList) {
        setMenuArray(menuList);
      } else {
        setMenuArray(null);
      }
    });
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    // Check if the selected file is a JPG image
    if (selectedFile && selectedFile.type === "image/jpeg") {
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreviewURL(url);
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

      const uuid = Math.floor(Math.random() * 10000000).toString();
      // Send formData to your server-side API using fetch or any other HTTP client
      try {
        const response = await fetch("/api/menus-s3", {
          headers: {
            uuid: uuid,
          },
          method: "POST",
          body: formData,
        });

        //If the menu array is NOT empty, add the new values to update the array.
        //If the menu array is empty (meaning there are no menus stored yet), Insert a new menu to the array to make it iterable
        if (menuArray) {
          UpdateMenu(uuid, menuArray);
        } else {
          InsertMenu(uuid);
        }

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

  const handleMenuClick = (index) => {
    if (menuClicked) {
      setMenuClicked(false);
    } else {
      setMenuClicked(true);
      setItemToDelete(index);
    }
  };

  const handleDeleteMenu = () => {
    if (window.confirm("Are you sure you want to delete this menu?")) {
      DeleteMenuFromDB(menuArray, menuArray[itemToDelete]);
      DeleteMenuFromS3(trimURL(menuArray[itemToDelete]));
      location.reload();
    }
  }

  const  trimURL = (url) => {
    // Find the index of ".com/"
    const targetIndex = url.indexOf(".com/");
  
    // If ".com/" is found in the string
    if (targetIndex !== -1) {
      // Slice the string from after ".com/"
      return url.slice(targetIndex + 5); // +5 to account for the length of ".com/"
    } else {
      // If ".com/" is not found, return the original string
      return url;
    }
  }

  return (
    <div className="border-2 border-white rounded">
      <form action={handleSubmit} className="flex flex-col m-5">
        <label>Upload photos of your menu{"(s)"} here:</label>
        <input type="file" accept="image/jpeg" onChange={handleFileChange} />
        <aside className="italic">
          Note: Current maximum file upload is 5MB, please upload menu photos
          one at a time
        </aside>
        <button
          type="submit"
          className="text-left border-2 border-white w-fit p-2 rounded"
        >
          Upload Menu
        </button>
      </form>
      <div className="m-5">
        {previewURL ? <p>Preview:</p> : null}
        {previewURL && (
          <Image
            width={100}
            height={100}
            src={previewURL}
            alt="Preview image of the menu to be uploaded to the server"
          />
        )}
      </div>
      <div className="m-5">
        {menuArray ? <p>Current Menus:</p> : null}
        <div className="flex">
          {menuArray &&
            menuArray.map((menu, index) => (
              <div key={menu} onClick={() => handleMenuClick(index)}>
                <Image
                  className="mr-5"
                  width={150}
                  height={100}
                  alt="A menu for the featured vendor"
                  src={menu}
                />
                <a href={menu} target="_blank">View Menu</a>
                <button onClick={handleDeleteMenu}>Delete Menu</button>
                {menuClicked ? (
                  <div className="flex flex-col">
                    <button onClick={handleDeleteMenu}>Delete Menu</button>
                    <button onClick={() => setMenuClicked(false)}>
                      Cancel
                    </button>
                  </div>
                ) : null}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
