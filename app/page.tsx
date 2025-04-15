"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Brain, ChevronRight, ExternalLink, Menu, X } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])

  // Add this scroll handler function
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 80 // Adjust based on your header height
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })

      // Close mobile menu if open
      if (isMenuOpen) {
        setIsMenuOpen(false)
      }
    }
  }

  useEffect(() => {
    const handleScrollEffect = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScrollEffect)
    return () => window.removeEventListener("scroll", handleScrollEffect)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          scrolled ? "bg-background/80 backdrop-blur-md border-b border-border/40" : ""
        }`}
      >
        <div className="container flex h-20 items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            <span className="text-xl font-medium tracking-tight">Dash-Dev</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#about"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={(e) => handleScroll(e, "about")}
            >
              About
            </Link>
            <Link
              href="#solutions"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={(e) => handleScroll(e, "solutions")}
            >
              Solutions
            </Link>
            <Link
              href="#approach"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={(e) => handleScroll(e, "approach")}
            >
              Approach
            </Link>
            <Link
              href="#case-studies"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={(e) => handleScroll(e, "case-studies")}
            >
              Case Studies
            </Link>
            <Link
              href="#testimonials"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={(e) => handleScroll(e, "testimonials")}
            >
              Testimonials
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="outline" size="sm" className="h-9 px-4 rounded-md">
              Contact
            </Button>
            <Button size="sm" className="h-9 px-4 rounded-md">
              Book a Demo
            </Button>
          </div>

          <button className="md:hidden text-foreground" onClick={() => setIsMenuOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background flex flex-col">
          <div className="container flex h-20 items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              <span className="text-xl font-medium tracking-tight">Dash-Dev</span>
            </div>
            <button className="text-foreground" onClick={() => setIsMenuOpen(false)}>
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-col gap-6 container py-8">
            <Link
              href="#about"
              className="text-xl py-2 border-b border-border/40"
              onClick={(e) => handleScroll(e, "about")}
            >
              About
            </Link>
            <Link
              href="#solutions"
              className="text-xl py-2 border-b border-border/40"
              onClick={(e) => handleScroll(e, "solutions")}
            >
              Solutions
            </Link>
            <Link
              href="#approach"
              className="text-xl py-2 border-b border-border/40"
              onClick={(e) => handleScroll(e, "approach")}
            >
              Approach
            </Link>
            <Link
              href="#case-studies"
              className="text-xl py-2 border-b border-border/40"
              onClick={(e) => handleScroll(e, "case-studies")}
            >
              Case Studies
            </Link>
            <Link
              href="#testimonials"
              className="text-xl py-2 border-b border-border/40"
              onClick={(e) => handleScroll(e, "testimonials")}
            >
              Testimonials
            </Link>
            <div className="flex flex-col gap-3 mt-4">
              <Button variant="outline" className="w-full justify-start">
                Contact
              </Button>
              <Button className="w-full justify-start">Book a Demo</Button>
            </div>
          </nav>
        </div>
      )}

      <main>
        {/* Hero Section */}
        <section ref={heroRef} className="relative pt-40 pb-32 overflow-hidden">
          <motion.div style={{ opacity, scale }} className="container relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-light tracking-tight leading-tight">
              Big Data Intelligence Meets Decision-Ready Dashboards
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              We build custom AI systems that transform complex data into real-time insights.              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button className="group h-11 px-6 rounded-md">
                  <span>Book a consultation</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="outline" className="h-11 px-6 rounded-md">
                  <span>View case studies</span>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Abstract background elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute right-[10%] top-[20%] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-3xl opacity-30"></div>
            <div className="absolute left-[60%] bottom-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-primary/10 to-transparent blur-3xl opacity-20"></div>
          </div>
        </section>
      {/* About Section */}
        <section id="about" className="py-28 border-t border-border/40 bg-background">
  <div className="container max-w-screen-xl">
    <div className="grid lg:grid-cols-12 gap-16 items-center">
      
      {/* Left: About Text */}
      <div className="lg:col-span-5">
        <h2 className="text-4xl font-semibold tracking-tight text-foreground">About Dash-Dev</h2>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
        We’re a Brooklyn-based, full-stack team of engineers, developers, analysts, researchers, and designers building tailored data and AI solutions for clients across the US, Europe, China, and MENA.        </p>
      </div>

      {/* Right: Feature Cards */}
      <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
        {[
          {
            title: "Data Harvesting & Augmentation",
            text: "Extract structured and unstructured data from websites, PDFs, APIs, and multilingual sources across 20+ languages.",
          },
          {
            title: "Domain-Specific AI",
            text: "Tailored AI systems for law, finance, geopolitics, and infrastructure — focused on classification, prediction, and risk signals.",
          },
          {
            title: "Dashboards & Mapping",
            text: "Real-time platforms with live KPIs, spatial layers, and one-click reporting. Designed for speed, clarity, and impact.",
          },
          {
            title: "Open & Secure Infrastructure",
            text: "Open-source, privacy-first architecture. Seamless APIs. Zero license fees. Built for interoperability and auditability.",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -2, boxShadow: "0px 8px 20px rgba(0,0,0,0.08)" }}
            transition={{ duration: 0.3 }}
            className="group p-6 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all duration-200"
          >
            <h3 className="text-lg font-semibold text-white group-hover:text-primary mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {item.text}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
</section>

        {/* Clients Section */}
        <section className="py-24 border-t border-border/40 bg-background">
  <div className="container">
    <div className="max-w-4xl mx-auto text-center">
      <motion.blockquote
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-2xl md:text-3xl font-light leading-relaxed italic text-foreground"
      >
        “We build systems that turn messy, multilingual data into clear, actionable insight ”
      </motion.blockquote>
    </div>
  </div>
</section>       

<section id="solutions" className="py-28 border-t border-border/40 bg-background">
  <div className="container">
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-4xl font-semibold tracking-tight text-foreground">Our Work</h2>
      <p className="mt-4 text-lg text-muted-foreground">
        We build smart, secure, and open tools to extract, analyze, and visualize complex data — from text and documents to geospatial layers and predictive models.
      </p>
    </div>

    <div className="mt-20 grid gap-8 md:grid-cols-3">
      {/* Solution Card */}
      {[
        {
          title: "AI & Data Systems",
          icon: <Brain className="h-5 w-5 text-primary" />,
          description: "Domain-specific AI to process multilingual text, legal data, spatial information, and unstructured sources.",
          bullets: [
            "Custom LLMs for legal, geospatial, and financial data",
            "Text mining across sources and in 20+ languages",
            "Risk tagging and predictive scoring",
          ],
        },
        {
          title: "Dashboards & Visualization",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="text-primary">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18" />
              <path d="M9 21V9" />
            </svg>
          ),
          description: "Real-time dashboards with mapping, KPIs, and automated reporting — built for decision-makers.",
          bullets: [
            "Interactive dashboards with spatial analytics",
            "Automated workflows for reporting and alerts",
            "Modular design tailored to operational needs",
          ],
        },
        {
          title: "Custom Infrastructure",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="text-primary">
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          ),
          description: "Secure, privacy-first systems built on open standards. Fully auditable and aligned with your stack.",
          bullets: [
            "Zero-license, open-source deployments",
            "Custom APIs, database, and pipeline design",
            "Integrations with your existing tools and workflows",
          ],
        },
      ].map((solution, i) => (
        <Card key={i} className="bg-card/60 border border-border/40 rounded-xl shadow-sm hover:shadow-md hover:border-primary/60 transition-all duration-200">
          <CardContent className="p-6">
            <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center mb-4">
              {solution.icon}
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{solution.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{solution.description}</p>
            <ul className="space-y-2 text-sm">
              {solution.bullets.map((point, j) => (
                <li key={j} className="flex items-start gap-2">
                  <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>

<section id="approach" className="py-28 border-t border-border/40 bg-background">
  <div className="container">
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-4xl font-semibold tracking-tight text-foreground">Our Process</h2>
      <p className="mt-4 text-lg text-muted-foreground">
        From messy data to decision-ready insights — our workflow blends automation, precision, and purpose.
      </p>
    </div>

    <div className="mt-20">
      {/* Desktop Horizontal Layout */}
      <div className="hidden md:flex justify-between items-start relative">
        {/* Connecting line */}
        <div className="absolute top-6 left-0 right-0 h-px bg-border/40 z-0" />

        {[
          {
            step: "01",
            title: "Collect",
            description:
              "We extract structured and unstructured data from the web, APIs, documents, and media in over 20 languages.",
          },
          {
            step: "02",
            title: "Extract",
            description:
              "Using domain-specific AI, we enrich raw data with metadata, predictive tags, and risk scores.",
          },
          {
            step: "03",
            title: "Visualize",
            description:
              "We turn data into dashboards, spatial layers, and real-time KPIs — all designed for decision-making.",
          },
          {
            step: "04",
            title: "Build",
            description:
              "We deploy scalable, open-source solutions aligned with your infrastructure — secure, flexible, and future-proof.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="relative w-1/4 text-center px-4 z-10 transition-transform duration-200 hover:-translate-y-1 group"
          >
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full border border-border bg-card text-sm font-medium transition-colors group-hover:border-primary group-hover:text-primary">
              {item.step}
            </div>
            <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Mobile Vertical Layout */}
      <div className="space-y-12 md:hidden mt-12">
        {[
          {
            step: "01",
            title: "Collect",
            description:
              "We extract structured and unstructured data from the web, APIs, documents, and media in over 20 languages.",
          },
          {
            step: "02",
            title: "Extract",
            description:
              "Using domain-specific AI, we enrich raw data with metadata, predictive tags, and risk scores.",
          },
          {
            step: "03",
            title: "Visualize",
            description:
              "We turn data into dashboards, spatial layers, and real-time KPIs — all designed for decision-making.",
          },
          {
            step: "04",
            title: "Build",
            description:
              "We deploy scalable, open-source solutions aligned with your infrastructure — secure, flexible, and future-proof.",
          },
        ].map((item, i) => (
          <div key={i} className="text-left">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card text-sm font-medium">
                {item.step}
              </div>
              <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
            </div>
            <p className="mt-2 ml-14 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

       

        {/* Case Studies Section */}
        <section id="case-studies" className="py-28 border-t border-border/40 bg-background">
  <div className="container">
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-4xl font-semibold tracking-tight text-foreground">Case Studies</h2>
      <p className="mt-4 text-lg text-muted-foreground">
        From retrieval systems to real-time dashboards and global sanctions infrastructure — our tools turn complexity into clarity.
      </p>
    </div>

    <div className="mt-20">
      <Tabs defaultValue="ai" className="w-full">
      <TabsList className="w-full max-w-xl mx-auto grid grid-cols-3 gap-2 bg-muted/20 p-1 rounded-lg">
  <TabsTrigger
    value="ai"
    className="text-xs font-medium py-2 px-3 text-muted-foreground rounded-md transition-colors duration-200 hover:text-primary hover:bg-muted/40 data-[state=active]:text-primary data-[state=active]:bg-background"
  >
    AI & Data Systems
  </TabsTrigger>

  <TabsTrigger
    value="dashboards"
    className="text-xs font-medium py-2 px-3 text-muted-foreground rounded-md transition-colors duration-200 hover:text-primary hover:bg-muted/40 data-[state=active]:text-primary data-[state=active]:bg-background"
  >
    Dashboards & Visualization
  </TabsTrigger>

  <TabsTrigger
    value="infra"
    className="text-xs font-medium py-2 px-3 text-muted-foreground rounded-md transition-colors duration-200 hover:text-primary hover:bg-muted/40 data-[state=active]:text-primary data-[state=active]:bg-background"
  >
    Custom Infrastructure
  </TabsTrigger>
</TabsList>

        {/* RAG SYSTEM */}
        <TabsContent value="ai" className="mt-12">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-light tracking-tight"> RAG System</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                A document intelligence system for policy analysts navigating 15TB of reports across multilateral banks.
              </p>

              <div className="mt-8 space-y-6">
                <div>
                  <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Challenge</h4>
                  <p className="mt-2 text-sm">
                    Analysts struggled to find relevant language in thousands of dense policy documents. Manual search was slow and inconsistent.
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Solution</h4>
                  <p className="mt-2 text-sm">
                    We built a RAG (Retrieval-Augmented Generation) pipeline using Sentence Transformers, Haystack, and Gemini Pro — enabling filtered QA over massive multilingual corpora.
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Results</h4>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-primary"></div>Cut research time by 90%</li>
                    <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-primary"></div>Improved document coverage and traceability</li>
                    <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-primary"></div>Deployed securely via Streamlit with metadata filters</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-4 border border-border/40 rounded-md bg-card/30">
                <p className="text-sm italic">"This RAG system completely transformed how we interact with complex policy data."</p>
                <p className="mt-2 text-xs text-muted-foreground">— Policy analyst</p>
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-border/40 bg-card/30">
            <video
    src="/wb_rag.mp4"

    muted
    loop
    autoPlay
    playsInline
    className="object-cover w-full h-full"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
  <div className="absolute bottom-0 left-0 right-0 p-4">
    <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 rounded-md">
      <span>View case study</span>
      <ExternalLink className="h-3.5 w-3.5" />
    </Button>
  </div>
</div>
          </div>
        </TabsContent>

        {/* MDB WATCHDOG */}
        <TabsContent value="dashboards" className="mt-12">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-light tracking-tight">Development Tracker</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                A public dashboard tracking multilateral development bank projects across Pakistan with geospatial filters, visual summaries, and real-time data.
              </p>

              <div className="mt-8 space-y-6">
                <div>
                  <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Challenge</h4>
                  <p className="mt-2 text-sm">
                    Local organizations lacked access to clean, up-to-date information about foreign-funded infrastructure projects.
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Solution</h4>
                  <p className="mt-2 text-sm">
                    We developed MDB Watchdog — a full-stack platform with Supabase + PostGIS backend and Mapbox-powered frontend, enabling live mapping, project filtering, and leaderboard contributions.
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Results</h4>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-primary"></div>Over 3000 development projects mapped</li>
                    <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-primary"></div>Used by researchers, journalists, and NGOs</li>
                    <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-primary"></div>Mobile-ready, with community contribution feature</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-4 border border-border/40 rounded-md bg-card/30">
                <p className="text-sm italic">"This dashboard makes foreign-funded development finally visible and accountable."</p>
                <p className="mt-2 text-xs text-muted-foreground">— Open Data advocate, Islamabad</p>
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-border/40 bg-card/30">
            <video
    src="/mdb_watchdog.mp4"
 
    muted
    loop
    autoPlay
    playsInline
    className="object-cover w-full h-full"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
  <div className="absolute bottom-0 left-0 right-0 p-4">
    <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 rounded-md">
      <span>View case study</span>
      <ExternalLink className="h-3.5 w-3.5" />
    </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* SANCTIONS TRACKER */}
        <TabsContent value="infra" className="mt-12">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-light tracking-tight">Sanctions Intelligence Tracker</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                A unified, automated pipeline for tracking international sanctions data from EU, UK, and UN sources.
              </p>

              <div className="mt-8 space-y-6">
                <div>
                  <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Challenge</h4>
                  <p className="mt-2 text-sm">
                    Sanctions data is fragmented across jurisdictions and formats. Tracking designations and updates is time-consuming.
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Solution</h4>
                  <p className="mt-2 text-sm">
                    We engineered a Python-based system using Scrapy + Zyte + Supabase to fetch, normalize, and merge updates across multiple sources — complete with UUID-based matching and geospatial enrichment.
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Results</h4>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-primary"></div>Daily updated dataset with 100k+ records</li>
                    <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-primary"></div>Integrated into global compliance workflows</li>
                    <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-primary"></div>Trackable by source, ID, and geolocation</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-4 border border-border/40 rounded-md bg-card/30">
                <p className="text-sm italic">"Finally, a sanctions tracker that's automated, reliable, and actually usable."</p>
                <p className="mt-2 text-xs text-muted-foreground">— Risk analyst, global compliance firm</p>
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-border/40 bg-card/30">
              <Image
                src="/case-sanctions.png"
                alt="Sanctions data pipeline"
                width={800}
                height={600}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 rounded-md">
                  <span>View case study</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  </div>
</section>
      

        {/* Testimonials Section */}
        {/* <section id="testimonials" className="py-24 border-t border-border/40">
          <div className="container">
            <div className="max-w-xl">
              <h2 className="text-3xl font-light tracking-tight">What Our Clients Say</h2>
              <p className="mt-4 text-muted-foreground">
                Hear from the businesses we've helped transform with our AI solutions.
              </p>
            </div>

            <div className="mt-16 grid gap-6 md:grid-cols-3">
              <Card className="bg-card/50 border border-border/40 rounded-lg overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium">JD</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">James Davidson</p>
                      <p className="text-xs text-muted-foreground">CTO, TechInnovate</p>
                    </div>
                  </div>
                  <p className="text-sm italic">
                    "Dash-Dev helped us implement a generative AI solution that automated our content creation process.
                    The results were immediate and impressive—we've seen a 40% increase in productivity and a 25%
                    reduction in costs."
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border border-border/40 rounded-lg overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium">LP</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Lisa Patel</p>
                      <p className="text-xs text-muted-foreground">VP of Analytics, FinServe Group</p>
                    </div>
                  </div>
                  <p className="text-sm italic">
                    "The data visualization dashboards created by Dash-Dev have transformed how we make decisions. Our
                    executives can now instantly understand complex financial data and make informed decisions faster
                    than ever before."
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border border-border/40 rounded-lg overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium">MR</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Mark Rodriguez</p>
                      <p className="text-xs text-muted-foreground">Director of Operations, LogiTech Solutions</p>
                    </div>
                  </div>
                  <p className="text-sm italic">
                    "Working with Dash-Dev on our supply chain optimization project exceeded our expectations. Their AI
                    strategy and implementation helped us reduce delivery times by 30% and cut operational costs by
                    22%."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section> */}

        {/* CTA Section */}
        <section className="py-24 border-t border-border/40">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-light tracking-tight">Build AI-powered systems for risk, insight, and action.</h2>
              <p className="mt-4 text-muted-foreground">
              Let's explore your needs and design a solution together.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="group h-11 px-6 rounded-md">
                  <span>Book a consultation</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="outline" className="h-11 px-6 rounded-md">
                  <span>View case studies</span>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-border/40">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="md:w-1/3">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                <span className="text-lg font-medium tracking-tight">Dash-Dev</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">AI Solutions Engineered for Business Impact</p>
              <div className="mt-6 flex gap-4">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                  </svg>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 md:w-2/3 md:grid-cols-3">
              <div>
                <h3 className="text-sm font-medium mb-4">Company</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      Blog
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-4">Services</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      Generative AI
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      Data Visualization
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      AI Strategy
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-4">Contact</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 text-muted-foreground mt-0.5"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <span className="text-muted-foreground">+1 (555) 123-4567</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 text-muted-foreground mt-0.5"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                    <span className="text-muted-foreground">info@dash-dev.com</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 text-muted-foreground mt-0.5"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span className="text-muted-foreground">123 Broadway, New York, NY 10007</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border/40 text-center">
            <p className="text-xs text-muted-foreground">© 2025 Dash-Dev. All rights reserved.</p>
            <div className="mt-2 flex justify-center gap-6">
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

