import './index.css';
import { AppLayout } from './shared/layouts/AppLayout';
import { useAppState } from './shared/hooks/useAppState';

import DashboardPage  from './modules/dashboard/pages/DashboardPage';
import CoursesPage    from './modules/courses/pages/CoursesPage';
import StudentsPage   from './modules/students/pages/StudentsPage';
import QAPage         from './modules/qa/pages/QAPage';
import FeedbackPage   from './modules/feedback/pages/FeedbackPage';
import MaterialsPage  from './modules/materials/pages/MaterialsPage';
import ProfilePage    from './modules/profile/pages/ProfilePage';
import CalendarPage   from './modules/calendar/pages/CalendarPage';
import StatsPage      from './modules/stats/pages/StatsPage';

function PageRouter() {
  const { page } = useAppState();

  switch (page) {
    case 'home':      return <DashboardPage />;
    case 'courses':   return <CoursesPage />;
    case 'students':  return <StudentsPage />;
    case 'qa':        return <QAPage />;
    case 'feedback':  return <FeedbackPage />;
    case 'materials': return <MaterialsPage />;
    case 'profile':   return <ProfilePage />;
    case 'calendar':  return <CalendarPage />;
    case 'stats':     return <StatsPage />;
    default:          return <DashboardPage />;
  }
}

export default function App() {
  return (
    <AppLayout>
      <PageRouter />
    </AppLayout>
  );
}
