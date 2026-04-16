import { type ReactNode } from 'react';
import { Topbar } from '../../modules/navigation/components/Topbar';
import { Sidebar } from '../../modules/navigation/components/Sidebar';
import { NotificationPopup } from '../../modules/navigation/components/NotificationPopup';
import { Toast } from '../components/Toast';
import { useAppState } from '../hooks/useAppState';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { sidebarOpen, notifOpen, closeNotif } = useAppState();

  return (
    <>
      {/* Fixed top bar */}
      <Topbar />

      {/* Notification dropdown */}
      <NotificationPopup />

      {/* Click-outside overlay for notification popup */}
      {notifOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 490,
          }}
          onClick={closeNotif}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <Sidebar />

      {/* Mobile overlay — closes sidebar on small screens */}
      <div
        className={`sb-overlay${sidebarOpen ? ' show' : ''}`}
        id="sb-overlay"
        onClick={() => useAppState.getState().toggleSidebar()}
        aria-hidden="true"
      />

      {/* Main content area */}
      <div className={`main-wrap${sidebarOpen ? '' : ' full'}`} id="main-wrap">
        <div className="main">
          {children}
        </div>
      </div>

      {/* Toast notification */}
      <Toast />
    </>
  );
}
