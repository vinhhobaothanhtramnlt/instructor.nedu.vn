import { useAppState } from '../../../shared/hooks/useAppState';

function formatDate(lang: 'vi' | 'en'): string {
  const now = new Date();
  if (lang === 'en') {
    return now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }
  const days = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
  const d = now.getDate();
  const m = now.getMonth() + 1;
  const y = now.getFullYear();
  return `${days[now.getDay()]}, ${d}/${m}/${y}`;
}

export default function DashboardPage() {
  const { lang, goPage, selectCourse } = useAppState();

  const dateStr = formatDate(lang);

  return (
    <div>
      {/* Page header */}
      <div className="ph">
        <div className="ph-title">
          {lang === 'vi' ? 'Xin chào, NhiLe' : 'Hello, NhiLe'}
        </div>
        <div className="ph-sub">{dateStr}</div>
      </div>

      {/* TODAY SESSION CARD */}
      <div className="today">
        <div className="t-ey">
          {lang === 'vi' ? 'Buổi học hôm nay' : "Today's Session"}
        </div>
        <div className="t-ti">Mindfulness Cơ Bản · Buổi 6</div>
        <div className="t-me">09:00 – 10:30 · Online · 20 {lang === 'vi' ? 'học viên' : 'students'}</div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flexWrap: 'wrap' }}>
          <a
            className="zoom-btn"
            href="https://zoom.us/j/123456789"
            target="_blank"
            rel="noreferrer"
          >
            &#9654; {lang === 'vi' ? 'Vào phòng Zoom ngay' : 'Join Zoom Now'}
          </a>
          <div className="zoom-meta" style={{ color: 'rgba(255,255,255,.65)' }}>
            <div>
              <strong style={{ color: '#fff' }}>ID:</strong>{' '}
              <span style={{ color: '#fff' }}>123 456 789</span>
            </div>
            <div>
              <strong style={{ color: '#fff' }}>
                {lang === 'vi' ? 'Mật khẩu:' : 'Password:'}
              </strong>{' '}
              <span style={{ color: '#fff' }}>mindful2026</span>
            </div>
          </div>
        </div>
        {/* Pinned Q banner */}
        <div className="rem-banner-dark">
          <div className="rb-lbl-dark">
            📌{' '}
            {lang === 'vi'
              ? 'Trả lời đầu giờ hôm nay — từ buổi 5'
              : 'Answer at start — from session 5'}
          </div>
          <div className="rb-q-dark">
            "Làm sao để duy trì thói quen thiền mỗi ngày khi bận việc?" — Thảo Nguyên
          </div>
        </div>
      </div>

      {/* ACTION NEEDED TODAY */}
      <div
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--r)',
          padding: '14px 18px',
          marginBottom: '18px',
          boxShadow: 'var(--sh)',
        }}
      >
        <div
          style={{
            fontSize: '11px',
            fontWeight: 700,
            color: 'var(--muted)',
            textTransform: 'uppercase',
            letterSpacing: '.6px',
            marginBottom: '10px',
          }}
        >
          {lang === 'vi' ? 'Cần xử lý hôm nay' : 'Action needed today'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* Q&A */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '9px 12px',
              background: 'var(--gold-l)',
              borderRadius: 'var(--rs)',
              cursor: 'pointer',
            }}
            onClick={() => goPage('qa')}
          >
            <div
              style={{
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                background: 'var(--gold-d)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: 700,
                color: '#fff',
                flexShrink: 0,
              }}
            >
              3
            </div>
            <div style={{ flex: 1, fontSize: '13.5px', fontWeight: 600, color: 'var(--ink)' }}>
              {lang === 'vi' ? 'Câu hỏi học viên chờ trả lời' : 'Student questions waiting'}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--gold-d)', fontWeight: 600 }}>
              {lang === 'vi' ? 'Trả lời →' : 'Answer →'}
            </div>
          </div>

          {/* Submissions */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '9px 12px',
              background: '#F0EEE8',
              borderRadius: 'var(--rs)',
              cursor: 'pointer',
            }}
            onClick={() => goPage('students')}
          >
            <div
              style={{
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                background: '#888',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: 700,
                color: '#fff',
                flexShrink: 0,
              }}
            >
              3
            </div>
            <div style={{ flex: 1, fontSize: '13.5px', fontWeight: 600, color: 'var(--ink)' }}>
              {lang === 'vi'
                ? 'Bài tập mới nộp — Thiền Định Nâng Cao'
                : 'New submissions — Advanced Meditation'}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 600 }}>
              {lang === 'vi' ? 'Xem →' : 'View →'}
            </div>
          </div>

          {/* Feedback */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '9px 12px',
              background: '#F0EEE8',
              borderRadius: 'var(--rs)',
              cursor: 'pointer',
            }}
            onClick={() => goPage('feedback')}
          >
            <div
              style={{
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                background: '#888',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: 700,
                color: '#fff',
                flexShrink: 0,
              }}
            >
              12
            </div>
            <div style={{ flex: 1, fontSize: '13.5px', fontWeight: 600, color: 'var(--ink)' }}>
              {lang === 'vi' ? 'Feedback mới từ buổi 5 & 6' : 'New feedback from sessions 5 & 6'}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 600 }}>
              {lang === 'vi' ? 'Xem →' : 'View →'}
            </div>
          </div>
        </div>
      </div>

      {/* TỔNG QUAN 3 KHOÁ HỌC */}
      <div
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: '16px',
          fontWeight: 700,
          color: 'var(--ink)',
          marginBottom: '12px',
        }}
      >
        {lang === 'vi' ? 'Tổng quan 3 khoá học' : '3 Courses Overview'}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>

        {/* Mindfulness */}
        <div
          className="card"
          style={{ cursor: 'pointer', padding: '14px 18px' }}
          onClick={() => selectCourse('mind')}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '5px',
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--ink)' }}>
                  Mindfulness Cơ Bản
                </div>
                <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                  Online · {lang === 'vi' ? 'Buổi' : 'Session'}{' '}
                  <strong style={{ color: 'var(--ink)' }}>6</strong>/10
                </div>
              </div>
              <div
                style={{
                  height: '6px',
                  background: '#E4DDD5',
                  borderRadius: '3px',
                  overflow: 'hidden',
                  marginBottom: '6px',
                }}
              >
                <div
                  style={{ width: '60%', height: '100%', background: 'var(--gold-d)', borderRadius: '3px' }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--muted)' }}>
                <span>
                  20 {lang === 'vi' ? 'học viên' : 'students'} &nbsp;·&nbsp;{' '}
                  {lang === 'vi' ? 'TB hoàn thành' : 'Avg done'}{' '}
                  <strong style={{ color: 'var(--gold-d)' }}>62%</strong>
                </span>
                <span style={{ color: 'var(--gold-d)', fontWeight: 600 }}>
                  {lang === 'vi' ? 'Mở →' : 'Open →'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Thiền Định */}
        <div
          className="card"
          style={{ cursor: 'pointer', padding: '14px 18px' }}
          onClick={() => selectCourse('thien')}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#888', flexShrink: 0 }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '5px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--ink)' }}>
                    {lang === 'vi' ? 'Thiền Định Nâng Cao' : 'Advanced Meditation'}
                  </div>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '2px 7px',
                      borderRadius: '10px',
                      background: 'var(--gold-l)',
                      color: 'var(--gold-d)',
                    }}
                  >
                    {lang === 'vi' ? '3 nộp mới' : '3 new'}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                  Offline · {lang === 'vi' ? 'Buổi' : 'Session'}{' '}
                  <strong style={{ color: 'var(--ink)' }}>4</strong>/10
                </div>
              </div>
              <div
                style={{
                  height: '6px',
                  background: '#E4DDD5',
                  borderRadius: '3px',
                  overflow: 'hidden',
                  marginBottom: '6px',
                }}
              >
                <div
                  style={{ width: '40%', height: '100%', background: '#888', borderRadius: '3px' }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--muted)' }}>
                <span>
                  34 {lang === 'vi' ? 'học viên' : 'students'} &nbsp;·&nbsp;{' '}
                  {lang === 'vi' ? 'TB hoàn thành' : 'Avg done'}{' '}
                  <strong style={{ color: 'var(--ink)' }}>48%</strong>
                </span>
                <span style={{ color: 'var(--gold-d)', fontWeight: 600 }}>
                  {lang === 'vi' ? 'Mở →' : 'Open →'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* NLP */}
        <div
          className="card"
          style={{ cursor: 'pointer', padding: '14px 18px' }}
          onClick={() => selectCourse('nlp')}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#888', flexShrink: 0 }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '5px',
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--ink)' }}>
                  NLP Ứng Dụng
                </div>
                <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                  Online · {lang === 'vi' ? 'Buổi' : 'Session'}{' '}
                  <strong style={{ color: 'var(--ink)' }}>8</strong>/10
                </div>
              </div>
              <div
                style={{
                  height: '6px',
                  background: '#E4DDD5',
                  borderRadius: '3px',
                  overflow: 'hidden',
                  marginBottom: '6px',
                }}
              >
                <div
                  style={{ width: '80%', height: '100%', background: 'var(--gold-d)', borderRadius: '3px' }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--muted)' }}>
                <span>
                  56 {lang === 'vi' ? 'học viên' : 'students'} &nbsp;·&nbsp;{' '}
                  {lang === 'vi' ? 'TB hoàn thành' : 'Avg done'}{' '}
                  <strong style={{ color: 'var(--gold-d)' }}>74%</strong>
                </span>
                <span style={{ color: 'var(--gold-d)', fontWeight: 600 }}>
                  {lang === 'vi' ? 'Mở →' : 'Open →'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BUỔI HỌC SẮP TỚI */}
      <div
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: '16px',
          fontWeight: 700,
          color: 'var(--ink)',
          marginBottom: '12px',
        }}
      >
        {lang === 'vi' ? 'Buổi học sắp tới' : 'Upcoming Sessions'}
      </div>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {/* NLP · Buổi 9 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '13px 18px',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <div style={{ textAlign: 'center', minWidth: '38px', flexShrink: 0 }}>
            <div style={{ fontSize: '10px', color: 'var(--muted)', fontWeight: 600 }}>
              {lang === 'vi' ? 'T4' : 'Wed'}
            </div>
            <div
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '20px',
                fontWeight: 700,
                color: 'var(--ink)',
              }}
            >
              9
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: '13.5px' }}>NLP Ứng Dụng · Buổi 9</div>
            <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>
              19:30–21:00 · Online · 56 {lang === 'vi' ? 'học viên' : 'students'}
            </div>
          </div>
          <a
            href="https://zoom.us/j/987654321"
            target="_blank"
            rel="noreferrer"
            style={{
              padding: '5px 12px',
              background: 'var(--gold)',
              color: 'var(--dark)',
              borderRadius: 'var(--rs)',
              fontSize: '12px',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            &#9654; Zoom
          </a>
        </div>

        {/* Thiền Định · Buổi 5 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '13px 18px',
          }}
        >
          <div style={{ textAlign: 'center', minWidth: '38px', flexShrink: 0 }}>
            <div style={{ fontSize: '10px', color: 'var(--muted)', fontWeight: 600 }}>
              {lang === 'vi' ? 'T7' : 'Sat'}
            </div>
            <div
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '20px',
                fontWeight: 700,
                color: 'var(--ink)',
              }}
            >
              12
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: '13.5px' }}>
              {lang === 'vi'
                ? 'Thiền Định Nâng Cao · Buổi 5'
                : 'Advanced Meditation · Session 5'}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>
              8:00–9:30 · Offline · 34 {lang === 'vi' ? 'học viên' : 'students'}
            </div>
          </div>
          <span
            style={{
              padding: '5px 12px',
              background: '#EDEAE4',
              color: 'var(--muted)',
              borderRadius: 'var(--rs)',
              fontSize: '12px',
              fontWeight: 600,
            }}
          >
            Offline
          </span>
        </div>
      </div>
    </div>
  );
}
