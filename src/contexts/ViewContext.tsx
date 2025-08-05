import React, { createContext, useContext, useState, ReactNode } from 'react';

type View = 'chat' | 'library' | 'floorPlan' | 'threeDRenders';

interface ViewContextType {
  activeView: View;
  setActiveView: (view: View) => void;
}

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export const ViewProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<View>('chat');

  return (
    <ViewContext.Provider value={{ activeView, setActiveView }}>
      {children}
    </ViewContext.Provider>
  );
};

export const useView = () => {
  const context = useContext(ViewContext);
  if (!context) {
    throw new Error('useView must be used within a ViewProvider');
  }
  return context;
};