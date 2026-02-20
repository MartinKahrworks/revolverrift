import React from "react";

const events = [
  {
    date: { month: "AUG", day: "15" },
    title: "Double XP Weekend",
    description: "All players will earn double experience points across all game modes.",
  },
  {
    date: { month: "AUG", day: "22" },
    title: "Developer Livestream",
    description: "Join the dev team on Twitch for a Q&A session and a sneak peek at the next update.",
  },
];

const UpcomingEvents = () => {
  return (
    <div className="bg-black py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2
          className="text-4xl mb-3 font-semibold"
          style={{ fontFamily: "'Cinzel', serif", color: "#c9979a", textShadow: "1px 1px 2px #5a2b2f" }}
        >
          Upcoming Events
        </h2>
        <div
          className="mx-auto mb-14"
          style={{
            width: "120px",
            height: "2px",
            background: "linear-gradient(to right, transparent, #5a2b2f, transparent)",
            position: "relative",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: "50%",
              top: "-6px",
              width: "14px",
              height: "14px",
              backgroundColor: "#5a2b2f",
              transform: "translateX(-50%) rotate(45deg)",
              boxShadow: "0 0 8px #5a2b2f",
              borderRadius: "1px",
            }}
          />
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-20 text-left text-[#d1c7b7] max-w-4xl mx-auto">
          {events.map(({ date, title, description }, idx) => (
            <div key={idx} className="flex gap-8 items-start max-w-md">
              {/* Date */}
              <div className="flex flex-col items-center min-w-[70px]">
                <span
                  className="text-pink-300 font-semibold text-lg"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {date.month}
                </span>
                <span
                  className="text-5xl font-bold leading-none"
                  style={{ fontFamily: "'Cinzel', serif", color: "#d1c7b7" }}
                >
                  {date.day}
                </span>
              </div>

              {/* Event details */}
              <div>
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ fontFamily: "'Cinzel', serif", color: "#d1c7b7" }}
                >
                  {title}
                </h3>
                <p
                  className="text-sm font-light"
                  style={{ fontFamily: "'EB Garamond', serif", maxWidth: "350px" }}
                >
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
