'use server';

import { revalidatePath } from 'next/cache';
import { FieldValues } from 'react-hook-form';
import { fetchWrapper } from '@/lib/fetchWrapper';
import { Auction, PagedResult, UpdateAuctionResult } from '@/types';

export const getData = async (query: string): Promise<PagedResult<Auction>> => {
  return await fetchWrapper.get(`/search${query}`);
};

export const updateAuctionTest = async (): Promise<UpdateAuctionResult> => {
  const data = {
    mileage: Math.floor(Math.random() * 100000) + 1,
  };

  return await fetchWrapper.put('/auctions/afbee524-5972-4075-8800-7d1f9d7b0a0c', data);
};

export const createAuction = async (data: FieldValues): Promise<Auction> => {
  return await fetchWrapper.post('/auctions', data);
};

export const getDetailedViewData = async (id: string): Promise<Auction> => {
  return await fetchWrapper.get(`/auctions/${id}`);
};

export const updateAuction = async (id: string, data: FieldValues): Promise<Auction> => {
  const res = await fetchWrapper.put(`/auctions/${id}`, data);

  revalidatePath(`/auctions/${id}`);

  return res;
};

export const deleteAuction = async (id: string): Promise<any> => {
  return await fetchWrapper.del(`/auctions/${id}`);
};
