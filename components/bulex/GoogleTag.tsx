'use client';
import {useEffect} from 'react';
import {syncGoogleTag} from '@/lib/google-tag';
export default function GoogleTag(){
 useEffect(()=>{
  syncGoogleTag();window.addEventListener('bulex-consent-changed',syncGoogleTag);
  window.addEventListener('storage',syncGoogleTag);
  return()=>{window.removeEventListener('bulex-consent-changed',syncGoogleTag);window.removeEventListener('storage',syncGoogleTag);};
 },[]);
 return null;
}
