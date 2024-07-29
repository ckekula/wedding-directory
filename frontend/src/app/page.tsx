import React from "react";
import Head from "next/head";

//components
import Header from "@/components/shared/Header";

const HomePage: React.FC = () => {
  return (
    <div>
      <Head>
        <title className=" bg-red-500"> Say I Do - Wedding Planner</title>
      </Head>
      <Header />
      <main>
        <section>
          <h2>Locate vendors for every vibe</h2>
          {/* Add vendor cards here */}
        </section>
        <section>
          <h2>Let&apos;s build your vendor team</h2>
          {/* Add vendor team icons here */}
        </section>
        <section>
          <h2>Wedding planning has never been easy</h2>
          {/* Add planning steps here */}
        </section>
        <section>
          <h2>What other couples say about us</h2>
          {/* Add testimonials here */}
        </section>
        <section>
          <h2>Get started with &apos;Say I Do&apos;</h2>
          <button>Subscribe</button>
        </section>
      </main>
      <footer>
        <p>Say I Do | Wedding Planner</p>
        <nav>
          <ul>
            <li>About</li>
            <li>Contact</li>
            <li>Privacy</li>
          </ul>
        </nav>
      </footer>
    </div>
  );
};

export default HomePage;
