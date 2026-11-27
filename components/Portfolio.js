import Navbar from "./Navbar";
import Hero from "./Hero";
import Work from "./Work";
import About from "./About";
import Services from "./Services";
import ExperienceProcess from "./ExperienceProcess";
import GithubActivity from "./GithubActivity";
import Contact from "./Contact";
import Footer from "./Footer";

export default function Portfolio() {
  return (
    <>
      <Navbar />
      <main className="portfolio-content">
        <div className="home-showcase">
          <div className="home-showcase-layout">
            <Hero />
            <Work />
          </div>
        </div>
        <About />
        <Services />
        <ExperienceProcess />
        <GithubActivity />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
