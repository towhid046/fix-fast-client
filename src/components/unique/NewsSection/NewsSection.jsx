import { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "./../NewsCard/NewsCard";
import SectionHeader from "../../shared/SectionHeader/SectionHeader";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { Slide } from "react-awesome-reveal";

const NewsSection = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/news`);
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
      <SectionHeader
        name="Latest News"
        title="Discover Our Latest News"
        description="Stay Updated with FixFast: Explore the Latest News and Updates on Service Solutions, Provider Insights, and Consumer Trends."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
        {news?.slice(0, 3).map((info) => (
          <NewsCard key={info._id} info={info} />
        ))}
      </div>
     <Slide direction='up'>
     <div className="flex justify-center my-7">
        <Link to={"/all-news"}>
          <button className="rounded-full md:px-12 px-5 btn btn-outline btn-error ">
            View All News
            <BsArrowRight className="text-xl" />
          </button>
        </Link>
      </div>
     </Slide>
    </section>
  );
};

export default NewsSection;
