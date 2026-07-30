import { useEffect } from "react";
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
      className="photo-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="event-photo-title">{caption}</Modal.Title>
        <span className="photo-modal-position" aria-live="polite">
          {current} / {total}
        </span>
      </Modal.Header>
      <Modal.Body>
        <div className="photo-modal-stage">
          <img
            src={image}
            alt={caption}
            className="modal-event-image"
          />
          <button
            type="button"
            className="photo-modal-nav photo-modal-previous"
            aria-label="View previous photo"
            title="Previous photo"
            onClick={onPrevious}
          >
            <i className="bi bi-chevron-left" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="photo-modal-nav photo-modal-next"
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
