import { useEffect, useRef, useState } from 'react';
import { BRAND_PATHS, type Brand } from './brandPaths';

export const WHATSAPP =
  'https://api.whatsapp.com/send?phone=5531994779716&text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Rigueto%20e%20quero%20conversar%20sobre%20tr%C3%A1fego%20e%20automa%C3%A7%C3%A3o%20para%20o%20meu%20neg%C3%B3cio.';

export function BrandIcon({ name, size = 18, className }: { name: Brand; size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="currentColor"
    >
      <path d={BRAND_PATHS[name]} />
    </svg>
  );
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

/** True while the element is at least `threshold` visible. Drives demo playback. */
export function useInView<T extends Element>(threshold = 0.25) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

export function WhatsAppButton({
  children,
  variant = 'gold',
  className = '',
  id,
}: {
  children: React.ReactNode;
  variant?: 'gold' | 'line';
  className?: string;
  id?: string;
}) {
  return (
    <a
      id={id}
      href={WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn-${variant} ${className}`}
    >
      <BrandIcon name="whatsapp" size={18} />
      <span>{children}</span>
    </a>
  );
}
