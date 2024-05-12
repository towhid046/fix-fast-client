import { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "./../NewsCard/NewsCard";
import SectionHeader from "../../shared/SectionHeader/SectionHeader";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";



const NewsSection = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const res = await axios.get(
        "https://green-villa-server-eight.vercel.app/news"
      );
      setNews(res.data);
    };
    loadData();
  }, []);

  if (news.length <= 0) {
    return (
      <div className="flex justify-center">
        <span className="loading loading-lg loading-spinner"></span>
      </div>
    );
  }

  return (
    <section className="my-8">
      <SectionHeader title="Latest News Section" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
        {news?.slice(0,3).map((info) => (
          <NewsCard key={info.id} info={info} />
        ))}
      </div>
      <Link to={"/all-news"} className="flex justify-center">
        <button className="btn rounded-3xl mt-6 btn-outline btn-error btn-wide flex items-center gap-2">
          View All News
          <BsArrowRight className="text-xl" />
        </button>
      </Link>
    </section>
  );
};

export default NewsSection;
