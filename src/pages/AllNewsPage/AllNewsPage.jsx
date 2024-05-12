import { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "../../components/unique/NewsCard/NewsCard";
import SectionHeader from "../../components/shared/SectionHeader/SectionHeader";
import { scrollToTop } from "./../../utilities/scrollToTop";

const AllNewsPage = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    scrollToTop();
  }, []);

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
      <div className="flex justify-center min-h-[80vh]">
        <span className="loading loading-lg loading-spinner"></span>
      </div>
    );
  }

  return (
    <section className="my-8">
      <SectionHeader title="Latest News Section" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
        {news?.map((info) => (
          <NewsCard key={info.id} info={info} />
        ))}
      </div>
    </section>
  );
};

export default AllNewsPage;
