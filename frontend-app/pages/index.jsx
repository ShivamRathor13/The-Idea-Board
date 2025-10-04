import Link from "next/link";
import "./globals.css";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white/60 backdrop-blur-sm rounded-full border border-purple-200 shadow-lg animate-fade-in">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-gray-700">Now Live</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 animate-slide-up">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600">
              Idea Board
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-600 mb-4 animate-slide-up animation-delay-200">
            Share ideas and vote for the best ones.
          </p>

          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto animate-slide-up animation-delay-400">
            Collaborate with your team, spark innovation, and bring the
            brightest ideas to life through collective wisdom.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up animation-delay-600">
            <Link
              href="/app"
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-lg font-semibold rounded-xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span className="relative z-10">Go to App</span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>

            <button className="px-8 py-4 bg-white/60 backdrop-blur-sm text-gray-700 text-lg font-semibold rounded-xl border-2 border-gray-200 hover:border-purple-300 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg">
              Learn More
            </button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-3 justify-center mt-16 animate-fade-in animation-delay-800">
            {[
              "💡 Creative Ideas",
              "⬆️ Vote & Rank",
              "🤝 Collaborate",
              "🚀 Launch Fast",
            ].map((feature, index) => (
              <div
                key={index}
                className="px-5 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-10 left-10 animate-float">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl shadow-lg transform rotate-12"></div>
      </div>
      <div className="absolute top-1/4 right-20 animate-float animation-delay-2000">
        <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full shadow-lg"></div>
      </div>
      <div className="absolute bottom-1/3 right-10 animate-float animation-delay-4000">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-lg shadow-lg transform -rotate-12"></div>
      </div>
    </main>
  );
}
