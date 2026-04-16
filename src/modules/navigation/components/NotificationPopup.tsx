import { useAppState } from '../../../shared/hooks/useAppState';

export function NotificationPopup() {
  const { lang, notifOpen, closeNotif, goPage, selectCourse } = useAppState();

  return (
    <div className={`notif-popup${notifOpen ? ' show' : ''}`} id="notif-popup">
      <div className="np-header">
        <div className="np-title">
          {lang === 'vi' ? 'Thông báo' : 'Notifications'}
        </div>
        <div className="np-close" onClick={closeNotif} role="button" tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && closeNotif()}>
          ✕
        </div>
      </div>

      {/* Session reminder */}
      <div
        className="np-item"
        onClick={() => { selectCourse('mind'); closeNotif(); }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && (selectCourse('mind'), closeNotif())}
      >
        <div className="np-icon" style={{ background: 'var(--gold-l)' }}>📅</div>
        <div className="np-body">
          <div className="np-cat">
            {lang === 'vi' ? 'Buổi học' : 'Session'}
          </div>
          <div className="np-text">
            {lang === 'vi'
              ? 'Mindfulness Cơ Bản · Buổi 6 bắt đầu lúc 9:00 hôm nay'
              : 'Basic Mindfulness · Session 6 starts at 9:00 today'}
          </div>
          <div className="np-time">
            {lang === 'vi' ? 'Hôm nay, 8:30' : 'Today, 8:30'}
          </div>
        </div>
      </div>

      {/* Submission */}
      <div
        className="np-item"
        onClick={() => { goPage('students'); closeNotif(); }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && (goPage('students'), closeNotif())}
      >
        <div className="np-icon" style={{ background: '#E8EEE8' }}>📝</div>
        <div className="np-body">
          <div className="np-cat">
            {lang === 'vi' ? 'Bài tập mới nộp' : 'New Submission'}
          </div>
          <div className="np-text">
            {lang === 'vi'
              ? '3 học viên nộp bài — Thiền Định · Buổi 4'
              : '3 students submitted — Meditation · Session 4'}
          </div>
          <div className="np-time">
            {lang === 'vi' ? '1 giờ trước' : '1 hour ago'}
          </div>
        </div>
      </div>

      {/* Questions */}
      <div
        className="np-item"
        onClick={() => { goPage('qa'); closeNotif(); }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && (goPage('qa'), closeNotif())}
      >
        <div className="np-icon" style={{ background: '#F0EDE8' }}>💬</div>
        <div className="np-body">
          <div className="np-cat">
            {lang === 'vi' ? 'Câu hỏi mới' : 'New Questions'}
          </div>
          <div className="np-text">
            {lang === 'vi'
              ? '2 câu hỏi mới — NLP Ứng Dụng · Buổi 8'
              : '2 new questions — Applied NLP · Session 8'}
          </div>
          <div className="np-time">
            {lang === 'vi' ? '2 giờ trước' : '2 hours ago'}
          </div>
        </div>
      </div>

      {/* Feedback */}
      <div
        className="np-item"
        onClick={() => { goPage('feedback'); closeNotif(); }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && (goPage('feedback'), closeNotif())}
      >
        <div className="np-icon" style={{ background: 'var(--gold-l)' }}>⭐</div>
        <div className="np-body">
          <div className="np-cat">
            {lang === 'vi' ? 'Feedback mới' : 'New Feedback'}
          </div>
          <div className="np-text">
            {lang === 'vi'
              ? '12 phản hồi mới từ buổi 5 và 6'
              : '12 new responses from sessions 5 & 6'}
          </div>
          <div className="np-time">
            {lang === 'vi' ? '3 giờ trước' : '3 hours ago'}
          </div>
        </div>
      </div>

      <div className="np-footer">
        {lang === 'vi' ? 'Xem tất cả thông báo →' : 'See all notifications →'}
      </div>
    </div>
  );
}
