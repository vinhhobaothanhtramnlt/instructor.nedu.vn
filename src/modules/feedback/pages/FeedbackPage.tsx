import { useState } from 'react';
import { useAppState } from '../../../shared/hooks/useAppState';

const FB_ITEMS = [
  { id:1, cKey:'mind', sKey:'1', course:'Mindfulness', session:'Buổi 1', stars:5, text:'"Buổi học rất hay, cảm thấy được kết nối và hiểu rõ hơn về mindfulness."', from:'Thảo Nguyên' },
  { id:2, cKey:'mind', sKey:'1', course:'Mindfulness', session:'Buổi 1', stars:4, text:'"Nội dung tốt nhưng hơi nhanh ở phần cuối."', from:'anon' },
  { id:3, cKey:'mind', sKey:'2', course:'Mindfulness', session:'Buổi 2', stars:5, text:'"Buổi 2 sâu hơn buổi trước rất nhiều."', from:'Lan Phương' },
  { id:4, cKey:'thien', sKey:'3', course:'Thiền Định', session:'Buổi 3', stars:4, text:'"Buổi Metta rất ý nghĩa, mong được thực hành nhiều hơn."', from:'Bảo Trân' },
  { id:5, cKey:'nlp', sKey:'4', course:'NLP', session:'Buổi 4', stars:5, text:'"Kỹ thuật anchoring thực sự hữu ích trong công việc hàng ngày."', from:'Anh Thư' },
  { id:6, cKey:'mind', sKey:'3', course:'Mindfulness', session:'Buổi 3', stars:5, text:'"Cảm ơn chị NhiLe, buổi học rất truyền cảm hứng!"', from:'Minh Hòa' },
  { id:7, cKey:'thien', sKey:'4', course:'Thiền Định', session:'Buổi 4', stars:3, text:'"Hơi ngắn, mong buổi sau dài hơn một chút."', from:'anon' },
  { id:8, cKey:'nlp', sKey:'5', course:'NLP', session:'Buổi 5', stars:5, text:'"NLP thay đổi cách tôi giao tiếp hoàn toàn."', from:'Kim Hân' },
];

function Stars({ n }: { n: number }) {
  return <span style={{ color:'#C08000' }}>{'★'.repeat(n)}{'☆'.repeat(5 - n)}</span>;
}

export default function FeedbackPage() {
  const { lang } = useAppState();
  const [courseF, setCourseF] = useState('all');
  const [sessF, setSessF] = useState('all');

  const filtered = FB_ITEMS.filter(i => {
    const cm = courseF === 'all' || i.cKey === courseF;
    const sm = sessF === 'all' || i.sKey === sessF;
    return cm && sm;
  });

  const avg = filtered.length ? (filtered.reduce((s, i) => s + i.stars, 0) / filtered.length).toFixed(1) : '—';

  return (
    <div>
      <div className="ph">
        <div className="ph-title">Feedback</div>
        <div className="ph-sub">{lang === 'vi' ? 'Phản hồi sau từng buổi học' : 'Feedback after each session'}</div>
      </div>

      {/* Filters */}
      <div className="filter-row">
        <div className="filter-group">
          <span className="filter-lbl">{lang === 'vi' ? 'Khoá:' : 'Course:'}</span>
          <select className="f-select" value={courseF} onChange={e => setCourseF(e.target.value)}>
            <option value="all">{lang === 'vi' ? 'Tất cả' : 'All'}</option>
            <option value="mind">Mindfulness</option>
            <option value="thien">{lang === 'vi' ? 'Thiền Định' : 'Meditation'}</option>
            <option value="nlp">NLP</option>
          </select>
        </div>
        <div className="filter-group">
          <span className="filter-lbl">{lang === 'vi' ? 'Buổi:' : 'Session:'}</span>
          <select className="f-select" value={sessF} onChange={e => setSessF(e.target.value)}>
            <option value="all">{lang === 'vi' ? 'Tất cả buổi' : 'All sessions'}</option>
            {['1','2','3','4','5'].map(n => (
              <option key={n} value={n}>{lang === 'vi' ? `Buổi ${n}` : `Session ${n}`}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stat cards */}
      <div className="g3" style={{ marginBottom:18 }}>
        <div className="card" style={{ textAlign:'center' }}>
          <div style={{ fontSize:10,color:'var(--muted)',fontWeight:700,textTransform:'uppercase',marginBottom:6 }}>
            {lang === 'vi' ? 'Trung bình' : 'Average'}
          </div>
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:42,fontWeight:700,color:'var(--ink)' }}>{avg}</div>
          <div style={{ color:'#C08000',fontSize:16 }}>★★★★★</div>
        </div>
        <div className="card" style={{ textAlign:'center' }}>
          <div style={{ fontSize:10,color:'var(--muted)',fontWeight:700,textTransform:'uppercase',marginBottom:6 }}>
            {lang === 'vi' ? 'Tổng phản hồi' : 'Total responses'}
          </div>
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:42,fontWeight:700,color:'var(--ink)' }}>89</div>
          <div style={{ fontSize:12,color:'var(--muted)' }}>/ 110 {lang === 'vi' ? 'học viên' : 'students'}</div>
        </div>
        <div className="card" style={{ textAlign:'center' }}>
          <div style={{ fontSize:10,color:'var(--muted)',fontWeight:700,textTransform:'uppercase',marginBottom:6 }}>
            {lang === 'vi' ? 'Tỉ lệ' : 'Response rate'}
          </div>
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:42,fontWeight:700,color:'var(--ink)' }}>81%</div>
        </div>
      </div>

      {filtered.map(fb => (
        <div key={fb.id} className="fb-item">
          <div style={{ fontSize:11,color:'var(--muted)',marginBottom:5,fontWeight:600 }}>
            {fb.course} · {fb.session}
          </div>
          <div className="fb-stars"><Stars n={fb.stars} /></div>
          <div className="fb-text">{fb.text}</div>
          <div className="fb-from">{fb.from === 'anon' ? (lang === 'vi' ? 'Ẩn danh' : 'Anonymous') : fb.from}</div>
        </div>
      ))}
    </div>
  );
}
