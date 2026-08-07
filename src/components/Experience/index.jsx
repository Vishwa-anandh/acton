const features = [
  {
    icon: "bi-person-hearts",
    title: "Teachers who care",
    copy: "Experienced parent-volunteers create a patient, encouraging classroom for every learner.",
  },
  {
    icon: "bi-journal-bookmark-fill",
    title: "A trusted curriculum",
    copy: "The International Tamil Academy pathway builds confident speaking, reading, and writing.",
  },
  {
    icon: "bi-stars",
    title: "Culture brought to life",
    copy: "Children experience Tamil through stories, music, arts, celebrations, and time together.",
  },
];

const Experience = () => {
  return (
    <section className="section section-soft">
      <div className="section-shell">
        <div className="section-heading section-heading-centered">
          <p className="eyebrow">Why families choose ATS</p>
          <h2>A school experience children look forward to.</h2>
          <p>
            Thoughtful teaching meets a close-knit community, giving every
            child room to learn and belong.
          </p>
        </div>
        <div className="feature-grid">
          {features.map((feature, index) => (
            <article className="feature-card" key={feature.title}>
              <span className={`feature-number`}>0{index + 1}</span>
              <h3>
                {feature.title}
                <span className="feature-icon" aria-hidden="true">
                  <i className={`bi ${feature.icon}`} />
                </span>
              </h3>
              <p>{feature.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
