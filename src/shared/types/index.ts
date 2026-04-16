export type Lang = 'vi' | 'en';
export type PageKey = 'home' | 'courses' | 'students' | 'qa' | 'feedback' | 'materials' | 'profile' | 'calendar' | 'stats';
export type CourseKey = 'mind' | 'thien' | 'nlp';

export interface CourseInfo {
  vi: string; en: string;
  sub_vi: string; sub_en: string;
  count: number; prog: string; avg: string;
  color: string;
}

export const COURSES: Record<CourseKey, CourseInfo> = {
  mind: { vi:'Mindfulness Cơ Bản', en:'Basic Mindfulness', sub_vi:'Online · 20 học viên · Buổi 6/10', sub_en:'Online · 20 students · Session 6/10', count:20, prog:'6/10', avg:'62%', color:'var(--gold)' },
  thien: { vi:'Thiền Định Nâng Cao', en:'Advanced Meditation', sub_vi:'Offline · 34 học viên · Buổi 4/10', sub_en:'Offline · 34 students · Session 4/10', count:34, prog:'4/10', avg:'48%', color:'#666' },
  nlp: { vi:'NLP Ứng Dụng', en:'Applied NLP', sub_vi:'Online · 56 học viên · Buổi 8/10', sub_en:'Online · 56 students · Session 8/10', count:56, prog:'8/10', avg:'74%', color:'#666' }
};

export const TITLES: Record<Lang, Record<string, string>> = {
  vi: { home:'Trang chủ', courses:'Khoá học', students:'Học viên', qa:'Câu hỏi học viên', feedback:'Feedback', materials:'Bài giảng', profile:'Hồ sơ dẫn đường', calendar:'Lịch giảng dạy', stats:'Thống kê của tôi' },
  en: { home:'Dashboard', courses:'Courses', students:'Students', qa:'Q&A', feedback:'Feedback', materials:'Materials', profile:'Guide Profile', calendar:'Calendar', stats:'My Statistics' }
};
