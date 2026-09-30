const mapUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2942.541916210396!2d-71.46089642440738!3d42.48003042751441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e393c44916c563%3A0x6ba8a107c00a3499!2sACTON%20TAMIL%20SCHOOL!5e0!3m2!1sen!2sin!4v1721027613242!5m2!1sen!2sin";
const mapLink =
  "https://www.google.com/maps/search/?api=1&query=Acton+Tamil+School+36+Charter+Road+Acton+MA+01720";

const contactItems = [
  {
    icon: "bi-telephone",
    label: "Call us",
    value: "+1 978-393-1772",
    href: "tel:+1-978-393-1772",
  },
  {
    icon: "bi-envelope",
    label: "Email us",
    value: "actontamilschool@gmail.com",
    href: "mailto:actontamilschool@gmail.com",
  },
  {
    icon: "bi-geo-alt",
    label: "Visit us",
    value: "36 Charter Road, Acton, MA 01720",
    href: mapLink,
  },
];

const ContactUs = () => {
  return (
    <div className="section-shell">
      <div className="section-heading section-heading-centered">
        <p className="eyebrow">We are here to help</p>
        <h2>Come learn with our community.</h2>
        <p>
          Ask us about enrollment, student placement, volunteering, or a first
          visit. We would love to welcome your family.
        </p>
      </div>
      <div className="grid grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] min-h-[540px] overflow-hidden border border-line rounded-lg bg-white shadow-sm mw1024:grid-cols-1 mw820:min-h-0">
        <div className="p-[clamp(34px,4.5vw,58px)] mw560:px-5 mw560:py-7">
          <p className="mb-[7px] text-maroon text-[1.1rem] font-[680]" lang="ta">
            வணக்கம்
          </p>
          <h3 className="m-0 text-[clamp(2rem,4vw,3.4rem)] font-[720] tracking-heading leading-[1.05] mw560:text-[clamp(2rem,10vw,2.55rem)]">
            Let’s start a conversation.
          </h3>
          <p className="mt-5 mb-[30px] text-ink-soft text-[1rem] mw560:mt-4 mw560:mb-6 mw560:text-[0.95rem]">
            Classes meet on Sunday mornings. Reach out and our volunteer team
            will help you find the right next step.
          </p>
          <div className="grid">
            {contactItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.label === "Visit us" ? "_blank" : undefined}
                rel={item.label === "Visit us" ? "noreferrer" : undefined}
                className="grid grid-cols-[45px_1fr_auto] gap-[13px] items-center min-w-0 py-[17px] border-t border-line text-ink no-underline [&:hover_strong]:text-maroon mw560:grid-cols-[42px_minmax(0,1fr)_auto] mw560:gap-[10px] mw560:py-[15px]"
              >
                <span
                  className="grid place-items-center w-10 h-10 rounded-full bg-paper-warm text-maroon mw560:w-[38px] mw560:h-[38px]"
                  aria-hidden="true"
                >
                  <i className={`bi ${item.icon}`} />
                </span>
                <span className="grid min-w-0">
                  <small className="text-ink-muted text-[0.78rem] font-[650] tracking-normal normal-case">
                    {item.label}
                  </small>
                  <strong className="min-w-0 [overflow-wrap:anywhere] text-[0.91rem] font-[650] transition-colors duration-[160ms] ease">
                    {item.value}
                  </strong>
                </span>
                <i
                  className="bi bi-arrow-up-right text-ink-muted text-[0.85rem]"
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </div>
        <div className="relative min-h-[500px] overflow-hidden bg-paper-soft mw1024:min-h-[460px] mw820:min-h-[420px] mw560:min-h-[350px]">
          <iframe
            title="Map showing Acton Tamil School at 36 Charter Road, Acton"
            src={mapUrl}
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            loading="lazy"
            className="w-full h-full min-h-[540px] border-0 [filter:saturate(0.75)_contrast(0.95)] mw1024:min-h-[460px] mw820:min-h-[420px] mw560:min-h-[350px]"
          />
          <span className="absolute right-5 bottom-5 inline-flex items-center gap-[9px] py-[11px] px-[15px] rounded-full bg-white/[.94] shadow-sm text-[0.8rem] font-bold">
            <i className="bi bi-pin-map-fill text-maroon" aria-hidden="true" />
            Acton, Massachusetts
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
