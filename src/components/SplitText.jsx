import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SplitText = ({
  text,
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag = 'p',
  onLetterAnimationComplete
}) => {
  const ref = useRef(null);
  const animationCompletedRef = useRef(false);
  const onCompleteRef = useRef(onLetterAnimationComplete);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => { onCompleteRef.current = onLetterAnimationComplete; }, [onLetterAnimationComplete]);

  useEffect(() => {
    if (document.fonts.status === 'loaded') setFontsLoaded(true);
    else document.fonts.ready.then(() => setFontsLoaded(true));
  }, []);

  const splitTextManually = (el) => {
    const originalText = el.textContent || '';
    el.innerHTML = '';
    const spans = [];

    if (splitType.includes('lines')) {
      const words = originalText.split(/(\s+)/);
      const lineWrapper = document.createElement('div');
      lineWrapper.style.display = 'block';
      let currentLine = document.createElement('span');
      currentLine.className = 'split-line';
      currentLine.style.display = 'block';
      currentLine.style.overflow = 'hidden';

      words.forEach((w) => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'split-word';
        wordSpan.style.display = 'inline-block';

        if (splitType.includes('chars')) {
          w.split('').forEach(ch => {
            const charSpan = document.createElement('span');
            charSpan.className = 'split-char';
            charSpan.textContent = ch === ' ' ? '\u00A0' : ch;
            charSpan.style.display = 'inline-block';
            wordSpan.appendChild(charSpan);
            spans.push(charSpan);
          });
        } else {
          wordSpan.textContent = w;
          spans.push(wordSpan);
        }
        currentLine.appendChild(wordSpan);
        if (w.includes('\n')) {
          lineWrapper.appendChild(currentLine);
          currentLine = document.createElement('span');
          currentLine.className = 'split-line';
          currentLine.style.display = 'block';
          currentLine.style.overflow = 'hidden';
        }
      });
      lineWrapper.appendChild(currentLine);
      el.appendChild(lineWrapper);
      el.querySelectorAll('.split-line').forEach(ls => spans.push(ls));
    } else if (splitType.includes('words')) {
      originalText.split(/(\s+)/).forEach(w => {
        if (splitType.includes('chars')) {
          w.split('').forEach(ch => {
            const span = document.createElement('span');
            span.className = 'split-char';
            span.style.display = 'inline-block';
            span.textContent = ch === ' ' ? '\u00A0' : ch;
            el.appendChild(span);
            spans.push(span);
          });
        } else {
          const span = document.createElement('span');
          span.className = 'split-word';
          span.style.display = 'inline-block';
          span.textContent = w;
          el.appendChild(span);
          spans.push(span);
        }
      });
    } else {
      originalText.split('').forEach(ch => {
        const span = document.createElement('span');
        span.className = 'split-char';
        span.style.display = 'inline-block';
        span.textContent = ch === ' ' ? '\u00A0' : ch;
        el.appendChild(span);
        spans.push(span);
      });
    }
    return spans;
  };

  useEffect(() => {
    const el = ref.current;
    if (!el || !text || !fontsLoaded || animationCompletedRef.current) return;

    const targets = splitTextManually(el);
    if (!targets.length) return;

    const startPct = (1 - threshold) * 100;
    const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
    const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
    const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
    const sign = marginValue === 0 ? '' : marginValue < 0 ? `-=${Math.abs(marginValue)}${marginUnit}` : `+=${marginValue}${marginUnit}`;
    const start = `top ${startPct}%${sign}`;

    const ctx = gsap.context(() => {
      gsap.fromTo(targets, { ...from }, {
        ...to, duration, ease,
        stagger: delay / 1000,
        scrollTrigger: { trigger: el, start, once: true, fastScrollEnd: true, anticipatePin: 0.4 },
        onComplete: () => {
          animationCompletedRef.current = true;
          onCompleteRef.current?.();
        },
        willChange: 'transform, opacity',
        force3D: true
      });
    }, el);

    return () => {
      ScrollTrigger.getAll().forEach(st => { if (st.trigger === el) st.kill(); });
      ctx.revert();
    };
  }, [text, delay, duration, ease, splitType, JSON.stringify(from), JSON.stringify(to), threshold, rootMargin, fontsLoaded]);

  const Tag = tag || 'p';
  return (
    <Tag ref={ref} className={`split-parent ${className}`} style={{ textAlign, overflow: 'hidden' }}>
      {text}
    </Tag>
  );
};

export default SplitText;
