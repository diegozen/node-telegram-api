import 'reflect-metadata';
import { Container } from 'inversify';
import USER_IDENTIFIERS from '../../user/domain/constants';
import { IUserRepository } from '../../user/domain/interfaces/IUserRepository';
import { UserRepository } from '../../user/infrastructure/db/repository/UserRepository';
import { IBotRepository } from '../../telegram/domain/interfaces/IBotRepository';
import { BotRepository } from '../../telegram/infastructure/bot/repository/BotRepository';
import TELEGRAM_IDENTIFIERS from '../../telegram/domain/constants';
import { ClientRepository } from '../../telegram/infastructure/client/repository/ClientRepository';
import { IClientRepository } from '../../telegram/domain/interfaces/IClientRepository';
import GROUP_IDENTIFIERS from '../../group/domain/constants';
import { IGroupRepository } from '../../group/domain/interfaces/IGroupRepository';
import { GroupRepository } from '../../group/infrastructure/db/repository/GroupRepository';

let container = new Container();

container.bind<IUserRepository>(USER_IDENTIFIERS.UserRepository).to(UserRepository);
container.bind<IBotRepository>(TELEGRAM_IDENTIFIERS.BotRepository).to(BotRepository);
container.bind<IClientRepository>(TELEGRAM_IDENTIFIERS.ClientRepository).to(ClientRepository);
container.bind<IGroupRepository>(GROUP_IDENTIFIERS.GroupRepository).to(GroupRepository);

export default container;
