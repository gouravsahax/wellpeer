import type { Metadata } from "next";
import SignInButton from "../components/SignInButton";

export const metadata: Metadata = {
  title: "Sign In | PeerProducts",
  description: "Sign in to PeerProducts to share and discover genuine product recommendations and reviews.",
};

export default function AuthPage() {
  return (
    <div className="w-screen min-h-[calc(100vh-60px)] flex flex-col lg:flex-row items-center justify-center px-6 md:px-12 py-12 gap-12 lg:gap-20 bg-zinc-950">
      
      {/* Overlapping Images Stack (Left Column) */}
      <div className="relative w-full max-w-[450px] h-[300px] md:h-[400px] flex items-center justify-center shrink-0">
        
        {/* Left Image (img1) */}
        <div className="absolute left-0 w-[48%] h-[72%] rounded-xl border border-zinc-800 shadow-xl overflow-hidden z-10 transition-all duration-300 hover:-translate-x-2 hover:scale-[1.02] bg-zinc-900">
          <img
            src="/home/img3.jpg"
            alt="Product recommendation 1"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Image (img2) */}
        <div className="absolute right-0 w-[48%] h-[72%] rounded-xl border border-zinc-800 shadow-xl overflow-hidden z-10 transition-all duration-300 hover:translate-x-2 hover:scale-[1.02] bg-zinc-900">
          <img
            src="/home/img1.jpg"
            alt="Product recommendation 2"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Center/Top Image (img3) */}
        <div className="absolute w-[44%] h-[92%] rounded-xl border-2 border-zinc-700 shadow-2xl overflow-hidden z-20 transition-all duration-300 hover:scale-[1.05] bg-zinc-900">
          <img
            src="/home/img2.jpg"
            alt="Product recommendation 3"
            className="w-full h-full object-cover"
          />
        </div>

      </div>

      {/* Branding and Authentication (Right Column) */}
      <div className="flex flex-col justify-center items-start text-left w-full lg:max-w-lg gap-6 lg:-mr-[5vw]">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
          PeerProducts
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 font-normal leading-relaxed">
          A social network where you can discover products through real user recommendations and reviews
        </p>
        <div className="w-full max-w-sm mt-4">
          <SignInButton />
        </div>
      </div>

    </div>
  );
}
