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
        `${import.meta.env.VITE_API_URL}/news`
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
    <section className="pb-16">
      <SectionHeader
      name="All News"
      title="Explore All News" 
      description={`"Discover a Wealth of Information: Dive into FixFast's All-Encompassing News Section for Insights, Tips, and Trends in the Service Industry."`}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
        {news?.map((info) => (
          <NewsCard key={info._id} info={info} />
        ))}
      </div>
    </section>
  );
};

export default AllNewsPage;
