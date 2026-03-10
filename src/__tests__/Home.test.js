/**
 * Unit tests for the Portfolio Home page
 *
 * Tests cover:
 *  - Page renders without crashing
 *  - Key text content is present
 *  - Navigation links are correct
 *  - CTA buttons are present and functional
 */

import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

// ---- Mock framer-motion to avoid animation issues in JSDOM ----
jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion');
  return {
    ...actual,
    motion: new Proxy(
      {},
      {
        get: (_, prop) =>
          // Return a plain HTML element wrapper for any motion.div, motion.h1, etc.
          ({ children, ...rest }) => {
            const Tag = prop;
            // Strip framer-motion-specific props
            const {
              initial, animate, whileInView, viewport, variants, custom,
              transition, whileHover, style, ...domProps
            } = rest;
            return <Tag {...domProps}>{children}</Tag>;
          },
      }
    ),
    useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
    useTransform: () => 0,
    useMotionValue: () => ({ set: jest.fn(), get: () => 0 }),
  };
});

// ---- Mock react-icons ----
jest.mock('react-icons/fi', () => ({
  FiArrowRight: () => <span data-testid="icon-arrow" />,
  FiGithub: () => <span data-testid="icon-github" />,
  FiLinkedin: () => <span data-testid="icon-linkedin" />,
  FiMail: () => <span data-testid="icon-mail" />,
}));

describe('Portfolio Home Page', () => {

  beforeEach(() => {
    // Mock window.addEventListener for mouse events
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
      const githubLink = screen.getByRole('link', { name: /github/i })
        || document.querySelector('a[href*="github.com"]');
      const link = document.querySelector('a[href*="github.com"]');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', 'https://github.com/johnloui17');
    });

    it('renders a LinkedIn link with the correct href', () => {
      const link = document.querySelector('a[href*="linkedin.com"]');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', 'https://www.linkedin.com/in/john-loui-26a8b9155');
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
      const link = document.querySelector('a[href="#projects"]');
      expect(link).toBeInTheDocument();
      expect(link).toHaveTextContent(/view work/i);
    });

    it('renders a "Get in touch" email link', () => {
      const link = document.querySelector('a[href^="mailto:"]');
      expect(link).toBeInTheDocument();
      expect(link).toHaveTextContent(/get in touch/i);
    });
  });

  // ----- SKILLS SECTION -----
  describe('Engineering Arsenal Section', () => {
    it('renders the section heading', () => {
      expect(screen.getByText(/engineering arsenal/i)).toBeInTheDocument();
    });

    it('displays frontend technologies', () => {
      expect(screen.getByText('React 18')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('Next.js 13-16')).toBeInTheDocument();
    });

    it('displays backend technologies including Nest.js', () => {
      expect(screen.getByText('Nest.js')).toBeInTheDocument();
      expect(screen.getByText('Node.js')).toBeInTheDocument();
      expect(screen.getByText('Supabase')).toBeInTheDocument();
    });

    it('renders the Efficiency & Scale highlights', () => {
      expect(screen.getByText(/609\+ files/i)).toBeInTheDocument();
      expect(screen.getByText(/400\+ e2e tests/i)).toBeInTheDocument();
      expect(screen.getByText(/lighthouse optimizations/i)).toBeInTheDocument();
    });

    it('renders Security bento block', () => {
      expect(screen.getByText(/HSTS/i)).toBeInTheDocument();
    });

    it('renders Analytics bento block', () => {
      expect(screen.getByText(/Mixpanel/i)).toBeInTheDocument();
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
