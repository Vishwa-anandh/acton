import { useState } from "react";
import anniversaryLogo from "../../assets/images/anniversary-10th.png";

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
    <section id="anniversary" className="anniversary section-shell anchor-section" aria-labelledby="anniversary-title">
      <div className="anniversary-intro">
        <div className="anniversary-copy">
          <p className="anniversary-eyebrow"><span aria-hidden="true">✦</span> A DECADE TO CELEBRATE</p>
          <h2 id="anniversary-title">Rooted in Tamil.<br /><em>Growing together.</em></h2>
          <p className="anniversary-tamil" lang="ta">தமிழோடு வளர்ந்த பத்து ஆண்டுகள்</p>
          <p className="anniversary-description">Ten years of little beginnings, lasting friendships, and a language that brings us closer. A celebration of everyone who makes Acton Tamil School feel like home.</p>
          <a href="#anniversary-stories" className="button button-primary">Discover the stories <i className="bi bi-arrow-down-right" aria-hidden="true" /></a>
          <p className="anniversary-signoff">OUR LANGUAGE <span>✦</span> OUR ROOTS <span>✦</span> OUR FUTURE</p>
        </div>
        <div className="anniversary-artwork">
          <img src={anniversaryLogo} alt="Acton Tamil School 10th anniversary emblem" width="1472" height="1472" loading="lazy" decoding="async" />
          <span className="anniversary-art-caption">A milestone made possible by our community.</span>
        </div>
      </div>
      <div id="anniversary-stories" className="anniversary-stories" aria-labelledby="stories-title">
        <div className="stories-heading">
          <div><p className="anniversary-eyebrow">THE PEOPLE BEHIND THE JOURNEY</p><h3 id="stories-title">10 years. <em>10 stories.</em></h3></div>
          <p>Small moments.<br />A lasting place in our hearts.</p>
        </div>
        <div className="stories-filters" role="group" aria-label="Filter memories by storyteller">
          {filters.map(item => <button key={item} type="button" aria-pressed={filter === item} onClick={() => { setFilter(item); setPage(0); }}>{item === "All stories" ? item : `${item}s`}</button>)}
        </div>
        <p className="stories-count" role="status">{Math.min(page * 6 + 1, visible.length)} to {Math.min((page + 1) * 6, visible.length)} of {visible.length} stories</p>
        <div className="stories-grid">
          {visible.slice(page * 6, (page + 1) * 6).map(story => <article className="memory-card" key={story.number}>
            <div className="memory-meta"><span className="memory-number">{String(story.number).padStart(2, "0")}</span><span>{story.role} perspective</span><i className="bi bi-chat-quote" aria-hidden="true" /></div>
            <h4>{story.title}</h4>
            <p>{story.text}</p>
          </article>)}
        </div>
        {visible.length > 6 && <nav className="stories-pagination" aria-label="Story pages">
          <button type="button" aria-current={page === 0 ? "page" : undefined} onClick={() => setPage(0)}>1</button>
          <button type="button" aria-current={page === 1 ? "page" : undefined} onClick={() => setPage(1)}>2</button>
        </nav>}
        <div className="stories-closing"><span aria-hidden="true">✦</span><p>Every family adds a chapter.<br /><strong>Thank you for being part of ours.</strong></p><span aria-hidden="true">✦</span></div>
      </div>
    </section>
  );
}
