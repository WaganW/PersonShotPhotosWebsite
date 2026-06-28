import { FOOTER, PERSONAL } from '../data/portfolioData';
import ScrollReveal from './ScrollReveal';
import SplitText from './SplitText';
import SectionBackground from './SectionBackground';
import ApertureDecoration from './ApertureDecoration';

import './Footer.css';

export default function Footer() {
  return (
    <footer id="footer" className="footer">
      <SectionBackground type="mesh" />
      <div className="footer__bg" />
      <ApertureDecoration className="footer__aperture" />

      <div className="footer__content">
        <ScrollReveal>
          <div className="footer__header">
            <div className="section-label" style={{ justifyContent: 'center' }}>联系方式</div>
            <SplitText text="让我们聊聊你的故事" tag="h2" className="footer__title"
              delay={60} duration={0.9} from={{ opacity: 0, y: 40 }} to={{ opacity: 1, y: 0 }}
              threshold={0.1} rootMargin="-50px" textAlign="center" />
            <SplitText text="无论是个人写真、商业项目还是创意合作，我都很乐意倾听你的想法" tag="p" className="footer__subtitle"
              delay={25} duration={0.6} splitType="chars"
              from={{ opacity: 0, y: 20 }} to={{ opacity: 1, y: 0 }}
              threshold={0.1} rootMargin="-30px" textAlign="center" />
            <div className="divider" style={{ margin: '24px auto' }}></div>
          </div>

          <div className="footer__contact">
            <a href={`mailto:${PERSONAL.email}`} className="footer__contact-link">
              <i className="fas fa-envelope"></i><span>{PERSONAL.email}</span>
            </a>
            <a href="#" className="footer__contact-link">
              <i className="fab fa-instagram"></i><span>{PERSONAL.instagram}</span>
            </a>
          </div>

          <div className="footer__social">
            {FOOTER.socialLinks.map((link, i) => (
              <a key={i} href={link.url} className="footer__social-link" target="_blank" rel="noopener noreferrer">
                {link.label === 'Instagram' && <i className="fab fa-instagram"></i>}
                {link.label === '微博' && <i className="fab fa-weibo"></i>}
                {link.label === '小红书' && <i className="fas fa-book-open"></i>}
                <span>{link.handle}</span>
              </a>
            ))}
          </div>

          <div className="footer__icon-row">
            <span className="footer__diamond">◆</span>
            <i className="fas fa-camera footer__camera-icon"></i>
            <span className="footer__diamond">◆</span>
          </div>
        </ScrollReveal>
      </div>

      <div className="footer__bottom">
        <span className="footer__bottom-dot"></span>
        <p>{FOOTER.copyright}</p>
        <span className="footer__bottom-dot"></span>
      </div>
    </footer>
  );
}
