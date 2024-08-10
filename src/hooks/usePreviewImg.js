// Import dependencies
import { useState } from "react";
import useShowToast from "./useShowToast";

const usePreviewImg = () => {
  // Set file state
  const [selectedFile, setSelectedFile] = useState(null);

  // Set the toast warning hook instance
  const showToast = useShowToast();

  // Set the max file size in bytes
  const maxFileSizeInBytes = 2 * 1024 * 1024;

  const handleImageChange = (e) => {

    // Get the file from event
    const file = e.target.files[0];
    console.log("Haha")

    // Check if the file is image
    if (file && file.type.startsWith("image/")) {
      
      // Check the file if it less than mac file size
      if (file.size > maxFileSizeInBytes) {
        showToast("Error", "File size must be less than 2mb", "error");
        setSelectedFile(null);
        return;
      }

      // Initialize the reader
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result);
      };

      // Set the reader to read img URL
      reader.readAsDataURL(file);
    } else {
      showToast("Error", "Please select an imag file", "error");
      setSelectedFile(null);
    }
  };

  return {  selectedFile, handleImageChange, setSelectedFile  };
};

export default usePreviewImg;
