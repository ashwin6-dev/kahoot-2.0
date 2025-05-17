import { Test, TestingModule } from '@nestjs/testing';
import { GamePlayerService } from './game-player.service';
import { getModelToken } from '@nestjs/mongoose';
import { Game } from '../../schemas/games.schema';
import { GameManagerService } from './game-manager.service';
import { PlayerNameTakenException } from '../errors';
import { generateId } from './common';

jest.mock('./common', () => ({
  generateId: jest.fn(),
}));

describe('GamePlayerService', () => {
  let service: GamePlayerService;
  let gameModel: any;
  let gameManagerService: any;

  const mockGameModel = {
    updateOne: jest.fn(),
  };

  const mockGameManagerService = {
    getGame: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GamePlayerService,
        { provide: getModelToken(Game.name), useValue: mockGameModel },
        { provide: GameManagerService, useValue: mockGameManagerService },
      ],
    }).compile();

    service = module.get<GamePlayerService>(GamePlayerService);
    gameModel = module.get(getModelToken(Game.name));
    gameManagerService = module.get(GameManagerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('joinGame', () => {
    const gameId = 123456;
    const playerName = 'Alice';

    it('should add a player and return token', async () => {
      const fakeToken = 1234567890;
      (generateId as jest.Mock).mockReturnValue(fakeToken);

      const existingGame = {
        gameId,
        players: [{ name: 'Bob', score: 0, token: 1111111111 }],
      };

      gameManagerService.getGame.mockResolvedValue(existingGame);
      gameModel.updateOne.mockResolvedValue({});

      const result = await service.joinGame(gameId, playerName);

      expect(gameManagerService.getGame).toHaveBeenCalledWith(gameId);
      expect(gameModel.updateOne).toHaveBeenCalledWith(
        { gameId },
        {
          players: [
            ...existingGame.players,
            { name: playerName, score: 0, token: fakeToken },
          ],
        },
      );
      expect(result).toEqual({ token: fakeToken });
    });

    it('should throw PlayerNameTakenException if name is taken', async () => {
      const existingGame = {
        gameId,
        players: [{ name: 'Alice', score: 0, token: 111 }],
      };

      gameManagerService.getGame.mockResolvedValue(existingGame);
      await expect(service.joinGame(gameId, playerName)).rejects.toThrow(
        PlayerNameTakenException,
      );

      expect(gameModel.updateOne).toHaveBeenCalledTimes(0);
    });
  });
});
