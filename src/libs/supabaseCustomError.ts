import { PostgrestError } from '@supabase/supabase-js';

class SupabaseCustomError extends Error {
  public code: string;

  public statusCode: number;

  public hint: string;

  public details: string;

  constructor(postgresError: PostgrestError, statusCode: number) {
    super(postgresError.message);
    this.name = 'SupabaseCustomError';
    this.code = postgresError.code;
    this.hint = postgresError.hint;
    this.details = postgresError.details;
    this.statusCode = statusCode;
  }
}

export default SupabaseCustomError;
