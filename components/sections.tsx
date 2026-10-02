import Image from "next/image";
import { ChevronDown, Maximize2, Mail, Github, Linkedin, Database, Bot } from "lucide-react";
import { profile, projects, skills } from "@/content/portfolio";
import { ContactForm } from "@/components/contact-form";

function SectionHeading({ number, label, title, description }: { number: string; label: string; title: string; description?: string }) {
  return <div className="section-heading"><div className="section-index mono"><span>{number}</span>{label}</div><div><h2>{title}</h2>{description && <p className="section-description">{description}</p>}</div></div>;
}

export function About() {
  return <section id="about" className="about section wrap">
    <SectionHeading number="01" label="ABOUT" title="A curious mind. A careful approach."/>
    <div className="about-layout"><div className="about-copy"><p className="large-copy">I’m an Information Systems student with an interest in the whole data journey: how it’s prepared, what it tells us, and how we communicate it.</p><p>I enjoy finding patterns, checking data quality, and making results easy to understand. I’m detail-oriented, adaptable, and comfortable working with a team.</p><div className="about-focus"><span>Data analytics</span><span>Data engineering</span></div></div><div className="education"><div className="education-brand"><Image className="organization-logo" src="/images/organizations/ubsi-transparent.png" alt="Logo Universitas Bina Sarana Informatika" width={64} height={64}/><span className="mono">ACADEMIC FOUNDATION</span></div><h3>Universitas Bina<br/>Sarana Informatika</h3><p>Information Systems</p><div className="education-bottom"><strong>3.84<span>GPA</span></strong><span className="mono">SEMESTER 7<br/>AS LISTED IN PORTFOLIO</span></div></div></div>
  </section>;
}

export function Projects() {
  return <section id="projects" className="projects section">
    <div className="wrap"><SectionHeading number="02" label="SELECTED WORK" title="Questions explored through data." description="Three projects. The question, the work, and what the evidence shows."/>
    <div className="project-list">{projects.map((project, index) => <article className={`project project-${index + 1}`} key={project.id} id={project.id}>
      <div className="project-overview"><div className="project-copy"><div className="project-category mono"><span>{project.number}</span>{project.category}</div><h3>{project.title}</h3><p>{project.description}</p><ul className="tool-list" aria-label="Project tools">{project.tools.map(tool => <li key={tool}>{tool}</li>)}</ul><div className="project-stat"><strong>{project.metric}</strong><span>{project.metricLabel}</span></div>{project.github && <a className="button project-github" href={project.github} target="_blank" rel="noreferrer" aria-label={`View ${project.title} on GitHub`}><Github size={18} aria-hidden="true"/>View on GitHub</a>}</div>
      <figure className={`project-figure ${index === 0 ? "dashboard-figure" : "analysis-figure"}`}><a href={project.image} target="_blank" rel="noreferrer" aria-label={`View full-size ${project.title} figure`} className="figure-link"><div className="figure-image"><Image src={project.image} alt={project.imageAlt} width={index === 0 ? 1597 : index === 1 ? 494 : 642} height={index === 0 ? 888 : index === 1 ? 451 : 475} sizes="(max-width: 760px) 100vw, 65vw"/></div><span className="figure-expand"><Maximize2 size={16}/><span className="sr-only">View full size</span></span></a><figcaption className="mono">{project.figureLabel}</figcaption></figure></div>
      <details className="case-study"><summary><span className="case-toggle"><span className="case-label-closed">View case study</span><span className="case-label-open">Close case study</span><ChevronDown className="case-chevron" size={18} aria-hidden="true"/></span><span className="summary-sub">Objective, process &amp; findings</span></summary><div className="case-content"><div className="case-top"><div><h4>01 / The question</h4><p>{project.objective}</p></div><div><h4>02 / The data</h4><p>{project.source}</p></div></div><div className="case-process"><h4>03 / The process</h4><ol>{project.process.map((step, stepIndex) => <li key={step}><span className="mono">0{stepIndex + 1}</span><p>{step}</p></li>)}</ol></div><div className="case-top"><div><h4>04 / The output</h4><p>{project.output}</p></div><div><h4>05 / The findings</h4><p>{project.insight}</p></div></div><div className="case-limitation"><h4>Reading the results carefully</h4><p>{project.limitation}</p></div>{project.additionalImages.map(figure => <figure className="additional-figure" key={figure.src}><a href={figure.src} target="_blank" rel="noreferrer" aria-label={`View full-size ${figure.caption}`}><Image src={figure.src} alt={figure.alt} width={950} height={figure.src.includes("evaluation") ? 178 : 324} sizes="(max-width: 760px) 100vw, 800px"/></a><figcaption>{figure.caption}</figcaption></figure>)}</div></details>
    </article>)}</div>
    </div>
  </section>;
}

export function Experience() {
  return <section id="experience" className="experience section wrap">
    <SectionHeading number="03" label="EXPERIENCE" title="Working with data in practice."/>
    <div className="experience-list"><article className="experience-row"><div className="experience-title"><Image className="organization-logo" src="/images/organizations/kementan-transparent.png" alt="Logo Kementerian Pertanian Republik Indonesia" width={64} height={64}/><div className="experience-identity"><span className="mono">DATA OPERATIONS SUPPORT</span><h3>Kementerian Pertanian<br/>Republik Indonesia</h3><span className="experience-type">HOK program</span></div></div><div className="experience-body"><p>Managed and processed sugarcane farmer records from regions across Indonesia. Supported data validation and processing through the Ministry’s system, helping records progress toward fund disbursement.</p><div className="ministry-flow" aria-label="HOK program data workflow"><span>Farmer records</span><span aria-hidden="true">→</span><span>Validation &amp; processing</span><span aria-hidden="true">→</span><span>Verification</span><span aria-hidden="true">→</span><span>Fund disbursement</span></div><p className="experience-note">My work supported the data administration and processing stages of this workflow.</p></div></article><article className="experience-row"><div className="experience-title"><Image className="organization-logo" src="/images/organizations/palapa-transparent.png" alt="Logo PT Palapa Alta Utama" width={64} height={64}/><div className="experience-identity"><span className="mono">VOCATIONAL SCHOOL INTERNSHIP</span><h3>PT Palapa Alta Utama</h3><span className="experience-type">Internship / PKL</span></div></div><div className="experience-body"><p>Handled company e-commerce administration and helped configure network printing on employee PCs.</p><p className="experience-note">Workplace operations with limited IT and network support.</p></div></article></div>
  </section>;
}

export function Skills() {
  return <section id="skills" className="skills section wrap">
    <SectionHeading number="04" label="SKILLS" title="Tools I work with."/>
    <ul className="skills-grid" aria-label="Skills and tools">
      {skills.map(skill => <li className="skill-card" key={skill.name}>
        <span className="skill-logo" aria-hidden="true">
          {skill.logo ? <Image src={skill.logo} alt="" width={36} height={36}/> : skill.icon === "database" ? <Database size={36} strokeWidth={1.6}/> : <Bot size={36} strokeWidth={1.6}/>}
        </span>
        <h3>{skill.name}</h3>
      </li>)}
    </ul>
  </section>;
}

export function Contact() {
  return <section id="contact" className="contact">
    <div className="wrap contact-inner">
      <div className="contact-copy">
        <span className="mono">05 / WHAT’S NEXT</span>
        <h2>Let’s work<br/>with <em>data.</em></h2>
        <p>I’m interested in Data Analyst and Data Engineer internships and early-career opportunities.</p>
        <div className="contact-links">
          <a href={`mailto:${profile.email}`}><Mail size={20} aria-hidden="true"/><span>{profile.email}</span></a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={20} aria-hidden="true"/><span>Revaldy Arrahman <small>LinkedIn</small></span></a>
          <a href={profile.github} target="_blank" rel="noreferrer"><Github size={20} aria-hidden="true"/><span>revxx26 <small>GitHub</small></span></a>
        </div>
      </div>
      <ContactForm recipient={profile.email}/>
    </div>
  </section>;
}

export function Footer() {
  return <footer className="footer wrap"><a href="#home" className="footer-name">Revaldy Arrahman<span>.</span></a><span className="mono">DATA ANALYTICS &amp; ENGINEERING</span><a href="#home">Back to top <span aria-hidden="true">↑</span></a></footer>;
}
