// src/components/ReactQuillEditor.jsx
import { forwardRef } from "react";
import ReactQuill from "react-quill";
import PropTypes from "prop-types";
import "react-quill/dist/quill.snow.css";

const ReactQuillEditor = forwardRef(
  ({ value, onChange, placeholder = "Enter text..." }, ref) => {
    const modules = {
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image", "code-block"],
        ["clean"],
      ],
    };

    const formats = [
      "header",
      "bold",
      "italic",
      "underline",
      "strike",
      "list",
      "bullet",
      "link",
      "image",
      "code-block",
    ];

    return (
      <ReactQuill
        ref={ref}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
    );
  }
);

// 💡 Tambahkan displayName untuk menghilangkan warning
ReactQuillEditor.displayName = "ReactQuillEditor";

// 💡 Tambahkan prop-types supaya ESLint happy
ReactQuillEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default ReactQuillEditor;
