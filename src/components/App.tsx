import FloorPlanPage from './components/FloorPlanPage';
import ThreeDRendersPage from './components/ThreeDRendersPage';
import CompanyCataloguePage from './components/CompanyCataloguePage';
import ClientsListPage from './components/ClientsListPage';

    case 'threeDRenders':
      return <ThreeDRendersPage />;
    case 'companyCatalogue':
      return <CompanyCataloguePage />;
    case 'clientsList':
      return <ClientsListPage />;
    case 'chat':
    default:
      return <ChatArea sidebarOpen={sidebarOpen} />;