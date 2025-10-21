import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Розширюємо expect з jest-dom матчерами
expect.extend(matchers);

// Очищуємо після кожного тесту
afterEach(() => {
  cleanup();
});
