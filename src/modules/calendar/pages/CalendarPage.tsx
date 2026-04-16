import { useState } from 'react';
import { useAppState } from '../../../shared/hooks/useAppState';

const CAL_SESSIONS = [
  { date:'2026-04-07', label:'Mindfulness · Buổi 6',   time:'9:00',  end:'10:30', students:20, online:true,  zoom:'https://zoom.us/j/123456789' },
  { date:'2026-04-09', label:'NLP Ứng Dụng · Buổi 9',  time:'19:30', end:'21:00', students:56, online:true,  zoom:'https://zoom.us/j/987654321' },
  { date:'2026-04-12', label:'Thiền Định · Buổi 5',    time:'8:00',  end:'9:30',  students:34, online:false, zoom:'' },
  { date:'2026-04-14', label:'Mindfulness · Buổi 7',   time:'9:00',  end:'10:30', students:20, online:true,  zoom:'https://zoom.us/j/123456789' },
  { date:'2026-04-16', label:'NLP Ứng Dụng · Buổi 10', time:'19:30', end:'21:00', students:56, online:true,  zoom:'https://zoom.us/j/987654321' },
  { date:'2026-04-19', label:'Thiền Định · Buổi 6',    time:'8:00',  end:'9:30',  students:34, online:false, zoom:'' },
  { date:'2026-04-21', label:'Mindfulness · Buổi 8',   time:'9:00',  end:'10:30', students:20, online:true,  zoom:'https://zoom.us/j/123456789' },
];

const VI_DAYS = ['CN','T2','T3','T4','T5','T6','T7'];
const EN_DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

export default function CalendarPage() {
  const { lang, showToast } = useAppState();
  const [view, setView] = useState<'week'|'month'>('week');
  const [weekOff, setWeekOff] = useState(0);
  const [monthOff, setMonthOff] = useState(0);

  // Base week: Apr 7–13 2026
  const BASE = new Date(2026, 3, 7);
  const weekStart = new Date(BASE.getTime() + weekOff * 7 * 86400000);
  const weekEnd   = new Date(weekStart.getTime() + 6 * 86400000);
  const weekLabel = `${weekStart.getDate()}–${weekEnd.getDate()}/${weekEnd.getMonth()+1}/${weekEnd.getFullYear()}`;

  const mo = 3 + monthOff, yr = 2026;
  const monthLabel = `${lang === 'vi' ? 'Tháng' : 'Month'} ${mo+1}/${yr}`;

  // Sessions visible in current week
  const weekSessions = CAL_SESSIONS.filter(s => {
    const d = new Date(s.date);
    return d >= weekStart && d <= weekEnd;
  });

  // Month grid
  function renderMonthGrid() {
    const first = new Date(yr, mo, 1);
    const days  = new Date(yr, mo + 1, 0).getDate();
    const off   = (first.getDay() + 6) % 7; // Mon=0
    const cells = [];
    for (let i = 0; i < off; i++) cells.push(<div key={'e'+i} />);
    for (let d = 1; d <= days; d++) {
      const ds = `${yr}-${String(mo+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      const sess = CAL_SESSIONS.find(s => s.date === ds);
      const isToday = ds === '2026-04-16';
      cells.push(
        <div
          key={d}
          style={{
            padding:'6px 4px', minHeight:44, textAlign:'center', borderRadius:'var(--rs)',
            background: sess ? 'var(--gold-l)' : isToday ? 'var(--bg)' : 'transparent',
            border: `1px solid ${isToday ? 'var(--gold)' : 'transparent'}`,
            cursor: sess ? 'pointer' : 'default',
          }}
          onClick={() => sess && showToast(sess.label)}
        >
          <div style={{ fontSize:13, fontWeight: isToday ? 700 : sess ? 600 : 400, color: isToday ? 'var(--gold-d)' : sess ? 'var(--ink)' : 'var(--muted)' }}>{d}</div>
          {sess && <div style={{ width:6,height:6,borderRadius:'50%',background:'var(--gold-d)',margin:'3px auto 0' }} />}
        </div>
      );
    }
    return cells;
  }

  const dayNames = lang === 'vi' ? VI_DAYS : EN_DAYS;
  // Mon-Sun order: T2..CN
  const weekDayOrder = [1,2,3,4,5,6,0];

  return (
    <div>
      <div className="ph">
        <div className="ph-title">{lang === 'vi' ? 'Lịch giảng dạy' : 'Teaching Calendar'}</div>
      </div>

      {/* View toggle + nav */}
      <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16 }}>
        <div style={{ display:'flex',gap:4,background:'var(--bg)',border:'1px solid var(--border)',borderRadius:20,padding:3 }}>
          {(['week','month'] as const).map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              style={{ padding:'6px 16px',borderRadius:16,border:'none',fontFamily:"'Barlow',sans-serif",fontSize:13,fontWeight:600,cursor:'pointer',
                background: view === v ? 'var(--gold)' : 'transparent',
                color: view === v ? 'var(--dark)' : 'var(--muted)',
                transition:'all .15s' }}
            >
              {v === 'week' ? (lang === 'vi' ? 'Tuần' : 'Week') : (lang === 'vi' ? 'Tháng' : 'Month')}
            </button>
          ))}
        </div>
        <div style={{ display:'flex',gap:6 }}>
          <button className="btn btn-o btn-sm" onClick={() => view === 'week' ? setWeekOff(w => w-1) : setMonthOff(m => m-1)}>←</button>
          <div style={{ padding:'6px 12px',fontSize:13,fontWeight:600,color:'var(--ink)' }}>
            {view === 'week' ? weekLabel : monthLabel}
          </div>
          <button className="btn btn-o btn-sm" onClick={() => view === 'week' ? setWeekOff(w => w+1) : setMonthOff(m => m+1)}>→</button>
        </div>
      </div>

      {/* WEEK VIEW */}
      {view === 'week' && (
        <div className="card" style={{ marginBottom:14 }}>
          {/* Day headers */}
          <div style={{ display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:4,textAlign:'center',marginBottom:10,paddingBottom:10,borderBottom:'1px solid var(--border)' }}>
            {weekDayOrder.map((wd, idx) => {
              const d = new Date(weekStart.getTime() + idx * 86400000);
              return (
                <div key={wd}>
                  <div style={{ fontSize:10.5,fontWeight:700,color:'var(--muted)' }}>{dayNames[wd]}</div>
                  <div style={{ fontSize:16,fontWeight:700,color:'var(--gold-d)',marginTop:2 }}>{d.getDate()}</div>
                </div>
              );
            })}
          </div>
          {/* Session blocks */}
          <div style={{ display:'flex',flexDirection:'column',gap:9 }}>
            {weekSessions.length === 0 ? (
              <div style={{ textAlign:'center',padding:24,color:'var(--muted)',fontSize:13 }}>
                {lang === 'vi' ? 'Không có buổi học trong tuần này' : 'No sessions this week'}
              </div>
            ) : weekSessions.map(s => {
              const d = new Date(s.date);
              const dayVi = ['CN','T2','T3','T4','T5','T6','T7'][d.getDay()];
              const dayEn = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d.getDay()];
              const dayLbl = lang === 'vi' ? `${dayVi} · ${d.getDate()}/${d.getMonth()+1}` : `${dayEn} ${d.getDate()}/${d.getMonth()+1}`;
              const isToday = s.date === '2026-04-16';
              return (
                <div key={s.date+s.time} style={{
                  display:'flex',alignItems:'center',gap:12,padding:'12px 14px',borderRadius:'var(--rs)',
                  background: isToday ? 'var(--gold-l)' : 'var(--bg)',
                  borderLeft: `4px solid ${isToday ? 'var(--gold)' : 'var(--border)'}`,
                }}>
                  <div style={{ flexShrink:0,textAlign:'center',minWidth:50 }}>
                    <div style={{ fontSize:10,color:'var(--muted)' }}>{dayLbl}</div>
                    <div style={{ fontSize:13,fontWeight:700,color:'var(--ink)' }}>{s.time}</div>
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:14,fontWeight:600,color:'var(--ink)' }}>{s.label}</div>
                    <div style={{ fontSize:12,color:'var(--muted)',marginTop:2 }}>
                      {s.time}–{s.end} · {s.online ? 'Online' : 'Offline'} · {s.students} {lang === 'vi' ? 'học viên' : 'students'}
                    </div>
                  </div>
                  {s.online ? (
                    <a href={s.zoom} target="_blank" rel="noreferrer"
                      style={{ padding:'6px 13px',background:'var(--gold)',color:'var(--dark)',borderRadius:'var(--rs)',fontSize:12.5,fontWeight:700,textDecoration:'none',flexShrink:0 }}>
                      ▶ Zoom
                    </a>
                  ) : (
                    <span style={{ padding:'6px 13px',background:'#EDEAE4',color:'var(--muted)',borderRadius:'var(--rs)',fontSize:12.5,fontWeight:600,flexShrink:0 }}>
                      📍 Offline
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MONTH VIEW */}
      {view === 'month' && (
        <div className="card">
          <div style={{ display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:2,textAlign:'center',marginBottom:8 }}>
            {(lang === 'vi' ? ['T2','T3','T4','T5','T6','T7','CN'] : ['Mo','Tu','We','Th','Fr','Sa','Su']).map(d => (
              <div key={d} style={{ fontSize:11,fontWeight:700,color:'var(--muted)',padding:4 }}>{d}</div>
            ))}
          </div>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:4 }}>
            {renderMonthGrid()}
          </div>
        </div>
      )}
    </div>
  );
}
