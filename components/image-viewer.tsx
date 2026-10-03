"use client";
import { usePreferences } from "@/components/preferences";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from "lucide-react";

export type ViewerImage = { src: string; title: string; alt: string };
import {track} from '@/lib/analytics';
type GalleryRequest = {images: ViewerImage[]; start: number; source: string};
const ViewerContext = createContext<((request: GalleryRequest) => void) | null>(null);

export function ImageViewerProvider({ children }: { children: ReactNode; images?: ViewerImage[]; start?: number; source?: string }) {
  const { t } = usePreferences();
  const dialog = useRef<HTMLDialogElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const touch = useRef<{x:number;y:number} | null>(null);
  const [gallery,setGallery] = useState<GalleryRequest | null>(null);
  const [index,setIndex] = useState(0);
  const image = gallery?.images[index];
  const isOpen = !!gallery;
  const [zoomed, setZoomed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => { setReady(true); }, []);

  useEffect(() => {
    if (!isOpen || !dialog.current) return;
    const viewer = dialog.current;
    const initiator = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    const previousScroll = { left: window.scrollX, top: window.scrollY };
    viewer.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      if (viewer.open) viewer.close();
      document.body.style.overflow = previousOverflow;
      initiator?.focus({preventScroll:true});
      window.scrollTo({ ...previousScroll, behavior: "instant" });
    };
  }, [isOpen]);

  const resetImage = () => {setZoomed(false);setLoaded(false);setFailed(false);body.current?.scrollTo(0,0);};
  const move = (offset:number) => {if(!gallery || gallery.images.length<2)return; resetImage();setIndex(value=>(value+offset+gallery.images.length)%gallery.images.length);};
  const open = (request:GalleryRequest) => {
    const images=request.images.filter((item,i,all)=>item.src && all.findIndex(other=>other.src===item.src)===i);
    if(!images.length)return;
    const selected=request.images[request.start]?.src;
    resetImage();setIndex(Math.max(0,images.findIndex(item=>item.src===selected)));setGallery({...request,images});
    track('gallery_open',{content_id:request.source,image_count:images.length});
  };
  const close = () => dialog.current?.close();

  return <ViewerContext.Provider value={ready ? open : null}>
    {children}
    <dialog ref={dialog} id="image-preview-dialog" className="image-viewer" aria-labelledby="image-preview-title" onClose={() => setGallery(null)} onClick={event => { if (event.target === event.currentTarget) close(); }} onKeyDown={event=>{if(!zoomed && (event.key==='ArrowLeft' || event.key==='ArrowRight')){event.preventDefault();move(event.key==='ArrowLeft'?-1:1);}}}>
      <div className="image-viewer-panel">
        <div className="image-viewer-toolbar">
          <h2 id="image-preview-title">{image?.title ?? t("Image preview")}</h2>
          <div className="image-viewer-actions">
            <button type="button" className="image-viewer-zoom" disabled={!loaded || failed} aria-label={zoomed ? t("Fit to screen") : t("Zoom in")} aria-pressed={zoomed} onClick={() => setZoomed(value => !value)}>
              {zoomed ? <ZoomOut size={20} aria-hidden="true"/> : <ZoomIn size={20} aria-hidden="true"/>}<span>{zoomed ? t("Fit to screen") : t("Zoom in")}</span>
            </button>
            <button type="button" className="image-viewer-close" aria-label={t("Close image preview")} onClick={close} autoFocus><X size={22} aria-hidden="true"/></button>
          </div>
        </div>
        <div ref={body} className={`image-viewer-body${zoomed ? " is-zoomed" : ""}`} role="region" aria-label={t("Image preview")} tabIndex={0} onTouchStart={event=>{touch.current=event.touches.length===1 && !zoomed?{x:event.touches[0].clientX,y:event.touches[0].clientY}:null;}} onTouchEnd={event=>{const start=touch.current;touch.current=null;if(!start || zoomed || !event.changedTouches[0])return;const dx=event.changedTouches[0].clientX-start.x,dy=event.changedTouches[0].clientY-start.y;if(Math.abs(dx)>60 && Math.abs(dx)>Math.abs(dy)*1.5)move(dx<0?1:-1);}} onTouchCancel={()=>{touch.current=null;}}>
          {image && !failed && <img key={image.src} src={image.src} alt={image.alt} onLoad={() => setLoaded(true)} onError={() => setFailed(true)}/>}
          {image && !loaded && !failed && <p className="image-viewer-status" role="status">{t("Loading image…")}</p>}
          {failed && <p className="image-viewer-status" role="alert">{t("The image could not be loaded. Close the preview and try again.")}</p>}
        </div>
        {gallery && gallery.images.length>1 && <div className="gallery-controls"><button type="button" aria-label={t("Previous image")} onClick={()=>move(-1)}><ChevronLeft size={20}/></button><p aria-live="polite" aria-atomic="true"><span>{index+1} / {gallery.images.length}</span><span>{image?.title}</span></p><button type="button" aria-label={t("Next image")} onClick={()=>move(1)}><ChevronRight size={20}/></button></div>}
      </div>
    </dialog>
  </ViewerContext.Provider>;
}

export function ImageViewerTrigger({ src, title, alt, label, className, children, images, start=0, source='' }: ViewerImage & { label: string; className?: string; children: ReactNode; images?: ViewerImage[]; start?: number; source?: string }) {
  const open = useContext(ViewerContext);
  return <button type="button" className={className} aria-label={label} aria-haspopup="dialog" aria-controls="image-preview-dialog" disabled={!open} onClick={() => open?.({images:images || [{src,title,alt}],start,source})}>{children}</button>;
}
