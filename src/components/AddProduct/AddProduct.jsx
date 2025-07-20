import React, { useState,useEffect } from 'react';
import { db,auth } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';


const AddProductForm = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/'); 
      }
    });

    return () => unsubscribe(); 
  }, [navigate]);
   

  const handleClose = () => {
    navigate(-1); 
  };






  const [product, setProduct] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    location: '',
  });





  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    const totalFiles = images.length + selectedFiles.length;
  
    if (totalFiles > 4) {
      toast.error("You can only upload up to 4 images.");
      return;
    }
  
    const compressedFiles = await Promise.all(
      selectedFiles.map(async (file) => {
        const options = {
          maxWidthOrHeight: 600,   
          maxSizeMB: 0.5,         
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);
        return compressedFile;
      })
    );
  
    setImages((prevImages) => [...prevImages, ...compressedFiles]);
  }
  const removeImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };
  
  

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'olxColne'); 
    formData.append('cloud_name', 'dda6kb43b');

    const res = await axios.post(`https://api.cloudinary.com/v1_1/dda6kb43b/image/upload`, formData);
    return res.data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.title.trim()) {
      return toast.error("Please enter the product title");
    }
    if (product.title.trim().length < 3) {
      return toast.error("Title should have at least 3 characters");
    }
    if (!product.description.trim()) {
      return toast.error("Please enter the product description");
    }
    if (product.description.trim().length < 10) {
      return toast.error("Description should be at least 10 characters long");
    }
    if (product.category === "Choose category" || !product.category) {
      return toast.error("Please select a valid category");
    }
    if (!product.price || Number(product.price) <= 0) {
      return toast.error("Please enter a valid price");
    }
    if (!product.location.trim()) {
      return toast.error("Please enter location");
    }
    if (images.length < 4) {
      return toast.error("Please upload at least 4 images");
    }
    setLoading(true);

    try {
      const imageUrls = await Promise.all(
        images.map((img) => uploadImageToCloudinary(img))
      );

      await addDoc(collection(db, 'products'), {
        ...product,
        price: Number(product.price),
        images: imageUrls,
        createdAt: new Date(),
      });

      toast.success('Product added successfully!');
      setProduct({
        title: '',
        description: '',
        category: '',
        price: '',
        location: '',
      });
      setImages([]);
    } catch (error) {
      console.error(error);
      toast.success('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 relative">
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-xl font-bold"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Add New Product
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 mb-1">Product Title</label>
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={handleChange}
              placeholder="Enter product title"
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Write a product description..."
              rows="4"
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Category</label>
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500"
            >
              <option>Choose category</option>
              <option>Electronics</option>
              <option>Vehicles</option>
              <option>Furniture</option>
              <option>Real Estate</option>
              <option>Fashion</option>
              <option>Others</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Price (₹)</label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="Eg. 5000"
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={product.location}
                onChange={handleChange}
                placeholder="City or area"
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">
              Product Images (at least 4)
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-gray-300 p-3 rounded-xl"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              {images.length} images selected
            </p>
          </div>
          {images.length > 0 && (
            <div className="grid grid-cols-4 gap-2 mt-2">
              {images.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(img)}
                    alt="preview"
                    className="w-full h-24 object-cover rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg hover:bg-blue-700 transition-all"
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
