'use client';

import type React from 'react';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Brain, ChevronRight, ExternalLink, Menu, X } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Home() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });

    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

    // Add this scroll handler function
    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 80; // Adjust based on your header height
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });

            // Close mobile menu if open
            if (isMenuOpen) {
                setIsMenuOpen(false);
            }
        }
    };

    useEffect(() => {
        const handleScrollEffect = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScrollEffect);
        return () => window.removeEventListener('scroll', handleScrollEffect);
    }, []);

    return (
        <div className='min-h-screen bg-background text-foreground'>
            {/* Navigation */}
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
                    scrolled ? 'bg-background/80 backdrop-blur-md border-b border-border/40' : ''
                }`}
            >
                <div className='container flex h-20 items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        <Brain className='h-6 w-6 text-primary' />
                        <span className='text-xl font-medium tracking-tight'>Dash-Dev</span>
                    </div>

                    <nav className='hidden md:flex items-center gap-8'>
                        <Link
                            href='#about'
                            className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                            onClick={(e) => handleScroll(e, 'about')}
                        >
                            About
                        </Link>
                        <Link
                            href='#solutions'
                            className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                            onClick={(e) => handleScroll(e, 'solutions')}
                        >
                            Solutions
                        </Link>
                        <Link
                            href='#approach'
                            className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                            onClick={(e) => handleScroll(e, 'approach')}
                        >
                            Approach
                        </Link>
                        <Link
                            href='#case-studies'
                            className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                            onClick={(e) => handleScroll(e, 'case-studies')}
                        >
                            Case Studies
                        </Link>
                        <Link
                            href='#testimonials'
                            className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                            onClick={(e) => handleScroll(e, 'testimonials')}
                        >
                            Testimonials
                        </Link>
                    </nav>

                    <div className='hidden md:flex items-center gap-4'>
                        <Button variant='outline' size='sm' className='h-9 px-4 rounded-md'>
                            Contact
                        </Button>
                        <Button size='sm' className='h-9 px-4 rounded-md'>
                            Book a Demo
                        </Button>
                    </div>

                    <button
                        className='md:hidden text-foreground'
                        onClick={() => setIsMenuOpen(true)}
                        aria-label='Open menu'
                    >
                        <Menu className='h-6 w-6' />
                    </button>
                </div>
            </header>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className='fixed inset-0 z-50 bg-background flex flex-col'>
                    <div className='container flex h-20 items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            <Brain className='h-6 w-6 text-primary' />
                            <span className='text-xl font-medium tracking-tight'>Dash Dev</span>
                        </div>
                        <button
                            className='text-foreground'
                            onClick={() => setIsMenuOpen(false)}
                            aria-label='Close menu'
                        >
                            <X className='h-6 w-6' />
                        </button>
                    </div>
                    <nav className='flex flex-col gap-6 container py-8'>
                        <Link
                            href='#about'
                            className='text-xl py-2 border-b border-border/40'
                            onClick={(e) => handleScroll(e, 'about')}
                        >
                            About
                        </Link>
                        <Link
                            href='#solutions'
                            className='text-xl py-2 border-b border-border/40'
                            onClick={(e) => handleScroll(e, 'solutions')}
                        >
                            Solutions
                        </Link>
                        <Link
                            href='#approach'
                            className='text-xl py-2 border-b border-border/40'
                            onClick={(e) => handleScroll(e, 'approach')}
                        >
                            Approach
                        </Link>
                        <Link
                            href='#case-studies'
                            className='text-xl py-2 border-b border-border/40'
                            onClick={(e) => handleScroll(e, 'case-studies')}
                        >
                            Case Studies
                        </Link>
                        <Link
                            href='#testimonials'
                            className='text-xl py-2 border-b border-border/40'
                            onClick={(e) => handleScroll(e, 'testimonials')}
                        >
                            Testimonials
                        </Link>
                        <div className='flex flex-col gap-3 mt-4'>
                            <Button variant='outline' className='w-full justify-start'>
                                Contact
                            </Button>
                            <Button className='w-full justify-start'>Book a Demo</Button>
                        </div>
                    </nav>
                </div>
            )}

            <main>
                {/* Hero Section */}
                <section ref={heroRef} className='relative pt-40 pb-32 overflow-hidden'>
                    <motion.div style={{ opacity, scale }} className='container relative z-10'>
                        <div className='max-w-3xl'>
                            <h1 className='text-5xl md:text-6xl font-light tracking-tight leading-tight'>
                                Big Data Intelligence Meets Decision-Ready Dashboards
                            </h1>
                            <p className='mt-6 text-lg text-muted-foreground max-w-xl'>
                                We build custom AI systems that transform complex data into real-time insights.{' '}
                            </p>
                            <div className='mt-10 flex flex-col sm:flex-row gap-4'>
                                <Button className='group h-11 px-6 rounded-md'>
                                    <span>Book a consultation</span>
                                    <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
                                </Button>
                                <Button variant='outline' className='h-11 px-6 rounded-md'>
                                    <span>View case studies</span>
                                </Button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Abstract background elements */}
                    <div className='absolute inset-0 z-0'>
                        <div className='absolute right-[10%] top-[20%] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-3xl opacity-30'></div>
                        <div className='absolute left-[60%] bottom-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-primary/10 to-transparent blur-3xl opacity-20'></div>
                    </div>
                </section>

                {/* About Section */}
                <section id='about' className='py-24 border-t border-border/40'>
                    <div className='container'>
                        <div className='grid md:grid-cols-2 gap-8'>
                            <div>
                                <h2 className='text-3xl font-light tracking-tight'>About Dash-Dev</h2>
                                <h3 className='mt-4 text-xl font-light text-primary'>
                                    Transform Your Data Into Strategic Advantage
                                </h3>
                                <p className='mt-4 text-muted-foreground'>
                                    Drowning in data but starving for insights? You're not alone. Organizations today
                                    collect more information than ever, but turning that into meaningful action remains
                                    a challenge.
                                </p>

                                <div className='mt-8'>
                                    <h4 className='text-lg font-light'>We Turn Complexity Into Clarity</h4>
                                    <p className='mt-2 text-muted-foreground'>
                                        Our team transforms your raw data into powerful decision-making tools through:
                                    </p>
                                    <ul className='mt-4 space-y-2 text-sm text-muted-foreground'>
                                        <li className='flex items-start gap-2'>
                                            <div className='h-1.5 w-1.5 rounded-full bg-primary mt-1.5'></div>
                                            <span>Custom dashboards that deliver real-time insights at a glance</span>
                                        </li>
                                        <li className='flex items-start gap-2'>
                                            <div className='h-1.5 w-1.5 rounded-full bg-primary mt-1.5'></div>
                                            <span>
                                                Enterprise solutions tailored to your specific business challenges
                                            </span>
                                        </li>
                                        <li className='flex items-start gap-2'>
                                            <div className='h-1.5 w-1.5 rounded-full bg-primary mt-1.5'></div>
                                            <span>
                                                Intelligent data pipelines that automatically extract what matters most
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div>
                                <div className='mt-0 md:mt-12'>
                                    <h4 className='text-lg font-light'>The Intersection of Experience & Innovation</h4>
                                    <p className='mt-2 text-muted-foreground'>
                                        We bring diverse expertise from procurement, law, architecture, text analytics,
                                        and geospatial risk assessment—combining this knowledge with cutting-edge AI to
                                        deliver solutions that truly understand your industry's unique challenges.
                                    </p>
                                </div>

                                <div className='mt-8'>
                                    <h4 className='text-lg font-light'>Our Promise</h4>
                                    <p className='mt-2 text-muted-foreground'>
                                        We don't just process your data—we empower you to make confident decisions with
                                        it.
                                    </p>
                                </div>

                                <div className='mt-8 p-4 border border-border/40 rounded-md bg-card/30'>
                                    <p className='text-sm italic'>
                                        "Our mission is to make advanced AI technologies accessible and actionable for
                                        businesses of all sizes."
                                    </p>
                                    <p className='mt-2 text-xs text-muted-foreground'>— The Dash-Dev Team</p>
                                </div>
                            </div>
                        </div>

                        <div className='mt-16 grid gap-8 md:grid-cols-2'>
                            <div>
                                <div className='grid gap-4 sm:grid-cols-2'>
                                    <div className='p-6 border border-border/40 rounded-md bg-card/30 hover:border-primary/30 transition-colors'>
                                        <h3 className='text-xl font-light'>15+ Years</h3>
                                        <p className='mt-2 text-sm text-muted-foreground'>
                                            Combined experience in AI and data science
                                        </p>
                                    </div>

                                    <div className='p-6 border border-border/40 rounded-md bg-card/30 hover:border-primary/30 transition-colors'>
                                        <h3 className='text-xl font-light'>50+ Clients</h3>
                                        <p className='mt-2 text-sm text-muted-foreground'>
                                            Across finance, healthcare, and technology
                                        </p>
                                    </div>

                                    <div className='p-6 border border-border/40 rounded-md bg-card/30 hover:border-primary/30 transition-colors'>
                                        <h3 className='text-xl font-light'>30+ Projects</h3>
                                        <p className='mt-2 text-sm text-muted-foreground'>
                                            Successfully delivered on time and on budget
                                        </p>
                                    </div>

                                    <div className='p-6 border border-border/40 rounded-md bg-card/30 hover:border-primary/30 transition-colors'>
                                        <h3 className='text-xl font-light'>4 Awards</h3>
                                        <p className='mt-2 text-sm text-muted-foreground'>
                                            For innovation in AI implementation
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className='p-6 border border-border/40 rounded-md bg-card/30'>
                                <h3 className='text-xl font-light mb-6'>What Sets Us Apart</h3>
                                <ul className='space-y-6'>
                                    <li className='space-y-1'>
                                        <div className='flex items-center gap-2'>
                                            <div className='h-1.5 w-1.5 rounded-full bg-primary'></div>
                                            <p className='font-medium text-sm'>End-to-End AI Solutions</p>
                                        </div>
                                        <p className='text-sm text-muted-foreground pl-4'>
                                            From strategy to implementation and optimization
                                        </p>
                                    </li>

                                    <li className='space-y-1'>
                                        <div className='flex items-center gap-2'>
                                            <div className='h-1.5 w-1.5 rounded-full bg-primary'></div>
                                            <p className='font-medium text-sm'>Industry-Specific Expertise</p>
                                        </div>
                                        <p className='text-sm text-muted-foreground pl-4'>
                                            Tailored solutions for your unique business challenges
                                        </p>
                                    </li>

                                    <li className='space-y-1'>
                                        <div className='flex items-center gap-2'>
                                            <div className='h-1.5 w-1.5 rounded-full bg-primary'></div>
                                            <p className='font-medium text-sm'>Results-Driven Approach</p>
                                        </div>
                                        <p className='text-sm text-muted-foreground pl-4'>
                                            Focused on delivering measurable business outcomes
                                        </p>
                                    </li>

                                    <li className='space-y-1'>
                                        <div className='flex items-center gap-2'>
                                            <div className='h-1.5 w-1.5 rounded-full bg-primary'></div>
                                            <p className='font-medium text-sm'>Cutting-Edge Technology</p>
                                        </div>
                                        <p className='text-sm text-muted-foreground pl-4'>
                                            Access to the latest AI models and visualization tools
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Clients Section */}
                <section className='py-16 border-t border-border/40'>
                    <div className='container'>
                        <p className='text-sm text-muted-foreground mb-8'>Trusted by innovative companies</p>
                        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center'>
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className='grayscale opacity-50 hover:opacity-80 transition-opacity'>
                                    <div className='h-8 bg-muted/30 rounded-md'></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Solutions Section */}
                <section id='solutions' className='py-24 border-t border-border/40'>
                    <div className='container'>
                        <div className='max-w-xl'>
                            <h2 className='text-3xl font-light tracking-tight'>Our Solutions</h2>
                            <p className='mt-4 text-muted-foreground'>
                                We deliver end-to-end AI solutions that solve real business problems and create
                                measurable value.
                            </p>
                        </div>

                        <div className='mt-16 grid gap-6 md:grid-cols-3'>
                            <Card className='bg-card/50 border border-border/40 rounded-lg overflow-hidden hover:border-primary/50 transition-colors'>
                                <CardContent className='p-6'>
                                    <div className='h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center mb-4'>
                                        <Brain className='h-5 w-5 text-primary' />
                                    </div>
                                    <h3 className='text-xl font-medium mb-2'>Generative AI Consulting</h3>
                                    <p className='text-muted-foreground text-sm mb-4'>
                                        Harness the power of generative AI to automate processes and create new business
                                        opportunities.
                                    </p>
                                    <ul className='space-y-2 text-sm'>
                                        <li className='flex items-start gap-2'>
                                            <ChevronRight className='h-4 w-4 text-primary mt-0.5 shrink-0' />
                                            <span>Custom AI application development</span>
                                        </li>
                                        <li className='flex items-start gap-2'>
                                            <ChevronRight className='h-4 w-4 text-primary mt-0.5 shrink-0' />
                                            <span>AI-powered chatbots and assistants</span>
                                        </li>
                                        <li className='flex items-start gap-2'>
                                            <ChevronRight className='h-4 w-4 text-primary mt-0.5 shrink-0' />
                                            <span>LLM fine-tuning and implementation</span>
                                        </li>
                                        <li className='flex items-start gap-2'>
                                            <ChevronRight className='h-4 w-4 text-primary mt-0.5 shrink-0' />
                                            <span>AI integration with existing systems</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className='bg-card/50 border border-border/40 rounded-lg overflow-hidden hover:border-primary/50 transition-colors'>
                                <CardContent className='p-6'>
                                    <div className='h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center mb-4'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width='20'
                                            height='20'
                                            viewBox='0 0 24 24'
                                            fill='none'
                                            stroke='currentColor'
                                            strokeWidth='2'
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            className='text-primary'
                                        >
                                            <rect x='3' y='3' width='18' height='18' rx='2' />
                                            <path d='M3 9h18' />
                                            <path d='M9 21V9' />
                                        </svg>
                                    </div>
                                    <h3 className='text-xl font-medium mb-2'>Data Visualization</h3>
                                    <p className='text-muted-foreground text-sm mb-4'>
                                        Transform complex data into clear, actionable insights through powerful visual
                                        storytelling.
                                    </p>
                                    <ul className='space-y-2 text-sm'>
                                        <li className='flex items-start gap-2'>
                                            <ChevronRight className='h-4 w-4 text-primary mt-0.5 shrink-0' />
                                            <span>Interactive business dashboards</span>
                                        </li>
                                        <li className='flex items-start gap-2'>
                                            <ChevronRight className='h-4 w-4 text-primary mt-0.5 shrink-0' />
                                            <span>Data-driven storytelling narratives</span>
                                        </li>
                                        <li className='flex items-start gap-2'>
                                            <ChevronRight className='h-4 w-4 text-primary mt-0.5 shrink-0' />
                                            <span>Real-time analytics visualization</span>
                                        </li>
                                        <li className='flex items-start gap-2'>
                                            <ChevronRight className='h-4 w-4 text-primary mt-0.5 shrink-0' />
                                            <span>Custom visualization frameworks</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className='bg-card/50 border border-border/40 rounded-lg overflow-hidden hover:border-primary/50 transition-colors'>
                                <CardContent className='p-6'>
                                    <div className='h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center mb-4'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width='20'
                                            height='20'
                                            viewBox='0 0 24 24'
                                            fill='none'
                                            stroke='currentColor'
                                            strokeWidth='2'
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            className='text-primary'
                                        >
                                            <path d='M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z' />
                                            <circle cx='12' cy='12' r='3' />
                                        </svg>
                                    </div>
                                    <h3 className='text-xl font-medium mb-2'>AI Strategy Development</h3>
                                    <p className='text-muted-foreground text-sm mb-4'>
                                        Create a comprehensive roadmap for implementing AI solutions across your
                                        organization.
                                    </p>
                                    <ul className='space-y-2 text-sm'>
                                        <li className='flex items-start gap-2'>
                                            <ChevronRight className='h-4 w-4 text-primary mt-0.5 shrink-0' />
                                            <span>AI roadmap creation</span>
                                        </li>
                                        <li className='flex items-start gap-2'>
                                            <ChevronRight className='h-4 w-4 text-primary mt-0.5 shrink-0' />
                                            <span>Use case identification and prioritization</span>
                                        </li>
                                        <li className='flex items-start gap-2'>
                                            <ChevronRight className='h-4 w-4 text-primary mt-0.5 shrink-0' />
                                            <span>Technology stack recommendations</span>
                                        </li>
                                        <li className='flex items-start gap-2'>
                                            <ChevronRight className='h-4 w-4 text-primary mt-0.5 shrink-0' />
                                            <span>Implementation planning and execution</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Approach Section */}
                <section id='approach' className='py-24 border-t border-border/40'>
                    <div className='container'>
                        <div className='max-w-xl'>
                            <h2 className='text-3xl font-light tracking-tight'>Our Approach</h2>
                            <p className='mt-4 text-muted-foreground'>
                                A systematic methodology that delivers consistent results and maximizes ROI.
                            </p>
                        </div>

                        <div className='mt-16 relative'>
                            <div className='absolute left-[26px] top-0 bottom-0 w-px bg-border/40 md:left-1/2 md:-ml-px'></div>

                            <div className='space-y-16'>
                                <div className='relative'>
                                    <div className='flex items-start gap-8 md:gap-0 md:items-center'>
                                        <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border/40 bg-card z-10'>
                                            <span className='text-sm font-medium'>01</span>
                                        </div>
                                        <div className='md:w-1/2 md:pr-12 md:text-right'>
                                            <h3 className='text-xl font-medium'>Discovery</h3>
                                            <p className='mt-2 text-sm text-muted-foreground'>
                                                We begin with a comprehensive assessment of your business needs,
                                                challenges, and objectives through stakeholder interviews and data
                                                analysis.
                                            </p>
                                        </div>
                                        <div className='hidden md:block md:w-1/2 md:pl-12'></div>
                                    </div>
                                </div>

                                <div className='relative'>
                                    <div className='flex items-start gap-8 md:gap-0 md:items-center'>
                                        <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border/40 bg-card z-10'>
                                            <span className='text-sm font-medium'>02</span>
                                        </div>
                                        <div className='md:w-1/2 md:pr-12 md:text-right md:order-1 md:hidden'>
                                            <h3 className='text-xl font-medium'>Strategy</h3>
                                            <p className='mt-2 text-sm text-muted-foreground'>
                                                We develop a tailored AI and data visualization strategy aligned with
                                                your business goals, including technology selection and implementation
                                                roadmap.
                                            </p>
                                        </div>
                                        <div className='hidden md:block md:w-1/2 md:pr-12 md:text-right'></div>
                                        <div className='hidden md:block md:w-1/2 md:pl-12'>
                                            <h3 className='text-xl font-medium'>Strategy</h3>
                                            <p className='mt-2 text-sm text-muted-foreground'>
                                                We develop a tailored AI and data visualization strategy aligned with
                                                your business goals, including technology selection and implementation
                                                roadmap.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className='relative'>
                                    <div className='flex items-start gap-8 md:gap-0 md:items-center'>
                                        <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border/40 bg-card z-10'>
                                            <span className='text-sm font-medium'>03</span>
                                        </div>
                                        <div className='md:w-1/2 md:pr-12 md:text-right'>
                                            <h3 className='text-xl font-medium'>Implementation</h3>
                                            <p className='mt-2 text-sm text-muted-foreground'>
                                                Our team of experts builds and deploys custom AI solutions and data
                                                visualizations, ensuring seamless integration with your existing
                                                systems.
                                            </p>
                                        </div>
                                        <div className='hidden md:block md:w-1/2 md:pl-12'></div>
                                    </div>
                                </div>

                                <div className='relative'>
                                    <div className='flex items-start gap-8 md:gap-0 md:items-center'>
                                        <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border/40 bg-card z-10'>
                                            <span className='text-sm font-medium'>04</span>
                                        </div>
                                        <div className='md:w-1/2 md:pr-12 md:text-right md:order-1 md:hidden'>
                                            <h3 className='text-xl font-medium'>Optimization</h3>
                                            <p className='mt-2 text-sm text-muted-foreground'>
                                                We continuously monitor and refine your AI solutions based on
                                                performance data and feedback, ensuring maximum ROI and business impact.
                                            </p>
                                        </div>
                                        <div className='hidden md:block md:w-1/2 md:pr-12 md:text-right'></div>
                                        <div className='hidden md:block md:w-1/2 md:pl-12'>
                                            <h3 className='text-xl font-medium'>Optimization</h3>
                                            <p className='mt-2 text-sm text-muted-foreground'>
                                                We continuously monitor and refine your AI solutions based on
                                                performance data and feedback, ensuring maximum ROI and business impact.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Case Studies Section */}
                <section id='case-studies' className='py-24 border-t border-border/40'>
                    <div className='container'>
                        <div className='max-w-xl'>
                            <h2 className='text-3xl font-light tracking-tight'>Case Studies</h2>
                            <p className='mt-4 text-muted-foreground'>
                                Real-world examples of how our AI solutions have transformed businesses.
                            </p>
                        </div>

                        <div className='mt-16'>
                            <Tabs defaultValue='finance' className='w-full'>
                                <TabsList className='w-full max-w-md grid grid-cols-3 h-10 p-1 bg-muted/20 rounded-md'>
                                    <TabsTrigger value='finance' className='rounded-sm text-xs'>
                                        Finance
                                    </TabsTrigger>
                                    <TabsTrigger value='healthcare' className='rounded-sm text-xs'>
                                        Healthcare
                                    </TabsTrigger>
                                    <TabsTrigger value='retail' className='rounded-sm text-xs'>
                                        Retail
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value='finance' className='mt-8'>
                                    <div className='grid md:grid-cols-2 gap-12'>
                                        <div>
                                            <h3 className='text-2xl font-light tracking-tight'>
                                                Global Investment Firm
                                            </h3>
                                            <p className='mt-2 text-sm text-muted-foreground'>
                                                A leading investment firm needed to analyze market trends faster to make
                                                better investment decisions.
                                            </p>

                                            <div className='mt-8 space-y-6'>
                                                <div>
                                                    <h4 className='text-sm font-medium uppercase tracking-wider text-muted-foreground'>
                                                        Challenge
                                                    </h4>
                                                    <p className='mt-2 text-sm'>
                                                        Analysts were spending 20+ hours per week manually processing
                                                        financial reports and market data, causing delays in
                                                        decision-making.
                                                    </p>
                                                </div>

                                                <div>
                                                    <h4 className='text-sm font-medium uppercase tracking-wider text-muted-foreground'>
                                                        Solution
                                                    </h4>
                                                    <p className='mt-2 text-sm'>
                                                        We developed a custom AI solution that automatically extracts,
                                                        analyzes, and visualizes key financial metrics from various
                                                        sources in real-time.
                                                    </p>
                                                </div>

                                                <div>
                                                    <h4 className='text-sm font-medium uppercase tracking-wider text-muted-foreground'>
                                                        Results
                                                    </h4>
                                                    <ul className='mt-2 space-y-2 text-sm'>
                                                        <li className='flex items-center gap-2'>
                                                            <div className='h-1.5 w-1.5 rounded-full bg-primary'></div>
                                                            <span>85% reduction in data processing time</span>
                                                        </li>
                                                        <li className='flex items-center gap-2'>
                                                            <div className='h-1.5 w-1.5 rounded-full bg-primary'></div>
                                                            <span>32% improvement in investment performance</span>
                                                        </li>
                                                        <li className='flex items-center gap-2'>
                                                            <div className='h-1.5 w-1.5 rounded-full bg-primary'></div>
                                                            <span>$4.2M additional annual revenue</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className='mt-8 p-4 border border-border/40 rounded-md bg-card/30'>
                                                <p className='text-sm italic'>
                                                    "Dash-Dev transformed our investment process. Their AI solution has
                                                    given us a significant competitive advantage in the market."
                                                </p>
                                                <p className='mt-2 text-xs text-muted-foreground'>
                                                    — Sarah Johnson, CIO, Global Investments Ltd.
                                                </p>
                                            </div>
                                        </div>

                                        <div className='relative aspect-[4/3] overflow-hidden rounded-md border border-border/40 bg-card/30'>
                                            <Image
                                                src='/placeholder.svg?height=600&width=800'
                                                alt='Financial dashboard visualization'
                                                width={800}
                                                height={600}
                                                className='object-cover'
                                            />
                                            <div className='absolute inset-0 bg-gradient-to-t from-background/80 to-transparent'></div>
                                            <div className='absolute bottom-0 left-0 right-0 p-4'>
                                                <Button
                                                    variant='outline'
                                                    size='sm'
                                                    className='h-8 text-xs gap-1.5 rounded-md'
                                                >
                                                    <span>View case study</span>
                                                    <ExternalLink className='h-3.5 w-3.5' />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value='healthcare' className='mt-8'>
                                    <div className='grid md:grid-cols-2 gap-12'>
                                        <div>
                                            <h3 className='text-2xl font-light tracking-tight'>
                                                National Hospital Network
                                            </h3>
                                            <p className='mt-2 text-sm text-muted-foreground'>
                                                A hospital network needed to improve patient outcomes while reducing
                                                operational costs.
                                            </p>

                                            <div className='mt-8 space-y-6'>
                                                <div>
                                                    <h4 className='text-sm font-medium uppercase tracking-wider text-muted-foreground'>
                                                        Challenge
                                                    </h4>
                                                    <p className='mt-2 text-sm'>
                                                        Doctors were overwhelmed with patient data and struggled to
                                                        identify high-risk patients quickly enough for preventive
                                                        intervention.
                                                    </p>
                                                </div>

                                                <div>
                                                    <h4 className='text-sm font-medium uppercase tracking-wider text-muted-foreground'>
                                                        Solution
                                                    </h4>
                                                    <p className='mt-2 text-sm'>
                                                        We implemented an AI-powered predictive analytics platform with
                                                        intuitive visualizations to identify at-risk patients and
                                                        recommend personalized care plans.
                                                    </p>
                                                </div>

                                                <div>
                                                    <h4 className='text-sm font-medium uppercase tracking-wider text-muted-foreground'>
                                                        Results
                                                    </h4>
                                                    <ul className='mt-2 space-y-2 text-sm'>
                                                        <li className='flex items-center gap-2'>
                                                            <div className='h-1.5 w-1.5 rounded-full bg-primary'></div>
                                                            <span>22% reduction in readmission rates</span>
                                                        </li>
                                                        <li className='flex items-center gap-2'>
                                                            <div className='h-1.5 w-1.5 rounded-full bg-primary'></div>
                                                            <span>15% decrease in average length of stay</span>
                                                        </li>
                                                        <li className='flex items-center gap-2'>
                                                            <div className='h-1.5 w-1.5 rounded-full bg-primary'></div>
                                                            <span>$3.8M annual cost savings</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className='mt-8 p-4 border border-border/40 rounded-md bg-card/30'>
                                                <p className='text-sm italic'>
                                                    "The AI solution from Dash-Dev has revolutionized how we deliver
                                                    care. We're now able to intervene earlier and provide better
                                                    outcomes for our patients."
                                                </p>
                                                <p className='mt-2 text-xs text-muted-foreground'>
                                                    — Dr. Michael Chen, Chief Medical Officer, National Health
                                                </p>
                                            </div>
                                        </div>

                                        <div className='relative aspect-[4/3] overflow-hidden rounded-md border border-border/40 bg-card/30'>
                                            <Image
                                                src='/placeholder.svg?height=600&width=800'
                                                alt='Healthcare analytics dashboard'
                                                width={800}
                                                height={600}
                                                className='object-cover'
                                            />
                                            <div className='absolute inset-0 bg-gradient-to-t from-background/80 to-transparent'></div>
                                            <div className='absolute bottom-0 left-0 right-0 p-4'>
                                                <Button
                                                    variant='outline'
                                                    size='sm'
                                                    className='h-8 text-xs gap-1.5 rounded-md'
                                                >
                                                    <span>View case study</span>
                                                    <ExternalLink className='h-3.5 w-3.5' />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value='retail' className='mt-8'>
                                    <div className='grid md:grid-cols-2 gap-12'>
                                        <div>
                                            <h3 className='text-2xl font-light tracking-tight'>
                                                Multinational Retailer
                                            </h3>
                                            <p className='mt-2 text-sm text-muted-foreground'>
                                                A global retail chain needed to optimize inventory management and
                                                personalize customer experiences.
                                            </p>

                                            <div className='mt-8 space-y-6'>
                                                <div>
                                                    <h4 className='text-sm font-medium uppercase tracking-wider text-muted-foreground'>
                                                        Challenge
                                                    </h4>
                                                    <p className='mt-2 text-sm'>
                                                        The retailer was struggling with excess inventory in some
                                                        locations while experiencing stockouts in others, leading to
                                                        lost sales and customer dissatisfaction.
                                                    </p>
                                                </div>

                                                <div>
                                                    <h4 className='text-sm font-medium uppercase tracking-wider text-muted-foreground'>
                                                        Solution
                                                    </h4>
                                                    <p className='mt-2 text-sm'>
                                                        We developed an AI-driven demand forecasting system with
                                                        interactive visualizations for inventory management and a
                                                        recommendation engine for personalized marketing.
                                                    </p>
                                                </div>

                                                <div>
                                                    <h4 className='text-sm font-medium uppercase tracking-wider text-muted-foreground'>
                                                        Results
                                                    </h4>
                                                    <ul className='mt-2 space-y-2 text-sm'>
                                                        <li className='flex items-center gap-2'>
                                                            <div className='h-1.5 w-1.5 rounded-full bg-primary'></div>
                                                            <span>28% reduction in inventory costs</span>
                                                        </li>
                                                        <li className='flex items-center gap-2'>
                                                            <div className='h-1.5 w-1.5 rounded-full bg-primary'></div>
                                                            <span>18% increase in sales conversion</span>
                                                        </li>
                                                        <li className='flex items-center gap-2'>
                                                            <div className='h-1.5 w-1.5 rounded-full bg-primary'></div>
                                                            <span>42% improvement in customer satisfaction</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className='mt-8 p-4 border border-border/40 rounded-md bg-card/30'>
                                                <p className='text-sm italic'>
                                                    "Dash-Dev's solution has transformed our retail operations. We've
                                                    significantly reduced costs while improving the customer experience
                                                    across all our stores."
                                                </p>
                                                <p className='mt-2 text-xs text-muted-foreground'>
                                                    — Robert Taylor, VP of Operations, Global Retail Inc.
                                                </p>
                                            </div>
                                        </div>

                                        <div className='relative aspect-[4/3] overflow-hidden rounded-md border border-border/40 bg-card/30'>
                                            <Image
                                                src='/placeholder.svg?height=600&width=800'
                                                alt='Retail analytics dashboard'
                                                width={800}
                                                height={600}
                                                className='object-cover'
                                            />
                                            <div className='absolute inset-0 bg-gradient-to-t from-background/80 to-transparent'></div>
                                            <div className='absolute bottom-0 left-0 right-0 p-4'>
                                                <Button
                                                    variant='outline'
                                                    size='sm'
                                                    className='h-8 text-xs gap-1.5 rounded-md'
                                                >
                                                    <span>View case study</span>
                                                    <ExternalLink className='h-3.5 w-3.5' />
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
                <section id='testimonials' className='py-24 border-t border-border/40'>
                    <div className='container'>
                        <div className='max-w-xl'>
                            <h2 className='text-3xl font-light tracking-tight'>What Our Clients Say</h2>
                            <p className='mt-4 text-muted-foreground'>
                                Hear from the businesses we've helped transform with our AI solutions.
                            </p>
                        </div>

                        <div className='mt-16 grid gap-6 md:grid-cols-3'>
                            <Card className='bg-card/50 border border-border/40 rounded-lg overflow-hidden'>
                                <CardContent className='p-6'>
                                    <div className='flex items-center gap-4 mb-4'>
                                        <div className='h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center'>
                                            <span className='text-sm font-medium'>JD</span>
                                        </div>
                                        <div>
                                            <p className='text-sm font-medium'>James Davidson</p>
                                            <p className='text-xs text-muted-foreground'>CTO, TechInnovate</p>
                                        </div>
                                    </div>
                                    <p className='text-sm italic'>
                                        "Dash-Dev helped us implement a generative AI solution that automated our
                                        content creation process. The results were immediate and impressive—we've seen a
                                        40% increase in productivity and a 25% reduction in costs."
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className='bg-card/50 border border-border/40 rounded-lg overflow-hidden'>
                                <CardContent className='p-6'>
                                    <div className='flex items-center gap-4 mb-4'>
                                        <div className='h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center'>
                                            <span className='text-sm font-medium'>LP</span>
                                        </div>
                                        <div>
                                            <p className='text-sm font-medium'>Lisa Patel</p>
                                            <p className='text-xs text-muted-foreground'>
                                                VP of Analytics, FinServe Group
                                            </p>
                                        </div>
                                    </div>
                                    <p className='text-sm italic'>
                                        "The data visualization dashboards created by Dash-Dev have transformed how we
                                        make decisions. Our executives can now instantly understand complex financial
                                        data and make informed decisions faster than ever before."
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className='bg-card/50 border border-border/40 rounded-lg overflow-hidden'>
                                <CardContent className='p-6'>
                                    <div className='flex items-center gap-4 mb-4'>
                                        <div className='h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center'>
                                            <span className='text-sm font-medium'>MR</span>
                                        </div>
                                        <div>
                                            <p className='text-sm font-medium'>Mark Rodriguez</p>
                                            <p className='text-xs text-muted-foreground'>
                                                Director of Operations, LogiTech Solutions
                                            </p>
                                        </div>
                                    </div>
                                    <p className='text-sm italic'>
                                        "Working with Dash-Dev on our supply chain optimization project exceeded our
                                        expectations. Their AI strategy and implementation helped us reduce delivery
                                        times by 30% and cut operational costs by 22%."
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className='py-24 border-t border-border/40'>
                    <div className='container'>
                        <div className='max-w-2xl mx-auto text-center'>
                            <h2 className='text-3xl font-light tracking-tight'>Ready to harness the power of AI?</h2>
                            <p className='mt-4 text-muted-foreground'>
                                Schedule a consultation with our experts to discuss how our AI solutions can transform
                                your business.
                            </p>
                            <div className='mt-10 flex flex-col sm:flex-row gap-4 justify-center'>
                                <Button className='group h-11 px-6 rounded-md'>
                                    <span>Book a consultation</span>
                                    <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
                                </Button>
                                <Button variant='outline' className='h-11 px-6 rounded-md'>
                                    <span>View case studies</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className='py-12 border-t border-border/40'>
                <div className='container'>
                    <div className='flex flex-col md:flex-row justify-between gap-8'>
                        <div className='md:w-1/3'>
                            <div className='flex items-center gap-2'>
                                <Brain className='h-5 w-5 text-primary' />
                                <span className='text-lg font-medium tracking-tight'>Dash-Dev</span>
                            </div>
                            <p className='mt-4 text-sm text-muted-foreground'>
                                AI Solutions Engineered for Business Impact
                            </p>
                            <div className='mt-6 flex gap-4'>
                                <a href='#' className='text-muted-foreground hover:text-foreground transition-colors'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='20'
                                        height='20'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        stroke='currentColor'
                                        strokeWidth='1.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    >
                                        <path d='M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z'></path>
                                    </svg>
                                </a>
                                <a href='#' className='text-muted-foreground hover:text-foreground transition-colors'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='20'
                                        height='20'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        stroke='currentColor'
                                        strokeWidth='1.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    >
                                        <path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z'></path>
                                        <rect width='4' height='12' x='2' y='9'></rect>
                                        <circle cx='4' cy='4' r='2'></circle>
                                    </svg>
                                </a>
                                <a href='#' className='text-muted-foreground hover:text-foreground transition-colors'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='20'
                                        height='20'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        stroke='currentColor'
                                        strokeWidth='1.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    >
                                        <path d='M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4'></path>
                                        <path d='M9 18c-4.51 2-5-2-7-2'></path>
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-8 md:w-2/3 md:grid-cols-3'>
                            <div>
                                <h3 className='text-sm font-medium mb-4'>Company</h3>
                                <ul className='space-y-2 text-sm'>
                                    <li>
                                        <a
                                            href='#'
                                            className='text-muted-foreground hover:text-foreground transition-colors'
                                        >
                                            About Us
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href='#'
                                            className='text-muted-foreground hover:text-foreground transition-colors'
                                        >
                                            Careers
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href='#'
                                            className='text-muted-foreground hover:text-foreground transition-colors'
                                        >
                                            Blog
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className='text-sm font-medium mb-4'>Services</h3>
                                <ul className='space-y-2 text-sm'>
                                    <li>
                                        <a
                                            href='#'
                                            className='text-muted-foreground hover:text-foreground transition-colors'
                                        >
                                            Generative AI
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href='#'
                                            className='text-muted-foreground hover:text-foreground transition-colors'
                                        >
                                            Data Visualization
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href='#'
                                            className='text-muted-foreground hover:text-foreground transition-colors'
                                        >
                                            AI Strategy
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className='text-sm font-medium mb-4'>Contact</h3>
                                <ul className='space-y-2 text-sm'>
                                    <li className='flex items-start gap-2'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width='20'
                                            height='20'
                                            viewBox='0 0 24 24'
                                            fill='none'
                                            stroke='currentColor'
                                            strokeWidth='1.5'
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            className='h-4 w-4 text-muted-foreground mt-0.5'
                                        >
                                            <path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z'></path>
                                        </svg>
                                        <span className='text-muted-foreground'>+1 (555) 123-4567</span>
                                    </li>
                                    <li className='flex items-start gap-2'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width='20'
                                            height='20'
                                            viewBox='0 0 24 24'
                                            fill='none'
                                            stroke='currentColor'
                                            strokeWidth='1.5'
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            className='h-4 w-4 text-muted-foreground mt-0.5'
                                        >
                                            <rect width='20' height='16' x='2' y='4' rx='2'></rect>
                                            <path d='m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7'></path>
                                        </svg>
                                        <span className='text-muted-foreground'>info@dash-dev.com</span>
                                    </li>
                                    <li className='flex items-start gap-2'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width='20'
                                            height='20'
                                            viewBox='0 0 24 24'
                                            fill='none'
                                            stroke='currentColor'
                                            strokeWidth='1.5'
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            className='h-4 w-4 text-muted-foreground mt-0.5'
                                        >
                                            <path d='M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z'></path>
                                            <circle cx='12' cy='10' r='3'></circle>
                                        </svg>
                                        <span className='text-muted-foreground'>123 Broadway, New York, NY 10007</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className='mt-12 pt-8 border-t border-border/40 text-center'>
                        <p className='text-xs text-muted-foreground'>© 2025 Dash-Dev. All rights reserved.</p>
                        <div className='mt-2 flex justify-center gap-6'>
                            <a
                                href='#'
                                className='text-xs text-muted-foreground hover:text-foreground transition-colors'
                            >
                                Privacy Policy
                            </a>
                            <a
                                href='#'
                                className='text-xs text-muted-foreground hover:text-foreground transition-colors'
                            >
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
