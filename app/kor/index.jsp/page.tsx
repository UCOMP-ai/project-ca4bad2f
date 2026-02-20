'use client';

import { useEffect, useRef, useState } from 'react';

// CSS Variables injection
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
    --container-max-width: 1280px;
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

interface CoreValue {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface StatItem {
  number: string;
  suffix: string;
  label: string;
  description: string;
}

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

// ─── Icons ───────────────────────────────────────────────────────────────────

const TrustIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M20 4L4 10V22C4 29.7 11.2 36.9 20 39C28.8 36.9 36 29.7 36 22V10L20 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 20L18 24L26 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const InnovationIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M20 4C20 4 28 10 28 20C28 24.4 24.4 28 20 28C15.6 28 12 24.4 12 20C12 10 20 4 20 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 28V34H24V28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 34H24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M20 12V20M16 16L20 12L24 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ExpertiseIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M8 36V14L20 4L32 14V36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="15" y="22" width="10" height="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="10" y="18" width="8" height="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="22" y="18" width="8" height="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const GrowthIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M6 34L14 22L20 28L28 16L34 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M28 10H34V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 38H34" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const ResponsibilityIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="2"/>
    <path d="M20 10V20L26 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 6L6 4M32 6L34 4M6 36L8 34M34 36L32 34" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const ChallengeIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M20 6L24 14L34 15.5L27 22.5L28.5 32L20 28L11.5 32L13 22.5L6 15.5L16 14L20 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
  </svg>
);

// ─── useCountUp Hook ──────────────────────────────────────────────────────────

function useCountUp(target: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);

  return count;
}

// ─── StatCard ─────────────────────────────────────────────────────────────────

interface StatCardProps {
  item: StatItem;
  isVisible: boolean;
}

const StatCard = ({ item, isVisible }: StatCardProps) => {
  const numericTarget = parseInt(item.number.replace(/[^0-9]/g, ''), 10);
  const count = useCountUp(numericTarget, 2000, isVisible);

  return (
    <div
      style={{
        backgroundColor: 'var(--color-surface)',
        borderRadius: 'var(--border-radius)',
        padding: '40px 32px',
        textAlign: 'center',
        border: '1px solid var(--color-border)',
        transition: `box-shadow var(--animation-duration) var(--animation-easing)`,
      }}
      className="hover:shadow-[var(--shadow-hover)] group"
    >
      <div
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(36px, 5vw, 52px)',
          fontWeight: '800',
          color: 'var(--color-accent)',
          letterSpacing: 'var(--letter-spacing)',
          lineHeight: '1.1',
        }}
      >
        {isVisible ? count : 0}{item.suffix}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '18px',
          fontWeight: '700',
          color: 'var(--color-primary)',
          marginTop: '8px',
          marginBottom: '8px',
        }}
      >
        {item.label}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          color: '#6B7280',
          lineHeight: 'var(--line-height)',
        }}
      >
        {item.description}
      </div>
    </div>
  );
};

// ─── Main Page Component ──────────────────────────────────────────────────────

export default function HomePage() {
  const statsRef = useRef<HTMLElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const coreValues: CoreValue[] = [
    { icon: <TrustIcon />, title: '신뢰', description: '고객과의 약속을 지키는 투명한 경영으로 흔들리지 않는 파트너십을 구축합니다.' },
    { icon: <InnovationIcon />, title: '혁신', description: '변화를 두려워하지 않는 창의적 사고로 산업의 새로운 기준을 제시합니다.' },
    { icon: <ExpertiseIcon />, title: '전문성', description: '수십 년간 축적된 경험과 기술력으로 최고 수준의 솔루션을 제공합니다.' },
    { icon: <GrowthIcon />, title: '성장', description: '고객과 함께 지속적으로 발전하며 상생의 생태계를 만들어 갑니다.' },
    { icon: <ResponsibilityIcon />, title: '책임', description: '기업 시민으로서 사회와 환경에 대한 책임을 다하겠습니다.' },
    { icon: <ChallengeIcon />, title: '도전', description: '한계를 넘는 도전 정신으로 불가능을 가능으로 만들어 냅니다.' },
  ];

  const stats: StatItem[] = [
    { number: '40', suffix: '+', label: '창립 40+ 년', description: '변하지 않는 신뢰와 전통' },
    { number: '1200', suffix: '+', label: '누적 프로젝트', description: '다양한 산업 분야의 풍부한 경험' },
    { number: '300', suffix: '+', label: '파트너사', description: '탄탄한 협력 네트워크' },
    { number: '500', suffix: '+', label: '전문 인력', description: '각 분야 최고의 전문가 집단' },
    { number: '98', suffix: '%', label: '고객 만족도', description: '지속적인 품질 개선의 결과' },
    { number: '15', suffix: '+', label: '국내외 사업장', description: '폭넓은 사업 영역' },
  ];

  const footerColumns: FooterColumn[] = [
    {
      title: '회사소개',
      links: [
        { label: '기업 개요', href: '#' },
        { label: '경영 이념', href: '#' },
        { label: '조직도', href: '#' },
        { label: '연혁', href: '#' },
      ],
    },
    {
      title: '사업분야',
      links: [
        { label: '주요 사업', href: '#' },
        { label: '프로젝트', href: '#' },
        { label: '기술 역량', href: '#' },
        { label: '파트너십', href: '#' },
      ],
    },
    {
      title: '홍보센터',
      links: [
        { label: '공지사항', href: '#' },
        { label: '뉴스룸', href: '#' },
        { label: 'IR 정보', href: '#' },
        { label: '사진/영상', href: '#' },
      ],
    },
    {
      title: '채용정보',
      links: [
        { label: '인재상', href: '#' },
        { label: '복리후생', href: '#' },
        { label: '채용공고', href: '#' },
        { label: '인턴십', href: '#' },
      ],
    },
    {
      title: '고객지원',
      links: [
        { label: '온라인 상담', href: '#' },
        { label: 'FAQ', href: '#' },
        { label: '찾아오시는 길', href: '#' },
      ],
    },
  ];

  return (
    <>
      <style>{cssVariables}</style>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700;800;900&display=swap');
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: var(--font-body); color: var(--color-text); background-color: var(--color-surface); }
        
        .nav-link {
          color: rgba(255,255,255,0.9);
          font-size: 15px;
          font-weight: 500;
          text-decoration: none;
          letter-spacing: var(--letter-spacing);
          transition: color var(--animation-duration) var(--animation-easing);
          padding: 4px 0;
          border-bottom: 2px solid transparent;
        }
        .nav-link:hover {
          color: var(--color-accent);
          border-bottom-color: var(--color-accent);
        }

        .footer-link {
          color: rgba(255,255,255,0.6);
          font-size: 14px;
          text-decoration: none;
          transition: color var(--animation-duration) var(--animation-easing);
          line-height: var(--line-height);
          display: block;
        }
        .footer-link:hover {
          color: var(--color-accent);
        }

        .value-card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--border-radius);
          padding: 36px 28px;
          transition: box-shadow var(--animation-duration) var(--animation-easing), transform var(--animation-duration) var(--animation-easing);
          cursor: default;
        }
        .value-card:hover {
          box-shadow: var(--shadow-hover);
          transform: translateY(-4px);
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: var(--color-accent);
          color: white;
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 600;
          letter-spacing: var(--letter-spacing);
          padding: 14px 28px;
          border-radius: var(--border-radius);
          border: none;
          cursor: pointer;
          text-decoration: none;
          transition: all var(--animation-duration) var(--animation-easing);
          box-shadow: var(--shadow-button);
        }
        .btn-primary:hover {
          background-color: #CF7A16;
          box-shadow: var(--shadow-hover);
          transform: translateY(-2px);
        }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: transparent;
          color: white;
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 600;
          letter-spacing: var(--letter-spacing);
          padding: 13px 28px;
          border-radius: var(--border-radius);
          border: 2px solid rgba(255,255,255,0.7);
          cursor: pointer;
          text-decoration: none;
          transition: all var(--animation-duration) var(--animation-easing);
        }
        .btn-secondary:hover {
          background-color: rgba(255,255,255,0.15);
          border-color: white;
        }

        .btn-white {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: var(--color-surface);
          color: var(--color-primary);
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 700;
          letter-spacing: var(--letter-spacing);
          padding: 14px 32px;
          border-radius: var(--border-radius);
          border: none;
          cursor: pointer;
          text-decoration: none;
          transition: all var(--animation-duration) var(--animation-easing);
          box-shadow: var(--shadow-button);
        }
        .btn-white:hover {
          background-color: #EAF0F8;
          box-shadow: var(--shadow-hover);
          transform: translateY(-2px);
        }

        .btn-outline-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: transparent;
          color: var(--color-primary);
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 600;
          letter-spacing: var(--letter-spacing);
          padding: 12px 28px;
          border-radius: var(--border-radius);
          border: 2px solid var(--color-primary);
          cursor: pointer;
          text-decoration: none;
          transition: all var(--animation-duration) var(--animation-easing);
        }
        .btn-outline-primary:hover {
          background-color: var(--color-primary);
          color: white;
        }

        .container {
          max-width: var(--container-max-width);
          margin: 0 auto;
          padding: 0 24px;
        }

        @media (max-width: 768px) {
          .container { padding: 0 16px; }
          .hero-title { font-size: 36px !important; }
          .hero-sub { font-size: 20px !important; }
          .section-title { font-size: 28px !important; }
          .section-padding { padding: 60px 0 !important; }
          .cta-banner-inner { flex-direction: column !important; text-align: center !important; }
          .cta-banner-text { margin-bottom: 32px !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .values-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
          .footer-bottom { flex-direction: column !important; gap: 16px !important; text-align: center !important; }
          .footer-legal { flex-direction: column !important; gap: 4px !important; }
        }

        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{ fontFamily: 'var(--font-body)' }}>

        {/* ─── Navigation ─────────────────────────────────────────────────────── */}
        <header
          role="banner"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(26, 58, 107, 0.95)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
              {/* Logo */}
              <a
                href="/"
                aria-label="진흥기업 홈으로 이동"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  textDecoration: 'none',
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    backgroundColor: 'var(--color-accent)',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  aria-hidden="true"
                >
                  <span style={{ color: 'white', fontWeight: '800', fontSize: '16px' }}>진</span>
                </div>
                <span
                  style={{
                    color: 'white',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '18px',
                    fontWeight: '700',
                    letterSpacing: 'var(--letter-spacing)',
                  }}
                >
                  진흥기업
                </span>
              </a>

              {/* Desktop Nav */}
              <nav
                aria-label="주요 메뉴"
                style={{ display: 'flex', alignItems: 'center', gap: '36px' }}
                className="hidden md:flex"
              >
                <a href="#" className="nav-link">회사소개</a>
                <a href="#" className="nav-link">사업분야</a>
                <a href="#" className="nav-link">홍보센터</a>
                <a href="#" className="nav-link">채용정보</a>
                <a href="#" className="btn-primary" style={{ padding: '10px 20px', fontSize: '14px' }}>
                  고객지원
                </a>
              </nav>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                }}
                className="md:hidden"
              >
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    style={{
                      display: 'block',
                      width: '24px',
                      height: '2px',
                      backgroundColor: 'white',
                      borderRadius: '2px',
                      transition: `all var(--animation-duration) var(--animation-easing)`,
                    }}
                  />
                ))}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div
              id="mobile-menu"
              style={{
                backgroundColor: 'var(--color-primary)',
                borderTop: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <nav aria-label="모바일 메뉴" style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {['회사소개', '사업분야', '홍보센터', '채용정보', '고객지원'].map((item) => (
                  <a
                    key={item}
                    href="#"
                    style={{
                      color: 'rgba(255,255,255,0.9)',
                      textDecoration: 'none',
                      padding: '12px 0',
                      fontSize: '15px',
                      fontWeight: '500',
                      borderBottom: '1px solid rgba(255,255,255,0.1)',
                      letterSpacing: 'var(--letter-spacing)',
                    }}
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>
          )}
        </header>

        {/* ─── Section 1: Hero ─────────────────────────────────────────────────── */}
        <section
          aria-label="히어로 섹션"
          style={{
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Background Image */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80&fit=crop&crop=center)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
            aria-hidden="true"
          />
          {/* Dark Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(15, 30, 60, 0.6)',
            }}
            aria-hidden="true"
          />
          {/* Gradient Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(26,58,107,0.5) 0%, rgba(15,30,60,0.3) 100%)',
            }}
            aria-hidden="true"
          />

          {/* Content */}
          <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '120px', paddingBottom: '80px' }}>
            <div style={{ maxWidth: '720px' }}>
              {/* Badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(232, 136, 26, 0.2)',
                  border: '1px solid rgba(232, 136, 26, 0.5)',
                  borderRadius: '100px',
                  padding: '6px 16px',
                  marginBottom: '28px',
                }}
              >
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-accent)',
                  }}
                  aria-hidden="true"
                />
                <span style={{ color: 'var(--color-accent)', fontSize: '13px', fontWeight: '600', letterSpacing: '0.05em' }}>
                  창립 40주년 진흥기업
                </span>
              </div>

              <h1
                className="hero-title"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--text-h1)',
                  fontWeight: '800',
                  color: 'white',
                  letterSpacing: 'var(--letter-spacing)',
                  lineHeight: '1.2',
                  marginBottom: '20px',
                }}
              >
                신뢰로 만드는<br />
                <span style={{ color: 'var(--color-accent)' }}>미래</span>
              </h1>

              <p
                className="hero-sub"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '24px',
                  fontWeight: '500',
                  color: 'rgba(255,255,255,0.85)',
                  letterSpacing: 'var(--letter-spacing)',
                  marginBottom: '20px',
                }}
              >
                도전과 혁신으로 산업의 내일을 열다
              </p>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '17px',
                  color: 'rgba(255,255,255,0.75)',
                  lineHeight: 'var(--line-height)',
                  marginBottom: '40px',
                  maxWidth: '560px',
                }}
              >
                진흥기업은 40여 년의 축적된 전문성과 끊임없는 혁신으로 고객과 사회에 실질적인 가치를 창출합니다. 함께 지속 가능한 미래를 만들어 가겠습니다.
              </p>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <a href="#" className="btn-primary" aria-label="회사 소개 보기 페이지로 이동">
                  회사 소개 보기
                  <span aria-hidden="true">→</span>
                </a>
                <a href="#" className="btn-secondary" aria-label="사업 분야 알아보기">
                  사업 분야 알아보기
                </a>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
            }}
            aria-hidden="true"
          >
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', letterSpacing: '0.1em' }}>SCROLL</span>
            <div
              style={{
                width: '1px',
                height: '40px',
                backgroundColor: 'rgba(255,255,255,0.3)',
                animation: 'pulse 2s infinite',
              }}
            />
          </div>
        </section>

        {/* ─── Section 2: Feature Grid (Core Values) ─────────────────────────── */}
        <section
          aria-label="핵심 가치 섹션"
          className="section-padding"
          style={{
            padding: 'var(--spacing-section-padding)',
            backgroundColor: 'var(--color-background)',
          }}
        >
          <div className="container">
            {/* Section Header */}
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: 'var(--color-accent)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '12px',
                }}
              >
                우리가 만드는 차이
              </p>
              <h2
                className="section-title"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--text-h2)',
                  fontWeight: '800',
                  color: 'var(--color-primary)',
                  letterSpacing: 'var(--letter-spacing)',
                  marginBottom: '16px',
                }}
              >
                진흥기업의 핵심 가치
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '17px',
                  color: '#6B7280',
                  lineHeight: 'var(--line-height)',
                  maxWidth: '560px',
                  margin: '0 auto',
                }}
              >
                진흥기업은 다섯 가지 핵심 가치를 바탕으로 고객과 사회를 위한 최선의 결과를 만들어 냅니다.
              </p>
            </div>

            {/* Values Grid */}
            <div
              className="values-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 'var(--spacing-element-gap)',
              }}
            >
              {coreValues.map((value, index) => (
                <article key={index} className="value-card">
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(26, 58, 107, 0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-primary)',
                      marginBottom: '20px',
                    }}
                    aria-hidden="true"
                  >
                    {value.icon}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--text-h3)',
                      fontWeight: '700',
                      color: 'var(--color-primary)',
                      letterSpacing: 'var(--letter-spacing)',
                      marginBottom: '12px',
                    }}
                  >
                    {value.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '15px',
                      color: '#6B7280',
                      lineHeight: 'var(--line-height)',
                    }}
                  >
                    {value.description}
                  </p>
                </article>
              ))}
            </div>

            {/* CTA */}
            <div style={{ textAlign: 'center', marginTop: '48px' }}>
              <a href="#" className="btn-outline-primary" aria-label="핵심 가치 자세히 알아보기">
                자세히 알아보기
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        {/* ─── Section 3: CTA Banner ───────────────────────────────────────────── */}
        <section
          aria-label="상담 신청 배너"
          style={{
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: 'var(--color-primary)',
          }}
        >
          {/* Background Pattern */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80&fit=crop&crop=center)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.08,
            }}
            aria-hidden="true"
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(26,58,107,1) 0%, rgba(46,109,180,0.9) 100%)',
            }}
            aria-hidden="true"
          />

          <div className="container" style={{ position: 'relative', zIndex: 1, padding: '80px 24px' }}>
            <div
              className="cta-banner-inner"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '40px',
              }}
            >
              {/* Text */}
              <div className="cta-banner-text" style={{ flex: 1 }}>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: 'var(--color-accent)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '12px',
                  }}
                >
                  새로운 가능성의 시작
                </p>
                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(28px, 4vw, 40px)',
                    fontWeight: '800',
                    color: 'white',
                    letterSpacing: 'var(--letter-spacing)',
                    lineHeight: '1.25',
                    marginBottom: '20px',
                  }}
                >
                  진흥기업과 함께<br />성장하세요
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '16px',
                    color: 'rgba(255,255,255,0.75)',
                    lineHeight: 'var(--line-height)',
                    maxWidth: '520px',
                  }}
                >
                  비즈니스 성장을 위한 최적의 파트너를 찾고 계신가요? 진흥기업의 전문가 팀이 귀사의 도전에 함께하겠습니다. 지금 바로 상담을 신청하세요.
                </p>
              </div>

              {/* CTA Button */}
              <div style={{ flexShrink: 0 }}>
                <a href="#" className="btn-white" aria-label="상담 신청하기 페이지로 이동">
                  상담 신청하기
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 4: Stats ────────────────────────────────────────────────── */}
        <section
          ref={statsRef}
          aria-label="주요 실적 통계 섹션"
          className="section-padding"
          style={{
            padding: 'var(--spacing-section-padding)',
            backgroundColor: 'var(--color-surface)',
          }}
        >
          <div className="container">
            {/* Section Header */}
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: 'var(--color-accent)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '12px',
                }}
              >
                실적이 증명하는 신뢰
              </p>
              <h2
                className="section-title"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--text-h2)',
                  fontWeight: '800',
                  color: 'var(--color-primary)',
                  letterSpacing: 'var(--letter-spacing)',
                  marginBottom: '16px',
                }}
              >
                숫자로 보는 진흥기업
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '17px',
                  color: '#6B7280',
                  lineHeight: 'var(--line-height)',
                  maxWidth: '560px',
                  margin: '0 auto',
                }}
              >
                진흥기업은 수십 년간 다양한 산업 분야에서 축적한 성과를 바탕으로 고객에게 검증된 가치를 제공합니다.
              </p>
            </div>

            {/* Stats Grid */}
            <div
              className="stats-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 'var(--spacing-element-gap)',
              }}
            >
              {stats.map((item, index) => (
                <StatCard key={index} item={item} isVisible={statsVisible} />
              ))}
            </div>

            {/* CTA */}
            <div style={{ textAlign: 'center', marginTop: '48px' }}>
              <a href="#" className="btn-outline-primary" aria-label="사업 실적 보기 페이지로 이동">
                사업 실적 보기
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        {/* ─── Section 5: Footer ───────────────────────────────────────────────── */}
        <footer
          role="contentinfo"
          style={{
            backgroundColor: '#0F1E3A',
          }}
        >
          {/* Main Footer Content */}
          <div
            className="container"
            style={{
              paddingTop: '72px',
              paddingBottom: '48px',
            }}
          >
            {/* Top Row: Brand + Links */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '48px',
                marginBottom: '56px',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                paddingBottom: '56px',
              }}
            >
              {/* Brand Info */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '20px',
                  }}
                >
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      backgroundColor: 'var(--color-accent)',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    aria-hidden="true"
                  >
                    <span style={{ color: 'white', fontWeight: '800', fontSize: '16px' }}>진</span>
                  </div>
                  <span
                    style={{
                      color: 'white',
                      fontFamily: 'var(--font-heading)',
                      fontSize: '20px',
                      fontWeight: '700',
                      letterSpacing: 'var(--letter-spacing)',
                    }}
                  >
                    진흥기업
                  </span>
                </div>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: 'rgba(255,255,255,0.7)',
                    marginBottom: '12px',
                    letterSpacing: 'var(--letter-spacing)',
                  }}
                >
                  신뢰와 혁신으로 함께하는 기업
                </p>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.5)',
                    lineHeight: 'var(--line-height)',
                    marginBottom: '28px',
                    maxWidth: '300px',
                  }}
                >
                  진흥기업은 고객과 사회에 지속 가능한 가치를 창출하기 위해 오늘도 도전하고 혁신합니다.
                </p>

                {/* SNS Icons */}
                <div style={{ display: 'flex', gap: '12px' }}>
                  <a
                    href="#"
                    aria-label="진흥기업 LinkedIn 페이지"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255,255,255,0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'rgba(255,255,255,0.6)',
                      transition: `all var(--animation-duration) var(--animation-easing)`,
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--color-accent)';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)';
                      e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                    }}
                  >
                    <LinkedInIcon />
                  </a>
                  <a
                    href="#"
                    aria-label="진흥기업 YouTube 채널"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255,255,255,0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'rgba(255,255,255,0.6)',
                      transition: `all var(--animation-duration) var(--animation-easing)`,
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--color-accent)';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)';
                      e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                    }}
                  >
                    <YouTubeIcon />
                  </a>
                </div>
              </div>

              {/* Site Map Links */}
              <div>
                <div
                  className="footer-grid"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '32px',
                  }}
                >
                  {footerColumns.slice(0, 3).map((column, index) => (
                    <div key={index}>
                      <h3
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '14px',
                          fontWeight: '700',
                          color: 'white',
                          letterSpacing: 'var(--letter-spacing)',
                          marginBottom: '16px',
                        }}
                      >
                        {column.title}
                      </h3>
                      <ul style={{ listStyle: 'none' }}>
                        {column.links.map((link, linkIndex) => (
                          <li key={linkIndex} style={{ marginBottom: '8px' }}>
                            <a href={link.href} className="footer-link">
                              {link.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '32px',
                    marginTop: '32px',
                  }}
                >
                  {footerColumns.slice(3, 5).map((column, index) => (
                    <div key={index}>
                      <h3
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '14px',
                          fontWeight: '700',
                          color: 'white',
                          letterSpacing: 'var(--letter-spacing)',
                          marginBottom: '16px',
                        }}
                      >
                        {column.title}
                      </h3>
                      <ul style={{ listStyle: 'none' }}>
                        {column.links.map((link, linkIndex) => (
                          <li key={linkIndex} style={{ marginBottom: '8px' }}>
                            <a href={link.href} className="footer-link">
                              {link.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {/* Contact CTA */}
                  <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <a
                      href="#"
                      aria-label="문의하기 페이지로 이동"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: 'var(--color-accent)',
                        color: 'white',
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        fontWeight: '600',
                        padding: '12px 20px',
                        borderRadius: 'var(--border-radius)',
                        textDecoration: 'none',
                        transition: `all var(--animation-duration) var(--animation-easing)`,
                        letterSpacing: 'var(--letter-spacing)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#CF7A16';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--color-accent)';
                      }}
                    >
                      문의하기
                      <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Legal Info */}
            <div>
              <div
                className="footer-legal"
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px 24px',
                  marginBottom: '16px',
                }}
              >
                {[
                  '사업자등록번호: 000-00-00000',
                  '대표이사: 홍길동',
                  '주소: 서울특별시 강남구 테헤란로 123 진흥빌딩',
                  '대표전화: 02-0000-0000',
                  '이메일: info@jinhung.co.kr',
                ].map((info, index) => (
                  <span
                    key={index}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      color: 'rgba(255,255,255,0.4)',
                      lineHeight: '1.6',
                    }}
                  >
                    {info}
                  </span>
                ))}
              </div>

              <div
                className="footer-bottom"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.35)',
                  }}
                >
                  Copyright © 2024 진흥기업. All Rights Reserved.
                </p>

                <div style={{ display: 'flex', gap: '16px' }}>
                  {['개인정보처리방침', '이용약관', '사이트맵'].map((item) => (
                    <a
                      key={item}
                      href="#"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '13px',
                        color: 'rgba(255,255,255,0.45)',
                        textDecoration: 'none',
                        transition: `color var(--animation-duration) var(--animation-easing)`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--color-accent)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'rgba(255,255,255,0.45)';
                      }}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}