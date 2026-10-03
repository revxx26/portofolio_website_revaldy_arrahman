"use client";
import {useEffect,useState} from 'react';
import {PreviewDialog} from './preview-dialog';
import {ExternalLink,Play,X} from 'lucide-react';
import {usePreferences} from './preferences';
import {track} from '@/lib/analytics';

export function LiveDemo({url,title,contentId}:{url:string;title:string;contentId:string}) {
  const {t} = usePreferences();
  const [open,setOpen]=useState(false);
  const [loaded,setLoaded]=useState(false);
  const [slow,setSlow]=useState(false);
  let embedded='';
  try {const address=new URL(url); if(address.protocol==='https:' && address.hostname==='public.tableau.com' && /^\/views\/[^/]+\/[^/]+\/?$/.test(address.pathname)) {
    address.search=''; address.hash=''; address.searchParams.set(':embed','yes');address.searchParams.set(':showVizHome','no');address.searchParams.set(':tabs','no');address.searchParams.set(':toolbar','yes'); embedded=address.href;
  }} catch {}
  useEffect(()=>{if(!open || loaded)return;const timeout=setTimeout(()=>setSlow(true),15000);return ()=>clearTimeout(timeout);},[open,loaded]);
  if (!url) return null;
  if (!embedded) return <a className="button project-demo" href={url} target="_blank" rel="noreferrer" onClick={()=>track('project_demo_click',{content_id:contentId})}><ExternalLink size={18}/>{t('Live demo')}</a>;
  return <>
    <button type="button" className="button project-demo" aria-haspopup="dialog" aria-controls={`demo-${contentId}`} onClick={event=>{event.currentTarget.focus({preventScroll:true});setLoaded(false);setSlow(false);setOpen(true);track('project_demo_click',{content_id:contentId});}}><Play size={18}/>{t('Live demo')}</button>
    <PreviewDialog open={open} onClose={()=>setOpen(false)} id={`demo-${contentId}`} className="image-viewer demo-viewer" label={`${t('Live demo')}: ${title}`}>
      <div className="image-viewer-panel"><div className="image-viewer-toolbar"><h2>{title}</h2><div className="image-viewer-actions"><a href={url} target="_blank" rel="noreferrer" aria-label={t('Open in Tableau')}><ExternalLink size={20}/></a><button type="button" aria-label={t('Close live demo')} autoFocus onClick={()=>setOpen(false)}><X size={22}/></button></div></div>
      <p className="demo-note">{t('Explore the dashboard filters. On a small screen, scroll inside the dashboard or open it in Tableau.')} <a href={url} target="_blank" rel="noreferrer">{t('Open in Tableau')} ↗</a></p>
      <div className="demo-body">{open && <iframe src={embedded} title={`${title} — Tableau`} referrerPolicy="strict-origin-when-cross-origin" onLoad={()=>{setLoaded(true);setSlow(false);}} allowFullScreen/>}</div>
      {open && (!loaded || slow) && <p className="demo-loading" role="status">{slow ? t('If the dashboard does not appear, open it in Tableau.') : t('Loading dashboard…')}</p>}
      </div>
    </PreviewDialog>
  </>;
}
