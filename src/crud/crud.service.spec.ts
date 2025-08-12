// import { Test, TestingModule } from '@nestjs/testing';
import { CrudService } from './crud.service';
import { SupabaseService } from '../supabase/supabase.service';

const mockData = [
  {
    id: "ee66a56d",
    name: "test de name",
    status: true,
    designated: "designed test",
    user_id: null
  }
];

describe('CrudService', () => {
  let crudService: CrudService;
  let supabaseServiceMock: jest.Mocked<SupabaseService>;

  beforeEach(() => {
    supabaseServiceMock = {
      getClient: jest.fn(),
    } as any;

    crudService = new CrudService(supabaseServiceMock);
  });

  // it('devuelve datos cuando existen en la tabla', async () => {

  //   // Simula el chain de Supabase
  //   supabaseServiceMock.getClient.mockReturnValue({
  //     from: () => ({ 
  //       select: () => { data: mockData, error: null },
  //     }),
  //   });

  //   const result = await crudService.findAllToDo();
  //   expect(result).toEqual(mockData);
  // });

  it('debería devolver datos si existen', async () => {
    const supabaseMock = {
      getClient: () => ({
        from: () => ({
          select: async () => ({ data: [mockData], error: null }),
        }),
      }),
    } as unknown as SupabaseService;

    const service = new CrudService(supabaseMock);

    const result = await service.findAllToDo();

    expect(result).toEqual([mockData]);
  });
});
