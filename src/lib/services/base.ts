import { PostgrestError, SupabaseClient } from '@supabase/supabase-js';
import { supabase } from '../supabase';

export interface ServiceResponse<T> {
  data: T | null;
  error: PostgrestError | Error | null;
}

export abstract class BaseService {
  protected supabase: SupabaseClient = supabase;

  protected handleError(context: string, error: any) {
    console.error(`[Supabase Service Error] ${context}:`, {
      message: error?.message,
      details: error?.details,
      hint: error?.hint,
      code: error?.code,
      fullError: error
    });
    return error;
  }

  protected async tryFetch<T>(
    operation: () => Promise<{ data: T | null; error: PostgrestError | null }>,
    context: string
  ): Promise<T | null> {
    try {
      const { data, error } = await operation();
      if (error) {
        this.handleError(context, error);
        return null;
      }
      return data;
    } catch (e) {
      console.error(`[Critical Service Error] ${context}:`, e);
      return null;
    }
  }
}
