import Hero from './Hero';
import HowItWorks from './HowItWorks';
import LiveToolsSpotlight from './LiveToolsSpotlight';
import FeatureCard from './FeatureCard';
import WhyTrainWithNish from './WhyTrainWithNish';
import MotivationStrip from './MotivationStrip';
import HomeCTA from './HomeCTA';
import '../css/Home.css';

function Home() {
  return (
    <main className="home">
      <Hero />
      <HowItWorks />
      <LiveToolsSpotlight />
      <FeatureCard />
      <WhyTrainWithNish />
      <MotivationStrip />
      <HomeCTA />
    </main>
  );
}

export default Home;
