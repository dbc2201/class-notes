import {afterEach, expect} from 'vitest';
import {cleanup} from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extends Vitest's expect with Jest-DOM matchers
expect.extend(matchers);

// Cleans up the DOM after each test
afterEach(() => {
	cleanup();
});