// This checkout serves Bulex exclusively.
export const isBulex = true;
export function resolveAppMode(value:string|undefined,nodeEnv:string|undefined):'production'|'development'{
  return value?.trim().toLowerCase()==='production'?'production':
    value?.trim().toLowerCase()==='development'?'development':
    nodeEnv==='production'?'production':'development';
}
export const appMode=resolveAppMode(process.env.APP_MODE,process.env.NODE_ENV);
export const bulexOrigin = process.env.BULEX_SITE_URL?.trim().replace(/\/$/, '') || 'http://localhost:3000';
export const bulexIndexable = appMode === 'production';
