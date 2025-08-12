import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private client: SupabaseClient;

  constructor(private config: ConfigService) {
    const SUPABASE_URL = this.config.get<string>('SUPABASE_URL');
    const SUPABASE_KEY = this.config.get<string>('SUPABASE_KEY');

    if (!SUPABASE_URL || !SUPABASE_KEY) {
      throw new Error('Supabase environment variables are missing');
    }

    this.client = createClient(SUPABASE_URL, SUPABASE_KEY);
  }

  getClient() {
    if (!this.client) {
      throw new Error('Supabase client is not initialized');
    }

    return this.client;
  }
}
