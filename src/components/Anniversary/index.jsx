import { useState } from "react";
import anniversaryLogo from "../../assets/images/anniversary-10th-3d.webp";

const stories = [
  { role: "Student", title: "A conversation with Paati", text: "The first time I spoke to my grandmother in Tamil without asking for help, our call lasted a little longer." },
  { role: "Parent", title: "Tamil came home with us", text: "A song from Sunday class became the song our child sang all week. Soon, we were singing along too." },
  { role: "Teacher", title: "From a whisper to a story", text: "A child who once answered in a whisper stood up to tell a story. The whole classroom listened." },
  { role: "Student", title: "My first moment on stage", text: "I was nervous before the performance. Then I saw my friends beside me, and remembered we had practised together." },
  { role: "Parent", title: "More than Sunday mornings", text: "We came looking for Tamil lessons. We found families who shared our traditions and friendships that grew beyond the classroom." },
  { role: "Teacher", title: "The joy of one new word", text: "Sometimes the best moment is a small one: a new word remembered, a sentence finished, a hand raised with confidence." },
  { role: "Student", title: "Letters that became my name", text: "Writing my name in Tamil made the letters feel like they belonged to me. I wanted to show everyone at home." },
  { role: "Parent", title: "A tradition of our own", text: "Getting ready for the school’s Pongal celebration became a family tradition, with stories from our own childhood along the way." },
  { role: "Teacher", title: "Learning goes both ways", text: "My students bring wonderful questions. Finding answers together reminds me why I love teaching our language." },
  { role: "Student", title: "A place to belong", text: "My favourite memory is laughing with friends after class. Tamil school became a place where I could just be myself." },
];
const filters = ["All stories", "Student", "Parent", "Teacher"];

export default function Anniversary() {
  const [filter, setFilter] = useState("All stories");
  const [page, setPage] = useState(0);
  const visible = stories.map((story, index) => ({ ...story, number: index + 1 })).filter(story => filter === "All stories" || story.role === filter);
  return (
    <section
      id="anniversary"
      className="section-shell anchor-section my-6 mx-auto mb-20 border border-[#e8dccb] rounded-[32px] bg-paper-soft overflow-hidden [@media(max-width:720px)]:rounded-[24px] [@media(max-width:720px)]:mb-12"
      aria-labelledby="anniversary-title"
    >
      <div className="grid grid-cols-[1.2fr_0.8fr] items-center gap-12 p-[clamp(16px,2.5vw,36px)_clamp(28px,5vw,76px)] [background:radial-gradient(ellipse_at_90%_20%,#f4e6cd_0%,transparent_60%)] [@media(max-width:1000px)]:gap-5 [@media(max-width:720px)]:grid-cols-1">
        <div>
          <p className="flex items-center gap-[10px] mb-[22px] text-maroon text-[13px] font-[750] tracking-[0.12em] [@media(max-width:720px)]:text-[11px]">
            <span aria-hidden="true">✦</span> A DECADE TO CELEBRATE
          </p>
          <h2
            id="anniversary-title"
            className="m-0 mb-6 text-ink text-[clamp(34px,4.2vw,62px)] font-bold leading-[1.12] tracking-[-0.04em]"
          >
            Rooted in Tamil.
            <br />
            <em className="text-maroon [font-family:Georgia,serif] font-normal">
              Growing together.
            </em>
          </h2>
          <p
            className="mt-[1em] mb-5 text-maroon text-[23px] leading-[1.8] [@media(max-width:720px)]:text-[20px]"
            lang="ta"
          >
            தமிழோடு வளர்ந்த பத்து ஆண்டுகள்
          </p>
          <p className="mt-[1em] max-w-[540px] mb-7 text-ink-soft text-[19px] leading-[1.8]">
            Ten years of little beginnings, lasting friendships, and a
            language that brings us closer. A celebration of everyone who
            makes Acton Tamil School feel like home.
          </p>
          <a href="#anniversary-stories" className="button button-primary">
            Discover the stories{" "}
            <i className="bi bi-arrow-down-right" aria-hidden="true" />
          </a>
          <p className="flex items-center flex-wrap gap-3 mt-[30px] text-ink-muted text-[11px] tracking-[0.08em] [@media(max-width:720px)]:gap-2 [@media(max-width:720px)]:text-[10px]">
            OUR LANGUAGE <span className="text-[#ad7d28]">✦</span> OUR ROOTS{" "}
            <span className="text-[#ad7d28]">✦</span> OUR FUTURE
          </p>
        </div>
        <div className="relative text-center isolate [@media(max-width:720px)]:w-[min(100%,330px)] [@media(max-width:720px)]:mx-auto [@media(max-width:720px)]:mt-[10px]">
          <img
            src={anniversaryLogo}
            alt="Acton Tamil School 10th anniversary emblem"
            width="1600"
            height="1600"
            loading="lazy"
            decoding="async"
            className="relative block w-full h-auto mx-auto"
          />
          <span className="block relative z-[1] mt-5 py-0 px-2 [font-family:var(--font-sans)] not-italic text-[18px] font-semibold leading-[1.6] text-[#35302b] [text-wrap:balance]">
            A milestone made possible by our community.
          </span>
        </div>
      </div>
      <div
        id="anniversary-stories"
        className="relative isolate p-[clamp(24px,4vw,60px)] bg-paper border-t border-[#e8dccb] scroll-mt-[100px]"
        aria-labelledby="stories-title"
      >
        <div className="flex items-end justify-between gap-6 [@media(max-width:720px)]:items-start [@media(max-width:720px)]:flex-col [@media(max-width:720px)]:gap-4">
          <div>
            <p className="flex items-center gap-[10px] mb-[22px] text-maroon text-[13px] font-[750] tracking-[0.12em] [@media(max-width:720px)]:text-[11px]">
              THE PEOPLE BEHIND THE JOURNEY
            </p>
            <h3
              id="stories-title"
              className="m-0 text-[clamp(32px,3.5vw,48px)] font-bold leading-[1.15] tracking-[-0.035em]"
            >
              10 years. <em className="text-maroon [font-family:Georgia,serif] font-normal">10 stories.</em>
            </h3>
          </div>
          <p className="text-ink-soft text-[18px] leading-[1.7]">
            Small moments.
            <br />A lasting place in our hearts.
          </p>
        </div>
        <div
          className="flex flex-wrap gap-2 mt-[30px]"
          role="group"
          aria-label="Filter memories by storyteller"
        >
          {filters.map(item => (
            <button
              key={item}
              type="button"
              aria-pressed={filter === item}
              onClick={() => { setFilter(item); setPage(0); }}
              className="py-[10px] px-[18px] min-h-11 border border-line rounded-full bg-transparent text-ink-soft text-[16px] leading-[normal] tracking-normal cursor-pointer [@media(max-width:720px)]:py-[9px] [@media(max-width:720px)]:px-[13px] aria-pressed:bg-maroon aria-pressed:border-maroon aria-pressed:text-white"
            >
              {item === "All stories" ? item : `${item}s`}
            </button>
          ))}
        </div>
        <p
          className="mt-5 mb-4 text-ink-muted text-[14px]"
          role="status"
        >
          {Math.min(page * 6 + 1, visible.length)} to{" "}
          {Math.min((page + 1) * 6, visible.length)} of {visible.length}{" "}
          stories
        </p>
        <div className="grid grid-cols-3 gap-[22px] [@media(max-width:1000px)]:grid-cols-2 [@media(max-width:720px)]:grid-cols-1">
          {visible.slice(page * 6, (page + 1) * 6).map(story => (
            <article
              className="flex flex-col p-[26px] bg-white border border-[#e8e0d6] rounded-[18px] shadow-[0_6px_18px_rgba(92,57,29,0.04)] transition-[transform,box-shadow] duration-200 [&:nth-child(3n+2)]:bg-[#f8f1e7] hover:-translate-y-[3px] hover:shadow-[0_12px_24px_#59382c0a]"
              key={story.number}
            >
              <div className="flex items-center gap-[10px] mb-[25px] text-ink-soft text-[14px]">
                <span className="text-maroon text-[32px] [font-family:Georgia,serif]">
                  {String(story.number).padStart(2, "0")}
                </span>
                <span>{story.role} perspective</span>
                <i className="bi bi-chat-quote ml-auto text-[#bb8d41] text-[22px]" aria-hidden="true" />
              </div>
              <h4 className="text-ink text-[25px] font-bold leading-[1.35] mb-[14px] tracking-[-0.02em]">
                {story.title}
              </h4>
              <p className="text-ink-soft text-[18px] leading-[1.8] mb-0">
                {story.text}
              </p>
            </article>
          ))}
        </div>
        {visible.length > 6 && (
          <nav
            className="flex justify-center gap-[10px] mt-7"
            aria-label="Story pages"
          >
            <button
              type="button"
              aria-current={page === 0 ? "page" : undefined}
              onClick={() => setPage(0)}
              className="w-11 h-11 border border-line rounded-full bg-white text-ink cursor-pointer text-[16px] tracking-normal aria-[current=page]:text-white aria-[current=page]:bg-maroon aria-[current=page]:border-maroon"
            >
              1
            </button>
            <button
              type="button"
              aria-current={page === 1 ? "page" : undefined}
              onClick={() => setPage(1)}
              className="w-11 h-11 border border-line rounded-full bg-white text-ink cursor-pointer text-[16px] tracking-normal aria-[current=page]:text-white aria-[current=page]:bg-maroon aria-[current=page]:border-maroon"
            >
              2
            </button>
          </nav>
        )}
        <div className="flex items-center justify-center gap-7 pt-[40px] text-center">
          <span className="text-[#b28a42]" aria-hidden="true">✦</span>
          <p className="m-0 text-ink-soft text-[18px] leading-[1.8]">
            Every family adds a chapter.
            <br />
            <strong className="text-maroon font-semibold">
              Thank you for being part of ours.
            </strong>
          </p>
          <span className="text-[#b28a42]" aria-hidden="true">✦</span>
        </div>
      </div>
    </section>
  );
}
