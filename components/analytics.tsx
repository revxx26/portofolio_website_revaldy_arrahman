"use client";
import Script from 'next/script';
import {useEffect, useState} from 'react';
import {usePortfolio} from './portfolio-provider';

export function Analytics() {
  const {data:{profile}} = usePortfolio();
  const [id,setId] = useState('');
  useEffect(() => {
    const measurement = /^G-[A-Z0-9]{4,20}$/.test(profile.analyticsId) ? profile.analyticsId : '';
    const local = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
    const optedOut = navigator.doNotTrack === '1' || (navigator as Navigator & {globalPrivacyControl?:boolean}).globalPrivacyControl;
    if (!measurement || local || optedOut) {window.portfolioAnalyticsId=undefined; setId(''); return;}
    (window as unknown as Record<string,unknown>)[`ga-disable-${measurement}`]=false;
    window.dataLayer ||= [];
    window.gtag ||= function (...args: unknown[]) {window.dataLayer!.push(arguments);};
    if (window.portfolioAnalyticsId !== measurement) {
      window.gtag('js',new Date());
      window.gtag('config',measurement,{allow_google_signals:false,allow_ad_personalization_signals:false,page_location:location.origin+location.pathname,page_referrer:'',send_page_view:true});
      window.portfolioAnalyticsId=measurement;
    }
    setId(measurement);
    return ()=>{(window as unknown as Record<string,unknown>)[`ga-disable-${measurement}`]=true;};
  },[profile.analyticsId]);
  return id ? <Script id={`ga4-${id}`} src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive"/> : null;
}
