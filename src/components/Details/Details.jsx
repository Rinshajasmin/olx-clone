import { useLocation } from 'react-router-dom';
import Footer from '../Footer/Footer';
import NavbarSub from '../Navbar/NavbarSub';
import Navbar from '../Navbar/Navbar';
import { useContext } from 'react';
import { userDataContext } from '../Context/authContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const Details = () => {
  const location = useLocation();
  const { product } = location.state || {};
  const { openAuthModal, user } = useContext(userDataContext);

  if (!product) return <p className="text-center p-10">No product data.</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar openAuthModal={openAuthModal} user={user} />
      <NavbarSub />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Image Carousel */}
          <div className="lg:w-2/3 w-full">
            <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={10}
              className="rounded-lg"
            >
              {(product.images || []).map((img, i) => (
                <SwiperSlide key={i}>
                  <img
                    src={img}
                    alt={`Product ${i}`}
                    className="w-full h-[500px] object-contain rounded-lg bg-white"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

          
          </div>

          {/*  Product Info & Seller */}
          <div className="lg:w-1/3 w-full space-y-6">
            {/* Products deetails */}
            <div className="bg-white p-5 rounded shadow">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">₹ {product.price}</h1>
              <p className="text-xl text-gray-700">{product.title}</p>
              <p className="text-sm text-gray-600 mt-3">{product.description}</p>
              <p className="text-sm text-gray-500 mt-2">Category: {product.category}</p>
              <p className="text-sm text-gray-500 mt-1">
                Location: {product.location || "N/A"}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Posted on:{" "}
                {product.createdAt?.seconds
                  ? new Date(product.createdAt.seconds * 1000).toLocaleDateString("en-IN")
                  : "N/A"}
              </p>
            </div>

            {/* Seller */}
   <div className="bg-white p-5 rounded shadow flex items-start gap-4">
  
  <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white text-xl font-semibold">
    {user?.displayName?.charAt(0).toUpperCase() || "UK"}
  </div>

  <div>
    <p className="font-semibold text-gray-800">
      Posted by {user?.displayName || " Unknown Seller"}
    </p>
    <p className="text-xs text-gray-500 mt-1">Member since July 2025</p>
    <p className="text-xs text-gray-400">139 items listed</p>
    <button className="mt-2 px-4 py-1 border border-gray-700 text-gray-700 rounded hover:bg-gray-100">
      Chat with seller
    </button>
  </div>
</div>


           
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Details;
