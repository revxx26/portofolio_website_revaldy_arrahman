"use client";

import Image from "next/image";
import {ChevronDown, Maximize2} from "lucide-react";
import type {PortfolioData} from "@/content/fallback";
import {usePreferences} from "./preferences";
import {ImageViewerTrigger} from "./image-viewer";
import {track} from "@/lib/analytics";

export function ProjectCaseStudy({project}: {project: PortfolioData['projects'][number]}) {
  const {t} = usePreferences();
  const figures = [
    {src:project.image,title:t(project.figureLabel || project.title),alt:t(project.imageAlt)},
    ...project.additionalImages.map(figure=>({src:figure.src,title:t(figure.caption),alt:t(figure.alt)})),
  ];

  return <div className="case-study-shell">
    <details className="case-study" onToggle={event=>{
      if(event.currentTarget.open) track('case_study_open',{content_id:project.id});
    }}>
      <summary>
        <span className="case-toggle">
          <span className="case-label-closed">{t('View case study')}</span>
          <span className="case-label-open">{t('Close case study')}</span>
          <ChevronDown className="case-chevron" size={18} aria-hidden="true"/>
        </span>
      </summary>
      <div className="case-content">
        {(project.objective || project.output) && <div className="case-overview">
          <h4 className="case-heading">{t('At a glance')}</h4>
          <dl className="case-brief">
            {project.objective && <div><dt>{t('Objective')}</dt><dd>{t(project.objective)}</dd></div>}
            {project.output && <div><dt>{t('Deliverable')}</dt><dd>{t(project.output)}</dd></div>}
          </dl>
        </div>}

        {project.insight && <div className="case-findings">
          <h4>{t('Key findings')}</h4>
          <p>{t(project.insight)}</p>
        </div>}

        {(project.process.length > 0 || project.source || project.limitation) && <div className="case-method-layout">
          {project.process.length > 0 && <div className="case-workflow">
            <h4 className="case-heading">{t('How the project was built')}</h4>
            <ol>{project.process.map((step,index)=><li key={`${project.id}-step-${index}`}>
              <span className="case-step-number" aria-hidden="true">{String(index+1).padStart(2,'0')}</span>
              <p>{t(step)}</p>
            </li>)}</ol>
          </div>}
          {(project.source || project.limitation) && <div className="case-context">
            {project.source && <div className="case-data"><h4>{t('Data used')}</h4><p>{t(project.source)}</p></div>}
            {project.limitation && <div className="case-caveat"><h4>{t('What to keep in mind')}</h4><p>{t(project.limitation)}</p></div>}
          </div>}
        </div>}

        {project.additionalImages.length > 0 && <div className="case-evidence">
          <h4 className="case-heading">{t('Supporting visuals')}</h4>
          <div className="case-evidence-grid">{project.additionalImages.map((figure,index)=><figure className="case-evidence-figure" key={`${figure.src}-${index}`}>
            <div className="figure-frame case-evidence-frame">
              <Image src={figure.src} alt={t(figure.alt)} width={figure.width} height={figure.height} sizes="(max-width: 760px) 100vw, 800px"/>
              <ImageViewerTrigger source={project.id} start={index+1} images={figures} src={figure.src} title={t(figure.caption)} alt={t(figure.alt)} label={`${t('Enlarge')}: ${t(figure.caption)}`} className="figure-expand"><Maximize2 size={18} aria-hidden="true"/></ImageViewerTrigger>
            </div>
            <figcaption>{t(figure.caption)}</figcaption>
          </figure>)}</div>
        </div>}
      </div>
    </details>
    <span className="summary-sub">{t('Overview, findings & process')}</span>
  </div>;
}
