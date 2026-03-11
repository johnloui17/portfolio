/**
 * Unit tests for the Portfolio Home page
 */

import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

// ---- Explicit framer-motion mock (no Proxy — avoids children being dropped) ----
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, style, className }) => <div style={style} className={className}>{children}</div>,
    h1:  ({ children, style, className }) => <h1  style={style} className={className}>{children}</h1>,
    h2:  ({ children, style, className }) => <h2  style={style} className={className}>{children}</h2>,
    p:   ({ children, style, className }) => <p   style={style} className={className}>{children}</p>,
    ul:  ({ children, style, className }) => <ul  style={style} className={className}>{children}</ul>,
    nav: ({ children, style, className }) => <nav style={style} className={className}>{children}</nav>,
    section: ({ children, style, className, id }) => <section id={id} style={style} className={className}>{children}</section>,
  },
  useScroll:     () => ({ scrollYProgress: { get: () => 0, set: () => {} } }),
  useTransform:  () => 0,
  useMotionValue: () => ({ set: jest.fn(), get: () => 0 }),
  AnimatePresence: ({ children }) => children,
}));

// ---- Mock react-icons ----
jest.mock('react-icons/fi', () => ({
  FiArrowRight: () => <span>→</span>,
  FiGithub:    () => <span>GH</span>,
  FiLinkedin:  () => <span>LI</span>,
  FiMail:      () => <span>✉</span>,
}));

describe('Portfolio Home Page', () => {
  beforeEach(() => {
    jest.spyOn(window, 'addEventListener').mockImplementation(() => {});
    jest.spyOn(window, 'removeEventListener').mockImplementation(() => {});
    render(<Home />);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  // ----- NAVIGATION -----
  describe('Navigation', () => {
    it('renders the brand logo text', () => {
      expect(screen.getByText('J. LOUI')).toBeInTheDocument();
    });

    it('renders a GitHub link with the correct href', () => {
      const link = screen.getByRole('link', { name: /github/i });
      expect(link).toHaveAttribute('href', 'https://github.com/johnloui17');
    });

    it('renders a LinkedIn link with the correct href', () => {
      const link = screen.getByRole('link', { name: /linkedin/i });
      expect(link).toHaveAttribute('href', 'https://www.linkedin.com/in/john-loui-26a8b9155');
    });

    it('nav links open in new tab', () => {
      const links = document.querySelectorAll('nav a');
      links.forEach(link => {
        expect(link).toHaveAttribute('target', '_blank');
      });
    });
  });

  // ----- HERO SECTION -----
  describe('Hero Section', () => {
    it('renders the Full-Stack Engineer pill', () => {
      expect(screen.getByText(/full-stack engineer/i)).toBeInTheDocument();
    });

    it('renders the hero headline', () => {
      expect(screen.getByText(/precision engineering/i)).toBeInTheDocument();
      expect(screen.getByText(/scalable architecture/i)).toBeInTheDocument();
    });

    it('renders the hero sub-description', () => {
      expect(screen.getByText(/high-performance web applications/i)).toBeInTheDocument();
    });

    it('renders a "View Work" CTA button linking to #projects', () => {
      const link = screen.getByRole('link', { name: /view work/i });
      expect(link).toHaveAttribute('href', '#projects');
    });

    it('renders a "Get in touch" email link', () => {
      const link = screen.getByRole('link', { name: /get in touch/i });
      expect(link.getAttribute('href')).toMatch(/^mailto:/);
    });
  });

  // ----- SKILLS SECTION -----
  describe('Engineering Arsenal Section', () => {
    it('renders the section heading', () => {
      expect(screen.getByText(/engineering arsenal/i)).toBeInTheDocument();
    });

    it('displays frontend technologies', () => {
      // Use getAllByText since tags can appear in multiple sections
      expect(screen.getAllByText('React 18').length).toBeGreaterThan(0);
      expect(screen.getAllByText('TypeScript').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Next.js 13-16').length).toBeGreaterThan(0);
    });

    it('displays backend technologies including Nest.js', () => {
      expect(screen.getAllByText('Nest.js').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Node.js').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Supabase').length).toBeGreaterThan(0);
    });

    it('renders the Efficiency & Scale highlights', () => {
      expect(screen.getAllByText(/609\+ files/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/400\+ e2e tests/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/lighthouse optimizations/i).length).toBeGreaterThan(0);
    });

    it('renders Security bento block', () => {
      expect(screen.getAllByText(/HSTS/i).length).toBeGreaterThan(0);
    });

    it('renders Analytics bento block', () => {
      expect(screen.getAllByText(/Mixpanel/i).length).toBeGreaterThan(0);
    });
  });

  // ----- PROJECTS SECTION -----
  describe('Selected Works Section', () => {
    it('renders the projects heading', () => {
      expect(screen.getByText(/selected works/i)).toBeInTheDocument();
    });

    it('renders Carland360 project with description', () => {
      expect(screen.getByText('Carland360')).toBeInTheDocument();
      expect(screen.getByText(/freshsales CRM/i)).toBeInTheDocument();
    });

    it('renders Marketfeed Systems project', () => {
      expect(screen.getByText('Marketfeed Systems')).toBeInTheDocument();
      expect(screen.getByText(/CRM lead capture/i)).toBeInTheDocument();
    });

    it('renders Financial Calculators & Web Stories project', () => {
      expect(screen.getByText(/financial calculators/i)).toBeInTheDocument();
      expect(screen.getByText(/144 PRs/i)).toBeInTheDocument();
    });

    it('renders project role pills', () => {
      expect(screen.getAllByText(/founder & engineer/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/frontend dev/i).length).toBeGreaterThan(0);
    });
  });

  // ----- FOOTER -----
  describe('Footer', () => {
    it('renders footer with name and year', () => {
      const year = new Date().getFullYear().toString();
      expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
      expect(screen.getByText(/john loui/i)).toBeInTheDocument();
    });
  });
});
