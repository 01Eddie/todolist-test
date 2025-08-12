import { Test, TestingModule } from '@nestjs/testing';
import { CrudController } from './crud.controller';
import { CrudService } from './crud.service';

const mockData = [{
  id: "ee66a56d",
  name: "test de name",
  status: true,
  designated: "designed test",
  user_id: null
},
{
  id: "ee66a57e",
  name: "test de name 1",
  status: false,
  designated: "designed test 1",
  user_id: null
},
{
  id: "ee66a58f",
  name: "test de name 2",
  status: true,
  designated: "designed test 2",
  user_id: null
}
]

describe('CrudController', () => {
  let controller: CrudController;

  const mockCrudService = {
    findAllToDo: jest.fn().mockResolvedValue(mockData),

    createToDo: jest.fn().mockImplementation(dto => ({
      id: 'generated-id',
      ...dto,
      user_id: null
    })),

    updateToDo: jest.fn().mockImplementation((id, dto) => ({
      id,
      ...dto,
      user_id: null
    })),

    deleteToDo: jest.fn().mockResolvedValue({ message: 'Deleted successfully' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CrudController],
      providers: [
        {
          provide: CrudService,
          useValue: mockCrudService,
        },
      ],
    }).compile();

    controller = module.get<CrudController>(CrudController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('funcion findAll debería devolver datos', async () => {
    const result = await controller.findAll();
    expect(result).toEqual(mockData);
    expect(mockCrudService.findAllToDo).toHaveBeenCalled();
  });

  it('funcion create deberia crear un nuevo registro', async () => {
    const newData = {
      name: 'new name',
      status: true,
      designated: 'new designated',
    };

    const result = await controller.create(newData);

    expect(result).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        ...newData,
        user_id: null,
      }),
    );
  }
  );

  it('funcion delete debería eliminar un registro', async () => {
    const idToDelete = 'ee66a56d';
    const result = await controller.delete(idToDelete);
    expect(result).toEqual({ message: 'Deleted successfully' });
    expect(mockCrudService.deleteToDo).toHaveBeenCalledWith(idToDelete);
  });
});