import { PERSONAL } from '../data/portfolioData';
import ScrollReveal from './ScrollReveal';
import SplitText from './SplitText';
import SectionBackground from './SectionBackground';
import ApertureDecoration from './ApertureDecoration';

import './About.css';

export default function About() {
  return (
    <section id="about" className="about">
      <SectionBackground type="mesh" />
      <ApertureDecoration className="about__aperture" />

      <div className="section">
        <ScrollReveal>
          <div className="section-label">个人经历</div>
          <SplitText text="关于子艺" tag="h2" className="section-title"
            delay={60} duration={0.8} from={{ opacity: 0, y: 40 }} to={{ opacity: 1, y: 0 }}
            threshold={0.2} rootMargin="-50px" textAlign="left" />
          <SplitText text="用镜头探索世界，用光影记录故事" tag="p" className="section-subtitle"
            delay={35} duration={0.6} splitType="chars"
            from={{ opacity: 0, y: 20, color: '#7ba0b0' }} to={{ opacity: 1, y: 0, color: 'var(--text-secondary)' }}
            threshold={0.2} rootMargin="-50px" textAlign="left" />
          <div className="divider"></div>
        </ScrollReveal>

        <div className="about__grid">
          <ScrollReveal className="about__avatar-col">
            <div className="about__avatar-wrapper corner-bracket">
              <img src={PERSONAL.avatar} alt={PERSONAL.name} className="about__avatar" />
            </div>
          </ScrollReveal>

          <ScrollReveal className="about__info-col">
            <h3 className="about__name">{PERSONAL.name}<span className="gold-dot" style={{ marginLeft: 12 }}></span></h3>
            <p className="about__bio">{PERSONAL.bio}</p>
            <div className="about__contact">
              <div className="about__contact-item"><i className="fas fa-envelope"></i><span>{PERSONAL.email}</span></div>
              <div className="about__contact-item"><i className="fab fa-instagram"></i><span>{PERSONAL.instagram}</span></div>
            </div>
            <div className="about__stats">
              {PERSONAL.stats.map((stat, i) => (
                <div key={i} className="about__stat">
                  <span className="about__stat-value">{stat.value}</span>
                  <span className="about__stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
