import { MeshGradient, DotOrbit } from '@paper-design/shaders-react';

const COLORS = ['#c9f0ff', '#eafffd', '#d5cad6', '#efeff0'];

export default function SectionBackground({ type = 'mesh' }) {
  return (
    <div className="section-bg" aria-hidden="true">
      {type === 'mesh' && (
        <MeshGradient
          className="section-bg__shader"
          colors={COLORS}
          speed={0.3}
          distortion={0.6}
          swirl={0.3}
        />
      )}
      {type === 'dots' && (
        <DotOrbit
          className="section-bg__shader"
          colors={COLORS}
          speed={0.4}
          scale={0.25}
        />
      )}
      {type === 'combined' && (
        <>
          <MeshGradient
            className="section-bg__shader"
            colors={COLORS}
            speed={0.2}
            distortion={0.4}
            swirl={0.2}
          />
          <DotOrbit
            className="section-bg__shader"
            colors={COLORS}
            speed={0.5}
            scale={0.15}
          />
        </>
      )}
    </div>
  );
}
