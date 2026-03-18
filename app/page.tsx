import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import TrustBadges from '@/components/home/TrustBadges';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import WhyChooseSkinCake from '@/components/home/WhyChoose';
import Testimonials from '@/components/home/Testimonials';
import Newsletter from '@/components/home/Newsletter';

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>
        <HeroSection />
        <TrustBadges />
        <FeaturedProducts />
        <WhyChooseSkinCake />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
