"use client";
import { useState } from "react";
import { useEffect } from "react";
const SidebarForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    authors: "",
    title: "",
    publishedAt: "",
    volume: "",
    country: "",
    language: "",
    resourceType: "",
    keywords: "",
    summary: "",
    source: "",
    imgUrl: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};

    const validationRules = {
      authors: (value) =>
        !value.trim()
          ? "Mualliflar toldirilishi kerak!"
          : value.length > 50
          ? "Muallif nomlari 50 ta belgidan oshmasligi kerak!"
          : "",

      title: (value) => (!value.trim() ? "Sarlavha toldirilishi kerak!" : ""),
      publishedAt: (value) =>
        !value
          ? "Nashr yili kiritilishi kerak!"
          : value < 1800 || value > new Date().getFullYear()
          ? "Yil 1800 va hozirgi yil oraligida bolishi kerak!"
          : "",

      volume: (value) =>
        !value.trim()
          ? "Jild raqami kiritilishi kerak!"
          : isNaN(value)
          ? "Jild raqami faqat raqam bolishi kerak!"
          : "",

      country: (value) =>
        !value.trim() ? "Mamlakat nomi kiritilishi kerak!" : "",
      language: (value) => (!value.trim() ? "Til kiritilishi kerak!" : ""),
      resourceType: (value) =>
        !value.trim() ? "Resurs turi kiritilishi kerak!" : "",
      keywords: (value) =>
        !value.trim() ? "Kalit sozlar kiritilishi kerak!" : "",
      summary: (value) =>
        !value.trim() ? "Qisqacha malumot kiritilishi kerak!" : "",

      source: (value) =>
        !value.trim()
          ? "Manba URL kiritilishi kerak!"
          : !/^https?:\/\/\S+$/.test(value)
          ? "Manba URL notogri!"
          : "",
      imgUrl: (value) =>
        !value.trim()
          ? "Rasm URL kiritilishi kerak!"
          : !/^https?:\/\/\S+\.(jpg|jpeg|png|gif|bmp)$/i.test(value)
          ? "Rasm URL notogri! (jpg, png, gif)"
          : "",
    };

    Object.keys(formData).forEach((field) => {
      const error = validationRules[field](formData[field]);
      if (error) newErrors[field] = error;
    });

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Form malumotlari:", formData);
    alert("Resurs muvaffaqiyatli qoshildi!");

    let copied = { ...formData };

    Object.keys(copied).forEach((key) => {
      copied[key] = "";
    });

    setFormData(copied);

    setErrors({});
  };

  const inputFields = [
    { name: "authors", label: "Mualliflar" },
    { name: "title", label: "Sarlavha" },
    { name: "publishedAt", label: "Nashr yili", type: "number" },
    { name: "volume", label: "Jild", type: "number" },
    { name: "country", label: "Mamlakat" },
    { name: "language", label: "Til" },
    { name: "resourceType", label: "Resurs turi" },
    { name: "keywords", label: "Kalit sozlar" },
    { name: "summary", label: "Qisqacha malumot" },
    { name: "source", label: "Manba URL", type: "url" },
    { name: "imgUrl", label: "Rasm URL", type: "url" },
  ];

  useEffect(() => {
    const keyDownHandler = (e) => {
      if (e.code == "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  });

  return (
    <div
      className={`absolute top-0 right-0 w-full bg-gray-100 shadow-lg px-6 py-10 transform transition-transform duration-1000 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Resurs qoshish</h2>
        <button
          onClick={onClose}
          className="text-gray-500 text-4xl hover:text-red-500 transition"
        >
          ✕
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4"
      >
        {inputFields.map(({ name, label, type = "text" }) => (
          <label key={name} className="text-xl w-full">
            {label}
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="border p-2 rounded w-full shadow-md outline-none"
            />
            {errors[name] && (
              <span className="text-red-500">{errors[name]}</span>
            )}
          </label>
        ))}

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-xl w-1/2 shadow-sm hover:shadow-2xl hover:bg-blue-600 transition text-2xl"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SidebarForm;
