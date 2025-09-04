import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Services from '@/components/Services';
import UsefulLinks from '@/components/UsefulLinks';
import Blogs from '@/components/Blogs';
import Vision from '@/components/Vision';
import Contact from '@/components/Contact';

export default function Index() {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Services />
      <UsefulLinks />
      <Blogs />
      <Vision />
      <Contact />
    </div>
  );
}