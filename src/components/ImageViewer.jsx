import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import './ImageViewer.css';

export default function ImageViewer({ image, title, onClose }) {
  const overlayRef = useRef(null);
  const imgRef = useRef(null);

  const handleClose = useCallback(() => {
    const tl = gsap.timeline({
      onComplete: onClose
    });
    tl.to(imgRef.current, { scale: 0.92, opacity: 0, duration: 0.25, ease: 'power2.in' }, 0)
      .to(overlayRef.current, { opacity: 0, duration: 0.2 }, 0);
  }, [onClose]);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0)
      .fromTo(imgRef.current, { scale: 0.88, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'power3.out' }, 0.05);

    const handleKey = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleClose]);

  return (
    <div ref={overlayRef} className="image-viewer" onClick={handleClose}>
      <button className="image-viewer__close" onClick={handleClose} aria-label="关闭">
        <i className="fas fa-times"></i>
      </button>
      <div className="image-viewer__container" onClick={e => e.stopPropagation()}>
        <img ref={imgRef} src={image} alt={title || ''} className="image-viewer__img" />
        {title && <p className="image-viewer__caption">{title}</p>}
      </div>
    </div>
  );
}
