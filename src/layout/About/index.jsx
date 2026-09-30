import Counts from "../../components/Counts";
import communityImage from "../../assets/images/event43.webp";
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
    <main id="main-content" className="pt-[78px] mw560:pt-[70px]">
      <section className="page-hero section-shell grid grid-cols-1 pt-8 pb-8 mw820:pt-[70px] mw560:pt-[60px] mw560:pb-[65px]">
        <div className="page-hero-copy max-w-[900px] mx-auto mb-[54px] text-center">
          <p className="eyebrow">Our school</p>
          <h1 className="!text-[clamp(2.9rem,5.6vw,5.25rem)] mw560:!text-[clamp(2.9rem,13vw,4.2rem)]">
            Rooted in Tamil. Growing in Acton.
          </h1>
          <p className="max-w-[710px] !mx-auto">
            We are a volunteer-led school helping children build language
            skills, cultural understanding, and a confident sense of identity.
          </p>
        </div>
        <div className="w-full overflow-hidden max-h-[520px] aspect-[2.7/1] rounded-lg shadow-md mw820:aspect-[1.6/1] mw560:aspect-[1.15/1]">
          <img
            src={communityImage}
            alt="Acton Tamil School students, teachers, and families gathered on stage"
            className="w-full h-full object-cover object-[40%_30%] scale-[1.15]"
          />
        </div>
        <Counts />
      </section>

      <section className="section section-soft pb-8">
        <div className="about-story section-shell grid grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] gap-[clamp(42px,5vw,72px)] items-center mw820:grid-cols-1 mw820:gap-9">
          <div>
            <p className="eyebrow">Why we are here</p>
            <h2>Preserving a language by making it part of everyday life.</h2>
            <p className="lead-copy mt-[22px] text-ink-soft leading-[1.72]">
              Tamil is more than a subject. It carries family stories,
              creativity, values, and a connection that reaches across
              generations.
            </p>
            <p className="mt-[22px] text-ink-soft leading-[1.72]">
              Our mission is to make high-quality Tamil education welcoming and
              accessible to children across the Acton area. With the
              International Tamil Academy curriculum and committed volunteer
              teachers, students develop strong foundations from preschool
              through Grade 12.
            </p>
            <p className="mt-[22px] text-ink-soft leading-[1.72]">
              Every classroom is designed to be nurturing and inclusive.
              Children are supported at their level, encouraged to participate,
              and celebrated for their progress.
            </p>
          </div>
          <div className="relative">
            <img
              src={cultureImage}
              alt="A colorful Pongal cultural display created by the school community"
              loading="lazy"
              className="w-full aspect-[5/3.6] rounded-lg shadow-sm object-cover object-top"
            />
            <span className="absolute right-5 bottom-5 inline-flex items-center gap-[9px] mt-[14px] py-3 px-4 rounded-full bg-white/[.92] shadow-sm text-ink text-[0.83rem] font-bold tracking-[0.01em] [backdrop-filter:blur(16px)]">
              Pongal at Acton Tamil School
            </span>
          </div>
        </div>
      </section>

      <section className="section pt-8 pb-6">
        <div className="section-shell">
          <div className="section-heading section-heading-centered">
            <p className="eyebrow">What guides us</p>
            <h2>Strong roots. Open minds. Joyful learning.</h2>
          </div>
          <div className="grid grid-cols-3 gap-5 mw820:grid-cols-1 mw820:gap-[14px]">
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

      <section className="section pt-3 pb-6">
        <div className="cta-card section-shell flex items-end justify-between gap-[42px] py-8 px-[clamp(38px,5vw,62px)] rounded-lg [background:radial-gradient(circle_at_80%_0%,rgba(235,169,47,0.34),transparent_28%),var(--maroon)] text-white mw820:items-start mw820:flex-col mw560:p-[34px_28px]">
          <div>
            <p className="eyebrow eyebrow-light">Join our school family</p>
            <h2 className="max-w-[700px] !text-white">Give your child a language for life.</h2>
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
