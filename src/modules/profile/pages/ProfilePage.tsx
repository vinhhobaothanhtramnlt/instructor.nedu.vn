import { useState } from 'react';
import { useAppState } from '../../../shared/hooks/useAppState';

const CERTS_INITIAL = [
  { id:1, name:'Chứng chỉ MBSR', org:'University of Massachusetts', year:'2020' },
  { id:2, name:'Bằng Tâm lý học ứng dụng', org:'Đại học Khoa học Xã hội', year:'2018' },
];

export default function ProfilePage() {
  const { lang, showToast } = useAppState();
  const [form, setForm] = useState({ name:'NhiLe', specialty:'Mindfulness, Thiền định, NLP', email:'nhile@guide.vn', exp:'5 năm', phone:'+84 090 000 0000', bio:'NhiLe là người dẫn đường với 5 năm kinh nghiệm trong lĩnh vực Mindfulness và thiền định...' });
  const [certs, setCerts] = useState(CERTS_INITIAL);
  const [addOpen, setAddOpen] = useState(false);
  const [certName, setCertName] = useState('');
  const [certMeta, setCertMeta] = useState('');

  function addCert() {
    if (!certName.trim()) return;
    const [org, year] = certMeta.split('·').map(s => s.trim());
    setCerts(prev => [...prev, { id: Date.now(), name: certName, org: org || '', year: year || '' }]);
    setCertName(''); setCertMeta(''); setAddOpen(false);
    showToast(lang === 'vi' ? 'Đã thêm chứng chỉ!' : 'Certificate added!');
  }

  return (
    <div>
      <div className="ph">
        <div className="ph-title">{lang === 'vi' ? 'Hồ sơ dẫn đường' : 'Guide Profile'}</div>
      </div>

      {/* Avatar + Name card */}
      <div className="card" style={{ marginBottom:18 }}>
        <div style={{ display:'flex',alignItems:'flex-start',gap:20,marginBottom:20 }}>
          {/* Avatar */}
          <div style={{ position:'relative',flexShrink:0 }}>
            <div style={{ width:80,height:80,borderRadius:'50%',background:'linear-gradient(135deg,#5A8A60,#3A6040)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Barlow Condensed',sans-serif",fontSize:28,fontWeight:700,color:'#fff' }}>NL</div>
            <div
              style={{ position:'absolute',bottom:2,right:2,width:22,height:22,background:'var(--surface)',border:'2px solid var(--border)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,cursor:'pointer',boxShadow:'var(--sh)' }}
              onClick={() => showToast(lang === 'vi' ? 'Tính năng này sẽ sớm có!' : 'Coming soon!')}
              title={lang === 'vi' ? 'Đổi ảnh' : 'Change photo'}
            >✏️</div>
          </div>
          <div style={{ flex:1,minWidth:0 }}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:28,fontWeight:700,color:'var(--ink)',marginBottom:4 }}>NhiLe</div>
            <div style={{ fontSize:13,color:'var(--muted)',marginBottom:12 }}>
              {lang === 'vi' ? 'Người Dẫn Đường Chính · Tham gia từ 2024' : 'Lead Guide · Joined 2024'}
            </div>
            <div style={{ display:'flex',gap:7,flexWrap:'wrap' }}>
              {[['🧘', 'Mindfulness'], ['🌿', 'Thiền định'], ['🎓', 'NLP']].map(([ic, lb]) => (
                <span key={lb} style={{ display:'inline-flex',alignItems:'center',gap:5,padding:'5px 13px',borderRadius:20,fontSize:12.5,fontWeight:600,background:'#EDF4EE',color:'#3A6040',border:'1px solid #C5DEC8' }}>
                  {ic} {lb}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ height:1,background:'var(--border)',margin:'4px 0 20px' }} />

        <div className="g2">
          <div className="fg">
            <label className="fl">{lang === 'vi' ? 'Họ và tên' : 'Full Name'}</label>
            <input className="fi" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          </div>
          <div className="fg">
            <label className="fl">{lang === 'vi' ? 'Chuyên môn' : 'Specialty'}</label>
            <input className="fi" value={form.specialty} onChange={e => setForm(f => ({ ...f, specialty: e.target.value }))} />
          </div>
          <div className="fg">
            <label className="fl">Email</label>
            <input className="fi" type="email" value={form.email} readOnly style={{ opacity:.7 }} />
          </div>
          <div className="fg">
            <label className="fl">{lang === 'vi' ? 'Kinh nghiệm' : 'Experience'}</label>
            <input className="fi" value={form.exp} onChange={e => setForm(f => ({ ...f, exp: e.target.value }))} />
          </div>
          <div className="fg">
            <label className="fl">{lang === 'vi' ? 'Điện thoại' : 'Phone'}</label>
            <input className="fi" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
          </div>
          <div className="fg">
            <label className="fl">{lang === 'vi' ? 'Tiểu sử' : 'Bio'}</label>
            <textarea className="fta" style={{ minHeight:90 }} value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} />
          </div>
        </div>

        <div style={{ display:'flex',gap:10,marginTop:4 }}>
          <button className="btn btn-p" onClick={() => showToast(lang === 'vi' ? 'Đã lưu thay đổi!' : 'Changes saved!')}>
            💾 {lang === 'vi' ? 'Lưu thay đổi' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Certificates */}
      <div className="card">
        <div style={{ display:'flex',alignItems:'center',gap:10,marginBottom:18 }}>
          <span style={{ fontSize:22 }}>🏆</span>
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:19,fontWeight:700,color:'var(--ink)' }}>
            {lang === 'vi' ? 'Bằng cấp & Chứng chỉ' : 'Degrees & Certifications'}
          </div>
        </div>

        {certs.map(c => (
          <div key={c.id} style={{ display:'flex',alignItems:'center',gap:14,padding:'14px 16px',background:'var(--bg)',border:'1px solid var(--border)',borderRadius:'var(--rs)',marginBottom:10 }}>
            <div style={{ width:42,height:42,background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--rs)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:19,flexShrink:0 }}>📄</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:14,fontWeight:600,color:'var(--ink)' }}>{c.name}</div>
              <div style={{ fontSize:12,color:'var(--muted)',marginTop:2 }}>{c.org} · {c.year}</div>
            </div>
            <div
              style={{ fontSize:13,color:'var(--muted)',cursor:'pointer',padding:'4px 8px',borderRadius:4 }}
              onClick={() => setCerts(prev => prev.filter(x => x.id !== c.id))}
            >✕</div>
          </div>
        ))}

        {addOpen && (
          <div style={{ display:'block',background:'var(--bg)',border:'1px solid var(--border)',borderRadius:'var(--rs)',padding:14,marginBottom:12 }}>
            <div className="g2" style={{ marginBottom:0 }}>
              <div className="fg" style={{ marginBottom:10 }}>
                <label className="fl">{lang === 'vi' ? 'Tên bằng cấp / chứng chỉ' : 'Name'}</label>
                <input className="fi" placeholder={lang === 'vi' ? 'VD: Chứng chỉ MBSR' : 'E.g. MBSR Certificate'} value={certName} onChange={e => setCertName(e.target.value)} />
              </div>
              <div className="fg" style={{ marginBottom:10 }}>
                <label className="fl">{lang === 'vi' ? 'Đơn vị cấp · Năm' : 'Issuer · Year'}</label>
                <input className="fi" placeholder={lang === 'vi' ? 'VD: UMass · 2020' : 'E.g. UMass · 2020'} value={certMeta} onChange={e => setCertMeta(e.target.value)} />
              </div>
            </div>
            <div style={{ display:'flex',gap:8 }}>
              <button className="btn btn-p btn-sm" onClick={addCert}>✓ {lang === 'vi' ? 'Thêm' : 'Add'}</button>
              <button className="btn btn-o btn-sm" onClick={() => setAddOpen(false)}>✕</button>
            </div>
          </div>
        )}

        <div style={{ display:'flex',gap:10,marginTop:6 }}>
          <button className="btn btn-p" onClick={() => showToast(lang === 'vi' ? 'Đã lưu!' : 'Saved!')}>
            💾 {lang === 'vi' ? 'Lưu thay đổi' : 'Save'}
          </button>
          <button className="btn btn-o" onClick={() => setAddOpen(true)}>
            + {lang === 'vi' ? 'Thêm chứng chỉ' : 'Add Certificate'}
          </button>
        </div>
      </div>
    </div>
  );
}
