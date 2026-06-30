import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/sections/Hero';
import { LogoBar } from '../components/sections/LogoBar';
import { Features } from '../components/sections/Features';
import { LearningPaths } from '../components/sections/LearningPaths';
import { Testimonials } from '../components/sections/Testimonials';
import { CTA } from '../components/sections/CTA';

export function Home() {
  return (
    <div className="min-h-screen bg-bg-base text-text-primary font-body">
      <Navbar />
      <main>
        <Hero />
        <LogoBar />
        <Features />
        <LearningPaths />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
