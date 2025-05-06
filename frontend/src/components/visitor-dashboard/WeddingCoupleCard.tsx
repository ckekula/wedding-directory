import React from 'react';
import ProfilePicture from './ProfilePicture'; // Import the ProfilePicture component
import { WeddingCoupleProps } from '@/types/weddingCoupleCardTypes';

const WeddingCoupleCard: React.FC<WeddingCoupleProps> = ({ profilePic, setProfilePic, weddingDate, brideName, groomName }) => {
  // Calculate how many days are left until the wedding
  const calculateDaysLeft = () => {
    const currentDate = new Date();
    const wedding = new Date(weddingDate);
    const timeDifference = wedding.getTime() - currentDate.getTime();
    const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return daysLeft > 0 ? daysLeft : 0;
  };

  const daysLeft = calculateDaysLeft();

  return (
    <div className="w-full max-w-8xl mx-auto bg-white shadow-lg rounded-lg p-4">
      <div className="flex flex-col md:flex-row items-center gap-4">

        {/* Text Container - Center column */}
        <div className="flex-1 flex items-center justify-center text-center">
          <div>
            <p className="text-gray-800 mb-4 text-sm font-merriweather">The marriage of</p>
            <div className="space-y-0">
              <div className="text-4xl font-marck -ml-20">{brideName || 'Bride'}</div>
              <div className="text-lg ml-2 font-merriweather">AND</div>
              <div className="text-4xl font-marck -mr-24">{groomName || 'Groom'}</div>
            </div>
          </div>
        </div>
        {/* Countdown Container - Right side on desktop */}
        <div className="w-full md:w-1/3 flex flex-col items-center justify-center text-center rounded-lg p-4">
          <p className="text-gray-800 mb-2 font-merriweather">Days until the wedding:</p>
          <div className="text-3xl font-bold font-title text-orange">
            {daysLeft} {daysLeft === 1 ? 'day' : 'days'}
          </div>
        </div>
        {/* Profile Picture Upload - Left side on desktop */}
        <div className="w-full md:w-1/3 flex justify-center">
          {/* Integrating ProfilePicture component here */}
          <ProfilePicture profilePic={profilePic} setProfilePic={setProfilePic} />
        </div>




      </div>
    </div>
  );
};

export default WeddingCoupleCard;
