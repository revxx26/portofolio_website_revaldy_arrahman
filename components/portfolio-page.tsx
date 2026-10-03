"use client";
import { usePreferences, PreferencesProvider } from "@/components/preferences";

import {Analytics} from "./analytics";
import {track} from "@/lib/analytics";
import Image from "next/image";
import { Download } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { ImageViewerProvider } from "@/components/image-viewer";
import { ScrollReveal } from "@/components/scroll-reveal";
import { BackToTop } from "@/components/back-to-top";
import { PortfolioProvider, usePortfolio, type PortfolioContentState } from "@/components/portfolio-provider";
import { About, Projects, Experience, Volunteer, Certifications, Skills, Contact, Footer } from "@/components/sections";

function PortfolioContent() {
  const { t } = usePreferences();
  const {data: {profile}} = usePortfolio();
  return <ImageViewerProvider>
    <Analytics/>
    <ScrollReveal />
    <a className="skip-link" href="#main">{t("Skip to content")}</a>
    <Navigation />
    <main id="main" tabIndex={-1}>
      <section id="home" className="hero wrap">
        <div className="hero-topline mono"><span>{t("INFORMATION SYSTEMS / DATA")}</span><span>{t("PERSONAL PORTFOLIO")}</span></div>
        <div className="hero-layout">
          <div className="hero-copy">
            <p className="eyebrow">{t(profile.greeting)}</p>
            <h1>{profile.name.split(' ')[0]}<br/>{profile.name.split(' ').slice(1).join(' ')}<span className="accent">.</span></h1>
            <p className="hero-role">{t(profile.headline)}</p>
            {t(profile.intro).trim() && <p className="hero-intro">{t(profile.intro)}</p>}
            <div className="hero-actions"><a className="button primary" href="#projects">{t("View projects")}</a>{profile.cv ? <a className="button secondary" href={profile.cv} onClick={()=>track("cv_click")} download><Download size={16}/>{t("Download CV")}</a> : <span className="cv-pending"><Download size={16}/><span>{t("CV coming soon")}</span></span>}</div>
          </div>
          <aside className="hero-aside" aria-label={t("Professional focus")}>
            {profile.photo ? <div className="profile-photo"><Image src={profile.photo} alt={profile.name} fill sizes="(max-width: 760px) 100vw, 360px" preload/></div> : <div className="focus-panel">
              <span className="mono focus-label">{t("MY FOCUS")}</span>
              <p className="focus-heading">{t("From raw data")}<br/>{" "}{t("to clear")}<br/>{" "}<em>{t("understanding.")}</em></p>
              <ol className="focus-flow"><li><span className="mono">{t("01")}</span>{t(" Prepare the data")}</li><li><span className="mono">{t("02")}</span>{t(" Find the patterns")}</li><li><span className="mono">{t("03")}</span>{t(" Explain the insights")}</li></ol>
              <span className="mono focus-foot">{t("ANALYTICS + ENGINEERING")}</span>
            </div>}
            <p className="opportunity-note">{t(profile.opportunity)}</p>
          </aside>
        </div>
        <div className="hero-bottom"><span className="mono">{t("SQL / PYTHON / ANALYTICS")}</span><a href="#projects">{t("Explore the work below ")}<span aria-hidden="true">{t("↓")}</span></a></div>
      </section>
      <About />
      <Projects />
      <Experience />
      <Volunteer />
      <Certifications />
      <Skills />
      <Contact />
    </main>
    <Footer />
    <BackToTop />
  </ImageViewerProvider>;
}

export default function PortfolioPage({initialContent}: {initialContent?: PortfolioContentState}) { return <PortfolioProvider initialContent={initialContent}><PreferencesProvider><PortfolioContent/></PreferencesProvider></PortfolioProvider>; }
