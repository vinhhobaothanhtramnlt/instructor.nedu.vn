import { useAppState } from '../../../shared/hooks/useAppState';

const QUARTERS = [
  { label:'Q1 24', val:4.1, pct:82,  current:false },
  { label:'Q2 24', val:4.3, pct:86,  current:false },
  { label:'Q3 24', val:4.4, pct:88,  current:false },
  { label:'Q4 24', val:4.5, pct:90,  current:false },
  { label:'Q1 25', val:4.4, pct:88,  current:true  },
];

const COURSE_STATS = [
  { label:'Mindfulness Cơ Bản', labelEn:'Basic Mindfulness', color:'var(--gold)',   count:20,  pct:36  },
  { label:'Thiền Định Nâng Cao', labelEn:'Advanced Meditation',color:'#888',        count:34,  pct:61  },
  { label:'NLP Ứng Dụng',        labelEn:'Applied NLP',        color:'var(--gold-d)',count:56, pct:100 },
];

export default function StatsPage() {
  const { lang } = useAppState();

  return (
    <div>
      <div className="ph">
        <div className="ph-title">{lang === 'vi' ? 'Thống kê của tôi' : 'My Statistics'}</div>
        <div className="ph-sub">{lang === 'vi' ? 'Tổng hợp sự phát triển qua thời gian' : 'Track your growth over time'}</div>
      </div>

      {/* Big 3 */}
      <div className="g3" style={{ marginBottom:20 }}>
        <div className="card" style={{ textAlign:'center' }}>
          <div style={{ fontSize:10,color:'var(--muted)',fontWeight:700,textTransform:'uppercase',marginBottom:6 }}>
            {lang === 'vi' ? 'Buổi đã dạy' : 'Sessions taught'}
          </div>
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:44,fontWeight:700,color:'var(--ink)',lineHeight:1 }}>48</div>
          <div style={{ fontSize:12,color:'var(--muted)',marginTop:4 }}>{lang === 'vi' ? 'từ 2024' : 'since 2024'}</div>
          <div style={{ marginTop:6,fontSize:12,fontWeight:600,color:'#4A7A4A',background:'#E8F0E8',padding:'3px 9px',borderRadius:20,display:'inline-block' }}>
            +8 {lang === 'vi' ? 'kỳ này' : 'this term'}
          </div>
        </div>
        <div className="card" style={{ textAlign:'center' }}>
          <div style={{ fontSize:10,color:'var(--muted)',fontWeight:700,textTransform:'uppercase',marginBottom:6 }}>
            {lang === 'vi' ? 'Học viên đã dạy' : 'Students taught'}
          </div>
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:44,fontWeight:700,color:'var(--ink)',lineHeight:1 }}>284</div>
          <div style={{ fontSize:12,color:'var(--muted)',marginTop:4 }}>{lang === 'vi' ? '6 khoá hoàn thành' : '6 courses completed'}</div>
          <div style={{ marginTop:6,fontSize:12,fontWeight:600,color:'#4A7A4A',background:'#E8F0E8',padding:'3px 9px',borderRadius:20,display:'inline-block' }}>
            +110 {lang === 'vi' ? 'kỳ này' : 'this term'}
          </div>
        </div>
        <div className="card" style={{ textAlign:'center' }}>
          <div style={{ fontSize:10,color:'var(--muted)',fontWeight:700,textTransform:'uppercase',marginBottom:6 }}>
            {lang === 'vi' ? 'Điểm feedback TB' : 'Avg feedback'}
          </div>
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:44,fontWeight:700,color:'var(--gold-d)',lineHeight:1 }}>4.4</div>
          <div style={{ fontSize:14,color:'#C08000',marginTop:4 }}>★★★★★</div>
          <div style={{ marginTop:6,fontSize:12,fontWeight:600,color:'#4A7A4A',background:'#E8F0E8',padding:'3px 9px',borderRadius:20,display:'inline-block' }}>
            +0.1 {lang === 'vi' ? 'so với kỳ trước' : 'vs last term'}
          </div>
        </div>
      </div>

      {/* Feedback trend */}
      <div className="card" style={{ marginBottom:16 }}>
        <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:16,fontWeight:700,color:'var(--ink)',marginBottom:16 }}>
          {lang === 'vi' ? 'Điểm feedback theo kỳ' : 'Feedback by term'}
        </div>
        <div style={{ display:'flex',flexDirection:'column',gap:10 }}>
          {QUARTERS.map(q => (
            <div key={q.label} style={{ display:'flex',alignItems:'center',gap:12 }}>
              <div style={{ fontSize:12,color: q.current ? 'var(--gold-d)' : 'var(--muted)',fontWeight: q.current ? 700 : 400,width:42,flexShrink:0,textAlign:'right' }}>
                {q.label}
              </div>
              <div style={{ flex:1,height:10,background:'#E4DDD5',borderRadius:5,overflow:'hidden' }}>
                <div style={{ width:`${q.pct}%`,height:'100%',borderRadius:5,
                  background: q.current ? 'var(--gold)' : q.val >= 4.4 ? 'var(--gold-d)' : q.val >= 4.2 ? 'var(--gold-m)' : 'var(--border)' }} />
              </div>
              <div style={{ fontSize:13,fontWeight:700,color: q.current ? 'var(--gold-d)' : 'var(--ink2)',width:28 }}>
                {q.val}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Students by course */}
      <div className="card">
        <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:16,fontWeight:700,color:'var(--ink)',marginBottom:14 }}>
          {lang === 'vi' ? 'Học viên hiện tại theo khoá' : 'Current students by course'}
        </div>
        <div style={{ display:'flex',flexDirection:'column',gap:11 }}>
          {COURSE_STATS.map(c => (
            <div key={c.label} style={{ display:'flex',alignItems:'center',gap:12 }}>
              <div style={{ width:8,height:8,borderRadius:'50%',background:c.color,flexShrink:0 }} />
              <div style={{ flex:1,fontSize:13.5,fontWeight:600 }}>
                {lang === 'vi' ? c.label : c.labelEn}
              </div>
              <div style={{ fontSize:12,color:'var(--muted)',marginRight:8 }}>
                {c.count} {lang === 'vi' ? 'học viên' : 'students'}
              </div>
              <div style={{ width:120,height:8,background:'#E4DDD5',borderRadius:4,overflow:'hidden' }}>
                <div style={{ width:`${c.pct}%`,height:'100%',background:c.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
