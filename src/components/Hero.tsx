"use client";
import { SparklesCore } from "../components/ui/sparkles";
import HeroScrollDemo from "../components/HeroScrollDemo";
import JoinRoomModal from "./JoinRoomModal";

function SparklesPreview() {
  return (
    <>
      <div className="h-[40rem] relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
        <div className="w-full absolute inset-0 h-screen">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 relative z-20">
          Real-Time Pair Programming Made Easy
        </h1>
        <p className="text-xl text-center text-gray-300 mb-8 max-w-3xl mx-auto relative z-20">
          Collaborate instantly with developers worldwide. No sign-up required.
          Just start coding.
        </p>
        <JoinRoomModal />
      </div>
      <div className="relative z-10">
        <HeroScrollDemo />
      </div>
    </>
  );
}

export default SparklesPreview;
