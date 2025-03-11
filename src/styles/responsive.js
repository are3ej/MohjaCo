// src/styles/responsive.js
export const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  large: 1200
};

export const mediaQuery = {
  mobile: `@media (max-width: ${BREAKPOINTS.mobile}px)`,
  tablet: `@media (max-width: ${BREAKPOINTS.tablet}px)`,
  desktop: `@media (max-width: ${BREAKPOINTS.desktop}px)`,
  large: `@media (max-width: ${BREAKPOINTS.large}px)`
};