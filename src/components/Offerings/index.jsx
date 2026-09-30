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
      <section className="section !pt-5 [background:radial-gradient(circle_at_10%_10%,rgba(235,169,47,0.08),transparent_28%),var(--paper)]">
        <div className="section-shell relative grid grid-cols-[minmax(300px,0.78fr)_minmax(0,1.22fr)] gap-[clamp(30px,4vw,58px)] p-[clamp(30px,4vw,58px)] overflow-hidden border border-[rgba(143,21,56,0.1)] rounded-[clamp(30px,3vw,48px)] [background:radial-gradient(circle_at_8%_100%,rgba(143,21,56,0.1),transparent_34%),radial-gradient(circle_at_96%_4%,rgba(235,169,47,0.14),transparent_30%),#f7f1e8] shadow-[0_24px_70px_rgba(68,42,23,0.1)] text-ink before:absolute before:-top-[120px] before:-left-20 before:w-[300px] before:h-[300px] before:border before:border-[rgba(143,21,56,0.11)] before:rounded-full before:content-[''] before:pointer-events-none mw820:grid-cols-1 mw820:p-[34px] mw560:gap-6 mw560:p-5 mw560:rounded-[26px]">
          <div className="relative z-[1] self-center mw560:max-w-[660px]">
            <p className="eyebrow">How children learn</p>
            <h2 className="max-w-[600px] m-0 text-ink text-[clamp(2.35rem,4.4vw,4.4rem)] font-[720] tracking-heading leading-none mw560:text-[clamp(2.05rem,10.5vw,2.75rem)] mw560:leading-[1.03]">
              A clear path from first words to confident expression.
            </h2>
            <p className="max-w-[560px] mt-6 text-ink-soft text-[clamp(1rem,1.35vw,1.12rem)] leading-[1.65] mw560:mt-[17px] mw560:text-[0.96rem] mw560:leading-[1.58]">
              Each Sunday combines conversation, structured literacy, and
              cultural practice—so children learn Tamil by using it together.
            </p>
          </div>

          <figure className="relative min-h-[440px] m-0 overflow-hidden border-[5px] border-white/[.76] rounded-[clamp(24px,2.5vw,36px)] bg-[#0e0d0e] shadow-[0_20px_48px_rgba(68,42,23,0.16)] after:absolute after:inset-0 after:[background:linear-gradient(0deg,rgba(12,7,9,0.68),transparent_42%)] after:content-[''] after:pointer-events-none mw820:min-h-0 mw820:aspect-video mw560:aspect-[4/3] mw560:rounded-[20px]">
            <img
              src={learningActivityImage}
              alt="Acton Tamil School students taking part in a Tamil learning activity on stage"
              width="1523"
              height="761"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center"
            />
            <figcaption className="absolute right-[18px] bottom-[18px] z-[1] inline-flex items-center gap-[9px] py-[11px] px-[15px] border border-white/[.22] rounded-full bg-[rgba(20,12,15,0.72)] text-white text-[0.8rem] font-[680] [backdrop-filter:blur(14px)] mw560:right-3 mw560:bottom-3 mw560:max-w-[calc(100%-24px)] mw560:py-1.5 mw560:px-2.5 mw560:text-[0.65rem]">
              <i className="bi bi-people-fill" aria-hidden="true" />
              Learning through participation
            </figcaption>
          </figure>

          <div className="relative z-[1] grid col-span-full grid-cols-[repeat(3,minmax(0,1fr))] gap-5 mw560:grid-cols-1 mw560:gap-[10px]">
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

      <section className="section !pt-5 !pb-6">
        <div className="section-shell relative min-h-[480px] overflow-hidden rounded-lg bg-ink shadow-md after:absolute after:inset-0 after:[background:linear-gradient(90deg,rgba(20,8,12,0.88)_0%,rgba(20,8,12,0.53)_52%,rgba(20,8,12,0.08)_100%),linear-gradient(0deg,rgba(20,8,12,0.35),transparent_50%)] after:content-[''] mw820:min-h-[500px] mw820:after:[background:linear-gradient(0deg,rgba(20,8,12,0.92),rgba(20,8,12,0.22)_75%)] mw560:min-h-[450px]">
          <img
            src={communityImage}
            alt="Students, teachers, and families gathered on stage at Acton Tamil School"
            width="1350"
            height="620"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover mw560:object-[58%_center]"
          />
          <div className="community-overlay relative z-[1] flex flex-col items-start justify-center w-[min(570px,100%)] min-h-[480px] p-[clamp(36px,5vw,68px)] text-white mw820:min-h-[500px] mw820:justify-end mw820:w-full mw560:min-h-[450px] mw560:p-[26px_22px]">
            <p className="eyebrow eyebrow-light">More than a classroom</p>
            <h2>A community growing together.</h2>
            <p className="mt-6 mb-[30px] text-white/80 text-[1.08rem] leading-[1.65] mw560:mt-[18px] mw560:mb-6 mw560:text-[0.98rem] mw560:leading-[1.58]">
              Festivals, performances, friendships, and shared traditions make
              Tamil something children live—not only something they study.
            </p>
            <Link className="button button-light mw560:w-full" to="/events">
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
