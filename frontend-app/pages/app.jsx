import "./globals.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import useIdeas from "../hooks/userIdeas";
import * as ideaService from "../services/ideaServices";
import IdeaCard from "../components/IdeaCard";
import Loader from "../components/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppPage = () => {
  const { ideas, setIdeas, fetchIdeas, loading, error } = useIdeas();
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // 👈 new state

  useEffect(() => {
    // Runs only in browser (no SSR)
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const submit = async () => {
    if (!text.trim()) return;
    try {
      setSubmitting(true);
      await ideaService.addIdea(text);
      setText("");
      fetchIdeas();
      toast.success("✅ Idea submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to submit idea, please try again.");
      window.location.reload();
    } finally {
      setSubmitting(false);
    }
  };

  const upvote = async (id) => {
    const updatedIdeas = ideas.map((idea) =>
      idea.id === id ? { ...idea, upvotes: (idea.upvotes || 0) + 1 } : idea
    );
    setIdeas(updatedIdeas);

    try {
      await ideaService.upvoteIdea(id);
    } catch (err) {
      console.error(err);
      fetchIdeas();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {!isMobile && <ToastContainer position="top-right" autoClose={3000} />}
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob"></div>
        <div className="absolute bottom-10 left-20 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-xl font-bold">💡</span>
            </div>
            <Link
              href="/"
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600"
            >
              {" "}
              Idea Board
            </Link>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="hidden sm:inline">Total Ideas:</span>
            <span className="font-bold text-purple-600">{ideas.length}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-8">
        {/* Input Section */}
        <div className="mb-8 animate-slide-up">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 p-6 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">✨</span>
              <h2 className="text-lg font-semibold text-gray-800">
                Share Your Brilliant Idea
              </h2>
            </div>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What's your innovative idea? Share it with the community..."
              className="w-full p-4 border-2 border-gray-200 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 resize-none bg-white/50 backdrop-blur-sm min-h-[120px] text-gray-700 placeholder-gray-400"
              rows="4"
            />

            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                {text.length > 0 && `${text.length} characters`}
              </p>
              <button
                onClick={submit}
                disabled={submitting || !text.trim()}
                className={`px-6 py-3 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 ${
                  submitting || !text.trim()
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-purple-500/50 hover:scale-105 active:scale-95"
                }`}
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <span>Submit Idea</span>
                    <span>🚀</span>
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        {ideas.length > 0 && (
          <div className="mb-6 flex gap-4 animate-fade-in">
            <div className="flex-1 bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-purple-200 shadow-md">
              <p className="text-sm text-gray-600 mb-1">Most Votes</p>
              <p className="text-2xl font-bold text-purple-600">
                {Math.max(...ideas.map((i) => i.upvotes || 0))}
              </p>
            </div>
            <div className="flex-1 bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-indigo-200 shadow-md">
              <p className="text-sm text-gray-600 mb-1">Total Votes</p>
              <p className="text-2xl font-bold text-indigo-600">
                {ideas.reduce((sum, i) => sum + (i.upvotes || 0), 0)}
              </p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader />
            <p className="mt-4 text-gray-600">Loading amazing ideas...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 text-center animate-shake">
            <span className="text-4xl mb-2 block">⚠️</span>
            <p className="text-red-600 font-semibold">{error}</p>
          </div>
        )}

        {/* Ideas Grid */}
        {!loading && ideas.length === 0 ? (
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border-2 border-dashed border-gray-300 p-12 text-center animate-fade-in">
            <span className="text-6xl mb-4 block">🎯</span>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Ideas Yet
            </h3>
            <p className="text-gray-500">
              Be the first to share your brilliant idea!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {ideas.map((idea, index) => (
              <div
                key={idea.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
              >
                <IdeaCard
                  className="animate-slide-up animate-slide-up"
                  idea={idea}
                  onUpvote={upvote}
                />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-20 py-6 text-center text-gray-500 text-sm">
        <p>Made with ❤️ for great ideas</p>
      </footer>
    </div>
  );
};

export default AppPage;
