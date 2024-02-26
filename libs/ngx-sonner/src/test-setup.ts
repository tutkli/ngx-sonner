// @ts-expect-error https://thymikee.github.io/jest-preset-angular/docs/getting-started/test-enjestronment
globalThis.ngJest = {
  testEnjestronmentOptions: {
    errorOnUnknownElements: true,
    errorOnUnknownProperties: true,
  },
};
import '@testing-library/jest-dom';
import 'jest-preset-angular/setup-jest';

export const mediaQueryState = {
  matches: false,
};

const listeners: ((event: unknown) => void)[] = [];

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: mediaQueryState.matches,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn((type, callback) => {
      if (type === 'change') {
        listeners.push(callback);
      }
    }),
    removeEventListener: jest.fn((type, callback) => {
      const index = listeners.indexOf(callback);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    }),
    dispatchEvent: jest.fn(event => {
      if (event.type === 'change') {
        for (const callback of listeners) {
          callback({
            matches: mediaQueryState.matches,
            media: '(prefers-color-scheme: light)',
          });
        }
      }
    }),
  })),
});
