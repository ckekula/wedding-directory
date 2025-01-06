import React from 'react';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Headers/Header';
import Stats from '@/components/vendor-dashboard/Stats';

const Analytics = () => {
  return (
    <div className="bg-lightYellow min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex flex-col flex-grow mt-8">
        {/* Stats */}
        <div className="flex justify-center mb-8">
          <Stats />
        </div>

        {/* "Coming Soon" Message */}
        <div className="flex flex-grow items-center justify-center">
          <p className="text-center text-lg font-semibold">Coming soon!</p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Analytics;
