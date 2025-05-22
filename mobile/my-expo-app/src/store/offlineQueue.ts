import { create } from 'zustand';

interface QItem {
  id: string;
  op: () => Promise<any>;
}

type QState = {
  queue: QItem[];
  enqueue: (op: QItem['op']) => void;
  flush: () => Promise<void>;
};

export const useOfflineQueue = create<QState>((set, get) => ({
  queue: [],
  enqueue: (op) =>
    set((state) => ({
      queue: [...state.queue, { id: Date.now().toString(), op }],
    })),
  flush: async () => {
    const { queue } = get();
    for (const { op } of queue) {
      try {
        await op();
      } catch {
        // If it fails, keep in queue
      }
    }
    set({ queue: [] });
  },
}));
