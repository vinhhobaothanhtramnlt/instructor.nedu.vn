import { useAppState } from '../../../shared/hooks/useAppState';
import { COURSES, type CourseKey, type PageKey } from '../../../shared/types';

const COURSE_KEYS: CourseKey[] = ['mind', 'thien', 'nlp'];

// Only 'thien' has a new submission dot in the prototype
const COURSE_NEW_DOT: Record<CourseKey, boolean> = {
  mind: false,
  thien: true,
  nlp: false,
};

export function Sidebar() {
  const { lang, page, sidebarOpen, selectedCourse, goPage, selectCourse, setLang, showToast } = useAppState();

  const navItem = (
    p: PageKey,
    icon: string,
    labelVi: string,
    labelEn: string,
    badge?: number
  ) => (
    <button
      className={`nav${page === p ? ' on' : ''}`}
      onClick={() => goPage(p)}
    >
      <span className="ni">{icon}</span>
      <span>{lang === 'vi' ? labelVi : labelEn}</span>
      {badge != null && <span className="nbadge">{badge}</span>}
    </button>
  );

  const handleLogout = () => {
    showToast(lang === 'vi' ? 'Đã đăng xuất' : 'Logged out');
  };

  return (
    <aside className={`sb${sidebarOpen ? '' : ' hidden'}`} id="sidebar">
      {/* Breadcrumb — shown when a course is selected and on course page */}
      <div className={`sb-bc${page === 'courses' ? ' show' : ''}`} id="sb-bc">
        <div className="sb-bc-course">
          {lang === 'vi' ? 'Khoá học' : 'Course'}
        </div>
        <div className="sb-bc-sess">
          {lang === 'vi' ? COURSES[selectedCourse].vi : COURSES[selectedCourse].en}
        </div>
      </div>

      {/* Overview section */}
      <div className="sb-sec">
        {lang === 'vi' ? 'Tổng quan' : 'Overview'}
      </div>
      {navItem('home',      '⌂', 'Trang chủ',  'Dashboard')}
      {navItem('students',  '○', 'Học viên',    'Students')}
      {navItem('materials', '□', 'Bài giảng',   'Materials')}
      {navItem('qa',        '◇', 'Câu hỏi',     'Q&A', 3)}
      {navItem('feedback',  '★', 'Feedback',    'Feedback')}

      {/* Tools section */}
      <div className="sb-sec">
        {lang === 'vi' ? 'Công cụ' : 'Tools'}
      </div>
      {navItem('calendar', '⊟', 'Lịch giảng dạy', 'Calendar')}
      {navItem('stats',    '▐', 'Thống kê',        'Stats')}

      {/* Courses section */}
      <div className="sb-sec">
        {lang === 'vi' ? 'Khoá học' : 'Courses'}
      </div>
      <div className="sb-courses">
        {COURSE_KEYS.map((key) => {
          const course = COURSES[key];
          const isOn = selectedCourse === key && page === 'courses';
          return (
            <div
              key={key}
              className={`ci${isOn ? ' on' : ''}`}
              id={`ci-${key}`}
              onClick={() => selectCourse(key)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && selectCourse(key)}
            >
              <div className="ci-dot" style={{ background: course.color }} />
              <div className="ci-info">
                <div className="ci-name">
                  {lang === 'vi' ? course.vi : course.en}
                </div>
              </div>
              <div className="ci-num">{course.prog}</div>
              {COURSE_NEW_DOT[key] && (
                <div className="ci-new-dot" title={lang === 'vi' ? 'Có bài nộp mới' : 'New submission'} />
              )}
            </div>
          );
        })}

        {/* Create new course button */}
        <div style={{ padding: '6px 7px', marginTop: 4 }}>
          <button
            className="btn btn-o btn-sm"
            style={{
              width: '100%',
              color: 'rgba(255,255,255,.35)',
              borderColor: 'var(--border2)',
              fontSize: 12,
            }}
            onClick={() => showToast(lang === 'vi' ? 'Tính năng sắp ra mắt' : 'Coming soon')}
          >
            {lang === 'vi' ? '+ Tạo khoá mới' : '+ New Course'}
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="sb-foot">
        {/* User row */}
        <div
          className="sb-user-row"
          onClick={() => goPage('profile')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && goPage('profile')}
        >
          <div className="sb-av">NL</div>
          <div style={{ flex: 1 }}>
            <div className="sb-un">NhiLe</div>
            <div className="sb-role">
              {lang === 'vi' ? 'Dẫn đường chính' : 'Lead Guide'}
            </div>
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,.25)' }}>→</div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 10px',
            background: 'transparent',
            border: '1px solid rgba(255,255,255,.1)',
            borderRadius: 'var(--rs)',
            cursor: 'pointer',
            fontFamily: "'Barlow', sans-serif",
            fontSize: 12.5,
            color: 'rgba(255,255,255,.38)',
            transition: 'all .15s',
            marginBottom: 8,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,.07)';
            e.currentTarget.style.color = 'rgba(255,255,255,.7)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'rgba(255,255,255,.38)';
          }}
        >
          <span>⎋</span>
          <span>{lang === 'vi' ? 'Đăng xuất' : 'Log out'}</span>
        </button>

        {/* Language switcher */}
        <div className="sb-lang">
          <button
            className={`slo${lang === 'vi' ? ' on' : ''}`}
            onClick={() => setLang('vi')}
          >
            🇻🇳 Việt
          </button>
          <button
            className={`slo${lang === 'en' ? ' on' : ''}`}
            onClick={() => setLang('en')}
          >
            🇺🇸 EN
          </button>
        </div>
      </div>
    </aside>
  );
}
