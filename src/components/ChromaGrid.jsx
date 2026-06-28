import { useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import './ChromaGrid.css';

export default function ChromaGrid({
  items,
  className = '',
  radius = 300,
  columns = 3,
  damping = 0.45,
  fadeOut = 0.6,
  ease = 'power3.out',
  onImageClick
}) {
  const rootRef = useRef(null);
  const fadeRef = useRef(null);
  const setX = useRef(null);
  const setY = useRef(null);
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, '--x', 'px');
    setY.current = gsap.quickSetter(el, '--y', 'px');
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = useCallback((x, y) => {
    gsap.to(pos.current, {
      x, y, duration: damping, ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true
    });
  }, [damping, ease]);

  const handleMove = useCallback(e => {
    if (!rootRef.current) return;
    const r = rootRef.current.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  }, [moveTo]);

  const handleLeave = useCallback(() => {
    gsap.to(fadeRef.current, { opacity: 1, duration: fadeOut, overwrite: true });
  }, [fadeOut]);

  const handleCardClick = useCallback((item) => {
    if (onImageClick) {
      onImageClick(item.image, item.title);
    } else if (item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    }
  }, [onImageClick]);

  const handleCardMove = useCallback(e => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  }, []);

  return (
    <div
      ref={rootRef}
      className={`chroma-grid ${className}`}
      style={{ '--r': `${radius}px`, '--cols': columns }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {items.map((c, i) => (
        <article
          key={i}
          className="chroma-card"
          onMouseMove={handleCardMove}
          onClick={() => handleCardClick(c)}
          style={{
            '--card-border': c.borderColor || 'transparent',
            '--card-gradient': c.gradient,
            cursor: 'pointer'
          }}
        >
          <div className="chroma-img-wrapper">
            <img src={c.image} alt={c.title} loading="lazy" />
          </div>
          <footer className="chroma-info">
            <h3 className="chroma-name">{c.title}</h3>
            {c.handle && <span className="chroma-handle">{c.handle}</span>}
            <p className="chroma-role">{c.subtitle}</p>
          </footer>
        </article>
      ))}
      <div className="chroma-overlay" />
      <div ref={fadeRef} className="chroma-fade" />
    </div>
  );
}
