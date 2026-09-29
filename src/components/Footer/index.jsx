import { Link } from "react-router-dom";
import logo from "../../assets/images/logoweb.png";

const Footer = () => {
  return (
    <footer className="mt-[60px] bg-[#191514] text-white/[.68] mw560:mt-[40px]">
      <div className="section-shell grid grid-cols-[1.55fr_0.72fr_1fr_0.7fr] gap-[54px] pt-[76px] pb-[60px] mw1024:grid-cols-[1.4fr_0.7fr_1fr] mw820:grid-cols-2 mw560:grid-cols-1 mw560:gap-[30px] mw560:pt-12 mw560:pb-[42px]">
        <div className="mw820:col-span-full">
          <Link
            to="/"
            className="inline-flex items-center gap-[11px] text-white no-underline hover:text-white"
          >
            <img src={logo} alt="" className="w-[62px] h-[62px] object-contain" />
            <span className="grid gap-px leading-[1.15]">
              <strong className="text-[0.98rem] font-[730] tracking-[-0.015em]">
                Acton Tamil School
              </strong>
              <span lang="ta" className="text-white/[.58] text-[0.73rem] font-semibold">
                ஆக்டன் தமிழ்ப் பள்ளி
              </span>
            </span>
          </Link>
          <p className="max-w-[360px] mt-6 text-[0.98rem] leading-[1.65] mw560:mt-[18px]">
            Helping the next generation speak, read, and celebrate Tamil with
            confidence.
          </p>
        </div>

        <div className="flex flex-col items-start gap-[11px]">
          <h2 className="mb-2 text-white text-[0.82rem] font-[720] tracking-[0.01em] normal-case">
            Explore
          </h2>
          <Link
            to="/about"
            className="text-white/70 text-[0.87rem] no-underline transition-colors duration-150 hover:text-white mw560:[overflow-wrap:anywhere]"
          >
            Our school
          </Link>
          <Link
            to="/events"
            className="text-white/70 text-[0.87rem] no-underline transition-colors duration-150 hover:text-white mw560:[overflow-wrap:anywhere]"
          >
            Community events
          </Link>
          <Link
            to="/#faq"
            className="text-white/70 text-[0.87rem] no-underline transition-colors duration-150 hover:text-white mw560:[overflow-wrap:anywhere]"
          >
            Frequently asked questions
          </Link>
        </div>

        <div className="flex flex-col items-start gap-[11px]">
          <h2 className="mb-2 text-white text-[0.82rem] font-[720] tracking-[0.01em] normal-case">
            Get in touch
          </h2>
          <a
            href="tel:+1-978-393-1772"
            className="text-white/70 text-[0.87rem] no-underline transition-colors duration-150 hover:text-white mw560:[overflow-wrap:anywhere]"
          >
            +1 978-393-1772
          </a>
          <a
            href="mailto:actontamilschool@gmail.com"
            className="text-white/70 text-[0.87rem] no-underline transition-colors duration-150 hover:text-white mw560:[overflow-wrap:anywhere]"
          >
            actontamilschool@gmail.com
          </a>
          <span className="text-[0.87rem] mw560:[overflow-wrap:anywhere]">
            36 Charter Road, Acton, MA 01720
          </span>
        </div>

        <div className="flex flex-col items-start gap-[11px] mw1024:[grid-column:2/4] mw820:[grid-column:auto]">
          <h2 className="mb-2 text-white text-[0.82rem] font-[720] tracking-[0.01em] normal-case">
            Follow our community
          </h2>
          <div className="flex gap-[10px]">
            <a
              href="https://www.facebook.com/ActonTamilSchool/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Acton Tamil School on Facebook"
              className="grid place-items-center w-11 h-11 border border-white/[.14] rounded-full text-base hover:border-white/[.32] hover:bg-white/[.07]"
            >
              <i className="bi bi-facebook" aria-hidden="true" />
            </a>
            <a
              href="https://www.youtube.com/@actontamilschool8567"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Acton Tamil School on YouTube"
              className="grid place-items-center w-11 h-11 border border-white/[.14] rounded-full text-base hover:border-white/[.32] hover:bg-white/[.07]"
            >
              <i className="bi bi-youtube" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
      <div className="section-shell flex justify-between pt-[22px] pb-6 border-t border-white/10 text-white/45 text-[0.76rem] mw560:flex-col mw560:items-start mw560:gap-[7px]">
        <span>© {new Date().getFullYear()} Acton Tamil School</span>
        <span>Language · Culture · Community</span>
      </div>
    </footer>
  );
};

export default Footer;
