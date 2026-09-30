import { useEffect } from "react";
import "./bootstrap-modal.scss";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";

const ImageModal = ({
  image,
  caption,
  current,
  total,
  onPrevious,
  onNext,
  show,
  ...props
}) => {
  useEffect(() => {
    if (!show) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") onPrevious();
      if (event.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNext, onPrevious, show]);

  return (
    <Modal
      {...props}
      show={show}
      size="xl"
      aria-labelledby="event-photo-title"
      centered
      className="[&_.modal-content]:overflow-hidden [&_.modal-content]:border-0 [&_.modal-content]:rounded-lg [&_.modal-content]:shadow-md [&_.modal-header]:gap-4 [&_.modal-header]:border-b-line [&_.modal-title]:flex-1 [&_.modal-title]:text-base [&_.modal-title]:font-[680] [&_.modal-body]:p-0 [&_.modal-body]:bg-[#0d0d0e] mw560:[&_.modal-header]:gap-[10px] mw560:[&_.modal-header]:p-[14px] mw560:[&_.modal-title]:overflow-hidden mw560:[&_.modal-title]:text-[0.84rem] mw560:[&_.modal-title]:overflow-ellipsis mw560:[&_.modal-title]:whitespace-nowrap"
    >
      <Modal.Header closeButton>
        <Modal.Title id="event-photo-title">{caption}</Modal.Title>
        <span
          className="text-ink-muted text-[0.8rem] font-[680]"
          aria-live="polite"
        >
          {current} / {total}
        </span>
      </Modal.Header>
      <Modal.Body>
        <div className="relative grid place-items-center min-h-[min(72vh,760px)] mw820:min-h-[60vh] mw560:min-h-[52vh]">
          <img
            src={image}
            alt={caption}
            className="w-full max-h-[78vh] object-contain"
          />
          <button
            type="button"
            className="absolute top-1/2 left-[18px] grid place-items-center w-[46px] h-[46px] p-0 border border-white/[.34] rounded-full bg-[rgba(15,13,14,0.72)] text-white -translate-y-1/2 [backdrop-filter:blur(12px)] transition-[background-color,transform] duration-[180ms] ease hover:bg-[rgba(15,13,14,0.92)] hover:-translate-y-1/2 hover:scale-[1.04] mw560:w-10 mw560:h-10 mw560:left-2"
            aria-label="View previous photo"
            title="Previous photo"
            onClick={onPrevious}
          >
            <i className="bi bi-chevron-left" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="absolute top-1/2 right-[18px] grid place-items-center w-[46px] h-[46px] p-0 border border-white/[.34] rounded-full bg-[rgba(15,13,14,0.72)] text-white -translate-y-1/2 [backdrop-filter:blur(12px)] transition-[background-color,transform] duration-[180ms] ease hover:bg-[rgba(15,13,14,0.92)] hover:-translate-y-1/2 hover:scale-[1.04] mw560:w-10 mw560:h-10 mw560:right-2"
            aria-label="View next photo"
            title="Next photo"
            onClick={onNext}
          >
            <i className="bi bi-chevron-right" aria-hidden="true" />
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

ImageModal.propTypes = {
  image: PropTypes.string,
  caption: PropTypes.string.isRequired,
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default ImageModal;
