import { useEffect, useRef } from 'react';
import { HERO_VIDEO, HERO_TITLE, HERO_SUBTITLE } from '../data/portfolioData';
import ApertureDecoration from './ApertureDecoration';
import SectionBackground from './SectionBackground';
import './Hero.css';

export default function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.play().catch(() => {});
  }, []);

  return (
    <section id="hero" className="hero">
      <div className="hero__bg">
        <video ref={videoRef} className="hero__video" src={HERO_VIDEO} muted loop playsInline
          poster="/photos/pexels-stars-1869692_1920.jpg" />
        <div className="hero__overlay" />
        <SectionBackground type="mesh" />
        <ApertureDecoration className="hero__aperture" />
      </div>

      <div className="hero__content">
        <div className="hero__label-row">
          <span className="gold-dot"></span>
          <span className="gold-dot gold-dot--small"></span>
          <span className="hero__label">摄影作品集</span>
          <span className="gold-dot gold-dot--small"></span>
          <span className="gold-dot"></span>
        </div>
        <h1 className="hero__title">{HERO_TITLE}</h1>
        <div className="hero__divider">
          <span className="hero__divider-line"></span>
          <span className="hero__divider-diamond">◆</span>
          <span className="hero__divider-line"></span>
        </div>
        <p className="hero__subtitle">{HERO_SUBTITLE}</p>
        <div className="hero__actions">
          <a href="#projects" className="hero__btn hero__btn--primary">
            <i className="fas fa-camera"></i>浏览作品
          </a>
          <a href="#footer" className="hero__btn hero__btn--outline">
            <i className="fas fa-envelope"></i>与我联系
          </a>
        </div>
      </div>

      <div className="hero__scroll">
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}
