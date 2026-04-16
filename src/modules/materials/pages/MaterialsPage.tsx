import { useState } from 'react';
import { useAppState } from '../../../shared/hooks/useAppState';

const MATERIALS = [
  { id:1, cKey:'mind', course:'Mindfulness Cơ Bản',   session:'Buổi 1', ico:'📄', name:'Kịch bản buổi 1 — Giới thiệu Mindfulness', type:'DOCX', size:'2.1MB', status:'used'    },
  { id:2, cKey:'mind', course:'Mindfulness Cơ Bản',   session:'Buổi 1', ico:'🖼',  name:'Slide tổng quan khoá',                     type:'PPTX', size:'5.4MB', status:'used'    },
  { id:3, cKey:'mind', course:'Mindfulness Cơ Bản',   session:'Buổi 6', ico:'📄', name:'Kịch bản buổi 6 — Body Scan',              type:'DOCX', size:'1.6MB', status:'active'  },
  { id:4, cKey:'mind', course:'Mindfulness Cơ Bản',   session:'Buổi 6', ico:'🎬', name:'Video Body Scan 20 phút',                   type:'MP4',  size:'210MB', status:'active'  },
  { id:5, cKey:'thien',course:'Thiền Định Nâng Cao',  session:'Buổi 4', ico:'📄', name:'Kịch bản buổi 4 — Thiền Metta',            type:'DOCX', size:'1.5MB', status:'used'    },
  { id:6, cKey:'thien',course:'Thiền Định Nâng Cao',  session:'Buổi 4', ico:'🎬', name:'Video Metta 30 phút',                       type:'MP4',  size:'180MB', status:'used'    },
  { id:7, cKey:'nlp',  course:'NLP Ứng Dụng',         session:'Buổi 8', ico:'🖼',  name:'Slide buổi 8 — Anchoring Technique',       type:'PPTX', size:'4.2MB', status:'active'  },
];

function statusTag(status: string, lang: 'vi'|'en') {
  if (status === 'active') return <span className="mat-tag" style={{ background:'var(--gold-l)',color:'var(--gold-d)' }}>{lang === 'vi' ? 'Đang dùng' : 'In use'}</span>;
  if (status === 'used')   return <span className="mat-tag">{lang === 'vi' ? 'Đã dùng' : 'Used'}</span>;
  return null;
}

export default function MaterialsPage() {
  const { lang, showToast } = useAppState();
  const [search, setSearch]   = useState('');
  const [courseF, setCourseF] = useState('all');

  const filtered = MATERIALS.filter(m => {
    const cm = courseF === 'all' || m.cKey === courseF;
    const sm = !search || m.name.toLowerCase().includes(search.toLowerCase()) || m.course.toLowerCase().includes(search.toLowerCase());
    return cm && sm;
  });

  // Group by course then session
  const groups: Record<string, { label: string; items: typeof MATERIALS }> = {};
  filtered.forEach(m => {
    if (!groups[m.cKey]) groups[m.cKey] = { label: m.course, items: [] };
    groups[m.cKey].items.push(m);
  });

  return (
    <div>
      <div className="ph">
        <div className="ph-title">{lang === 'vi' ? 'Bài giảng' : 'Materials'}</div>
        <div className="ph-sub">{lang === 'vi' ? 'Phân loại theo khoá và buổi học' : 'Grouped by course and session'}</div>
      </div>

      {/* Search + filter */}
      <div style={{ display:'flex',gap:10,marginBottom:16,flexWrap:'wrap',alignItems:'center' }}>
        <div className="search-wrap" style={{ marginBottom:0,flex:1,minWidth:180 }}>
          <span className="search-ic">🔍</span>
          <input
            type="text"
            placeholder={lang === 'vi' ? 'Tìm kiếm tài liệu...' : 'Search...'}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <span className="filter-lbl">{lang === 'vi' ? 'Khoá:' : 'Course:'}</span>
          <select className="f-select" value={courseF} onChange={e => setCourseF(e.target.value)}>
            <option value="all">{lang === 'vi' ? 'Tất cả' : 'All'}</option>
            <option value="mind">Mindfulness</option>
            <option value="thien">{lang === 'vi' ? 'Thiền Định' : 'Meditation'}</option>
            <option value="nlp">NLP</option>
          </select>
        </div>
      </div>

      {Object.entries(groups).map(([cKey, group]) => {
        // Sub-group by session
        const sessions: Record<string, typeof MATERIALS> = {};
        group.items.forEach(m => {
          if (!sessions[m.session]) sessions[m.session] = [];
          sessions[m.session].push(m);
        });

        return (
          <div key={cKey} className="card" style={{ marginBottom:14 }}>
            <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14 }}>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:16,fontWeight:700,color:'var(--ink)' }}>
                {lang === 'vi' ? group.label : (cKey === 'thien' ? 'Advanced Meditation' : group.label)}
              </div>
              <button className="btn btn-p btn-sm" onClick={() => showToast(lang === 'vi' ? 'Tính năng upload sẽ sớm có!' : 'Upload coming soon!')}>
                + {lang === 'vi' ? 'Upload' : 'Upload'}
              </button>
            </div>
            {Object.entries(sessions).map(([sess, mats]) => (
              <div key={sess}>
                <div className="mat-session-hd">
                  {sess}
                  {mats.some(m => m.status === 'active') && (
                    <span className="tag t-up" style={{ fontSize:11,padding:'2px 8px' }}>
                      {lang === 'vi' ? 'Hôm nay' : 'Today'}
                    </span>
                  )}
                </div>
                {mats.map(m => (
                  <div key={m.id} className="mat">
                    <div className="mat-ico">{m.ico}</div>
                    <div style={{ flex:1 }}>
                      <div className="mat-name">{m.name}</div>
                      <div className="mat-meta">{m.type} · {m.size}</div>
                    </div>
                    {statusTag(m.status, lang)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
