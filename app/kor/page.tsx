'use client';

import { useEffect, useRef, useState } from 'react';

// CSS Variables injected via style tag
const cssVariables = `
  :root {
    --color-primary: #1A3A6B;
    --color-secondary: #2E6DB4;
    --color-accent: #E8881A;
    --color-text: #1E2634;
    --color-surface: #FFFFFF;
    --color-background: #F5F7FA;
    --color-border: #D1D9E6;
    --border-radius: 6px;
    --shadow-card: 0 4px 20px rgba(26, 58, 107, 0.08);
    --shadow-hover: 0 8px 32px rgba(26, 58, 107, 0.15);
    --shadow-button: 0 2px 8px rgba(26, 58, 107, 0.20);
    --spacing-section-padding: 100px 0;
    --spacing-element-gap: 24px;
    --font-heading: 'Noto Sans KR', sans-serif;
    --font-body: 'Noto Sans KR', sans-serif;
    --text-h1: 48px;
    --text-h2: 36px;
    --text-h3: 24px;
    --text-base: 16px;
    --line-height: 1.7;
    --letter-spacing: -0.02em;
    --animation-duration: 0.3s;
    --animation-easing: cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

// ─── Types ───────────────────────────────────────────────────────────────────
interface NavItem {
  label: string;
  href: string;
}

interface ValueCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface StatItem {
  value: string;
  numericValue: number;
  suffix: string;
  label: string;
  sublabel: string;
}

interface FooterLinkGroup {
  title: string;
  links: string[];
}

// ─── Icons ───────────────────────────────────────────────────────────────────
const TrustIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M20 4L6 10V20C6 28.4 12.08 36.26 20 38C27.92 36.26 34 28.4 34 20V10L20 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M14 20L18 24L26 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const InnovationIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M20 6C14.48 6 10 10.48 10 16C10 19.58 11.86 22.72 14.66 24.6V28H25.34V24.6C28.14 22.72 30 19.58 30 16C30 10.48 25.52 6 20 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M15 32H25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M17 35H23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M20 6V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M30 16H33" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M7 16H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ExpertiseIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M8 34V14L20 6L32 14V34H8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M16 34V24H24V34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 18H26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M14 22H26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const GrowthIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M8 32L16 22L22 26L32 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M26 14H32V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 36H32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ResponsibilityIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M20 12V20L25 25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M26 8L30 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ChallengeIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M20 6L22.4 14H31L24.3 19L26.7 27L20 22.4L13.3 27L15.7 19L9 14H17.6L20 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M20 22.4V36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M14 36H26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
  </svg>
);

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

// ─── Data ────────────────────────────────────────────────────────────────────
const navItems: NavItem[] = [
  { label: '회사소개', href: '#about' },
  { label: '사업분야', href: '#business' },
  { label: '홍보센터', href: '#news' },
  { label: '채용정보', href: '#recruit' },
  { label: '고객지원', href: '#support' },
];

const valueCards: ValueCard[] = [
  { icon: <TrustIcon />, title: '신뢰', description: '고객과의 약속을 지키는 투명한 경영으로 흔들리지 않는 파트너십을 구축합니다.' },
  { icon: <InnovationIcon />, title: '혁신', description: '변화를 두려워하지 않는 창의적 사고로 산업의 새로운 기준을 제시합니다.' },
  { icon: <ExpertiseIcon />, title: '전문성', description: '수십 년간 축적된 경험과 기술력으로 최고 수준의 솔루션을 제공합니다.' },
  { icon: <GrowthIcon />, title: '성장', description: '고객과 함께 지속적으로 발전하며 상생의 생태계를 만들어 갑니다.' },
  { icon: <ResponsibilityIcon />, title: '책임', description: '기업 시민으로서 사회와 환경에 대한 책임을 다하겠습니다.' },
  { icon: <ChallengeIcon />, title: '도전', description: '한계를 넘는 도전 정신으로 불가능을 가능으로 만들어 냅니다.' },
];

const statItems: StatItem[] = [
  { value: '40+', numericValue: 40, suffix: '+', label: '창립', sublabel: '변하지 않는 신뢰와 전통' },
  { value: '1,200+', numericValue: 1200, suffix: '+', label: '누적 프로젝트', sublabel: '다양한 산업 분야의 풍부한 경험' },
  { value: '300+', numericValue: 300, suffix: '+', label: '파트너사', sublabel: '탄탄한 협력 네트워크' },
  { value: '500+', numericValue: 500, suffix: '+', label: '전문 인력', sublabel: '각 분야 최고의 전문가 집단' },
  { value: '98%', numericValue: 98, suffix: '%', label: '고객 만족도', sublabel: '지속적인 품질 개선의 결과' },
  { value: '15+', numericValue: 15, suffix: '+', label: '사업장', sublabel: '폭넓은 사업 영역' },
];

const footerLinks: FooterLinkGroup[] = [
  { title: '회사소개', links: ['기업 개요', '경영 이념', '조직도', '연혁'] },
  { title: '사업분야', links: ['주요 사업', '프로젝트', '기술 역량', '파트너십'] },
  { title: '홍보센터', links: ['공지사항', '뉴스룸', 'IR 정보', '사진/영상'] },
  { title: '채용정보', links: ['인재상', '복리후생', '채용공고', '인턴십'] },
  { title: '고객지원', links: ['온라인 상담', 'FAQ', '찾아오시는 길'] },
];

// ─── Hooks ───────────────────────────────────────────────────────────────────
function useCountUp(target: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const eased = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);

  return count;
}

function useIntersectionObserver(threshold: number = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

// ─── Sub Components ───────────────────────────────────────────────────────────
interface StatCardProps {
  item: StatItem;
  isVisible: boolean;
  index: number;
}

const StatCard = ({ item, isVisible, index }: StatCardProps) => {
  const count = useCountUp(item.numericValue, 2000 + index * 100, isVisible);

  const formatCount = (n: number, original: string): string => {
    if (original.includes(',')) {
      return n.toLocaleString();
    }
    return n.toString();
  };

  return (
    <div
      className="flex flex-col items-center text-center p-8"
      style={{
        borderRadius: 'var(--border-radius)',
        transition: `all var(--animation-duration) var(--animation-easing)`,
        animationDelay: `${index * 0.1}s`,
      }}
    >
      <div
        className="font-bold mb-2 leading-none"
        style={{
          fontSize: 'clamp(36px, 5vw, 56px)',
          color: 'var(--color-accent)',
          fontFamily: 'var(--font-heading)',
          letterSpacing: 'var(--letter-spacing)',
        }}
        aria-label={`${item.label} ${item.value}`}
      >
        {isVisible ? (
          <>
            {item.value.includes(',')
              ? formatCount(count, item.value)
              : count}
            {item.suffix}
          </>
        ) : '0'}
      </div>
      <div
        className="font-semibold mb-1"
        style={{
          fontSize: 'var(--text-h3)',
          color: 'var(--color-primary)',
          fontFamily: 'var(--font-heading)',
          letterSpacing: 'var(--letter-spacing)',
        }}
      >
        {item.label}
      </div>
      <div
        className="text-sm leading-relaxed"
        style={{
          color: '#6B7A99',
          fontFamily: 'var(--font-body)',
          lineHeight: 'var(--line-height)',
        }}
      >
        {item.sublabel}
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { ref: statsRef, isVisible: statsVisible } = useIntersectionObserver(0.2);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style>{cssVariables}</style>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700;800&display=swap');
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        body {
          font-family: var(--font-body);
          color: var(--color-text);
          background: var(--color-background);
          font-size: var(--text-base);
          line-height: var(--line-height);
          letter-spacing: var(--letter-spacing);
        }

        .nav-link {
          position: relative;
          color: rgba(255,255,255,0.85);
          text-decoration: none;
          font-size: 15px;
          font-weight: 500;
          padding: 4px 0;
          transition: color var(--animation-duration) var(--animation-easing);
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--color-accent);
          transition: width var(--animation-duration) var(--animation-easing);
        }
        .nav-link:hover { color: #fff; }
        .nav-link:hover::after { width: 100%; }

        .nav-link-scrolled {
          color: var(--color-primary);
        }
        .nav-link-scrolled:hover { color: var(--color-secondary); }

        .value-card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--border-radius);
          padding: 40px 32px;
          transition: all var(--animation-duration) var(--animation-easing);
          box-shadow: var(--shadow-card);
        }
        .value-card:hover {
          box-shadow: var(--shadow-hover);
          transform: translateY(-4px);
          border-color: var(--color-secondary);
        }
        .value-card:hover .card-icon {
          color: var(--color-accent);
        }

        .card-icon {
          color: var(--color-primary);
          transition: color var(--animation-duration) var(--animation-easing);
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--color-accent);
          color: #fff;
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 600;
          padding: 14px 32px;
          border-radius: var(--border-radius);
          border: none;
          cursor: pointer;
          text-decoration: none;
          box-shadow: var(--shadow-button);
          transition: all var(--animation-duration) var(--animation-easing);
          letter-spacing: var(--letter-spacing);
        }
        .btn-primary:hover {
          background: #d47a16;
          box-shadow: var(--shadow-hover);
          transform: translateY(-1px);
        }

        .btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: #fff;
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 600;
          padding: 13px 32px;
          border-radius: var(--border-radius);
          border: 2px solid rgba(255,255,255,0.6);
          cursor: pointer;
          text-decoration: none;
          transition: all var(--animation-duration) var(--animation-easing);
          letter-spacing: var(--letter-spacing);
        }
        .btn-outline:hover {
          background: rgba(255,255,255,0.1);
          border-color: #fff;
        }

        .btn-white {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--color-surface);
          color: var(--color-primary);
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 700;
          padding: 16px 36px;
          border-radius: var(--border-radius);
          border: none;
          cursor: pointer;
          text-decoration: none;
          box-shadow: var(--shadow-hover);
          transition: all var(--animation-duration) var(--animation-easing);
          letter-spacing: var(--letter-spacing);
        }
        .btn-white:hover {
          background: var(--color-background);
          transform: translateY(-2px);
        }

        .stat-divider:not(:last-child) {
          border-right: 1px solid var(--color-border);
        }

        .footer-link {
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          font-size: 14px;
          line-height: 2;
          transition: color var(--animation-duration) var(--animation-easing);
          display: block;
        }
        .footer-link:hover {
          color: var(--color-accent);
        }

        .mobile-nav-link {
          display: block;
          color: var(--color-primary);
          text-decoration: none;
          font-size: 16px;
          font-weight: 500;
          padding: 12px 0;
          border-bottom: 1px solid var(--color-border);
          transition: color var(--animation-duration) var(--animation-easing);
          letter-spacing: var(--letter-spacing);
        }
        .mobile-nav-link:hover { color: var(--color-accent); }

        .social-icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.6);
          transition: all var(--animation-duration) var(--animation-easing);
          text-decoration: none;
        }
        .social-icon-btn:hover {
          background: var(--color-accent);
          color: #fff;
        }

        @media (max-width: 768px) {
          .stat-divider:not(:last-child) {
            border-right: none;
            border-bottom: 1px solid var(--color-border);
          }
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(232, 136, 26, 0.2);
          border: 1px solid rgba(232, 136, 26, 0.4);
          color: #f5b06a;
          font-size: 13px;
          font-weight: 500;
          padding: 6px 16px;
          border-radius: 100px;
          margin-bottom: 24px;
          letter-spacing: 0.05em;
        }

        .section-label {
          display: inline-block;
          color: var(--color-accent);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 12px;
        }
      `}</style>

      <div style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text)' }}>

        {/* ─── NAVIGATION ─────────────────────────────────────────────────────── */}
        <header
          role="banner"
          className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
          style={{
            background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
            backdropFilter: scrolled ? 'blur(12px)' : 'none',
            boxShadow: scrolled ? '0 2px 20px rgba(26, 58, 107, 0.10)' : 'none',
            borderBottom: scrolled ? '1px solid var(--color-border)' : 'none',
          }}
        >
          <div
            className="mx-auto px-6 flex items-center justify-between"
            style={{ maxWidth: 'var(--spacing-container-max-width, 1280px)', height: '72px' }}
          >
            {/* Logo */}
            <a href="/" className="flex items-center gap-3" aria-label="진흥기업 홈으로 이동">
              <div
                className="flex items-center justify-center font-bold text-white text-sm"
                style={{
                  width: '36px',
                  height: '36px',
                  background: scrolled ? 'var(--color-primary)' : 'rgba(255,255,255,0.2)',
                  borderRadius: '6px',
                  border: scrolled ? 'none' : '1.5px solid rgba(255,255,255,0.5)',
                }}
              >
                진
              </div>
              <span
                className="font-bold text-lg"
                style={{
                  color: scrolled ? 'var(--color-primary)' : '#fff',
                  fontFamily: 'var(--font-heading)',
                  letterSpacing: '-0.03em',
                }}
              >
                진흥기업
              </span>
            </a>

            {/* Desktop Nav */}
            <nav aria-label="주요 메뉴" className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`nav-link ${scrolled ? 'nav-link-scrolled' : ''}`}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="#support"
                style={{
                  color: scrolled ? 'var(--color-primary)' : 'rgba(255,255,255,0.85)',
                  fontSize: '14px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  padding: '8px 16px',
                  borderRadius: 'var(--border-radius)',
                  border: scrolled ? '1px solid var(--color-border)' : '1px solid rgba(255,255,255,0.3)',
                  transition: 'all var(--animation-duration) var(--animation-easing)',
                }}
              >
                문의하기
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
              aria-expanded={mobileMenuOpen}
              style={{ color: scrolled ? 'var(--color-primary)' : '#fff' }}
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div
              className="md:hidden px-6 py-4"
              style={{
                background: 'var(--color-surface)',
                borderTop: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-hover)',
              }}
            >
              <nav aria-label="모바일 메뉴">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="mobile-nav-link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="#support"
                  className="btn-primary mt-4 justify-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  문의하기
                </a>
              </nav>
            </div>
          )}
        </header>

        {/* ─── HERO SECTION ───────────────────────────────────────────────────── */}
        <section
          id="hero"
          role="banner"
          aria-label="메인 배너"
          className="relative flex items-center justify-center overflow-hidden"
          style={{ minHeight: '100vh' }}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80')`,
            }}
            aria-hidden="true"
          />
          {/* Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(26, 58, 107, 0.75) 0%, rgba(20, 30, 60, 0.65) 100%)',
            }}
            aria-hidden="true"
          />
          {/* Decorative gradient bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-32"
            style={{
              background: 'linear-gradient(to top, rgba(26,58,107,0.3), transparent)',
            }}
            aria-hidden="true"
          />

          {/* Content */}
          <div
            className="relative z-10 text-center px-6 mx-auto"
            style={{ maxWidth: '900px' }}
          >
            <div className="hero-badge" aria-label="회사 슬로건">
              <span>●</span>
              <span>40년의 전문성 · 끊임없는 혁신</span>
            </div>

            <h1
              className="font-bold text-white mb-6"
              style={{
                fontSize: 'clamp(36px, 6vw, var(--text-h1))',
                fontFamily: 'var(--font-heading)',
                letterSpacing: '-0.03em',
                lineHeight: '1.2',
                textShadow: '0 2px 20px rgba(0,0,0,0.3)',
              }}
            >
              신뢰로 만드는 미래
            </h1>

            <p
              className="font-semibold mb-6 text-white"
              style={{
                fontSize: 'clamp(18px, 2.5vw, 24px)',
                fontFamily: 'var(--font-heading)',
                letterSpacing: 'var(--letter-spacing)',
                opacity: 0.9,
              }}
            >
              도전과 혁신으로 산업의 내일을 열다
            </p>

            <p
              className="mb-10 mx-auto"
              style={{
                fontSize: '17px',
                color: 'rgba(255,255,255,0.80)',
                fontFamily: 'var(--font-body)',
                lineHeight: 'var(--line-height)',
                maxWidth: '660px',
              }}
            >
              진흥기업은 40여 년의 축적된 전문성과 끊임없는 혁신으로 고객과 사회에 실질적인 가치를 창출합니다. 함께 지속 가능한 미래를 만들어 가겠습니다.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="#about" className="btn-primary">
                회사 소개 보기
                <span aria-hidden="true">→</span>
              </a>
              <a href="#business" className="btn-outline">
                사업 분야 보기
              </a>
            </div>
          </div>

          {/* Scroll indicator */}
          <div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            aria-hidden="true"
          >
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', letterSpacing: '0.1em' }}>SCROLL</span>
            <div
              className="w-0.5 h-10"
              style={{
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)',
                animation: 'pulse 2s infinite',
              }}
            />
          </div>
        </section>

        {/* ─── CORE VALUES SECTION ────────────────────────────────────────────── */}
        <section
          id="about"
          aria-labelledby="values-heading"
          style={{
            padding: 'var(--spacing-section-padding)',
            background: 'var(--color-background)',
          }}
        >
          <div
            className="mx-auto px-6"
            style={{ maxWidth: '1280px' }}
          >
            {/* Section Header */}
            <div className="text-center mb-16">
              <span className="section-label">Core Values</span>
              <h2
                id="values-heading"
                className="font-bold mb-4"
                style={{
                  fontSize: 'var(--text-h2)',
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--color-primary)',
                  letterSpacing: 'var(--letter-spacing)',
                  lineHeight: '1.3',
                }}
              >
                진흥기업의 핵심 가치
              </h2>
              <p
                className="font-semibold mb-3"
                style={{
                  fontSize: '20px',
                  color: 'var(--color-secondary)',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                우리가 만드는 차이
              </p>
              <p
                style={{
                  fontSize: '16px',
                  color: '#6B7A99',
                  maxWidth: '560px',
                  margin: '0 auto',
                  lineHeight: 'var(--line-height)',
                }}
              >
                진흥기업은 다섯 가지 핵심 가치를 바탕으로 고객과 사회를 위한 최선의 결과를 만들어 냅니다.
              </p>
            </div>

            {/* Grid */}
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              role="list"
            >
              {valueCards.map((card, index) => (
                <article
                  key={index}
                  className="value-card"
                  role="listitem"
                >
                  <div className="card-icon mb-5" aria-hidden="true">
                    {card.icon}
                  </div>
                  <h3
                    className="font-bold mb-3"
                    style={{
                      fontSize: 'var(--text-h3)',
                      fontFamily: 'var(--font-heading)',
                      color: 'var(--color-primary)',
                      letterSpacing: 'var(--letter-spacing)',
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '15px',
                      color: '#6B7A99',
                      lineHeight: 'var(--line-height)',
                    }}
                  >
                    {card.description}
                  </p>
                </article>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center mt-12">
              <a href="#about" className="btn-primary">
                자세히 알아보기
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        {/* ─── CTA BANNER SECTION ─────────────────────────────────────────────── */}
        <section
          id="contact"
          aria-labelledby="cta-heading"
          className="relative overflow-hidden"
          style={{
            padding: 'var(--spacing-section-padding)',
            background: 'linear-gradient(135deg, #0F2547 0%, var(--color-primary) 50%, #1A4A8A 100%)',
          }}
        >
          {/* Decorative circles */}
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5"
            style={{ background: 'var(--color-accent)', transform: 'translate(30%, -30%)' }}
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-5"
            style={{ background: 'var(--color-secondary)', transform: 'translate(-30%, 30%)' }}
            aria-hidden="true"
          />

          <div
            className="relative z-10 mx-auto px-6"
            style={{ maxWidth: '1280px' }}
          >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
              {/* Text */}
              <div className="text-center lg:text-left max-w-xl">
                <span
                  className="inline-block text-sm font-semibold mb-4"
                  style={{
                    color: 'var(--color-accent)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}
                >
                  Partnership
                </span>
                <h2
                  id="cta-heading"
                  className="font-bold text-white mb-4"
                  style={{
                    fontSize: 'clamp(28px, 4vw, var(--text-h2))',
                    fontFamily: 'var(--font-heading)',
                    letterSpacing: 'var(--letter-spacing)',
                    lineHeight: '1.3',
                  }}
                >
                  진흥기업과 함께 성장하세요
                </h2>
                <p
                  className="font-semibold mb-4"
                  style={{
                    fontSize: '18px',
                    color: 'rgba(255,255,255,0.8)',
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  새로운 가능성의 시작
                </p>
                <p
                  style={{
                    fontSize: '16px',
                    color: 'rgba(255,255,255,0.65)',
                    lineHeight: 'var(--line-height)',
                  }}
                >
                  비즈니스 성장을 위한 최적의 파트너를 찾고 계신가요? 진흥기업의 전문가 팀이 귀사의 도전에 함께하겠습니다. 지금 바로 상담을 신청하세요.
                </p>
              </div>

              {/* CTA Block */}
              <div
                className="flex flex-col items-center gap-4 p-10 rounded-xl"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  minWidth: '280px',
                }}
              >
                <div className="text-center mb-2">
                  <p className="text-white font-semibold mb-1" style={{ fontSize: '18px' }}>전문가 무료 상담</p>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>영업일 기준 1일 이내 회신</p>
                </div>
                <a href="#support" className="btn-white w-full justify-center">
                  상담 신청하기
                  <span aria-hidden="true">→</span>
                </a>
                <a
                  href="tel:02-0000-0000"
                  style={{
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '14px',
                    textDecoration: 'none',
                    transition: 'color var(--animation-duration)',
                  }}
                >
                  📞 02-0000-0000
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── STATS SECTION ──────────────────────────────────────────────────── */}
        <section
          id="stats"
          aria-labelledby="stats-heading"
          style={{
            padding: 'var(--spacing-section-padding)',
            background: 'var(--color-surface)',
          }}
        >
          <div
            className="mx-auto px-6"
            style={{ maxWidth: '1280px' }}
          >
            {/* Section Header */}
            <div className="text-center mb-16">
              <span className="section-label">Our Achievements</span>
              <h2
                id="stats-heading"
                className="font-bold mb-4"
                style={{
                  fontSize: 'var(--text-h2)',
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--color-primary)',
                  letterSpacing: 'var(--letter-spacing)',
                  lineHeight: '1.3',
                }}
              >
                숫자로 보는 진흥기업
              </h2>
              <p
                className="font-semibold mb-3"
                style={{
                  fontSize: '20px',
                  color: 'var(--color-secondary)',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                실적이 증명하는 신뢰
              </p>
              <p
                style={{
                  fontSize: '16px',
                  color: '#6B7A99',
                  maxWidth: '560px',
                  margin: '0 auto',
                  lineHeight: 'var(--line-height)',
                }}
              >
                진흥기업은 수십 년간 다양한 산업 분야에서 축적한 성과를 바탕으로 고객에게 검증된 가치를 제공합니다.
              </p>
            </div>

            {/* Stats Grid */}
            <div
              ref={statsRef}
              className="grid grid-cols-2 lg:grid-cols-3 divide-x-0 divide-y lg:divide-y-0"
              style={{
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--border-radius)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-card)',
              }}
              role="list"
              aria-label="진흥기업 주요 수치"
            >
              {statItems.map((item, index) => (
                <div
                  key={index}
                  className={`stat-divider ${index % 2 === 0 && index < statItems.length - 1 ? '' : ''}`}
                  role="listitem"
                  style={{
                    borderRight: index % 2 !== 1 && index < 5 ? '1px solid var(--color-border)' : 'none',
                    borderBottom: index < 4 ? '1px solid var(--color-border)' : 'none',
                  }}
                >
                  <StatCard item={item} isVisible={statsVisible} index={index} />
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center mt-12">
              <a href="#business" className="btn-primary">
                사업 실적 보기
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        {/* ─── FOOTER ─────────────────────────────────────────────────────────── */}
        <footer
          id="support"
          role="contentinfo"
          style={{
            background: '#0F2040',
            padding: '80px 0 0',
          }}
        >
          <div
            className="mx-auto px-6"
            style={{ maxWidth: '1280px' }}
          >
            {/* Top Row */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16 pb-16" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              {/* Brand Column */}
              <div className="lg:col-span-1">
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="flex items-center justify-center font-bold text-white text-sm"
                    style={{
                      width: '40px',
                      height: '40px',
                      background: 'var(--color-primary)',
                      borderRadius: '8px',
                    }}
                  >
                    진
                  </div>
                  <span
                    className="font-bold text-xl text-white"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      letterSpacing: '-0.03em',
                    }}
                  >
                    진흥기업
                  </span>
                </div>
                <p
                  className="mb-4"
                  style={{
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.5)',
                    lineHeight: 'var(--line-height)',
                  }}
                >
                  신뢰와 혁신으로 함께하는 기업
                </p>
                <p
                  style={{
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.45)',
                    lineHeight: 'var(--line-height)',
                  }}
                >
                  진흥기업은 고객과 사회에 지속 가능한 가치를 창출하기 위해 오늘도 도전하고 혁신합니다.
                </p>

                {/* Social Icons */}
                <div className="flex gap-3 mt-6" aria-label="소셜 미디어 링크">
                  <a
                    href="#"
                    className="social-icon-btn"
                    aria-label="LinkedIn"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <LinkedInIcon />
                  </a>
                  <a
                    href="#"
                    className="social-icon-btn"
                    aria-label="YouTube"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <YouTubeIcon />
                  </a>
                </div>
              </div>

              {/* Nav Columns */}
              <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
                {footerLinks.map((group, index) => (
                  <nav key={index} aria-label={`${group.title} 메뉴`}>
                    <h3
                      className="font-semibold mb-4"
                      style={{
                        fontSize: '14px',
                        color: '#fff',
                        letterSpacing: '0.03em',
                        fontFamily: 'var(--font-heading)',
                      }}
                    >
                      {group.title}
                    </h3>
                    <ul className="list-none p-0 m-0">
                      {group.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <a href="#" className="footer-link">
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                ))}
              </div>
            </div>

            {/* Bottom Row */}
            <div
              className="pb-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
            >
              {/* Legal Info */}
              <div>
                <div
                  className="flex flex-wrap gap-x-4 gap-y-1 mb-3"
                  style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}
                >
                  <span>사업자등록번호: 000-00-00000</span>
                  <span>대표이사: 홍길동</span>
                  <span>대표전화: 02-0000-0000</span>
                  <a
                    href="mailto:info@jinhung.co.kr"
                    style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}
                  >
                    info@jinhung.co.kr
                  </a>
                </div>
                <address
                  className="not-italic"
                  style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}
                >
                  서울특별시 강남구 테헤란로 123 진흥빌딩
                </address>
                <p
                  className="mt-3"
                  style={{ fontSize: '12px', color: 'rgba(255,255,255,0.30)' }}
                >
                  Copyright © 2024 진흥기업. All Rights Reserved.
                </p>
              </div>

              {/* CTA + Policy */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex gap-4">
                  {['개인정보처리방침', '이용약관', '사이트맵'].map((item) => (
                    <a
                      key={item}
                      href="#"
                      style={{
                        fontSize: '12px',
                        color: 'rgba(255,255,255,0.4)',
                        textDecoration: 'none',
                        transition: 'color var(--animation-duration)',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
                    >
                      {item}
                    </a>
                  ))}
                </div>
                <a
                  href="#support"
                  className="btn-primary"
                  style={{ fontSize: '13px', padding: '10px 24px' }}
                >
                  문의하기
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}