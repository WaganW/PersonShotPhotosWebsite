import { useState, useEffect } from 'react';
import './Navbar.css';

const NAV_LINKS = [
  { label: '首页', href: '#hero' },
  { label: '个人经历', href: '#about' },
  { label: '作品集', href: '#projects' },
  { label: '优势', href: '#strengths' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <a href="#hero" className="navbar__logo">
          <span className="navbar__logo-icon">
            <i className="fas fa-camera"></i>
          </span>
          <span className="navbar__logo-text">光影瞬间</span>
        </a>

        <div className="navbar__links">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="navbar__link">
              {link.label}
            </a>
          ))}
        </div>

        <a href="#footer" className="navbar__cta">
          <i className="fas fa-envelope"></i>
          <span>联系我</span>
        </a>
      </div>
    </nav>
  );
}