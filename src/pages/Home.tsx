import { Analytics } from "@vercel/analytics/react";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <main className="flex-grow">
        <Hero />
        <Features />
        <section id="how-it-works" className="py-12 sm:py-16 lg:py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-white text-center mb-12">
              How It Works
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white text-xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Create or Join a Room
                </h3>
                <p className="text-gray-400 text-center">
                  Start a new room or join an existing one with a simple name.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white text-xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Share the RoomID
                </h3>
                <p className="text-gray-400 text-center">
                  Invite others by sending them the room ID.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white text-xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Start Coding Together
                </h3>
                <p className="text-gray-400 text-center">
                  Collaborate in real-time with audio and video.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Analytics />
    </div>
  );
}
