import { useState } from 'react';
import { useAppState } from '../../../shared/hooks/useAppState';
import { COURSES } from '../../../shared/types';

type SessionId = 'sf1' | 'sf6' | null;
type TabKey = 'details' | 'materials' | 'students' | 'qa' | 'feedback';

const STUDENTS_SF1 = [
  { name: 'Thảo Nguyên', code: 'MN-001', pct: 70 },
  { name: 'Kim Hân', code: 'MN-002', pct: 85 },
  { name: 'Minh Hòa', code: 'MN-003', pct: 60 },
  { name: 'Lan Anh', code: 'MN-004', pct: 55 },
  { name: 'Bảo Thy', code: 'MN-005', pct: 90 },
];

const STUDENTS_SF6 = [
  { name: 'Thảo Nguyên', code: 'MN-001', pct: 68 },
  { name: 'Kim Hân', code: 'MN-002', pct: 80 },
  { name: 'Minh Hòa', code: 'MN-003', pct: 55 },
  { name: 'Lan Anh', code: 'MN-004', pct: 50 },
  { name: 'Bảo Thy', code: 'MN-005', pct: 88 },
];

function StudentRow({ name, code, pct }: { name: string; code: string; pct: number }) {
  const color = pct >= 70 ? 'var(--gold-d)' : pct >= 50 ? 'var(--ink)' : '#C04040';
  return (
    <div className="stu">
      <div className="stu-av">{name.charAt(0)}</div>
      <div className="stu-info">
        <div className="stu-name">{name}</div>
        <div className="stu-code">{code}</div>
      </div>
      <div className="stu-prog">
        <div className="stu-pct-num" style={{ color }}>{pct}%</div>
        <div className="pt">
          <div className="pf" style={{ width: `${pct}%`, background: color }} />
        </div>
      </div>
    </div>
  );
}

interface SessionAccordionProps {
  id: SessionId;
  openId: SessionId;
  onToggle: (id: SessionId) => void;
  lang: 'vi' | 'en';
}

function Session1({ openId, onToggle, lang }: SessionAccordionProps) {
  const isOpen = openId === 'sf1';
  const [activeTab, setActiveTab] = useState<TabKey>('details');

  return (
    <div className={`sf${isOpen ? ' open' : ''}`}>
      <div className="sf-hd" onClick={() => onToggle('sf1')}>
        <div className="sf-num" style={{ background: '#4A7050' }}>1</div>
        <div className="sf-info">
          <div className="sf-title">
            {lang === 'vi' ? 'Buổi 1 — Giới thiệu Mindfulness' : 'Session 1 — Intro to Mindfulness'}
          </div>
          <div className="sf-meta">T2 14/4 · 9:00–10:30 · Online</div>
        </div>
        <span className="tag t-done" style={{ marginRight: '6px', fontSize: '11px' }}>
          {lang === 'vi' ? 'Đã kết thúc' : 'Done'}
        </span>
        <span className="sf-ch">▶</span>
      </div>

      {isOpen && (
        <div className="sf-body">
          {/* Tabs */}
          <div className="tabs">
            {(['details', 'materials', 'students', 'qa', 'feedback'] as TabKey[]).map((tab) => {
              const labels: Record<TabKey, Record<'vi' | 'en', string>> = {
                details: { vi: 'Chi tiết', en: 'Details' },
                materials: { vi: 'Bài giảng', en: 'Materials' },
                students: { vi: 'Học viên', en: 'Students' },
                qa: { vi: 'Câu hỏi', en: 'Q&A' },
                feedback: { vi: 'Feedback', en: 'Feedback' },
              };
              return (
                <div
                  key={tab}
                  className={`tab${activeTab === tab ? ' on' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {labels[tab][lang]}
                </div>
              );
            })}
          </div>

          {/* Chi tiết */}
          {activeTab === 'details' && (
            <div className="tabp on">
              <div className="g2" style={{ marginBottom: '14px' }}>
                <div>
                  <div className="fl">{lang === 'vi' ? 'Ngày' : 'Date'}</div>
                  <div
                    style={{
                      padding: '9px 12px',
                      background: 'var(--bg)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--rs)',
                      fontSize: '14px',
                      color: 'var(--ink)',
                    }}
                  >
                    {lang === 'vi' ? 'Thứ Hai, 14/4/2026' : 'Monday, 14/4/2026'}
                  </div>
                </div>
                <div>
                  <div className="fl">{lang === 'vi' ? 'Giờ học' : 'Time'}</div>
                  <div
                    style={{
                      padding: '9px 12px',
                      background: 'var(--bg)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--rs)',
                      fontSize: '14px',
                      color: 'var(--ink)',
                    }}
                  >
                    9:00 – 10:30
                  </div>
                </div>
              </div>
              <div style={{ marginBottom: '14px' }}>
                <div className="fl">{lang === 'vi' ? 'Chủ đề' : 'Topic'}</div>
                <div
                  style={{
                    padding: '9px 12px',
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--rs)',
                    fontSize: '14px',
                    color: 'var(--ink)',
                  }}
                >
                  {lang === 'vi'
                    ? 'Giới thiệu Mindfulness — Hơi thở và hiện tại'
                    : 'Intro to Mindfulness — Breath and presence'}
                </div>
              </div>
              <div className="zoom-dark">
                <div className="zd-label">
                  Zoom{' '}
                  <span className="view-only">
                    {lang === 'vi' ? 'Chỉ xem' : 'View only'}
                  </span>
                </div>
                <div className="zd-field">
                  <div className="zd-fl">ID {lang === 'vi' ? 'Phòng' : 'Room'} Zoom</div>
                  <div className="zd-val">123 456 789</div>
                </div>
                <div className="zd-field">
                  <div className="zd-fl">{lang === 'vi' ? 'Mật khẩu' : 'Password'}</div>
                  <div className="zd-val">mindful2026</div>
                </div>
                <div className="zd-field">
                  <div className="zd-fl">Link Zoom</div>
                  <div className="zd-val">
                    <a href="https://zoom.us/j/123456789" target="_blank" rel="noreferrer">
                      https://zoom.us/j/123456789
                    </a>
                  </div>
                </div>
                <a
                  className="zoom-btn-full"
                  href="https://zoom.us/j/123456789"
                  target="_blank"
                  rel="noreferrer"
                >
                  ▶ {lang === 'vi' ? 'Vào phòng Zoom' : 'Join Zoom Room'}
                </a>
              </div>
            </div>
          )}

          {/* Bài giảng */}
          {activeTab === 'materials' && (
            <div className="tabp on">
              <div className="mat">
                <div className="mat-ico">📄</div>
                <div style={{ flex: 1 }}>
                  <div className="mat-name">{lang === 'vi' ? 'Kịch bản buổi 1' : 'Session 1 Script'}</div>
                  <div className="mat-meta">DOCX · 2.1MB</div>
                </div>
                <span className="mat-tag">{lang === 'vi' ? 'Đã dùng' : 'Used'}</span>
              </div>
              <div className="mat">
                <div className="mat-ico">🖼</div>
                <div style={{ flex: 1 }}>
                  <div className="mat-name">{lang === 'vi' ? 'Slide tổng quan' : 'Overview Slides'}</div>
                  <div className="mat-meta">PPTX · 5.4MB</div>
                </div>
                <span className="mat-tag">{lang === 'vi' ? 'Đã dùng' : 'Used'}</span>
              </div>
            </div>
          )}

          {/* Học viên */}
          {activeTab === 'students' && (
            <div className="tabp on">
              <div
                style={{
                  fontSize: '12px',
                  color: 'var(--muted)',
                  marginBottom: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>20 {lang === 'vi' ? 'học viên · Điểm danh từ hệ thống' : 'students · Synced from system'}</span>
                <span
                  className="view-only"
                  style={{
                    color: 'var(--muted)',
                    border: '1px solid var(--border)',
                    padding: '2px 8px',
                    borderRadius: '20px',
                    fontSize: '11px',
                  }}
                >
                  {lang === 'vi' ? 'Chỉ xem' : 'View only'}
                </span>
              </div>
              {STUDENTS_SF1.map((s) => (
                <StudentRow key={s.code} {...s} />
              ))}
            </div>
          )}

          {/* Câu hỏi */}
          {activeTab === 'qa' && (
            <div className="tabp on">
              <div className="qa-card answered">
                <div className="qa-q">
                  "Mindfulness khác với relaxation như thế nào?"
                </div>
                <div className="qa-meta">
                  <span className="tag t-ans" style={{ fontSize: '11px' }}>
                    {lang === 'vi' ? 'Đã trả lời' : 'Answered'}
                  </span>
                  <span>Kim Hân</span>
                </div>
                <div
                  style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--rs)',
                    padding: '9px 12px',
                  }}
                >
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#4A7050', marginBottom: '3px' }}>
                    {lang === 'vi' ? 'Đã gửi lên Student Web' : 'Sent to Student Web'}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--ink2)' }}>
                    Mindfulness là sự chú ý có chủ đích đến hiện tại...
                  </div>
                </div>
              </div>
              <div className="qa-card pinned">
                <div className="qa-q">
                  "Sự khác nhau giữa thiền Metta và thiền Vipassana là gì?"
                </div>
                <div className="qa-meta">
                  <span className="tag t-pin" style={{ fontSize: '11px' }}>
                    {lang === 'vi' ? 'Trả lời đầu giờ buổi 2' : 'Answer at start of session 2'}
                  </span>
                  <span>Minh Hòa</span>
                </div>
                <div className="qa-actions" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '6px' }}>
                  <button className="btn btn-p btn-sm">
                    {lang === 'vi' ? 'Gửi lên Student Web' : 'Send to Student Web'}
                  </button>
                  <button className="btn btn-o btn-sm">
                    {lang === 'vi' ? '↩ Bỏ ghim' : '↩ Unpin'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Feedback */}
          {activeTab === 'feedback' && (
            <div className="tabp on">
              <div className="fb-summary">
                <div className="fb-score">4.3</div>
                <div>
                  <div style={{ fontSize: '17px', color: '#C08000' }}>★★★★★</div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                    18 {lang === 'vi' ? 'phản hồi' : 'responses'}
                  </div>
                </div>
              </div>
              <div className="fb-item">
                <div className="fb-stars">★★★★★</div>
                <div className="fb-text">
                  "Buổi học rất hay, cảm thấy được kết nối."
                </div>
                <div className="fb-from">Thảo Nguyên</div>
              </div>
              <div className="fb-item">
                <div className="fb-stars">★★★★</div>
                <div className="fb-text">"Nội dung tốt nhưng hơi nhanh."</div>
                <div className="fb-from">{lang === 'vi' ? 'Ẩn danh' : 'Anonymous'}</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Session6({ openId, onToggle, lang }: SessionAccordionProps) {
  const isOpen = openId === 'sf6';
  const [activeTab, setActiveTab] = useState<TabKey>('details');

  return (
    <div className={`sf${isOpen ? ' open' : ''}`}>
      <div className="sf-hd" onClick={() => onToggle('sf6')}>
        <div className="sf-num" style={{ background: 'var(--gold-d)' }}>6</div>
        <div className="sf-info">
          <div className="sf-title">
            {lang === 'vi'
              ? 'Buổi 6 — Quét cơ thể · Hôm nay'
              : 'Session 6 — Body Scan · Today'}
          </div>
          <div className="sf-meta">
            {lang === 'vi' ? 'Hôm nay' : 'Today'} · 9:00–10:30 · Online
          </div>
        </div>
        <span className="tag t-up" style={{ marginRight: '6px', fontSize: '11px' }}>
          {lang === 'vi' ? 'Sắp bắt đầu' : 'Soon'}
        </span>
        <span className="sf-ch">▶</span>
      </div>

      {isOpen && (
        <div className="sf-body">
          {/* Pinned Q banner */}
          <div className="rem-banner">
            <div className="rb-lbl">
              📌 {lang === 'vi'
                ? 'Trả lời đầu giờ hôm nay — từ buổi 5'
                : 'Answer at start today — from session 5'}
            </div>
            <div className="rb-q">
              "Làm sao để duy trì thói quen thiền mỗi ngày khi bận việc?" — Thảo Nguyên
            </div>
          </div>

          {/* Tabs — no Feedback tab for today's session */}
          <div className="tabs">
            {(['details', 'materials', 'students', 'qa'] as TabKey[]).map((tab) => {
              const labels: Record<TabKey, Record<'vi' | 'en', string>> = {
                details: { vi: 'Chi tiết', en: 'Details' },
                materials: { vi: 'Bài giảng', en: 'Materials' },
                students: { vi: 'Học viên', en: 'Students' },
                qa: { vi: 'Câu hỏi', en: 'Q&A' },
                feedback: { vi: 'Feedback', en: 'Feedback' },
              };
              return (
                <div
                  key={tab}
                  className={`tab${activeTab === tab ? ' on' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {labels[tab][lang]}
                </div>
              );
            })}
          </div>

          {/* Chi tiết */}
          {activeTab === 'details' && (
            <div className="tabp on">
              <div className="zoom-dark">
                <div className="zd-label">
                  Zoom{' '}
                  <span className="view-only">
                    {lang === 'vi' ? 'Chỉ xem' : 'View only'}
                  </span>
                </div>
                <div className="zd-field">
                  <div className="zd-fl">ID {lang === 'vi' ? 'Phòng' : 'Room'} Zoom</div>
                  <div className="zd-val">123 456 789</div>
                </div>
                <div className="zd-field">
                  <div className="zd-fl">{lang === 'vi' ? 'Mật khẩu' : 'Password'}</div>
                  <div className="zd-val">mindful2026</div>
                </div>
                <div className="zd-field">
                  <div className="zd-fl">Link Zoom</div>
                  <div className="zd-val">
                    <a href="https://zoom.us/j/123456789" target="_blank" rel="noreferrer">
                      https://zoom.us/j/123456789
                    </a>
                  </div>
                </div>
                <a
                  className="zoom-btn-full"
                  href="https://zoom.us/j/123456789"
                  target="_blank"
                  rel="noreferrer"
                >
                  ▶ {lang === 'vi' ? 'Vào phòng Zoom ngay' : 'Join Zoom Now'}
                </a>
              </div>
            </div>
          )}

          {/* Bài giảng */}
          {activeTab === 'materials' && (
            <div className="tabp on">
              <div className="mat">
                <div className="mat-ico">📄</div>
                <div style={{ flex: 1 }}>
                  <div className="mat-name">{lang === 'vi' ? 'Kịch bản buổi 6' : 'Session 6 Script'}</div>
                  <div className="mat-meta">DOCX · 1.6MB</div>
                </div>
                <span className="mat-tag" style={{ background: 'var(--gold-l)', color: 'var(--gold-d)' }}>
                  {lang === 'vi' ? 'Hôm nay' : 'Today'}
                </span>
              </div>
              <div className="mat">
                <div className="mat-ico">🎬</div>
                <div style={{ flex: 1 }}>
                  <div className="mat-name">
                    {lang === 'vi' ? 'Video Body Scan 20 phút' : 'Body Scan Video 20 min'}
                  </div>
                  <div className="mat-meta">MP4 · 210MB</div>
                </div>
                <span className="mat-tag" style={{ background: 'var(--gold-l)', color: 'var(--gold-d)' }}>
                  {lang === 'vi' ? 'Hôm nay' : 'Today'}
                </span>
              </div>
            </div>
          )}

          {/* Học viên */}
          {activeTab === 'students' && (
            <div className="tabp on">
              <div
                style={{
                  fontSize: '12px',
                  color: 'var(--muted)',
                  marginBottom: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>20 {lang === 'vi' ? 'học viên · Điểm danh từ hệ thống' : 'students · Synced from system'}</span>
              </div>
              {STUDENTS_SF6.map((s) => (
                <StudentRow key={s.code} {...s} />
              ))}
            </div>
          )}

          {/* Câu hỏi — empty */}
          {activeTab === 'qa' && (
            <div className="tabp on">
              <div style={{ textAlign: 'center', padding: '28px', color: 'var(--muted)' }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>◇</div>
                <div>
                  {lang === 'vi'
                    ? 'Chưa có câu hỏi — sẽ xuất hiện sau buổi học'
                    : 'No questions yet — will appear after the session'}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function CoursesPage() {
  const { lang, selectedCourse } = useAppState();
  const course = COURSES[selectedCourse];

  // Default: sf6 is open
  const [openSession, setOpenSession] = useState<SessionId>('sf6');

  function handleToggle(id: SessionId) {
    setOpenSession((prev) => (prev === id ? null : id));
  }

  const courseNameVi = course.vi;
  const courseNameEn = course.en;
  const courseName = lang === 'vi' ? courseNameVi : courseNameEn;
  const courseSub = lang === 'vi' ? course.sub_vi : course.sub_en;

  return (
    <div>
      {/* Page header */}
      <div className="ph">
        <div className="ph-title">{courseName}</div>
        <div className="ph-sub">{courseSub}</div>
      </div>

      {/* Stats row */}
      <div className="card" style={{ marginBottom: '14px' }}>
        <div className="g3">
          <div
            style={{
              textAlign: 'center',
              padding: '12px',
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--rs)',
            }}
          >
            <div
              style={{
                fontSize: '10px',
                color: 'var(--muted)',
                fontWeight: 700,
                textTransform: 'uppercase',
                marginBottom: '4px',
              }}
            >
              {lang === 'vi' ? 'Học viên' : 'Students'}
            </div>
            <div
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '28px',
                fontWeight: 700,
                color: 'var(--ink)',
              }}
            >
              {course.count}
            </div>
          </div>
          <div
            style={{
              textAlign: 'center',
              padding: '12px',
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--rs)',
            }}
          >
            <div
              style={{
                fontSize: '10px',
                color: 'var(--muted)',
                fontWeight: 700,
                textTransform: 'uppercase',
                marginBottom: '4px',
              }}
            >
              {lang === 'vi' ? 'Tiến độ' : 'Progress'}
            </div>
            <div
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '28px',
                fontWeight: 700,
                color: 'var(--ink)',
              }}
            >
              {course.prog}
            </div>
          </div>
          <div
            style={{
              textAlign: 'center',
              padding: '12px',
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--rs)',
            }}
          >
            <div
              style={{
                fontSize: '10px',
                color: 'var(--muted)',
                fontWeight: 700,
                textTransform: 'uppercase',
                marginBottom: '4px',
              }}
            >
              {lang === 'vi' ? 'Hoàn thành TB' : 'Avg Done'}
            </div>
            <div
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '28px',
                fontWeight: 700,
                color: 'var(--ink)',
              }}
            >
              {course.avg}
            </div>
          </div>
        </div>
      </div>

      {/* Session accordions */}
      <Session1
        id="sf1"
        openId={openSession}
        onToggle={handleToggle}
        lang={lang}
      />
      <Session6
        id="sf6"
        openId={openSession}
        onToggle={handleToggle}
        lang={lang}
      />

      {/* Add session button */}
      <button className="btn btn-o" style={{ width: '100%', marginTop: '4px' }}>
        {lang === 'vi' ? '+ Thêm buổi học' : '+ Add Session'}
      </button>
    </div>
  );
}
