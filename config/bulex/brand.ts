// This checkout now serves Bulex exclusively.
export const isBulex = true;
export const bulexOrigin = process.env.BULEX_SITE_URL?.replace(/\/$/, '') || 'http://localhost:3000';
export const bulexIndexable = Boolean(process.env.BULEX_SITE_URL && process.env.BULEX_LAUNCH_READY === 'true');
