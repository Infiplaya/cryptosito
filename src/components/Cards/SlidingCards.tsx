import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

export const SlidingCards = () => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 5000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );
  return (
    <div
      ref={sliderRef}
      className="keen-slider flex-1 cursor-pointer rounded-lg bg-white shadow-md dark:bg-gray-700 dark:shadow sm:h-56 lg:h-auto"
    >
      <div className="keen-slider__slide number-slide1 bg-white shadow-md dark:bg-gray-700 dark:shadow sm:h-56 lg:h-auto">
        <div className="flex justify-between align-middle">
          <h2 className="text-md ml-5 p-5 font-bold">
            ✨ Top Community Accounts
          </h2>
        </div>
        <ul className="ml-10 space-y-4 text-sm font-bold text-gray-800 dark:text-gray-200">
          *Something soon will be here*
        </ul>
      </div>
      <div className="keen-slider__slide number-slide2 bg-white shadow-md dark:bg-gray-700 dark:shadow">
        <div className="flex justify-between align-middle">
          <h2 className="text-md ml-5 p-5 font-bold">✨ Top Community Post</h2>
        </div>
        <ul className="ml-10 space-y-4 text-sm font-bold text-gray-800 dark:text-gray-200">
          *Something soon will be here*
        </ul>
      </div>
      <div className="keen-slider__slide number-slide3 bg-white shadow-md dark:bg-gray-700 dark:shadow">
        <div className="flex justify-between align-middle">
          <h2 className="text-md ml-5 p-5 font-bold">
            ✨ Top Community Article
          </h2>
        </div>
        <ul className="ml-10 space-y-4 text-sm font-bold text-gray-800 dark:text-gray-200">
          *Something soon will be here*
        </ul>
      </div>
    </div>
  );
};
