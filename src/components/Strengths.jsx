import { STRENGTHS } from '../data/portfolioData';
import ScrollReveal from './ScrollReveal';
import SplitText from './SplitText';
import SectionBackground from './SectionBackground';
import ApertureDecoration from './ApertureDecoration';

import './Strengths.css';

function StrengthIcon({ icon }) {
  const m = { 'fa-crop-alt': 'fa-crop', 'fa-sun': 'fa-sun', 'fa-palette': 'fa-palette', 'fa-bolt': 'fa-bolt', 'fa-lightbulb': 'fa-lightbulb' };
  return <i className={`fas ${m[icon] || 'fa-star'}`}></i>;
}

export default function Strengths() {
  return (
    <section id="strengths" className="strengths">
      <SectionBackground type="mesh" />
      <ApertureDecoration className="strengths__aperture" />

      <div className="section">
        <ScrollReveal>
          <div className="section-label">核心能力</div>
          <SplitText text="个人优势" tag="h2" className="section-title"
            delay={60} duration={0.8} from={{ opacity: 0, y: 40 }} to={{ opacity: 1, y: 0 }}
            threshold={0.2} rootMargin="-50px" textAlign="left" />
          <SplitText text="多年拍摄经验沉淀的专业能力，为每一次创作保驾护航" tag="p" className="section-subtitle"
            delay={30} duration={0.6} splitType="chars"
            from={{ opacity: 0, y: 20 }} to={{ opacity: 1, y: 0 }}
            threshold={0.2} rootMargin="-50px" textAlign="left" />
          <div className="divider"></div>
        </ScrollReveal>

        <div className="strengths__grid">
          {STRENGTHS.map((item, i) => (
            <ScrollReveal key={i} className={`scroll-reveal-delay-${Math.min(i,4)}`}>
              <div className="strength-card">
                <div className="strength-card__icon"><StrengthIcon icon={item.icon} /></div>
                <h3 className="strength-card__title">{item.title}</h3>
                <p className="strength-card__desc">{item.description}</p>
                <div className="strength-card__glow" />
                <div className="strength-card__corner"></div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
