import { useAppState } from '../../../shared/hooks/useAppState';

export function Topbar() {
  const { lang, sidebarOpen, notifOpen, toggleSidebar, toggleNotif, setLang, goPage } = useAppState();

  return (
    <header className="topbar">
      {/* Sidebar toggle */}
      <button
        className="tb-menu"
        onClick={toggleSidebar}
        title="Menu"
        aria-label="Toggle sidebar"
        aria-expanded={sidebarOpen}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Logo */}
      <a className="tb-logo" href="#" onClick={(e) => { e.preventDefault(); goPage('home'); }}>
        <div className="tb-logo-n">
          <svg viewBox="0 0 24 24" style={{ width: 20, height: 20, fill: '#fff' }}>
            <path d="M4 4h3.5L16 16.5V4H20v16h-3.5L8 7.5V20H4z" />
          </svg>
        </div>
        <div className="tb-logo-text">N·<em>Edu</em>cation</div>
      </a>

      <div className="tb-space" />

      {/* Global search */}
      <div style={{ position: 'relative', flex: 1, maxWidth: 280 }}>
        <input
          type="text"
          placeholder={lang === 'vi' ? 'Tìm học viên, tài liệu, câu hỏi...' : 'Search students, materials, Q&A...'}
          style={{
            width: '100%',
            padding: '7px 12px 7px 34px',
            border: 'none',
            borderRadius: 20,
            fontFamily: "'Barlow', sans-serif",
            fontSize: 13,
            background: 'rgba(0,0,0,.16)',
            color: '#fff',
            outline: 'none',
          }}
        />
        <span style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', fontSize: 14, opacity: 0.6 }}>
          🔍
        </span>
      </div>

      {/* Language switcher */}
      <div className="tb-lang">
        <button
          className={`tb-lang-btn${lang === 'vi' ? ' on' : ''}`}
          onClick={() => setLang('vi')}
        >
          🇻🇳 Việt
        </button>
        <button
          className={`tb-lang-btn${lang === 'en' ? ' on' : ''}`}
          onClick={() => setLang('en')}
        >
          🇺🇸 EN
        </button>
      </div>

      {/* Notification bell */}
      <button
        className="tb-notif"
        onClick={toggleNotif}
        title={lang === 'vi' ? 'Thông báo' : 'Notifications'}
        aria-expanded={notifOpen}
      >
        🔔
        <div className="notif-dot" />
      </button>

      {/* User chip */}
      <div className="tb-user" onClick={() => goPage('profile')} role="button" tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && goPage('profile')}>
        <div className="tb-avatar">NL</div>
        <div className="tb-user-info">
          <div className="tb-username">NhiLe</div>
          <div className="tb-userrole">
            {lang === 'vi' ? 'Dẫn đường chính' : 'Lead Guide'}
          </div>
        </div>
      </div>
    </header>
  );
}
