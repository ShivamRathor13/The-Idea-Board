import { useState } from "react";

const MAX_LENGTH = 150; // Set your maximum visible character length

const IdeaCard = ({ idea, onUpvote }) => {
  const [expanded, setExpanded] = useState(false);

  const isLongText = idea.text && idea.text.length > MAX_LENGTH;

  // Manually truncate the text based on the 'expanded' state
  const displayedText =
    isLongText && !expanded
      ? idea.text.substring(0, MAX_LENGTH) + "..." // Truncated text
      : idea.text; // Full text

  const handleUpvote = () => {
    onUpvote(idea.id);
  };

  const getVoteColor = (votes) => {
    if (votes >= 10) return "from-yellow-400 to-orange-500";
    if (votes >= 5) return "from-purple-400 to-pink-500";
    return "from-indigo-400 to-purple-500";
  };

  const voteColor = getVoteColor(idea.upvotes || 0);

  return (
    <div className="group bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 relative overflow-hidden">
      {/* Gradient line */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${voteColor}`}
      />

      <div className="flex gap-4">
        {/* Vote Section */}
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={handleUpvote}
            className={`group/button w-12 h-12 rounded-xl bg-gradient-to-br ${voteColor} flex items-center justify-center shadow-md hover:scale-110 transition-all`}
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </button>
          <div className="flex flex-col items-center">
            <span
              className={`text-xl font-bold bg-gradient-to-r ${voteColor} bg-clip-text text-transparent`}
            >
              {idea.upvotes || 0}
            </span>
            <span className="text-xs text-gray-500">votes</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col justify-between">
          {/* Idea text with See More */}
          <p className="text-gray-800 text-lg leading-relaxed mb-3 break-all">
            {displayedText}
          </p>

          {isLongText && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-sm text-purple-600 hover:underline self-start"
            >
              {expanded ? "See less" : "See more"}
            </button>
          )}

          {/* Metadata */}
          <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{new Date(idea.created_at).toLocaleDateString()}</span>
            </div>

            {idea.upvotes > 0 && (
              <div className="flex items-center gap-1">
                <span>
                  {idea.upvotes} {idea.upvotes === 1 ? "person" : "people"}{" "}
                  loved this
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaCard;
