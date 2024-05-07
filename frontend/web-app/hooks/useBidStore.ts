import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import { Bid } from '@/types';

type State = {
  bids: Bid[];
};

type Actions = {
  setBids: (bids: Bid[]) => void;
  addBid: (bid: Bid) => void;
};

const initialState = {
  bids: [],
};

export const useBidStore = createWithEqualityFn<State & Actions>(
  set => ({
    ...initialState,

    setBids: (bids: Bid[]) => {
      set(() => ({
        bids,
      }));
    },

    addBid: (bid: Bid) => {
      set(state => ({
        bids: !state.bids.find(item => item.id === bid.id) ? [bid, ...state.bids] : [...state.bids],
      }));
    },
  }),
  shallow,
);
