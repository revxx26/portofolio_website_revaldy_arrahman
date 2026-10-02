import Image from "next/image";
import { Download } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { profile } from "@/content/portfolio";
import { About, Projects, Experience, Skills, Contact, Footer } from "@/components/sections";

export default function Home() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Navigation />
    <main id="main">
      <section id="home" className="hero wrap">
        <div className="hero-topline mono"><span>INFORMATION SYSTEMS / DATA</span><span>PERSONAL PORTFOLIO</span></div>
        <div className="hero-layout">
          <div className="hero-copy">
            <p className="eyebrow">Hello, I’m Revaldy.</p>
            <h1>Revaldy<br/>Arrahman<span className="accent">.</span></h1>
            <p className="hero-role">Data Analyst &amp;<br className="mobile-break"/> Data Engineer Enthusiast</p>
            <p className="hero-intro">I work with data to find the useful information within it. From careful preparation to clear analysis, I’m interested in how data becomes something people can use.</p>
            <div className="hero-actions"><a className="button primary" href="#projects">View projects</a>{profile.cv ? <a className="button secondary" href={profile.cv} download><Download size={16}/>Download CV</a> : <span className="cv-pending"><Download size={16}/><span>CV coming soon</span></span>}</div>
          </div>
          <aside className="hero-aside" aria-label="Professional focus">
            {profile.photo ? <div className="profile-photo"><Image src={profile.photo} alt="Revaldy Arrahman" fill sizes="(max-width: 760px) 100vw, 360px" preload/></div> : <div className="focus-panel">
              <span className="mono focus-label">MY FOCUS</span>
              <p className="focus-heading">From raw data<br/>{" "}to clear<br/>{" "}<em>understanding.</em></p>
              <ol className="focus-flow"><li><span className="mono">01</span> Prepare the data</li><li><span className="mono">02</span> Find the patterns</li><li><span className="mono">03</span> Explain the insights</li></ol>
              <span className="mono focus-foot">ANALYTICS + ENGINEERING</span>
            </div>}
            <p className="opportunity-note">Interested in internships &amp;<br/>early-career opportunities</p>
          </aside>
        </div>
        <div className="hero-bottom"><span className="mono">SQL / PYTHON / ANALYTICS</span><a href="#projects">Explore the work below <span aria-hidden="true">↓</span></a></div>
      </section>
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Contact />
    </main>
    <Footer />
  </>;
}
