import toast from 'react-hot-toast';

export const confirmDialog = (message: string): Promise<boolean> => {
  return new Promise((resolve) => {
    toast((t) => (
      <div className="flex flex-col gap-3 p-1">
        <p className="text-sm font-medium text-white">{message}</p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              resolve(false);
            }}
            className="px-3 py-1.5 text-xs font-medium text-white/60 hover:text-white bg-white/5 hover:bg-white/10 rounded transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              resolve(true);
            }}
            className="px-3 py-1.5 text-xs font-medium text-white bg-red-500 hover:bg-red-400 rounded transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    ), {
      duration: Infinity,
      position: 'top-center',
      style: {
        background: 'rgba(10, 10, 15, 0.8)',
        backdropFilter: 'blur(12px)',
        color: '#fff',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '16px',
        padding: '12px 16px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)',
      }
    });
  });
};
