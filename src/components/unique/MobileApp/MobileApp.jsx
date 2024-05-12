import mobileImg from '../../../assets/images/mobile-images.png'
import playStoreImg from '../../../assets/images/google-play-icon.png'
import appleStoreImg from '../../../assets/images/apple-icon.png'
import SectionHeader from './../../shared/SectionHeader/SectionHeader';
const MobileApp = () => {
  return (
    <section className="max-w-4xl mx-auto pb-16">
        <SectionHeader/>
      <div className="px-100 flex py-6 lg:flex-row flex-col items-center justify-between lg:gap-32 gap-8">
        <div>
          <img
            src={mobileImg}
            alt=""
            className=" bg-white rounded-xl"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold">
            Get the FixFast mobile app more easily.
          </h2>
          <p className="section-paragraph mt-5 mb-16">
            Get our app from google play store or apple store. It is so
            lightweight.
          </p>

          <div className="flex md:flex-row flex-col items-center justify-between md:gap-8 gap-5">
              <button className="flex items-center  justify-center w-full gap-5 bg-gray-100 md:py-4 py-3 rounded-lg hover:bg-neutral transition ease-in-out hover:text-white">
                <img src={appleStoreImg} alt="" className="w-10" />
                <span className="text-dark-gray text-lg font-semibold">
                  App Store
                </span>
              </button>
              <button className="hover:bg-success transition ease-in-out hover:text-white flex items-center gap-5 bg-gray-100  md:py-4 py-3 rounded-lg w-full  justify-center ">
                <img
                  src={playStoreImg}
                  alt=""
                  className="w-10"
                />
                <span className="text-dark-gray text-lg font-semibold">
                  Play Store
                </span>
              </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default MobileApp;
