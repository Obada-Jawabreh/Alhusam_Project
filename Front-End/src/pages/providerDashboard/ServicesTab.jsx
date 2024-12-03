import React, { useState } from "react";
import { Edit, Trash2, ImagePlus } from "lucide-react";
import axios from "axios";

const ServicesTab = () => {
  const initialServices = [
    {
      id: 1,
      titleAr: "استشارة نفسية أساسية",
      description: "جلسة استشارة أولية لتقييم الحالة النفسية",
      price: 250,
      mainImage: "https://example.com/image1.jpg",
      additionalImages: [
        "https://example.com/additional1.jpg",
        "https://example.com/additional2.jpg"
      ],
      category: "استشارات",
      details: "جلسة فردية مع أخصائي نفسي للتقييم والدعم الأولي",
    },
    {
      id: 2,
      titleAr: "جلسة علاج زوجي",
      description: "جلسة استشارة وعلاج للأزواج",
      price: 350,
      mainImage: "https://example.com/image2.jpg",
      additionalImages: [
        "https://example.com/additional3.jpg"
      ],
      category: "علاج أسري",
      details: "جلسة متخصصة للتواصل وحل المشكلات الزوجية",
    }
  ];

  const [services, setServices] = useState(initialServices);
  const [newService, setNewService] = useState({
    titleAr: "",
    description: "",
    price: "",
    mainImage: null,
    additionalImages: [],
    category: "",
    details: "",
  });

  const [editingIndex, setEditingIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMainImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewService((prev) => ({
        ...prev,
        mainImage: file
      }));
    }
  };

  const handleAdditionalImagesUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 3);
    if (files.length > 0) {
      setNewService((prev) => ({
        ...prev,
        additionalImages: files
      }));
    }
  };

  const handleAddService = async () => {
    if (!newService.titleAr || !newService.price) {
      alert("الرجاء إدخال اسم الخدمة والسعر");
      return;
    }

    const formData = new FormData();
    formData.append("titleAr", newService.titleAr);
    formData.append("description", newService.description);
    formData.append("price", newService.price);
    formData.append("category", newService.category);
    formData.append("details", newService.details);

    // Append main image
    if (newService.mainImage) {
      formData.append("mainImage", newService.mainImage);
    }

    // Append additional images
    if (newService.additionalImages) {
      newService.additionalImages.forEach((image, index) => {
        formData.append(`additionalImages`, image);
      });
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/products/add",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      // Add new service to list
      setServices([...services, response.data.product]);

      // Reset form
      setNewService({
        titleAr: "",
        description: "",
        price: "",
        mainImage: null,
        additionalImages: [],
        category: "",
        details: "",
      });
    } catch (error) {
      console.error("فشل إضافة الخدمة:", error);
    }
  };

  const handleEdit = (index) => {
    const serviceToEdit = services[index];
    setNewService({ ...serviceToEdit });
    setEditingIndex(index);
  };

  const handleDelete = (id) => {
    setServices(services.filter((service) => service.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="bg-secondary-light rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4 text-primary">
          {editingIndex !== null ? "تعديل الخدمة" : "إضافة خدمة"}
        </h3>

        <div className="space-y-4">
          <input
            type="text"
            name="titleAr"
            value={newService.titleAr}
            onChange={handleInputChange}
            placeholder="اسم الخدمة"
            className="w-full p-2 border rounded-md"
          />
          <input
            type="text"
            name="category"
            value={newService.category}
            onChange={handleInputChange}
            placeholder="الفئة"
            className="w-full p-2 border rounded-md"
          />
          <input
            type="number"
            name="price"
            value={newService.price}
            onChange={handleInputChange}
            placeholder="السعر"
            className="w-full p-2 border rounded-md"
          />
          <textarea
            name="description"
            value={newService.description}
            onChange={handleInputChange}
            placeholder="وصف الخدمة"
            className="w-full p-2 border rounded-md h-24"
          />
          <textarea
            name="details"
            value={newService.details}
            onChange={handleInputChange}
            placeholder="تفاصيل إضافية"
            className="w-full p-2 border rounded-md h-24"
          />

          <div className="flex justify-between">
            <div>
              <input
                type="file"
                id="main-image"
                accept="image/*"
                onChange={handleMainImageUpload}
                className="hidden"
              />
              <label
                htmlFor="main-image"
                className="flex items-center cursor-pointer bg-primary text-white p-2 rounded-md"
              >
                <ImagePlus className="ml-2" /> رفع الصورة الرئيسية
              </label>
              {newService.mainImage && (
                <img
                  src={URL.createObjectURL(newService.mainImage)}
                  alt="الصورة الرئيسية"
                  className="w-20 h-20 object-cover rounded-md mt-2"
                />
              )}
            </div>

            <div>
              <input
                type="file"
                id="additional-images"
                accept="image/*"
                multiple
                onChange={handleAdditionalImagesUpload}
                className="hidden"
              />
              <label
                htmlFor="additional-images"
                className="flex items-center cursor-pointer bg-secondary text-primary p-2 rounded-md"
              >
                <ImagePlus className="ml-2" /> رفع الصور الإضافية (0-3)
              </label>
              <div className="flex space-x-2 mt-2">
                {newService.additionalImages.map((image, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt={`صورة إضافية ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleAddService}
            className="w-full bg-primary text-white p-2 rounded-md mt-4"
          >
            {editingIndex !== null ? "تحديث الخدمة" : "إضافة الخدمة"}
          </button>
        </div>
      </div>

      <div className="bg-secondary-light rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4 text-primary">الخدمات</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <div key={service.id} className="bg-white rounded-lg shadow p-4">
              <div>
                {/* Main Image */}
                {service.mainImage && (
                  <img
                    src={service.mainImage}
                    alt="الصورة الرئيسية"
                    className="w-full h-48 object-cover rounded-t-lg mb-4"
                  />
                )}

                {/* Additional Images */}
                {service.additionalImages && service.additionalImages.length > 0 && (
                  <div className="flex space-x-2 mb-4">
                    {service.additionalImages.map((img, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={img}
                        alt={`صورة إضافية ${imgIndex + 1}`}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                    ))}
                  </div>
                )}

                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-lg text-primary">
                      {service.titleAr}
                    </p>
                    <p className="text-text-secondary">{service.category}</p>
                    <p className="text-text-secondary">{service.price} JD</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-primary"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="text-text-secondary mt-2">
                  {service.description}
                </p>
                <p className="text-text-primary text-sm mt-1">
                  {service.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesTab;