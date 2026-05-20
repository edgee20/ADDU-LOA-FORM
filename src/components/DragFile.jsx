import { Upload, X, File } from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "#components/ui/button.jsx";

const DragFile = ({ maxFiles = 5, maxSize = 50 * 1024 * 1024, onUpload }) => {
  const [files, setFiles] = useState([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Format file size for display
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  // Handle drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const droppedFiles = [...e.dataTransfer.files];
    handleFiles(droppedFiles);
  };

  // Handle file input change
  const handleChange = (e) => {
    const selectedFiles = [...e.target.files];
    handleFiles(selectedFiles);
  };

  // Validate and add files
  const handleFiles = (newFiles) => {
    const validFiles = newFiles.filter((file) => {
      // Check file size
      if (file.size > maxSize) {
        alert(`File "${file.name}" is too large. Max size is ${formatFileSize(maxSize)}`);
        return false;
      }
      return true;
    });

    // Check total file count
    if (files.length + validFiles.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed. You have ${files.length} file(s) already.`);
      return;
    }

    setFiles([...files, ...validFiles]);
  };

  // Remove file
  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  // Clear all files
  const clearFiles = () => {
    setFiles([]);
  };

  // Handle file upload
  const handleUpload = async () => {
    if (files.length === 0) {
      alert("Please select at least one file to upload");
      return;
    }

    setIsUploading(true);

    try {
      // If parent component provided onUpload callback, use it
      if (onUpload) {
        await onUpload(files);
      } else {
        // Default behavior: log files or show success
        console.log("Files ready for upload:", files);
        alert(`Successfully prepared ${files.length} file(s) for upload!`);
      }
      // Clear files after successful upload
      setFiles([]);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading files: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Dropzone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative rounded-lg border-2 border-dashed transition-colors ${
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-gray-50 hover:border-gray-400"
        }`}
      >
        <div className="flex flex-col items-center justify-center px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6">
          <div className="rounded-full bg-blue-100 p-2 mb-2">
            <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
          </div>

          <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1">
            Upload your documents
          </h3>
          <p className="text-xs text-gray-600 mb-2">
            Drag and drop or click to browse
          </p>
          <p className="text-xs text-gray-500 mb-4">
            Up to {maxFiles} file{maxFiles > 1 ? "s" : ""}, {formatFileSize(maxSize)} each
          </p>

          {/* Hidden input */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleChange}
            className="hidden"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xlsx,.xls"
          />

          <Button 
            onClick={() => fileInputRef.current?.click()}
            style={{ backgroundColor: "#2F3590" }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 text-sm sm:text-base cursor-pointer"
          >
            Browse Files
          </Button>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-4 sm:mt-6 border-t-2 border-dashed border-gray-300 pt-4 sm:pt-6">
          <h4 className="text-sm font-medium text-gray-900 mb-3">
            Upload Supporting Files
          </h4>

          <div className="space-y-1">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <File className="w-4 h-4 text-gray-600 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-gray-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => removeFile(index)}
                  className="ml-2 p-1 hover:bg-gray-100 rounded transition-colors flex-shrink-0"
                  aria-label="Remove file"
                >
                  <X className="w-4 h-4 text-gray-600 hover:text-gray-900" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DragFile;