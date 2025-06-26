import classes from "./animatedStars.module.css";
import TypingEffect from "@/components/typewriter/typewriter"
import { Video } from '@components/Video';


export default function Hero() {
  return (
    <div className="bg-transparent relative">
      <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
        <div className={classes.stars} />
        <div className={classes.stars2} />
        <div className={classes.stars3} />
        <div className={classes.stars4} />
      </div>
      <div className="relative isolate px-6 pt-16 pb-20 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-20 -z-10 transform-gpu overflow-hidden blur-3xl"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ed0000] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="mx-auto max-w-full">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm dark:text-white leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20" >
              Make all efforts worthwhile.{" "}
              <a href="/bvi/readme" className="font-semibold text-primaryHue">
                <span aria-hidden="true" className="absolute inset-0" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-center mt-16">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl bottom-4">
              Let’s Embrace The {" "}
              <TypingEffect words={["Future", "Value", "Web3", "Xone"]} />
              {" "} Together!
            </h1>
            <div className="flex justify-center my-5" style={{ marginTop: "20px", marginBottom: "20px" }}>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "90vw",
                  paddingBottom: "56.25%",
                  height: 0,
                }}
              >
                <Video src="video/hello_xone.mp4" />
              </div>
            </div>
            <p className="mt-12 text-lg leading-8 text-gray-600 dark:text-gray-300">
            In the ever-evolving landscape of blockchain technology, Xone Chain emerges as a modular Layer 1 solution that redefines how we perceive and interact with on-chain value. While many existing Layer 1 and Layer 2 solutions focus on scalability or efficiency, Xone emphasizes something deeper: building a blockchain where every on-chain action generates tangible, traceable value.
            </p>
            <div className="mt-16 flex items-center justify-center gap-x-6">
              <a
                href="/study/xone"
                className="rounded-md bg-primaryHue px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-grd-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Start Learning
              </a>
              <a
                href="/developers/ready"
                className="text-sm font-semibold leading-6 text-primaryHue dark:text-white"
              >
                Building <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ed0000] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
    </div>   
  );
}