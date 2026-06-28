import './ApertureDecoration.css';

export default function ApertureDecoration({ className = '' }) {
  return (
    <div className={`aperture-ring ${className}`} aria-hidden="true">
      <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer ring */}
        <circle cx="200" cy="200" r="190" stroke="currentColor" strokeWidth="0.3" opacity="0.15" />
        <circle cx="200" cy="200" r="175" stroke="currentColor" strokeWidth="0.2" opacity="0.1" />

        {/* Aperture blades - 7 blades forming iris */}
        <path d="M200 30 L260 100 L300 80 L340 160 L280 180 L310 270 L250 260 L200 370 L150 260 L90 270 L120 180 L60 160 L100 80 L140 100 Z"
              stroke="currentColor" strokeWidth="0.4" opacity="0.08" fill="none" />

        {/* Inner rings */}
        <circle cx="200" cy="200" r="120" stroke="currentColor" strokeWidth="0.3" opacity="0.06" />
        <circle cx="200" cy="200" r="60" stroke="currentColor" strokeWidth="0.4" opacity="0.05" />

        {/* Crosshair lines */}
        <line x1="200" y1="10" x2="200" y2="70" stroke="currentColor" strokeWidth="0.3" opacity="0.08" />
        <line x1="200" y1="330" x2="200" y2="390" stroke="currentColor" strokeWidth="0.3" opacity="0.08" />
        <line x1="10" y1="200" x2="70" y2="200" stroke="currentColor" strokeWidth="0.3" opacity="0.08" />
        <line x1="330" y1="200" x2="390" y2="200" stroke="currentColor" strokeWidth="0.3" opacity="0.08" />

        {/* Center dot */}
        <circle cx="200" cy="200" r="4" fill="currentColor" opacity="0.12" />

        {/* Tick marks around outer ring */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const angle = (i * 45 - 90) * Math.PI / 180;
          const x1 = 200 + 180 * Math.cos(angle);
          const y1 = 200 + 180 * Math.sin(angle);
          const x2 = 200 + 190 * Math.cos(angle);
          const y2 = 200 + 190 * Math.sin(angle);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="0.5" opacity="0.1" />;
        })}

        {/* Small decorative dots on inner ring */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i * 60 + 30) * Math.PI / 180;
          const cx = 200 + 140 * Math.cos(angle);
          const cy = 200 + 140 * Math.sin(angle);
          return <circle key={i} cx={cx} cy={cy} r="3" fill="currentColor" opacity="0.08" />;
        })}
      </svg>
    </div>
  );
}
