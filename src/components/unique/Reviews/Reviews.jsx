import Review from "./../Review/Review";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Autoplay } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SectionHeader from './../../shared/SectionHeader/SectionHeader';

const Reviews = () => {
  const {
    data: reviews,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axios.get(
        `https://green-villa-server-eight.vercel.app/reviews`
      );
      return res.data;
    },
  });

  if (isError) {
    return (
      <div className="flex justify-center py-12 min-h-screen ">
        <h2 className="text-2xl font-bold text-gray-300">{error}</h2>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-12 min-h-screen ">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <section className="py-12">
      <SectionHeader/>
      <div>
        <div className="max-w-5xl mx-auto">
          <Swiper
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Pagination]}
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <div className="flex md:flex-row flex-col gap-6">
                  <Review review={review} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
