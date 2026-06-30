"use client";
import { useState, useCallback } from 'react';
import AdminModal from './AdminModal';

interface ConfirmModalOptions {
  title?: string;
  message: string;
  confirmLabel?: string;
  danger?: boolean;
  /** If true, user must type "DELETE" to confirm */
  requireTyping?: boolean;
}

interface ConfirmModalProps extends ConfirmModalOptions {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({ open, onConfirm, onCancel, title = 'Confirm Action', message, confirmLabel = 'Confirm', danger = false, requireTyping = false }: ConfirmModalProps) {
  const [typed, setTyped] = useState('');
  const canConfirm = !requireTyping || typed === 'DELETE';

  const handleConfirm = () => {
    if (!canConfirm) return;
    setTyped('');
    onConfirm();
  };

  const handleCancel = () => {
    setTyped('');
    onCancel();
  };

  return (
    <AdminModal
      open={open}
      onClose={handleCancel}
      title={title}
      size="sm"
      footer={
        <div className="flex gap-2 justify-end">
          <button
            onClick={handleCancel}
            className="px-4 py-2 rounded-lg text-sm font-bold transition-colors"
            style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)' }}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!canConfirm}
            className="px-5 py-2 rounded-lg text-sm font-black uppercase tracking-wide transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: danger ? 'linear-gradient(135deg, #ef4444, #b91c1c)' : 'linear-gradient(135deg, #f0d080, #c8a84b)',
              color: danger ? '#fff' : '#080812',
              boxShadow: canConfirm ? (danger ? '0 4px 16px rgba(239,68,68,0.3)' : '0 4px 16px rgba(200,168,75,0.25)') : 'none',
            }}
          >
            {confirmLabel}
          </button>
        </div>
      }
    >
      <div className="px-6 py-5">
        <div className="flex items-start gap-4 mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
            style={{ background: danger ? 'rgba(239,68,68,0.12)' : 'rgba(200,168,75,0.10)', border: danger ? '1px solid rgba(239,68,68,0.25)' : '1px solid rgba(200,168,75,0.20)' }}
          >
            {danger ? '⚠️' : '❓'}
          </div>
          <p className="text-white/70 text-sm leading-relaxed pt-1.5">{message}</p>
        </div>

        {requireTyping && (
          <div className="mt-4">
            <p className="text-xs font-bold text-white/40 mb-2 uppercase tracking-wider">
              Type <span className="text-red-400">DELETE</span> to confirm
            </p>
            <input
              type="text"
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              placeholder="DELETE"
              className="w-full px-3 py-2.5 rounded-lg text-sm font-mono outline-none"
              style={{
                background: 'rgba(4,4,10,0.8)',
                border: typed === 'DELETE' ? '1px solid rgba(239,68,68,0.5)' : '1px solid rgba(255,255,255,0.08)',
                color: typed === 'DELETE' ? '#f87171' : 'rgba(255,255,255,0.7)',
              }}
            />
          </div>
        )}
      </div>
    </AdminModal>
  );
}

// Hook for imperative usage: const { confirm } = useConfirm(); await confirm({ message: '...' });
export function useConfirm() {
  const [state, setState] = useState<(ConfirmModalOptions & { resolve: (v: boolean) => void }) | null>(null);

  const confirm = useCallback((opts: ConfirmModalOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setState({ ...opts, resolve });
    });
  }, []);

  const modal = state ? (
    <ConfirmModal
      open={!!state}
      title={state.title}
      message={state.message}
      confirmLabel={state.confirmLabel}
      danger={state.danger}
      requireTyping={state.requireTyping}
      onConfirm={() => { state.resolve(true);  setState(null); }}
      onCancel={()  => { state.resolve(false); setState(null); }}
    />
  ) : null;

  return { confirm, modal };
}
