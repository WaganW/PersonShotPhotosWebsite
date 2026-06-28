import { useState } from 'react';
import { CHROMA_ITEMS } from '../data/portfolioData';
import ChromaGrid from './ChromaGrid';
import SplitText from './SplitText';
import ImageViewer from './ImageViewer';
import ScrollReveal from './ScrollReveal';
import SectionBackground from './SectionBackground';
import ApertureDecoration from './ApertureDecoration';

import './Projects.css';

const INITIAL_COUNT = 6;

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const [viewerImage, setViewerImage] = useState(null);
  const visibleItems = showAll ? CHROMA_ITEMS : CHROMA_ITEMS.slice(0, INITIAL_COUNT);
  const remaining = CHROMA_ITEMS.length - INITIAL_COUNT;

  return (
    <section id="projects" className="projects">
      <SectionBackground type="mesh" />
      <ApertureDecoration className="projects__aperture" />

      <div className="section">
        <ScrollReveal>
          <div className="section-label">精选作品</div>
          <SplitText text="作品集" tag="h2" className="section-title"
            delay={60} duration={0.8} from={{ opacity: 0, y: 40 }} to={{ opacity: 1, y: 0 }}
            threshold={0.2} rootMargin="-50px" textAlign="left" />
          <SplitText text="每一帧画面，都是对世界的一次凝视与解读" tag="p" className="section-subtitle"
            delay={40} duration={0.6} splitType="chars"
            from={{ opacity: 0, y: 20 }} to={{ opacity: 1, y: 0 }}
            threshold={0.2} rootMargin="-50px" textAlign="left" />
          <div className="divider"></div>
        </ScrollReveal>

        <div className="projects__chroma-wrapper">
          <ChromaGrid items={visibleItems} radius={320} damping={0.45} fadeOut={0.6} ease="power3.out" columns={3}
            onImageClick={(image, title) => setViewerImage({ image, title })} />
        </div>

        {!showAll && CHROMA_ITEMS.length > INITIAL_COUNT && (
          <ScrollReveal>
            <div className="projects__loadmore">
              <button className="projects__loadmore-btn" onClick={() => setShowAll(true)}>
                <span>加载更多作品</span>
                <span className="projects__loadmore-count">+{remaining}</span>
                <i className="fas fa-chevron-down"></i>
              </button>
            </div>
          </ScrollReveal>
        )}
      </div>

      {viewerImage && <ImageViewer image={viewerImage.image} title={viewerImage.title}
        onClose={() => setViewerImage(null)} />}
    </section>
  );
}
