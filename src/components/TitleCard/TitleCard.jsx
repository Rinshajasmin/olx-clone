import React, { useState, useEffect } from "react";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { db } from "../../firebase"; // Firestore config
import { collection, getDocs } from "firebase/firestore";
import LoadingSpinner from "../Loading/Loader";
import { Link } from "react-router-dom";

const TitleCard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {products.length === 0 ? (
        <p className="text-center col-span-4 text-gray-500">No products available</p>
      ) : (
        products.map((product) => (
          <Link
          to={'/details'}  
           state={{product}}  
           key={product.id}   
           style={{ borderWidth: '1px', borderColor:'lightgrey'}}> 
          
          <div key={product.id} className="border rounded-lg shadow-lg p-3 relative bg-white">
            <img
              src={product.images?.[0]}
              alt={product.title}
              className="w-full h-40 object-cover rounded-lg"
            />

            {/* Featured Badge */}
            <span className="absolute top-3 left-3 bg-yellow-400 text-xs font-bold text-white px-2 py-1 rounded">
              FEATURED
            </span>

            {/* Heart Icon */}
            <FontAwesomeIcon
              icon={faHeart}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 cursor-pointer"
            />

            {/* Product Details */}
            <div className="mt-2">
              <p className="text-lg font-bold text-gray-900">
                ₹ {new Intl.NumberFormat("en-IN").format(product.price)}
              </p>
              <p className="text-sm text-gray-600">{product.title}</p>
              <p className="text-sm font-semibold text-gray-700 truncate">
                {product.description.length > 50
                  ? product.description.substring(0, 50) + "..."
                  : product.description}
              </p>
              <p className="text-xs text-gray-500 mt-1">Category: {product.category}</p>
            </div>

            {/* Date at Bottom Right */}
            <div className="text-xs text-gray-500 absolute bottom-2 right-3">
              {product.createdAt?.seconds
                ? new Date(product.createdAt.seconds * 1000).toLocaleDateString("en-IN")
                : "Unknown Date"}
            </div>
          </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default TitleCard;
