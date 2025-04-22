import { Test, TestingModule } from '@nestjs/testing';
import { LiveGameGateway } from './live-game.gateway';

describe('LiveGameGateway', () => {
  let gateway: LiveGameGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LiveGameGateway],
    }).compile();

    gateway = module.get<LiveGameGateway>(LiveGameGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
