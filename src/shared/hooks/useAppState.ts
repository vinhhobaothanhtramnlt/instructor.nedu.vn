import { create } from 'zustand';
import type { Lang, PageKey, CourseKey } from '../types';

interface AppState {
  lang: Lang;
  page: PageKey;
  selectedCourse: CourseKey;
  sidebarOpen: boolean;
  notifOpen: boolean;
  toastMsg: string;

  setLang: (l: Lang) => void;
  goPage: (p: PageKey) => void;
  selectCourse: (k: CourseKey) => void;
  toggleSidebar: () => void;
  toggleNotif: () => void;
  closeNotif: () => void;
  showToast: (msg: string) => void;
}

export const useAppState = create<AppState>((set) => ({
  lang: 'vi',
  page: 'home',
  selectedCourse: 'mind',
  sidebarOpen: true,
  notifOpen: false,
  toastMsg: '',

  setLang: (lang) => set({ lang }),
  goPage: (page) => set({ page, notifOpen: false }),
  selectCourse: (selectedCourse) => set({ selectedCourse, page: 'courses', notifOpen: false }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  toggleNotif: () => set((s) => ({ notifOpen: !s.notifOpen })),
  closeNotif: () => set({ notifOpen: false }),
  showToast: (toastMsg) => {
    set({ toastMsg });
    setTimeout(() => set({ toastMsg: '' }), 2200);
  },
}));
