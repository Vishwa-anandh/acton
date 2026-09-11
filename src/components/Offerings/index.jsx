import { Link } from "react-router-dom";
import communityImage from "../../assets/images/Action-About.webp";
import learningActivityImage from "../../assets/images/event5.webp";

const learningSteps = [
  {
    icon: "bi-chat-heart",
    label: "Speak",
    copy: "Build everyday vocabulary and confidence through conversation.",
  },
  {
    icon: "bi-journal-text",
    label: "Read & write",
    copy: "Progress through a structured, age-appropriate Tamil curriculum.",
  },
  {
    icon: "bi-music-note-beamed",
    label: "Celebrate",
    copy: "Discover literature, music, festivals, and the stories behind them.",
  },
];

const Offerings = () => {
  return (
    <>
      <section className="section learning-section">
        <div className="section-shell learning-panel">
          <div className="learning-copy">
            <p className="eyebrow">How children learn</p>
            <h2>A clear path from first words to confident expression.</h2>
            <p>
              Each Sunday combines conversation, structured literacy, and
              cultural practice—so children learn Tamil by using it together.
            </p>
          </div>

          <figure className="learning-photo">
            <img
              src={learningActivityImage}
              alt="Acton Tamil School students taking part in a Tamil learning activity on stage"
              width="1523"
              height="761"
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              <i className="bi bi-people-fill" aria-hidden="true" />
              Learning through participation
            </figcaption>
          </figure>

          <div className="learning-pathways">
            {learningSteps.map((step, index) => (
              <article className="feature-card" key={step.label}>
                <span className="feature-number">
                  0{index + 1}
                </span>
                <h3>
                  {step.label}
                  <span className="feature-icon" aria-hidden="true">
                    <i className={`bi ${step.icon}`} />
                  </span>
                </h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-community">
        <div className="section-shell community-card">
          <img
            src={communityImage}
            alt="Students, teachers, and families gathered on stage at Acton Tamil School"
            width="1350"
            height="620"
            loading="lazy"
            decoding="async"
          />
          <div className="community-overlay">
            <p className="eyebrow eyebrow-light">More than a classroom</p>
            <h2>A community growing together.</h2>
            <p>
              Festivals, performances, friendships, and shared traditions make
              Tamil something children live—not only something they study.
            </p>
            <Link className="button button-light" to="/events">
              See our community
              <i className="bi bi-arrow-right" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Offerings;
