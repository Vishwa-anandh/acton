import Counts from "../../components/Counts";
import communityImage from "../../assets/images/Action-About-imag.webp";
import cultureImage from "../../assets/images/mainimage.webp";

const values = [
  {
    icon: "bi-chat-heart",
    title: "Confidence",
    copy: "Children find their voice through conversation, reading, and writing at the right pace.",
  },
  {
    icon: "bi-people",
    title: "Belonging",
    copy: "Families, teachers, and students create a warm community rooted in shared heritage.",
  },
  {
    icon: "bi-flower1",
    title: "Culture",
    copy: "Language comes alive through literature, festivals, music, art, and meaningful traditions.",
  },
];

const AboutLayout = () => {
  return (
    <main id="main-content" className="page-main">
      <section className="page-hero section-shell">
        <div className="page-hero-copy">
          <p className="eyebrow">Our school</p>
          <h1>Rooted in Tamil. Growing in Acton.</h1>
          <p>
            We are a volunteer-led school helping children build language
            skills, cultural understanding, and a confident sense of identity.
          </p>
        </div>
        <div className="page-hero-image">
          <img
            src={communityImage}
            alt="Acton Tamil School students, teachers, and families gathered on stage"
          />
        </div>
        <Counts />
      </section>

      <section className="section section-soft about-story-section">
        <div className="section-shell about-story">
          <div className="about-story-copy">
            <p className="eyebrow">Why we are here</p>
            <h2>Preserving a language by making it part of everyday life.</h2>
            <p className="lead-copy">
              Tamil is more than a subject. It carries family stories,
              creativity, values, and a connection that reaches across
              generations.
            </p>
            <p>
              Our mission is to make high-quality Tamil education welcoming and
              accessible to children across the Acton area. With the
              International Tamil Academy curriculum and committed volunteer
              teachers, students develop strong foundations from preschool
              through Grade 12.
            </p>
            <p>
              Every classroom is designed to be nurturing and inclusive.
              Children are supported at their level, encouraged to participate,
              and celebrated for their progress.
            </p>
          </div>
          <div className="about-story-image">
            <img
              src={cultureImage}
              alt="A colorful Pongal cultural display created by the school community"
              loading="lazy"
            />
            <span className="image-caption">Pongal at Acton Tamil School</span>
          </div>
        </div>
      </section>

      <section className="section guides-section">
        <div className="section-shell">
          <div className="section-heading section-heading-centered">
            <p className="eyebrow">What guides us</p>
            <h2>Strong roots. Open minds. Joyful learning.</h2>
          </div>
          <div className="value-grid">
            {values.map((value, index) => (
              <article className="feature-card" key={value.title}>
                <span className="feature-number">0{index + 1}</span>
                <h3>
                  {value.title}
                  <span className="feature-icon" aria-hidden="true">
                    <i className={`bi ${value.icon}`} />
                  </span>
                </h3>
                <p>{value.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-cta">
        <div className="section-shell cta-card">
          <div>
            <p className="eyebrow eyebrow-light">Join our school family</p>
            <h2>Give your child a language for life.</h2>
          </div>
          <a
            className="button button-light"
            href="https://www.catamilacademy.org/cta/login.aspx?ReturnUrl=%2fcta"
            target="_blank"
            rel="noreferrer"
          >
            Start enrollment
            <i className="bi bi-arrow-up-right" aria-hidden="true" />
          </a>
        </div>
      </section>
    </main>
  );
};

export default AboutLayout;
