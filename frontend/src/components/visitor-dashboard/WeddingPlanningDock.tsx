import { useState } from 'react';
import { Dock, DockItem, DockLabel, DockIcon } from '@/components/motion-ui/Dock';
import { Home, CheckCircle, DollarSign, Users, Briefcase } from 'lucide-react';

const WeddingPlanningDock = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg md:hidden"
      style={{
        width: '100vw',           // Full width on mobile screens
        overflowX: 'hidden',        // Allows horizontal scrolling if needed
        whiteSpace: 'nowrap',     // Keeps items in one line
        zIndex: 50,               // High z-index to stay above other content
      }}
    >
      <Dock className="flex justify-between items-center px-4 py-2">
        <DockItem
          className={`flex flex-col items-center ${activeTab === 'dashboard' ? 'text-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <DockIcon>
            <Home size={24} />
          </DockIcon>
          <DockLabel className="text-xs mt-1">Dashboard</DockLabel>
        </DockItem>

        <DockItem
          className={`flex flex-col items-center ${activeTab === 'checklist' ? 'text-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('checklist')}
        >
          <DockIcon>
            <CheckCircle size={24} />
          </DockIcon>
          <DockLabel className="text-xs mt-1">Checklist</DockLabel>
        </DockItem>

        <DockItem
          className={`flex flex-col items-center ${activeTab === 'budgeter' ? 'text-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('budgeter')}
        >
          <DockIcon>
            <DollarSign size={24} />
          </DockIcon>
          <DockLabel className="text-xs mt-1">Budgeter</DockLabel>
        </DockItem>

        <DockItem
          className={`flex flex-col items-center ${activeTab === 'guest-list' ? 'text-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('guest-list')}
        >
          <DockIcon>
            <Users size={24} />
          </DockIcon>
          <DockLabel className="text-xs mt-1">Guest List</DockLabel>
        </DockItem>

        <DockItem
          className={`flex flex-col items-center ${activeTab === 'vendors' ? 'text-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('vendors')}
        >
          <DockIcon>
            <Briefcase size={24} />
          </DockIcon>
          <DockLabel className="text-xs mt-1">Vendors</DockLabel>
        </DockItem>
      </Dock>
    </div>
  );
};

export default WeddingPlanningDock;
