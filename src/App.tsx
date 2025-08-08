import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { UserProvider } from './contexts/UserContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { TaskProvider } from './contexts/TaskContext';
import { ChatProvider } from './contexts/ChatContext';
import { ViewProvider, useView } from './contexts/ViewContext';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import LibraryPage from './components/LibraryPage';
import FloorPlanPage from './components/FloorPlanPage';
import ThreeDRendersPage from './components/ThreeDRendersPage';
import CompanyCataloguePage from './components/CompanyCataloguePage';
import ClientsListPage from './components/ClientsListPage';

const MainContent: React.FC<{ sidebarOpen: boolean }> = ({ sidebarOpen }) => {
  const { activeView } = useView();

  switch (activeView) {
    case 'library':
      return <LibraryPage />;
    case 'floorPlan':
      return <FloorPlanPage />;
    case 'threeDRenders':
      return <ThreeDRendersPage />;
    case 'companyCatalogue':
      return <CompanyCataloguePage />;
    case 'clientsList':
      return <ClientsListPage />;
    case 'chat':
    default:
      return <ChatArea sidebarOpen={sidebarOpen} />;
  }
};

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <UserProvider>
          <NotificationProvider>
            <TaskProvider>
              <ChatProvider>
                <ViewProvider>
                  <div className="h-screen bg-[#212121] dark:bg-[#212121] bg-white flex overflow-hidden">
                    {/* Mobile menu button */}
                    <button
                      onClick={toggleSidebar}
                      className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-700 text-white hover:bg-gray-600 transition-colors dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 bg-gray-200 text-gray-700 hover:bg-gray-300"
                    >
                      <Menu size={20} />
                    </button>

                    {/* Sidebar */}
                    <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
                    
                    {/* Main Content */}
                    <MainContent sidebarOpen={sidebarOpen} />
                  </div>
                </ViewProvider>
              </ChatProvider>
            </TaskProvider>
          </NotificationProvider>
        </UserProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;