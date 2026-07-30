import { useState } from "react";

const mapUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2942.541916210396!2d-71.46089642440738!3d42.48003042751441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e393c44916c563%3A0x6ba8a107c00a3499!2sACTON%20TAMIL%20SCHOOL!5e0!3m2!1sen!2sin!4v1721027613242!5m2!1sen!2sin";
const mapLink =
  "https://www.google.com/maps/search/?api=1&query=Acton+Tamil+School+36+Charter+Road+Acton+MA+01720";

const contactItems = [
  {
    icon: "bi-telephone",
    label: "Call us",
    value: "978-393-1772",
    href: "tel:978-393-1772",
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
  const [mapLoaded, setMapLoaded] = useState(false);

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
      <div className="contact-card">
        <div className="contact-content">
          <p className="contact-tamil" lang="ta">
            வணக்கம்
          </p>
          <h3>Let’s start a conversation.</h3>
          <p>
            Classes meet on Sunday mornings. Reach out and our volunteer team
            will help you find the right next step.
          </p>
          <div className="contact-list">
            {contactItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.label === "Visit us" ? "_blank" : undefined}
                rel={item.label === "Visit us" ? "noreferrer" : undefined}
              >
                <span className="contact-icon" aria-hidden="true">
                  <i className={`bi ${item.icon}`} />
                </span>
                <span>
                  <small>{item.label}</small>
                  <strong>{item.value}</strong>
                </span>
                <i className="bi bi-arrow-up-right" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
        <div className="map-wrap">
          {mapLoaded ? (
            <>
              <iframe
                title="Map showing Acton Tamil School at 36 Charter Road, Acton"
                src={mapUrl}
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                loading="lazy"
              />
              <span className="map-label">
                <i className="bi bi-pin-map-fill" aria-hidden="true" />
                Acton, Massachusetts
              </span>
            </>
          ) : (
            <div className="map-placeholder">
              <span className="map-pin" aria-hidden="true">
                <i className="bi bi-geo-alt-fill" />
              </span>
              <p className="eyebrow">Visit our classrooms</p>
              <h3>36 Charter Road, Acton</h3>
              <p>
                Sunday classes at the Acton-Boxborough Regional High School
                campus.
              </p>
              <div className="map-actions">
                <button
                  type="button"
                  className="button button-primary button-small"
                  onClick={() => setMapLoaded(true)}
                >
                  Load interactive map
                </button>
                <a
                  className="text-link"
                  href={mapLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open in Maps
                  <i className="bi bi-arrow-up-right" aria-hidden="true" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
