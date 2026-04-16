import { useState } from 'react';
import { useAppState } from '../../../shared/hooks/useAppState';

type QAState = 'pinned' | 'pending' | 'answered';

interface QAItem {
  id: number;
  q: string;
  course: string;
  session: string;
  cKey: string;
  sKey: string;
  author: string;
  state: QAState;
  answer?: string;
}

const INITIAL_QA: QAItem[] = [
  { id: 1, q: '"Làm sao để duy trì thói quen thiền mỗi ngày khi bận việc?"', course: 'Mindfulness', session: 'Buổi 2', cKey: 'mind', sKey: '2', author: 'Thảo Nguyên', state: 'pinned' },
  { id: 2, q: '"Sự khác nhau giữa thiền Metta và thiền Vipassana là gì?"',    course: 'Mindfulness', session: 'Buổi 1', cKey: 'mind', sKey: '1', author: 'Minh Hòa',    state: 'pending' },
  { id: 3, q: '"Mindfulness có thể thực hành khi đang đi bộ không?"',           course: 'Mindfulness', session: 'Buổi 3', cKey: 'mind', sKey: '3', author: 'Lan Phương', state: 'pending' },
  { id: 4, q: '"Mindfulness khác với relaxation như thế nào?"',                  course: 'Mindfulness', session: 'Buổi 1', cKey: 'mind', sKey: '1', author: 'Kim Hân',    state: 'answered', answer: 'Mindfulness là sự chú ý có chủ đích đến hiện tại, không phán xét. Relaxation chỉ là thư giãn thể chất...' },
];

function QACard({ item, lang, onPin, onUnpin, onSend }: {
  item: QAItem; lang: 'vi'|'en';
  onPin: (id: number) => void;
  onUnpin: (id: number) => void;
  onSend: (id: number, text: string) => void;
}) {
  const [ansText, setAnsText] = useState('');

  return (
    <div className={`qa-card${item.state === 'pinned' ? ' pinned' : item.state === 'answered' ? ' answered' : ''}`}>
      <div className="qa-q">{item.q}</div>
      <div className="qa-meta">
        <span className="tag t-class" style={{ fontSize:11,background:'#EDEAE4',color:'var(--ink2)' }}>
          {item.course} · {item.session}
        </span>
        {item.state === 'pinned' && (
          <span className="tag t-pin" style={{ fontSize:11 }}>
            {lang === 'vi' ? 'Trả lời đầu giờ buổi sau' : 'Answer next session'}
          </span>
        )}
        {item.state === 'pending' && (
          <span className="tag t-pend" style={{ fontSize:11 }}>
            {lang === 'vi' ? 'Chờ trả lời' : 'Pending'}
          </span>
        )}
        {item.state === 'answered' && (
          <span className="tag t-ans" style={{ fontSize:11 }}>
            {lang === 'vi' ? 'Đã trả lời' : 'Answered'}
          </span>
        )}
        <span>{item.author}</span>
      </div>

      {item.state === 'answered' ? (
        <div style={{ background:'var(--bg)',border:'1px solid var(--border)',borderRadius:'var(--rs)',padding:'9px 12px' }}>
          <div style={{ fontSize:11,fontWeight:700,color:'#4A7050',marginBottom:3 }}>
            {lang === 'vi' ? 'Đã hiển thị trên Student Web' : 'Shown on Student Web'}
          </div>
          <div style={{ fontSize:13,color:'var(--ink2)' }}>{item.answer}</div>
        </div>
      ) : (
        <>
          <textarea
            className="fta"
            style={{ minHeight:60,fontSize:13 }}
            placeholder={lang === 'vi' ? 'Viết câu trả lời...' : 'Write your answer...'}
            value={ansText}
            onChange={e => setAnsText(e.target.value)}
          />
          <div style={{ display:'flex',gap:8,marginTop:8,flexWrap:'wrap' }}>
            <button className="btn btn-p btn-sm" onClick={() => onSend(item.id, ansText)}>
              {lang === 'vi' ? 'Gửi lên Student Web' : 'Post to Student Web'}
            </button>
            {item.state === 'pinned' ? (
              <button className="btn btn-o btn-sm" onClick={() => onUnpin(item.id)}>
                {lang === 'vi' ? '↩ Bỏ ghim' : '↩ Unpin'}
              </button>
            ) : (
              <button className="btn btn-o btn-sm" onClick={() => onPin(item.id)}>
                {lang === 'vi' ? 'Trả lời đầu giờ buổi sau' : 'Answer next session'}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default function QAPage() {
  const { lang, showToast } = useAppState();
  const [items, setItems] = useState<QAItem[]>(INITIAL_QA);
  const [courseF, setCourseF] = useState('all');
  const [sessF, setSessF] = useState('all');
  const [stateF, setStateF] = useState('all');

  function pin(id: number) {
    setItems(prev => prev.map(i => i.id === id ? { ...i, state: 'pinned' } : i));
    showToast(lang === 'vi' ? 'Đã ghim!' : 'Pinned!');
  }
  function unpin(id: number) {
    setItems(prev => prev.map(i => i.id === id ? { ...i, state: 'pending' } : i));
    showToast(lang === 'vi' ? 'Đã bỏ ghim' : 'Unpinned');
  }
  function send(id: number, text: string) {
    setItems(prev => prev.map(i => i.id === id ? { ...i, state: 'answered', answer: text || '(câu trả lời đã gửi)' } : i));
    showToast(lang === 'vi' ? 'Đã gửi lên Student Web!' : 'Posted to Student Web!');
  }

  const filtered = items.filter(i => {
    const cm = courseF === 'all' || i.cKey === courseF;
    const sm = sessF === 'all' || i.sKey === sessF;
    const stm = stateF === 'all' || i.state === stateF;
    return cm && sm && stm;
  });

  const pinCount  = items.filter(i => i.state === 'pinned').length;
  const pendCount = items.filter(i => i.state === 'pending').length;
  const ansCount  = items.filter(i => i.state === 'answered').length;

  return (
    <div>
      <div className="ph">
        <div className="ph-title">{lang === 'vi' ? 'Câu hỏi học viên' : 'Student Q&A'}</div>
        <div className="ph-sub">{lang === 'vi' ? 'Trả lời → học viên nhận ngay trên Student Web' : 'Answer → students see it on Student Web'}</div>
      </div>

      {/* Summary boxes */}
      <div className="qa-summary">
        <div className="qa-sum-box" style={{ borderTop:'3px solid var(--gold)' }}>
          <div className="qa-sum-num">{pinCount}</div>
          <div className="qa-sum-lbl">{lang === 'vi' ? 'Đã ghim' : 'Pinned'}</div>
        </div>
        <div className="qa-sum-box" style={{ borderTop:'3px solid #888' }}>
          <div className="qa-sum-num">{pendCount}</div>
          <div className="qa-sum-lbl">{lang === 'vi' ? 'Chờ TL' : 'Pending'}</div>
        </div>
        <div className="qa-sum-box" style={{ borderTop:'3px solid #5A8A5A' }}>
          <div className="qa-sum-num">{ansCount}</div>
          <div className="qa-sum-lbl">{lang === 'vi' ? 'Đã TL' : 'Answered'}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="filter-row">
        <div className="filter-group">
          <span className="filter-lbl">{lang === 'vi' ? 'Khoá:' : 'Course:'}</span>
          <select className="f-select" value={courseF} onChange={e => setCourseF(e.target.value)}>
            <option value="all">{lang === 'vi' ? 'Tất cả khoá' : 'All courses'}</option>
            <option value="mind">Mindfulness</option>
            <option value="thien">{lang === 'vi' ? 'Thiền Định' : 'Meditation'}</option>
            <option value="nlp">NLP</option>
          </select>
        </div>
        <div className="filter-group">
          <span className="filter-lbl">{lang === 'vi' ? 'Buổi:' : 'Session:'}</span>
          <select className="f-select" value={sessF} onChange={e => setSessF(e.target.value)}>
            <option value="all">{lang === 'vi' ? 'Tất cả buổi' : 'All sessions'}</option>
            {['1','2','3','4','5','6'].map(n => (
              <option key={n} value={n}>{lang === 'vi' ? `Buổi ${n}` : `Session ${n}`}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <span className="filter-lbl">{lang === 'vi' ? 'Trạng thái:' : 'Status:'}</span>
          <select className="f-select" value={stateF} onChange={e => setStateF(e.target.value)}>
            <option value="all">{lang === 'vi' ? 'Tất cả' : 'All'}</option>
            <option value="pinned">{lang === 'vi' ? 'Đã ghim' : 'Pinned'}</option>
            <option value="pending">{lang === 'vi' ? 'Chờ trả lời' : 'Pending'}</option>
            <option value="answered">{lang === 'vi' ? 'Đã trả lời' : 'Answered'}</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign:'center',padding:'40px',color:'var(--muted)' }}>
          <div style={{ fontSize:28,marginBottom:8 }}>◇</div>
          <div>{lang === 'vi' ? 'Không có câu hỏi nào' : 'No questions found'}</div>
        </div>
      ) : (
        filtered.map(item => (
          <QACard key={item.id} item={item} lang={lang} onPin={pin} onUnpin={unpin} onSend={send} />
        ))
      )}
    </div>
  );
}
