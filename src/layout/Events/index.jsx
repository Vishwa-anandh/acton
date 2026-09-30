import { useState } from "react";
import { EventImage } from "../../components/Events";
import ImageModal from "../../components/Events/imagemodal";
import heroImage from "../../assets/images/event43.jpeg";
import volunteerImage from "../../assets/images/event001.webp";
import recognitionImage from "../../assets/images/event28.jpeg";

const INITIAL_PHOTO_COUNT = 12;

const photoLabels = [
  "Students celebrating the school year",
  "Tamil cultural performance",
  "Families at a school gathering",
  "Students sharing a stage moment",
  "A colorful Tamil celebration",
  "Our volunteer school community",
];

const gatheringThemes = [
  {
    icon: "bi-calendar-heart",
    title: "Celebrate together",
    copy: "Pongal, Tamil New Year, and school milestones bring language, food, music, and tradition into one shared experience.",
  },
  {
    icon: "bi-mic",
    title: "Take the stage",
    copy: "Performances give students a joyful reason to speak, sing, create, and share Tamil with confidence.",
  },
  {
    icon: "bi-people",
    title: "Make it possible",
    copy: "Families and volunteer educators bring their time and care to every class, gathering, and celebration.",
  },
];

const EventsLayout = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const visiblePhotos = showAllPhotos
    ? EventImage
    : EventImage.slice(0, INITIAL_PHOTO_COUNT);
  const selectedPhoto =
    selectedIndex === null ? null : EventImage[selectedIndex];
  const getPhotoLabel = (index) =>
    photoLabels[index % photoLabels.length];

  const selectAdjacentPhoto = (direction) => {
    setSelectedIndex((currentIndex) => {
      if (currentIndex === null) return null;
      return (
        (currentIndex + direction + EventImage.length) % EventImage.length
      );
    });
  };

  return (
    <main id="main-content" className="pt-[78px] mw560:pt-[70px]">
      <section className="section-shell relative flex items-end min-h-[clamp(590px,calc(100svh-130px),720px)] mt-7 p-[clamp(34px,5vw,70px)] overflow-hidden rounded-lg bg-[#171314] text-white after:absolute after:inset-0 after:z-[1] after:[background:linear-gradient(90deg,rgba(15,9,11,0.86),rgba(15,9,11,0.34)_62%,rgba(15,9,11,0.08)),linear-gradient(0deg,rgba(15,9,11,0.68),transparent_52%)] after:content-[''] mw1024:min-h-[650px] mw820:min-h-[620px] mw820:mt-[18px] mw820:p-[38px] mw820:after:[background:linear-gradient(90deg,rgba(15,9,11,0.82),rgba(15,9,11,0.28)),linear-gradient(0deg,rgba(15,9,11,0.82),transparent_70%)] mw560:min-h-[570px] mw560:mt-[14px] mw560:p-[26px_22px]">
        <div className="relative z-[2] max-w-[760px]">
          <p className="eyebrow text-[#f4c76e]">Our community</p>
          <h1 className="max-w-[720px] m-0 text-white text-[clamp(3.35rem,6vw,5.7rem)] tracking-normal leading-[0.95] mw560:text-[clamp(2.7rem,13vw,3.55rem)] mw560:leading-[0.98]">
            Where Tamil comes alive, together.
          </h1>
          <p className="max-w-[630px] mt-6 text-white/[.78] text-[clamp(1rem,1.4vw,1.14rem)] leading-[1.65] mw560:mt-[18px] mw560:text-[0.94rem] mw560:leading-[1.58]">
            Classrooms are only the beginning. Our families, students, and
            volunteers create a place where language becomes performance,
            tradition, friendship, and belonging.
          </p>
          <div className="flex items-center flex-wrap gap-[22px] mt-[30px] mw560:items-stretch mw560:flex-col mw560:gap-4 mw560:mt-6">
            <a
              className="button button-primary bg-white shadow-[0_14px_34px_rgba(0,0,0,0.2)] text-ink hover:bg-paper-warm hover:text-ink mw560:w-full"
              href="#community-moments"
            >
              Explore our moments
              <i className="bi bi-arrow-down" aria-hidden="true" />
            </a>
            <a
              className="text-link text-white hover:text-[#f4c76e] mw560:justify-center"
              href="https://www.facebook.com/ActonTamilSchool/"
              target="_blank"
              rel="noreferrer"
            >
              Follow on Facebook
              <i className="bi bi-arrow-up-right" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="absolute inset-0 grid grid-rows-2 grid-cols-[minmax(0,2.35fr)_minmax(220px,0.65fr)] gap-1 mw1024:grid-cols-[minmax(0,2.6fr)_minmax(190px,0.7fr)] mw820:block">
          <figure className="min-w-0 min-h-0 m-0 overflow-hidden bg-[#171314] row-span-2 mw820:w-full mw820:h-full">
            <img
              src={heroImage}
              alt="Acton Tamil School students and teachers together on stage"
              className="w-full h-full object-cover object-[center_36%] mw560:object-[54%_center]"
            />
          </figure>
          <figure className="min-w-0 min-h-0 m-0 overflow-hidden bg-[#171314] mw820:hidden">
            <img
              src={volunteerImage}
              alt="Acton Tamil School volunteers gathered on stage"
              className="w-full h-full object-cover [filter:saturate(0.9)_brightness(0.88)]"
            />
          </figure>
          <figure className="min-w-0 min-h-0 m-0 overflow-hidden bg-[#171314] mw820:hidden">
            <img
              src={recognitionImage}
              alt="Community members presenting recognition on stage"
              className="w-full h-full object-cover [filter:saturate(0.9)_brightness(0.88)]"
            />
          </figure>
        </div>
      </section>

      <section
        className="section section-soft mt-12 pb-6 mw820:mt-[54px]"
        aria-labelledby="community-gathering-title"
      >
        <div className="section-shell">
          <div className="grid grid-cols-[minmax(0,1.25fr)_minmax(280px,0.55fr)] gap-[clamp(24px,4vw,64px)] items-start mb-8 mw1024:gap-12 mw820:grid-cols-1 mw820:gap-[22px] mw820:mb-9">
            <div>
              <p className="eyebrow">More than a school day</p>
              <h2
                id="community-gathering-title"
                className="max-w-[820px] m-0 text-[clamp(2.4rem,4.5vw,4.25rem)] tracking-normal mw560:text-[clamp(2.15rem,10.5vw,2.8rem)]"
              >
                Language is learned in class. Belonging is built together.
              </h2>
            </div>
            <p className="mt-[34px] mb-[7px] text-ink-soft text-[1.25rem] leading-[1.7] mw820:max-w-[650px] mw820:text-[1.05rem] mw820:mt-0">
              Every gathering gives children another way to experience Tamil
              as something living, expressive, and shared across generations.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-5 mw820:grid-cols-1">
            {gatheringThemes.map((theme, index) => (
              <article className="feature-card" key={theme.title}>
                <span className="feature-number" aria-hidden="true">
                  0{index + 1}
                </span>
                <h3>
                  {theme.title}
                  <span className="feature-icon" aria-hidden="true">
                    <i className={`bi ${theme.icon}`} />
                  </span>
                </h3>
                <p>{theme.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="community-moments"
        className="section anchor-section pt-8 pb-6 mw820:pt-[72px]"
        aria-labelledby="community-moments-title"
      >
        <div className="section-shell">
          <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(280px,0.62fr)_auto] gap-[clamp(30px,5vw,70px)] items-end mb-[42px] mw1024:grid-cols-[minmax(0,1fr)_minmax(250px,0.7fr)] mw820:grid-cols-1 mw820:gap-[22px] mw820:mb-9 mw560:mb-[30px]">
            <div>
              <p className="eyebrow">Community moments</p>
              <h2
                id="community-moments-title"
                className="max-w-[820px] m-0 text-[clamp(2.4rem,4.5vw,4.25rem)] tracking-normal mw560:text-[clamp(2.15rem,10.5vw,2.8rem)]"
              >
                Joy worth remembering.
              </h2>
            </div>
            <p className="mt-0 mb-[7px] text-ink-soft leading-[1.65] mw1024:col-start-2 mw820:max-w-[650px] mw820:text-[1.05rem]">
              A look at the performances, celebrations, friendships, and
              milestones that shape our school year.
            </p>
            <span className="mb-2 text-maroon text-[0.8rem] font-[760] whitespace-nowrap mw1024:col-start-2 mw820:col-auto mw820:mt-0 mw820:mb-0">
              {EventImage.length} photos
            </span>
          </div>

          <div className="grid auto-rows-[clamp(280px,26vw,360px)] grid-cols-12 gap-[10px] mw820:auto-rows-[350px] mw820:grid-cols-2 mw560:auto-rows-[300px] mw560:gap-[9px]">
            {visiblePhotos.map((item, index) => {
              const cyclePosition = index % 6;
              const isWide5 = cyclePosition === 0 || cyclePosition === 5;
              const isWide7 = cyclePosition === 1 || cyclePosition === 4;
              const isQuadStart = index % 4 === 0;
              return (
                <button
                  type="button"
                  className={`group relative m-0 p-0 overflow-hidden border-0 rounded-[6px] bg-paper-soft cursor-zoom-in ${
                    isWide5 ? "col-span-5" : isWide7 ? "col-span-7" : "col-span-4"
                  } mw820:row-span-1 ${
                    isQuadStart ? "mw820:col-span-2" : "mw820:col-span-1"
                  }`}
                  key={item.image}
                  onClick={() => setSelectedIndex(index)}
                  aria-label={`Open photo: ${getPhotoLabel(index)}`}
                >
                  <img
                    src={item.image}
                    alt={getPhotoLabel(index)}
                    loading={index < 4 ? "eager" : "lazy"}
                    className="w-full h-full object-cover object-center transition-[filter,transform] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:[filter:saturate(1.06)] group-hover:scale-[1.035]"
                  />
                  <span className="absolute right-[14px] bottom-[14px] grid place-items-center w-10 h-10 rounded-full bg-white/[.94] shadow-sm text-ink opacity-0 translate-y-[6px] transition-[opacity,transform] duration-[180ms] ease group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0 mw560:hidden">
                    <i className="bi bi-arrows-fullscreen" aria-hidden="true" />
                  </span>
                </button>
              );
            })}
          </div>

          {!showAllPhotos && EventImage.length > INITIAL_PHOTO_COUNT && (
            <div className="flex justify-center mt-[34px]">
              <button
                type="button"
                className="button button-secondary"
                onClick={() => setShowAllPhotos(true)}
              >
                Show all {EventImage.length} photos
                <i className="bi bi-images" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="section section-soft mt-0 pt-8">
        <div className="section-shell">
          <div className="section-heading section-heading-centered">
            <p className="eyebrow">Watch and listen</p>
            <h2>Voices from our school.</h2>
            <p>
              Student performances preserve traditions while giving every
              learner a chance to shine.
            </p>
          </div>
          <div className="grid grid-cols-[minmax(0,1.25fr)_minmax(280px,0.75fr)] gap-[clamp(32px,6vw,70px)] items-center mw820:grid-cols-1">
            <iframe
              src="https://www.youtube.com/embed/pKHmvMrTXLA?si=hL9jblmIuROiawND"
              title="Tamil Thai Vazhthu performed by Acton Tamil School children"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              loading="lazy"
              allowFullScreen
              className="w-full aspect-video border-0 rounded-[8px] shadow-sm"
            />
            <div>
              <span className="text-maroon text-[0.82rem] font-[740]">
                School year celebration
              </span>
              <h3 lang="ta" className="mt-3 mb-4 text-[clamp(2rem,4vw,3.3rem)] font-[720] tracking-normal">
                தமிழ்த்தாய் வாழ்த்து
              </h3>
              <p className="mb-[22px] text-ink-soft leading-[1.7]">
                Tamil Thai Vazhthu performed by Acton Tamil School students to
                mark a successful year of learning.
              </p>
              <a
                className="text-link"
                href="https://www.youtube.com/@actontamilschool8567"
                target="_blank"
                rel="noreferrer"
              >
                Visit our YouTube channel
                <i className="bi bi-arrow-up-right" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section pb-6">
        <div className="section-shell flex items-end justify-between gap-12 py-8 px-[clamp(40px,5vw,66px)] rounded-[8px] bg-green text-white mw1024:items-start mw1024:flex-col">
          <div>
            <p className="eyebrow eyebrow-light">Stay connected</p>
            <h2 className="max-w-[720px] m-0 text-white text-[clamp(2.35rem,4.5vw,4rem)] tracking-normal mw560:text-[clamp(2.2rem,11vw,3rem)]">
              Share in what our community does next.
            </h2>
            <p className="max-w-[600px] mt-5 text-white/75 leading-[1.65]">
              Follow school celebrations and student moments, or join the
              families learning with us.
            </p>
          </div>
          <div className="flex items-center flex-wrap justify-end gap-3 mw1024:justify-start mw560:items-stretch mw560:flex-col">
            <a
              className="button button-light mw560:w-full"
              href="https://www.facebook.com/ActonTamilSchool/"
              target="_blank"
              rel="noreferrer"
            >
              <i className="bi bi-facebook" aria-hidden="true" />
              Follow on Facebook
            </a>
            <a
              className="button border-white/[.44] bg-transparent text-white hover:border-white/80 hover:bg-white/[.08] hover:text-white mw560:w-full"
              href="https://www.catamilacademy.org/cta/login.aspx?ReturnUrl=%2fcta"
              target="_blank"
              rel="noreferrer"
            >
              Enroll now
              <i className="bi bi-arrow-up-right" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <ImageModal
        show={selectedIndex !== null}
        onHide={() => setSelectedIndex(null)}
        image={selectedPhoto?.image}
        caption={
          selectedIndex === null ? "" : getPhotoLabel(selectedIndex)
        }
        current={selectedIndex === null ? 0 : selectedIndex + 1}
        total={EventImage.length}
        onPrevious={() => selectAdjacentPhoto(-1)}
        onNext={() => selectAdjacentPhoto(1)}
      />
    </main>
  );
};

export default EventsLayout;
