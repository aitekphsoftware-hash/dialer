import React, { ReactNode } from 'react';

// FIX: Defined an explicit props interface for RightRail and used React.FC.
interface RightRailProps {
    children: ReactNode;
}

export const RightRail: React.FC<RightRailProps> = ({ children }) => {
  return (
    <aside id="dialer-section" className="hidden lg:block w-80 bg-gray-800 border-l border-gray-700 p-4 sticky top-[65px]" style={{ height: 'calc(100vh - 65px)' }}>
        {children}
    </aside>
  );
};