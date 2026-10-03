"use client";

import { usePreferences } from "@/components/preferences";



import Image from "next/image";

import { Fragment } from "react";

import { Maximize2, Mail, Github, Linkedin, Database, Bot } from "lucide-react";

import { usePortfolio } from "./portfolio-provider";

import { ContactForm } from "@/components/contact-form";

import {track} from "@/lib/analytics";

import {LiveDemo} from "./live-demo";
import {ProjectCaseStudy} from "./project-case-study";

import { ImageViewerTrigger } from "@/components/image-viewer";
import { TouchCard } from "@/components/touch-card";



function SectionHeading({ number, label, title, description }: { number: string; label: string; title: string; description?: string }) {

  const { t } = usePreferences();

  return <div className="section-heading"><div className="section-index mono"><span>{number}</span>{label}</div><div><h2>{title}</h2>{description && <p className="section-description">{description}</p>}</div></div>;

}



export function About() {

  const {t} = usePreferences();

  const {data: {profile}} = usePortfolio();

  return <section id="about" className="about section wrap">

    <SectionHeading number="01" label={t("ABOUT")} title={t(profile.aboutTitle)}/>

    <div className="about-layout"><div className="about-copy"><p className="large-copy">{t(profile.aboutIntro)}</p><p>{t(profile.aboutBody)}</p><div className="about-focus"><span>{t("Data analytics")}</span><span>{t("Data engineering")}</span></div></div><div className="education"><div className="education-brand">{profile.universityLogo && <Image className="organization-logo" src={profile.universityLogo} alt={profile.university} width={64} height={64}/>}<span className="mono">{t("ACADEMIC FOUNDATION")}</span></div><h3>{profile.university}</h3><p>{t(profile.degree)}</p><div className="education-bottom"><strong>{profile.gpa}<span>{t("GPA")}</span></strong><span className="mono">{t(profile.semester)}<br/>{t("AS LISTED IN PORTFOLIO")}</span></div></div></div>

  </section>;

}



export function Projects() {

  const { t } = usePreferences();

  const {data: {projects}} = usePortfolio();

  return <section id="projects" className="projects section">

    <div className="wrap"><SectionHeading number="02" label={t("SELECTED WORK")} title={t("Questions explored through data.")} description={t("The question, the work, and what the evidence shows.")}/>

    <div className="project-list">{projects.map((project, index) => <article className={`project project-${index + 1}`} key={project.id} id={project.id}>

      <div className="project-overview"><div className="project-copy"><div className="project-category mono"><span>{project.number}</span>{t(project.category)}</div><h3>{t(project.title)}</h3><p>{t(project.description)}</p>{project.contribution && <p className="project-contribution"><strong>{t("My contribution:")}</strong> {t(project.contribution)}</p>}<ul className="tool-list" aria-label={t("Project tools")}>{project.tools.map(tool => <li key={tool}>{tool}</li>)}</ul><div className="project-stat"><strong>{project.metric}</strong><span>{t(project.metricLabel)}</span></div><div className="project-actions">{project.github && <a className="button project-github" href={project.github} onClick={()=>track('project_github_click',{content_id:project.id})} target="_blank" rel="noreferrer" aria-label={`${t("View on GitHub")}: ${t(project.title)}`}><Github size={18} aria-hidden="true"/>{t("View on GitHub")}</a>}{project.demo && <LiveDemo url={project.demo} title={t(project.title)} contentId={project.id}/>}</div></div>

      <figure className={`project-figure ${index === 0 ? "dashboard-figure" : "analysis-figure"}`}><div className="figure-frame"><div className="figure-image"><Image src={project.image} alt={t(project.imageAlt)} width={project.width} height={project.height} sizes="(max-width: 760px) 100vw, 65vw"/></div><ImageViewerTrigger source={project.id} images={[{src:project.image,title:t(project.figureLabel || project.title),alt:t(project.imageAlt)},...project.additionalImages.map(figure=>({src:figure.src,title:t(figure.caption),alt:t(figure.alt)}))]} src={project.image} title={t(project.title)} alt={t(project.imageAlt)} label={`${t("Enlarge")}: ${t(project.title)}`} className="figure-expand"><Maximize2 size={18} aria-hidden="true"/></ImageViewerTrigger></div><figcaption className="mono">{t(project.figureLabel)}</figcaption></figure></div>

      <ProjectCaseStudy project={project}/>

    </article>)}</div>

    </div>

  </section>;

}



function ExperiencePeriod({ period }: { period: { start: string; startLabel: string; end: string; endLabel: string } }) {

  const { t } = usePreferences();

  return <p className="experience-period"><time dateTime={period.start}>{t(period.startLabel)}</time>{" – "}{period.end ? <time dateTime={period.end}>{t(period.endLabel)}</time> : <span>{t(period.endLabel)}</span>}</p>;

}



export function Experience() {

  const {t} = usePreferences();

  const {data: {experiences}} = usePortfolio();

  return <section id="experience" className="experience section wrap">

    <SectionHeading number="03" label={t("EXPERIENCE")} title={t("Working with data in practice.")}/>

    <div className="experience-list">{experiences.map(item => <article className="experience-row" key={item.id}>

      <div className="experience-title">{item.logo && <Image className="organization-logo" src={item.logo} alt={t(item.logoAlt)} width={64} height={64}/>}<div className="experience-identity"><span className="mono">{t(item.role)}</span><h3>{t(item.title)}</h3><span className="experience-type">{t(item.typeLabel)}</span><ExperiencePeriod period={item}/></div></div>

      <div className="experience-body"><p>{t(item.description)}</p>{item.workflow.length > 0 && <div className="ministry-flow" aria-label={t("Data workflow")}>{item.workflow.map((step,index) => <Fragment key={index}>{index > 0 && <span aria-hidden="true">→</span>}<span>{t(step)}</span></Fragment>)}</div>}{item.note && <p className="experience-note">{t(item.note)}</p>}</div>

    </article>)}</div>

  </section>;

}



export function Volunteer() {

  const { t } = usePreferences();

  const {data: {volunteering}} = usePortfolio();

  return <section id="volunteer" className="volunteer section wrap">

    <SectionHeading number="04" label={t("VOLUNTEER")} title={t("Volunteering & Teaching")}/>

    <div className="volunteer-grid">{volunteering.map(activity => <TouchCard className="volunteer-card" key={activity.id}>

      <figure className="volunteer-figure">

        <div className="volunteer-photo">

          <Image src={activity.image} alt={t(activity.imageAlt)} width={activity.width} height={activity.height} sizes="(max-width: 760px) 100vw, 50vw"/>

          <ImageViewerTrigger source={activity.id} images={[{src:activity.original,title:t(activity.title),alt:t(activity.imageAlt)},...activity.gallery.map(item=>({src:item.src,title:t(item.caption),alt:t(item.alt)}))]} src={activity.original} title={t(activity.title)} alt={t(activity.imageAlt)} label={`${t("Enlarge")}: ${t(activity.title)}`} className="activity-photo-control"><Maximize2 size={18} aria-hidden="true"/></ImageViewerTrigger>

        </div>

        <figcaption>{t(activity.organization)}</figcaption>

      </figure>

      <div className="volunteer-copy"><p className="activity-role">{t(activity.role)}</p><p className="activity-date"><time dateTime={activity.date}>{t(activity.dateLabel)}</time></p><h3>{t(activity.title)}</h3><p className="activity-context">{t(activity.context)}</p><p>{t(activity.description)}</p></div>

    </TouchCard>)}</div>

  </section>;

}



export function Certifications() {

  const { t } = usePreferences();

  const {data: {certifications}} = usePortfolio();

  return <section id="certifications" className="certifications section">

    <div className="wrap"><SectionHeading number="05" label={t("CERTIFICATIONS")} title={t("Certifications & Training")}/>

      <div className="certification-grid">{certifications.map(certificate => <TouchCard className="certification-card" key={certificate.id}>

        <div className="certificate-preview">

          <Image src={certificate.image} alt={t(certificate.imageAlt)} width={certificate.width} height={certificate.height} sizes="(max-width: 760px) 100vw, 50vw"/>

        </div>

        <div className="certificate-copy"><p className="activity-role">{t(certificate.type)}</p><h3>{t(certificate.title)}</h3><p className="certificate-issuer">{t(certificate.issuer)}</p><p className="activity-context">{t(certificate.program)}</p><p className="certificate-date">{t(certificate.dateType)}{t(": ")}<time dateTime={certificate.date}>{t(certificate.dateLabel)}</time></p><p>{t(certificate.description)}</p><ImageViewerTrigger source={certificate.id} images={[{src:certificate.certificate,title:t(certificate.title),alt:t(certificate.imageAlt)},...certificate.gallery.map(item=>({src:item.src,title:t(item.caption),alt:t(item.alt)}))]} className="button secondary certificate-button" src={certificate.certificate} title={t(certificate.title)} alt={t(certificate.imageAlt)} label={`${t("View certificate")}: ${t(certificate.title)}`}>{t("View certificate")}</ImageViewerTrigger></div>

      </TouchCard>)}</div>

    </div>

  </section>;

}



export function Skills() {

  const { t } = usePreferences();

  const {data: {skills}} = usePortfolio();

  return <section id="skills" className="skills section wrap">

    <SectionHeading number="06" label={t("SKILLS")} title={t("Tools I work with.")}/>

    <ul className="skills-grid" aria-label={t("Skills and tools")}>

      {skills.map(skill => <TouchCard as="li" className="skill-card" key={skill.name}>

        <span className="skill-logo" aria-hidden="true">

          {skill.logo ? <Image src={skill.logo} alt={t("")} width={36} height={36}/> : skill.icon === "database" ? <Database size={36} strokeWidth={1.6}/> : <Bot size={36} strokeWidth={1.6}/>}

        </span>

        <h3>{skill.name}</h3>

      </TouchCard>)}

    </ul>

  </section>;

}



export function Contact() {

  const { t } = usePreferences();

  const {data: {profile}} = usePortfolio();

  return <section id="contact" className="contact">

    <div className="wrap contact-inner">

      <div className="contact-copy">

        <span className="mono">{t("07 / WHAT’S NEXT")}</span>

        <h2>{t("Let’s work")}<br/>{t("with ")}<em>{t("data.")}</em></h2>

        <p>{t(profile.contactIntro)}</p>

        <div className="contact-links">

          <a href={`mailto:${profile.email}`}><Mail size={20} aria-hidden="true"/><span>{profile.email}</span></a>

          {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={20} aria-hidden="true"/><span>{profile.linkedinLabel} <small>{t("LinkedIn")}</small></span></a>}

          {profile.github && <a href={profile.github} target="_blank" rel="noreferrer"><Github size={20} aria-hidden="true"/><span>{profile.githubLabel} <small>{t("GitHub")}</small></span></a>}

        </div>

      </div>

      <ContactForm recipient={profile.email}/>

    </div>

  </section>;

}



export function Footer() {

  const { t } = usePreferences();

  const {data: {profile}} = usePortfolio();

  return <footer className="footer wrap"><a href="#home" className="footer-name">{profile.name}<span>{t(".")}</span></a><span className="mono">{t("DATA ANALYTICS & ENGINEERING")}</span></footer>;

}





