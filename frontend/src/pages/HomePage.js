import React from 'react';
import HeroSlider from '../components/HeroSlider';
import AboutSection from '../components/AboutSection';
import StatsSection from '../components/StatsSection';
import ProductsGrid from '../components/ProductsGrid';
import MediaSection from '../components/MediaSection';

export default function HomePage() {
  return (
    <div data-testid="home-page">
      <HeroSlider />
      <AboutSection />
      <StatsSection />
      <ProductsGrid />
      <MediaSection />
    </div>
  );
}
