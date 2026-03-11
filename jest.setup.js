import '@testing-library/jest-dom';

// Mock GSAP and ScrollTrigger
jest.mock('gsap', () => ({
  registerPlugin: jest.fn(),
  fromTo: jest.fn(),
  context: jest.fn((cb) => ({
    revert: jest.fn(),
    add: jest.fn(),
  })),
  to: jest.fn(),
  timeline: jest.fn(() => ({
    to: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    fromTo: jest.fn().mockReturnThis(),
    add: jest.fn().mockReturnThis(),
  })),
}));

// Mock ScrollTrigger named export from gsap/dist/ScrollTrigger
jest.mock('gsap/dist/ScrollTrigger', () => {
  const ScrollTrigger = {
    registerPlugin: jest.fn(),
    refresh: jest.fn(),
    getAll: jest.fn(() => []),
    create: jest.fn(),
    update: jest.fn(),
  };
  return {
    __esModule: true,
    ScrollTrigger,
  };
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock requestAnimationFrame
global.requestAnimationFrame = (callback) => setTimeout(callback, 0);
global.cancelAnimationFrame = (id) => clearTimeout(id);
