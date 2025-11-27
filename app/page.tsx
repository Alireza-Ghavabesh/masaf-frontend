import Image from "next/image";
import HeroSlider from "@/components/slider/heroSlider";
import MiddleSlider from "@/components/slider/middleSlider/middleSlider";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SocialSlider from "@/components/slider/socialSlider";
import ContentForYou from "@/components/contentForYou/contentForYou";
import Skeleton from "@/components/skeletons/homePageLoading";
import { Suspense } from "react";
import ImageWithLoading from "@/components/imageWithLoading/imageWithLoading";
import {
  // MiddleSkeleton,
  SocialMiddleSkeleton,
} from "@/components/imageWithLoading/skeleton";
import { ThreeSkeleton } from "@/components/skeletons/threeSkeleton";
import { randomUUID } from "crypto";
import Link from "next/link";
import { getNestjsServerAdress } from "@/utils/utils";

const page = () => {
  return (
    <>
      <section className="container mx-auto px-4" key={randomUUID()}>
        <Suspense fallback={<Skeleton />}>
          <HeroSlider />
        </Suspense>
        <div className="lg:flex lg:container lg:mx-auto lg:space-x-2">
          <Suspense fallback={<ThreeSkeleton />}>
            <ImageWithLoading
              src={
                `${getNestjsServerAdress()}/stream/serveBottomLeftSiteBanner`
              }
              alt=""
              width={400}
              height={500}
              className="rounded-2xl mt-10 lg:w-1/3 h-auto lg:pr-3 mx-auto"
              loadingTime={4000}
            />
          </Suspense>

          <Suspense fallback={<ThreeSkeleton />}>
            <ImageWithLoading
              src={
                `${getNestjsServerAdress()}/stream/serveMidSiteBanner`
              }
              alt=""
              width={400}
              height={500}
              className="rounded-2xl mt-10 lg:w-1/3 h-auto lg:pr-3 mx-auto"
              loadingTime={4000}
            />
          </Suspense>

          <Suspense fallback={<ThreeSkeleton />}>
            <ImageWithLoading
              src={
                `${getNestjsServerAdress()}/stream/serveBottomRightSiteBanner`
              }
              alt=""
              width={400}
              height={500}
              className="rounded-2xl mt-10 lg:w-1/3 h-auto lg:pr-3 mx-auto"
              loadingTime={4000}
            />
          </Suspense>
        </div>
      </section>
      <section className="w-full bg-white">
        <div className="flex flex-col gap-2 mt-3 mb-5 container mx-auto">
          <div className="bg-white p-4 flex flex-col gap-4">
            <div className="flex justify-between">
              <div className="flex gap-2">
                <button className="border rounded-lg p-2">
                  <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <button className="border rounded-lg p-2">
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
                <Link href={"/sokhanraniha"} className="flex items-center font-IRANSansWeb p-2 border border-gray-300 rounded-lg">
                  بیشتر
                </Link>
              </div>
              <div className="flex items-center font-IRANSansWeb font-bold">
                جدیدترین سخنرانی ها
              </div>
            </div>
            <hr />
            <MiddleSlider category="سخنرانی" limit="6" />
          </div>
          <div className="bg-white mt-2 p-4 flex flex-col gap-4">
            <div className="flex justify-between">
              <div className="flex gap-2">
                <button className="border rounded-lg p-2">
                  <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <button className="border rounded-lg p-2">
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
                <Link href={"/clipha"} className="flex items-center font-IRANSansWeb p-2 border border-gray-300 rounded-lg">
                  بیشتر
                </Link>
              </div>
              <div className="flex items-center font-IRANSansWeb font-bold">
                جدیدترین کلیپ ها
              </div>
            </div>
            <hr />
            <MiddleSlider category="کلیپ" limit="6" />
          </div>
        </div>
      </section>
      <section className="flex container mx-auto gap-5 py-10 flex-col items-center lg:flex-row lg:justify-center lg:gap-0">
        <Suspense fallback={<SocialMiddleSkeleton />}>
          <ImageWithLoading
            src={
              "https://cdn.masaf.ir/survey/8ce83724-01f9-46f2-827f-f7ac0fcab583_2%20"
            }
            alt=""
            width={400}
            height={500}
            className="rounded-2xl w-full px-6"
            loadingTime={4000}
          />

          <ImageWithLoading
            src={
              "https://cdn.masaf.ir/survey/fd4fdd61-3921-42cc-9e02-03ab334abea1_11"
            }
            alt=""
            width={400}
            height={500}
            className="rounded-2xl w-full px-6"
            loadingTime={4000}
          />
        </Suspense>
      </section>
      <section className="w-full bg-white">
        <div className="flex flex-col gap-2 mt-3 mb-5 container mx-auto">
          <div className="bg-white p-4 flex flex-col gap-4">
            <div className="flex justify-between">
              <div className="flex gap-2">
                <button className="border rounded-lg p-2">
                  <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <button className="border rounded-lg p-2">
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
                <button className="flex items-center font-IRANSansWeb p-2 border border-gray-300 rounded-lg">
                  بیشتر
                </button>
              </div>
              <div className="flex items-center font-IRANSansWeb font-bold">
                برگزیده واحد ها
              </div>
            </div>
            <hr />
            <MiddleSlider category="برگزیده" limit="6" />
          </div>
        </div>
      </section>
      <section className="w-full bg-black py-2 rounded-lg">
        <h1 className="text-white mt-5 mb-5 flex justify-center font-IranYekanWebBold font-bold lg:text-2xl whitespace-nowrap px-2">
          جدیدترین فعالیت های استاد رائفی پور
        </h1>
        <SocialSlider />
      </section>
      <section className="container mx-auto px-2">
        <div className="font-IRANSansWeb text-xl font-bold flex mt-20 mb-5 justify-center w-full">
          مطالب مناسب شما
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ContentForYou
            href="/content/4626"
            src={
              "https://cdn.masaf.ir/contents/media/coverImage/MASAF-Prof01.jpg"
            }
            desc={
              "هر جا تو هر موضوع سیاسی گیر کردین، برید ببینید تاج زاده کدوم طرفی موضع گرفته؛ خلاف جهتش میشه راه حق..."
            }
            desc2={"وطن‌دوستی از که آموختی،از بی وطنان"}
            categoryImageSrc={
              "https://cdn.masaf.ir/portal/media/image/2023-10-31_14.20.28.jpg"
            }
            categoryTitle="نجوا"
            date="1402/06/31"
          />
          <ContentForYou
            href="/content/4626"
            src={
              "https://cdn.masaf.ir/contents/media/coverImage/MASAF-Prof01.jpg"
            }
            desc={"پادکست صوتی قسمت هشتم - سبک زندگی مهدوی"}
            desc2={"سلسله مباحث مهدویت"}
            categoryImageSrc={
              "https://cdn.masaf.ir/portal/media/image/Mahdiaran.jpg"
            }
            categoryTitle="مهدیاران"
            date="1402/06/31"
          />
          <ContentForYou
            href="/content/4626"
            src={
              "https://cdn.masaf.ir/contents/media/coverImage/MASAF-Prof01.jpg"
            }
            desc={"پادکست صوتی قسمت هشتم - سبک زندگی مهدوی"}
            desc2={"سلسله مباحث مهدویت"}
            categoryImageSrc={
              "https://cdn.masaf.ir/portal/media/image/Mahdiaran.jpg"
            }
            categoryTitle="مهدیاران"
            date="1402/06/31"
          />
          <ContentForYou
            href="/content/4626"
            src={
              "https://cdn.masaf.ir/contents/media/coverImage/MASAF-Prof01.jpg"
            }
            desc={"پادکست صوتی قسمت هشتم - سبک زندگی مهدوی"}
            desc2={"سلسله مباحث مهدویت"}
            categoryImageSrc={
              "https://cdn.masaf.ir/portal/media/image/Mahdiaran.jpg"
            }
            categoryTitle="مهدیاران"
            date="1402/06/31"
          />
          <ContentForYou
            href="/content/4626"
            src={
              "https://cdn.masaf.ir/contents/media/coverImage/MASAF-Prof01.jpg"
            }
            desc={"پادکست صوتی قسمت هشتم - سبک زندگی مهدوی"}
            desc2={"سلسله مباحث مهدویت"}
            categoryImageSrc={
              "https://cdn.masaf.ir/portal/media/image/Mahdiaran.jpg"
            }
            categoryTitle="مهدیاران"
            date="1402/06/31"
          />
        </div>
      </section>
      <section>
        <div className="w-full mt-10">
          <div className="h-[450px]">
            <Image
              className="w-full h-full object-cover"
              width={2000}
              height={500}
              alt=""
              src={
                "https://cdn.masaf.ir/survey/fdad9ee4-9ddd-499e-a6e1-581137b42052_fo"
              }
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
