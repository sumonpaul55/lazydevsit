import useEmblaCarousel from "embla-carousel-react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { clientReviewData } from "../../utils/home/clientReviewData";

export default function ClientReviews() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    slidesToScroll: 1,
  });

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();
  return (
    <div className="bg-[#f8fafc] py-24 px-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            Waiting to see you in the success list
          </h2>

          <div className="flex gap-3 mt-6 md:mt-0">
            <button
              onClick={scrollPrev}
              className="w-12 h-12 border-2 border-slate-300 hover:border-slate-400 rounded-full flex items-center justify-center transition-colors"
            >
              <BsChevronLeft className="w-5 h-5 text-slate-600" />
            </button>
            <button
              onClick={scrollNext}
              className="w-12 h-12 border-2 border-slate-300 hover:border-slate-400 rounded-full flex items-center justify-center transition-colors"
            >
              <BsChevronRight className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Main Content - Both cards same height */}
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="flex-1 flex flex-col lg:flex-row gap-8 h-full">
            {/* Left Blue Stats Card */}
            <div className="lg:w-4/12 shrink-0">
              <div className="bg-blue-600 text-white rounded-3xl p-8 h-full flex flex-col">
                {/* Overlapping Avatars */}
                <div className="flex -space-x-2 mb-8">
                  {clientReviewData.slice(0, 4).map((review, idx) => (
                    <img
                      key={idx}
                      src={review.image}
                      alt={review.name}
                      className="w-12 h-12 rounded-full border-2 border-blue-600 object-cover ring-2 ring-blue-500"
                    />
                  ))}
                </div>

                {/* Rating */}
                <div className="flex text-yellow-400 text-3xl mb-3">★★★★★</div>

                <div className="space-y-4 mt-auto">
                  <div>
                    <p className="text-4xl font-semibold">4.9/5</p>
                    <p className="text-blue-200">rating, 5,000+ reviews</p>
                  </div>
                  <div>
                    <p className="text-xl font-medium">
                      Used across 20+ countries
                    </p>
                  </div>
                  <div>
                    <p className="text-xl font-medium">
                      99.9% uptime performance
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Carousel */}
            <div className="lg:w-7/12 flex-1">
              <div className="overflow-hidden h-full" ref={emblaRef}>
                <div className="flex h-full">
                  {clientReviewData.map((review) => (
                    <div
                      key={review.id}
                      className="flex-[0_0_100%] min-w-0 px-3 h-full"
                    >
                      <div className="bg-white rounded-3xl p-8 shadow-sm h-full flex flex-col">
                        {/* Stars */}
                        <div className="flex text-yellow-400 text-2xl mb-6">
                          {"★".repeat(review.rating)}
                        </div>

                        {/* Review Title */}
                        <h3 className="text-[34px] text-black font-semibold mb-4">
                          {review.title}
                        </h3>

                        {/* Review Text */}
                        <p className="text-black text-[24px] leading-relaxed mb-8 flex-1">
                          {review.review}
                        </p>

                        {/* Author */}
                        <div className="flex items-center gap-4 mt-auto">
                          <img
                            src={review.image}
                            alt={review.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-semibold text-slate-900">
                              {review.name}
                            </p>
                            <p className="text-slate-500 text-sm">
                              {review.designation}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
