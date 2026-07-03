import axios from 'axios';
import type { Note } from '../types/note';
const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api/docs',
});
export interface FetchNotesParams {
  page: number;
  search: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const { data } = await api.get('/notes', { params });
  return data;
};

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: string;
}

export const createNote = async (payload: CreateNotePayload) => {
  const { data } = await api.post('/notes', payload);
  return data;
};

export const deleteNote = async (id: string) => {
  const { data } = await api.delete(`/notes/${id}`);
  return data;
};