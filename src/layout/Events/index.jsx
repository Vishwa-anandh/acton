import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { EventImage } from "../../components/Events";
import ImageModal from "../../components/Events/imagemodal";
import heroImage from "../../assets/images/event23.jpeg";
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
    <main id="main-content" className="page-main community-page">
      <section className="community-hero section-shell">
        <div className="community-hero-copy">
          <p className="eyebrow">Our community</p>
          <h1>Where Tamil comes alive, together.</h1>
          <p>
            Classrooms are only the beginning. Our families, students, and
            volunteers create a place where language becomes performance,
            tradition, friendship, and belonging.
          </p>
          <div className="community-hero-actions">
            <a className="button button-primary" href="#community-moments">
              Explore our moments
              <i className="bi bi-arrow-down" aria-hidden="true" />
            </a>
            <a
              className="text-link"
              href="https://www.facebook.com/ActonTamilSchool/"
              target="_blank"
              rel="noreferrer"
            >
              Follow on Facebook
              <i className="bi bi-arrow-up-right" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="community-hero-media">
          <figure className="community-hero-photo community-hero-photo-main">
            <img
              src={heroImage}
              alt="Acton Tamil School students and teachers together on stage"
            />
          </figure>
          <figure className="community-hero-photo community-hero-photo-small">
            <img
              src={volunteerImage}
              alt="Acton Tamil School volunteers gathered on stage"
            />
          </figure>
          <figure className="community-hero-photo community-hero-photo-small">
            <img
              src={recognitionImage}
              alt="Community members presenting recognition on stage"
            />
          </figure>
        </div>
      </section>

      <section
        className="section section-soft community-gathering-section"
        aria-labelledby="community-gathering-title"
      >
        <div className="section-shell">
          <div className="community-section-intro">
            <div>
              <p className="eyebrow">More than a school day</p>
              <h2 id="community-gathering-title">
                Language is learned in class. Belonging is built together.
              </h2>
            </div>
            <p>
              Every gathering gives children another way to experience Tamil
              as something living, expressive, and shared across generations.
            </p>
          </div>

          <div className="community-themes">
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
        className="section events-gallery-section anchor-section"
        aria-labelledby="community-moments-title"
      >
        <div className="section-shell">
          <div className="community-gallery-heading">
            <div>
              <p className="eyebrow">Community moments</p>
              <h2 id="community-moments-title">Joy worth remembering.</h2>
            </div>
            <p>
              A look at the performances, celebrations, friendships, and
              milestones that shape our school year.
            </p>
            <span>{EventImage.length} photos</span>
          </div>

          <div className="event-gallery">
            {visiblePhotos.map((item, index) => (
              <button
                type="button"
                className={`gallery-item gallery-item-${(index % 6) + 1}`}
                key={item.image}
                onClick={() => setSelectedIndex(index)}
                aria-label={`Open photo: ${getPhotoLabel(index)}`}
              >
                <img
                  src={item.image}
                  alt={getPhotoLabel(index)}
                  loading={index < 4 ? "eager" : "lazy"}
                />
                <span>
                  <i className="bi bi-arrows-fullscreen" aria-hidden="true" />
                </span>
              </button>
            ))}
          </div>

          {!showAllPhotos && EventImage.length > INITIAL_PHOTO_COUNT && (
            <div className="community-gallery-more">
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

      <section className="section section-soft community-video-section">
        <div className="section-shell">
          <div className="section-heading section-heading-centered">
            <p className="eyebrow">Watch and listen</p>
            <h2>Voices from our school.</h2>
            <p>
              Student performances preserve traditions while giving every
              learner a chance to shine.
            </p>
          </div>
          <div className="video-feature">
            <iframe
              src="https://www.youtube.com/embed/pKHmvMrTXLA?si=hL9jblmIuROiawND"
              title="Tamil Thai Vazhthu performed by Acton Tamil School children"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              loading="lazy"
              allowFullScreen
            />
            <div>
              <span className="video-label">School year celebration</span>
              <h3 lang="ta">தமிழ்த்தாய் வாழ்த்து</h3>
              <p>
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

      <section className="section community-connect-section">
        <div className="section-shell community-connect">
          <div>
            <p className="eyebrow eyebrow-light">Stay connected</p>
            <h2>Share in what our community does next.</h2>
            <p>
              Follow school celebrations and student moments, or join the
              families learning with us.
            </p>
          </div>
          <div className="community-connect-actions">
            <a
              className="button button-light"
              href="https://www.facebook.com/ActonTamilSchool/"
              target="_blank"
              rel="noreferrer"
            >
              <i className="bi bi-facebook" aria-hidden="true" />
              Follow on Facebook
            </a>
            <a
              className="button community-connect-secondary"
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
