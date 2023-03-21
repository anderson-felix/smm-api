import { container } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import StorageProvider from '@shared/container/providers/StorageProvider/implementations/StorageProvider';

import HashProvider from '@shared/container/providers/HashProvider/implementations/HashProvider';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';

import MailProvider from '@shared/container/providers/MailProvider/implementations/MailProvider';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

import IUserRepository from '@modules/user/repositories/IUserRepository';
import UserRepository from '@modules/user/infra/typeorm/repositories/UserRepository';

import IOrderRepository from '@modules/order/repositories/IOrderRepository';
import OrderRepository from '@modules/order/infra/typeorm/repositories/OrderRepository';

import ISectorRepository from '@modules/sector/repositories/ISectorRepository';
import SectorRepository from '@modules/sector/infra/typeorm/repositories/SectorRepository';

import ICustomerRepository from '@modules/customer/repositories/ICustomerRepository';
import CustomerRepository from '@modules/customer/infra/typeorm/repositories/CustomerRepository';

import ICollaboratorRepository from '@modules/collaborator/repositories/ICollaboratorRepository';
import CollaboratorRepository from '@modules/collaborator/infra/typeorm/repositories/CollaboratorRepository';

import IOrderCommentRepository from '@modules/order/repositories/IOrderCommentRepository';
import OrderCommentRepository from '@modules/order/infra/typeorm/repositories/OrderCommentRepository';

import IOrderSectorRelationRepository from '@modules/order/repositories/IOrderSectorRelationRepository';
import OrderSectorRelationRepository from '@modules/order/infra/typeorm/repositories/OrderSectorRelationRepository';

import IOrderCollaboratorRelationRepository from '@modules/order/repositories/IOrderCollaboratorRelationRepository';
import OrderCollaboratorRelationRepository from '@modules/order/infra/typeorm/repositories/OrderCollaboratorRelationRepository';

import ICollaboratorSectorRelationRepository from '@modules/collaborator/repositories/ICollaboratorSectorRelationRepository';
import CollaboratorSectorRelationRepository from '@modules/collaborator/infra/typeorm/repositories/CollaboratorSectorRelationRepository';

import IUserNotificationRepository from '@modules/notification/repositories/IUserNotificationRepository';
import UserNotificationRepository from '@modules/notification/infra/typeorm/repositories/UserNotificationRepository';

import ICollaboratorNotificationRepository from '@modules/notification/repositories/ICollaboratorNotificationRepository';
import CollaboratorNotificationRepository from '@modules/notification/infra/typeorm/repositories/CollaboratorNotificationRepository';

container.register<IStorageProvider>('StorageProvider', StorageProvider);

container.register<IMailProvider>('MailProvider', MailProvider);

container.register<IHashProvider>('HashProvider', HashProvider);

container.register<IUserRepository>('UserRepository', UserRepository);

container.register<IOrderRepository>('OrderRepository', OrderRepository);

container.register<ISectorRepository>('SectorRepository', SectorRepository);

container.register<ICustomerRepository>(
  'CustomerRepository',
  CustomerRepository,
);

container.register<ICollaboratorRepository>(
  'CollaboratorRepository',
  CollaboratorRepository,
);

container.register<IOrderCommentRepository>(
  'OrderCommentRepository',
  OrderCommentRepository,
);

container.register<IOrderSectorRelationRepository>(
  'OrderSectorRelationRepository',
  OrderSectorRelationRepository,
);

container.register<IOrderCollaboratorRelationRepository>(
  'OrderCollaboratorRelationRepository',
  OrderCollaboratorRelationRepository,
);

container.register<ICollaboratorSectorRelationRepository>(
  'CollaboratorSectorRelationRepository',
  CollaboratorSectorRelationRepository,
);

container.register<IUserNotificationRepository>(
  'UserNotificationRepository',
  UserNotificationRepository,
);

container.register<ICollaboratorNotificationRepository>(
  'CollaboratorNotificationRepository',
  CollaboratorNotificationRepository,
);
