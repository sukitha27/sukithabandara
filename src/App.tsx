/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { SystemHealth } from './components/SystemHealth';
import { About } from './components/About';
import { Capabilities } from './components/Capabilities';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-surface text-on-surface font-body selection:bg-primary-container selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <SystemHealth />
        <About />
        <Capabilities />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
