/**
 * Unit tests for the Portfolio Home page
 */

import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

// ---- Mock Background component (Three.js can be tricky in Jest) ----
jest.mock('@/components/Background', () => {
  return function MockBackground() {
    return <div data-testid="background" />;
  };
});

// ---- Mock GSAP ----
jest.mock('gsap', () => ({
  registerPlugin: jest.fn(),
  context: (fn) => {
    const ctx = { revert: jest.fn() };
    fn(ctx);
    return ctx;
  },
  from: jest.fn(),
  fromTo: jest.fn(),
}));

jest.mock('gsap/dist/ScrollTrigger', () => ({
  ScrollTrigger: jest.fn(),
}));

// ---- Mock react-icons ----
jest.mock('react-icons/fi', () => ({
  FiArrowRight: () => <span>→</span>,
  FiGithub:    () => <span>GH</span>,
  FiLinkedin:  () => <span>LI</span>,
  FiMail:      () => <span>✉</span>,
  FiDownload:  () => <span>⬇</span>,
  FiExternalLink: () => <span>🔗</span>,
}));

describe('Portfolio Home Page', () => {
  beforeEach(() => {
    render(<Home />);
  });

  // ----- NAVIGATION -----
  describe('Navigation', () => {
    it('renders the brand logo text', () => {
      expect(screen.getByText('J. LOUI')).toBeInTheDocument();
    });

    it('renders a GitHub link with the correct href in navbar', () => {
      const links = screen.getAllByRole('link', { name: /github/i });
      expect(links[0]).toHaveAttribute('href', 'https://github.com/johnloui17');
    });

    it('renders a LinkedIn link with the correct href in navbar', () => {
      const links = screen.getAllByRole('link', { name: /linkedin/i });
      expect(links[0]).toHaveAttribute('href', 'https://www.linkedin.com/in/john-loui-26a8b9155');
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

    it('renders a "Download Resume" link', () => {
      const link = screen.getByRole('link', { name: /download resume/i });
      expect(link).toHaveAttribute('href', '/resume.pdf');
    });
  });

  // ----- ABOUT SECTION (New) -----
  describe('About Me Section', () => {
    it('renders the section heading', () => {
      expect(screen.getByText(/about me\./i)).toBeInTheDocument();
    });

    it('renders the about me description', () => {
      expect(screen.getByText(/my journey into software engineering/i)).toBeInTheDocument();
    });
  });

  // ----- SKILLS SECTION -----
  describe('Engineering Arsenal Section', () => {
    it('renders the section heading', () => {
      expect(screen.getByText(/engineering arsenal/i)).toBeInTheDocument();
    });

    it('displays technologies including new ones like GSAP and Three.js', () => {
      expect(screen.getAllByText('React 18').length).toBeGreaterThan(0);
      expect(screen.getAllByText('GSAP').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Three.js').length).toBeGreaterThan(0);
    });

    it('renders the Efficiency & Scale highlights', () => {
      expect(screen.getAllByText(/609\+ files/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/400\+ e2e tests/i).length).toBeGreaterThan(0);
    });
  });

  // ----- PROJECTS SECTION -----
  describe('Selected Works Section', () => {
    it('renders the projects heading', () => {
      expect(screen.getByText(/selected works/i)).toBeInTheDocument();
    });

    it('renders Carland360 project', () => {
      expect(screen.getByText('Carland360')).toBeInTheDocument();
    });

    it('renders Marketfeed Systems project', () => {
      expect(screen.getByText('Marketfeed Systems')).toBeInTheDocument();
    });

    it('renders project role pills', () => {
      expect(screen.getAllByText(/founder & engineer/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/frontend dev/i).length).toBeGreaterThan(0);
    });

    it('renders repository and demo links for projects', () => {
      expect(screen.getAllByText(/repository/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/live demo/i).length).toBeGreaterThan(0);
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
