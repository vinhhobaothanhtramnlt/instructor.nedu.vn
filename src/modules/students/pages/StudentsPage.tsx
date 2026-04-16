import { useState } from 'react';
import { useAppState } from '../../../shared/hooks/useAppState';

const VN1 = ['Thảo','Minh','Kim','Bảo','Lan','Anh','Phúc','Hân','Ngọc','Tuấn','Mai','Đức','Hoa','Long','Linh','Khoa','Thu','Hùng','Yến','Trang','Quân','Nhung','Vinh','Phương','Hải','Liên','Sơn','Dung','Nam','Cúc','Bình','Trinh','Đạt','Hằng','Tú','Vân'];
const VN2 = ['Nguyễn','Trần','Lê','Phạm','Hoàng','Huỳnh','Phan','Vũ','Đặng','Bùi','Đỗ','Hồ','Ngô','Dương','Lý'];
function mkName(i: number) { return VN1[i % VN1.length] + ' ' + VN2[i % VN2.length]; }
function mkPct(i: number, base: number) { return Math.min(100, Math.max(5, base + (i * 7 + i * i) % 45 - 20)); }

const COURSE_DATA = {
  mind:  { label: 'Mindfulness Cơ Bản',  color: 'var(--gold)', total: 20, offset: 0,  base: 62, newTag: false },
  thien: { label: 'Thiền Định Nâng Cao', color: '#888',        total: 34, offset: 20, base: 48, newTag: true  },
  nlp:   { label: 'NLP Ứng Dụng',        color: '#888',        total: 56, offset: 54, base: 74, newTag: false },
};

interface StudentPanelData {
  init: string; name: string; code: string; cls: string;
  pct: number; sessAtt: number; sessTot: number; hwAtt: number; hwTot: number;
}

function StudentDetailPanel({ data, onClose }: { data: StudentPanelData; onClose: () => void }) {
  const { lang, showToast } = useAppState();
  const [note, setNote] = useState('');
  const col = data.pct >= 75 ? 'var(--gold-d)' : data.pct >= 40 ? '#888' : '#9A4040';

  return (
    <div className="spov open" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="sp">
        <div className="sp-hd">
          <div style={{ width:38,height:38,borderRadius:'50%',background:'var(--gold)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:14,color:'var(--dark)',flexShrink:0 }}>
            {data.init}
          </div>
          <div>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:17,fontWeight:700,color:'#fff' }}>{data.name}</div>
            <div style={{ fontSize:12,color:'rgba(255,255,255,.4)',marginTop:1 }}>{data.code} · {data.cls}</div>
          </div>
          <div className="sp-close" onClick={onClose}>✕</div>
        </div>
        <div className="sp-body">
          <div style={{ fontSize:11,fontWeight:700,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:8 }}>
            {lang === 'vi' ? 'Tiến độ bài tập' : 'Progress'}
          </div>
          <div style={{ display:'flex',alignItems:'center',gap:14,marginBottom:14 }}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:46,fontWeight:700,color:col }}>{data.pct}%</div>
            <div style={{ flex:1 }}>
              <div className="pb">
                <div className="pb-row">
                  <span>{lang === 'vi' ? 'Bài đã nộp' : 'Submitted'}</span>
                  <span style={{ fontWeight:700 }}>{data.hwAtt}/{data.hwTot}</span>
                </div>
                <div className="pt"><div className="pf" style={{ width:`${Math.round(data.hwAtt/data.hwTot*100)}%`,background:'var(--gold-d)' }} /></div>
              </div>
              <div className="pb" style={{ marginTop:6 }}>
                <div className="pb-row">
                  <span>{lang === 'vi' ? 'Buổi tham gia' : 'Sessions attended'}</span>
                  <span style={{ fontWeight:700 }}>{data.sessAtt}/{data.sessTot}</span>
                </div>
                <div className="pt"><div className="pf" style={{ width:`${Math.round(data.sessAtt/data.sessTot*100)}%`,background:'#888' }} /></div>
              </div>
            </div>
          </div>
          <div className="divider" />
          <div style={{ fontSize:11,fontWeight:700,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:7 }}>
            {lang === 'vi' ? 'Ghi chú' : 'Notes'}
          </div>
          <textarea className="fta" placeholder={lang === 'vi' ? 'Ghi chú riêng...' : 'Private notes...'} value={note} onChange={e => setNote(e.target.value)} />
          <button className="btn btn-p" style={{ marginTop:10,width:'100%' }} onClick={() => showToast(lang === 'vi' ? 'Đã lưu ghi chú!' : 'Note saved!')}>
            {lang === 'vi' ? 'Lưu ghi chú' : 'Save Note'}
          </button>
        </div>
      </div>
    </div>
  );
}

function CourseGroup({ ckey, label, color, total, offset, base, newTag, shown, onShowMore, onSelectStudent, lang }:
  { ckey: string; label: string; color: string; total: number; offset: number; base: number; newTag: boolean;
    shown: number; onShowMore: () => void; onSelectStudent: (d: StudentPanelData) => void; lang: 'vi'|'en' }) {

  const rows = [];
  for (let i = 0; i < Math.min(shown, total); i++) {
    const name = mkName(i + offset);
    const init = name.split(' ').map((w: string) => w[0]).slice(0, 2).join('');
    const pct = mkPct(i, base);
    const hw = Math.round(pct / 100 * 5);
    const code = 'HV-' + String((ckey === 'mind' ? 1 : ckey === 'thien' ? 21 : 55) + i).padStart(3, '0');
    const col = pct >= 75 ? 'var(--gold-d)' : pct >= 40 ? '#888' : '#9A4040';
    const isNew = newTag && i < 3;
    rows.push(
      <div key={code} className="stu" onClick={() => onSelectStudent({ init, name, code, cls: label, pct, sessAtt: Math.min(hw + 1, 6), sessTot: 6, hwAtt: hw, hwTot: 5 })}>
        <div className="stu-av">{init}</div>
        <div className="stu-info">
          <div className="stu-name">
            {name}
            {isNew && <span className="tag t-new" style={{ fontSize:10,padding:'1px 6px',marginLeft:6 }}>{lang === 'vi' ? 'Mới nộp' : 'New'}</span>}
          </div>
          <div className="stu-code">{code}</div>
        </div>
        <div className="stu-prog">
          <div style={{ display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:2 }}>
            <span style={{ fontSize:11,color:'var(--muted)' }}>{lang === 'vi' ? 'Bài' : 'HW'}: {hw}/5</span>
            <span className="stu-pct-num" style={{ color: col }}>{pct}%</span>
          </div>
          <div className="pt"><div className="pf" style={{ width:`${pct}%`,background:col }} /></div>
        </div>
      </div>
    );
  }
  const remaining = total - Math.min(shown, total);

  return (
    <div className="card" style={{ marginBottom:14 }}>
      <div style={{ display:'flex',alignItems:'center',gap:8,marginBottom:14 }}>
        <div style={{ width:8,height:8,borderRadius:'50%',background:color }} />
        <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:16,fontWeight:700,color:'var(--ink)' }}>{label}</div>
        {newTag && <span className="tag t-new" style={{ fontSize:11 }}>{lang === 'vi' ? '3 nộp mới' : '3 new'}</span>}
        <div style={{ fontSize:12,color:'var(--muted)',marginLeft:'auto' }}>{total} {lang === 'vi' ? 'học viên' : 'students'}</div>
      </div>
      {rows}
      {remaining > 0 && (
        <div style={{ paddingTop:10,borderTop:'1px solid var(--border)',marginTop:4,textAlign:'center' }}>
          <span onClick={onShowMore} style={{ cursor:'pointer',color:'var(--gold-d)',fontSize:13,fontWeight:600 }}>
            {lang === 'vi' ? `Xem thêm ${remaining} →` : `Show ${remaining} more →`}
          </span>
        </div>
      )}
    </div>
  );
}

export default function StudentsPage() {
  const { lang } = useAppState();
  const [filter, setFilter] = useState('all');
  const [shown, setShown] = useState<Record<string, number>>({ mind: 10, thien: 10, nlp: 10 });
  const [panel, setPanel] = useState<StudentPanelData | null>(null);

  return (
    <div>
      <div className="ph">
        <div className="ph-title">{lang === 'vi' ? 'Học viên' : 'Students'}</div>
        <div className="ph-sub">{lang === 'vi' ? 'Tự đồng bộ từ learn.nedu.vn · 110 học viên' : 'Auto-synced · 110 students'}</div>
      </div>

      <div className="filter-row">
        <div className="filter-group">
          <span className="filter-lbl">{lang === 'vi' ? 'Lớp:' : 'Course:'}</span>
          <select className="f-select" value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="all">{lang === 'vi' ? 'Tất cả (110)' : 'All (110)'}</option>
            <option value="mind">{lang === 'vi' ? 'Mindfulness (20)' : 'Mindfulness (20)'}</option>
            <option value="thien">{lang === 'vi' ? 'Thiền Định (34)' : 'Meditation (34)'}</option>
            <option value="nlp">{lang === 'vi' ? 'NLP (56)' : 'NLP (56)'}</option>
          </select>
        </div>
      </div>

      {(Object.entries(COURSE_DATA) as [string, typeof COURSE_DATA.mind][]).map(([key, c]) => {
        if (filter !== 'all' && filter !== key) return null;
        return (
          <CourseGroup
            key={key}
            ckey={key}
            label={lang === 'vi' ? c.label : (key === 'thien' ? 'Advanced Meditation' : c.label)}
            color={c.color}
            total={c.total}
            offset={c.offset}
            base={c.base}
            newTag={c.newTag}
            shown={shown[key] ?? 10}
            onShowMore={() => setShown(s => ({ ...s, [key]: Math.min((s[key] ?? 10) + 10, c.total) }))}
            onSelectStudent={setPanel}
            lang={lang}
          />
        );
      })}

      {panel && <StudentDetailPanel data={panel} onClose={() => setPanel(null)} />}
    </div>
  );
}
