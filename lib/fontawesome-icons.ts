// lib/fontawesome-icons.ts

// Type-only imports for icon definitions
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

// Declare all icons you use
let faGithub: IconDefinition;
let faLinkedin: IconDefinition;
let faEnvelope: IconDefinition;
let faCheck: IconDefinition;
let faExclamationTriangle: IconDefinition;
let faMapMarkerAlt: IconDefinition;
let faFont: IconDefinition;
let faSun: IconDefinition;
let faMoon: IconDefinition;
let faCode: IconDefinition;
let faGraduationCap: IconDefinition;
let faLightbulb: IconDefinition;
let faRocket: IconDefinition;
let faBars: IconDefinition;
let faXmark: IconDefinition;
let faExternalLink: IconDefinition;

// Always use full sets for HMR compatibility
// The bundle splitting in webpack config will still help with chunk organization
// @ts-ignore
faGithub = require('@fortawesome/free-brands-svg-icons').faGithub;
// @ts-ignore
faLinkedin = require('@fortawesome/free-brands-svg-icons').faLinkedin;
// @ts-ignore
faEnvelope = require('@fortawesome/free-solid-svg-icons').faEnvelope;
// @ts-ignore
faCheck = require('@fortawesome/free-solid-svg-icons').faCheck;
// @ts-ignore
faExclamationTriangle = require('@fortawesome/free-solid-svg-icons').faExclamationTriangle;
// @ts-ignore
faMapMarkerAlt = require('@fortawesome/free-solid-svg-icons').faMapMarkerAlt;
// @ts-ignore
faFont = require('@fortawesome/free-solid-svg-icons').faFont;
// @ts-ignore
faCode = require('@fortawesome/free-solid-svg-icons').faCode;
// @ts-ignore
faGraduationCap = require('@fortawesome/free-solid-svg-icons').faGraduationCap;
// @ts-ignore
faLightbulb = require('@fortawesome/free-solid-svg-icons').faLightbulb;
// @ts-ignore
faRocket = require('@fortawesome/free-solid-svg-icons').faRocket;
// @ts-ignore
faBars = require('@fortawesome/free-solid-svg-icons').faBars;
// @ts-ignore
faXmark = require('@fortawesome/free-solid-svg-icons').faXmark;
// @ts-ignore
faExternalLink = require('@fortawesome/free-solid-svg-icons').faExternalLink;
// @ts-ignore
faSun = require('@fortawesome/free-regular-svg-icons').faSun;
// @ts-ignore
faMoon = require('@fortawesome/free-regular-svg-icons').faMoon;

export {
  faGithub,
  faLinkedin,
  faEnvelope,
  faCheck,
  faExclamationTriangle,
  faMapMarkerAlt,
  faFont,
  faSun,
  faMoon,
  faCode,
  faGraduationCap,
  faLightbulb,
  faRocket,
  faBars,
  faXmark,
  faExternalLink,
}; 