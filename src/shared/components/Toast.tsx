import { useAppState } from '../hooks/useAppState';

export function Toast() {
  const msg = useAppState((s) => s.toastMsg);
  if (!msg) return null;
  return (
    <div className="toast-bar" style={{ display: 'block' }}>{msg}</div>
  );
}
