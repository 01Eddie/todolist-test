import 'dotenv/config';
import { SupabaseService } from './supabase.service';
import { ConfigService } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';

jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => 'mock-client'),
}));

describe('SupabaseService', () => {
  let configService: ConfigService;

  it('crea el cliente cuando hay variables', () => {
    const configService = new ConfigService({
      SUPABASE_URL: 'https://example.supabase.co',
      SUPABASE_KEY: 'test-key',
    });

    const service = new SupabaseService(configService);

    expect(createClient).toHaveBeenCalledWith(
      'https://example.supabase.co',
      'test-key'
    );
    expect(service.getClient()).toBe('mock-client');
  });

  it('lanza error si faltan variables', () => {
    const configService = new ConfigService({});

    expect(() => new SupabaseService(configService)).toThrow(
      'Supabase environment variables are missing'
    );
  });

  it('debería lanzar un error si el cliente no está inicializado', () => {
    // Forzamos cliente "undefined" de forma manual
    configService = {
      get: jest.fn((key: string) => {
        if (key === 'SUPABASE_URL') return 'https://example.supabase.co';
        if (key === 'SUPABASE_KEY') return 'test-key';
        return null;
      }),
    } as unknown as ConfigService;

    const service = new SupabaseService(configService) as any;
    service.client = null;

    expect(() => service.getClient()).toThrow(
      'Supabase client is not initialized',
    );
  });
});