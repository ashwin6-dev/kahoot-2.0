import { Test, TestingModule } from '@nestjs/testing';
import { GameManagerService } from './game-manager.service';
import { Model } from 'mongoose';
import { Game } from '../../schemas/games.schema';
import { Question } from '../../schemas/questions.schema';
import { getModelToken } from '@nestjs/mongoose';
import { generateId } from './common';
import { GameNotFoundException } from '../errors';

jest.mock('./common', () => ({
  generateId: jest.fn(),
  GAME_ID_LENGTH: 6,
  PLAYER_TOKEN_LENGTH: 10,
}));

const mockGameModel = {
  save: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  deleteOne: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
  create: jest.fn(),
  remove: jest.fn(),
  exec: jest.fn(),
};

describe('GameManagerService', () => {
  let service: GameManagerService;
  let gameModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GameManagerService,
        {
          provide: getModelToken(Game.name),
          useValue: mockGameModel,
        },
      ],
    }).compile();

    service = module.get<GameManagerService>(GameManagerService);
    gameModel = module.get<Model<Game>>(getModelToken(Game.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createGame', () => {
    it('can create a game', async () => {
      const mockQuestions: Question[] = [
        {
          question: 'question',
          options: ['A', 'B', 'C', 'D'],
          answer: 0,
          tags: ['T1', 'T2'],
          vector: [],
        },
      ];

      const mockGameId = 123456;
      const mockHostToken = 1234567890;

      (generateId as jest.Mock)
        .mockReturnValueOnce(123456) // game id
        .mockReturnValueOnce(1234567890); // player token

      const { gameId, token } = await service.createGame(mockQuestions, 'host');
      expect(gameModel.create).toHaveBeenCalled();
      expect(gameId).toEqual(mockGameId);
      expect(token).toEqual(mockHostToken);
    });
  });

  describe('getGame', () => {
    it('should return a game if found', async () => {
      const mockGame = { gameId: 123456 };
      gameModel.findOne.mockResolvedValue(mockGame);

      const result = await service.getGame(123456);
      expect(gameModel.findOne).toHaveBeenCalledWith({ gameId: 123456 });
      expect(result).toBe(mockGame);
    });

    it('should throw if game not found', async () => {
      gameModel.findOne.mockResolvedValue(null);
      const gameId = 111222;

      await expect(service.getGame(gameId)).rejects.toThrowError(
        GameNotFoundException,
      );
    });
  });

  describe('deleteGame', () => {
    it('should delete a game by ID', async () => {
      gameModel.deleteOne.mockResolvedValue({ deletedCount: 1 });

      await service.deleteGame(123456);
      expect(gameModel.deleteOne).toHaveBeenCalledWith({ gameId: 123456 });
    });
  });
});
