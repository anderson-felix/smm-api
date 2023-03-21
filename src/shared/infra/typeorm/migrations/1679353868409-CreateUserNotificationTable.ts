import { notificationPriorityArray } from '@modules/notification/enums/NotificationPriorityEnum';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserNotificationTable1679353868409
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_notification',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'order_id',
            type: 'uuid',
            isNullable: true,
            default: null,
          },
          {
            name: 'display_name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
            default: null,
          },
          {
            name: 'priority',
            type: 'enum',
            enum: notificationPriorityArray,
          },
          {
            name: 'read',
            type: 'boolean',
            default: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'FK_USER_NOTIFICATION_USER',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          {
            name: 'FK_USER_NOTIFICATION_ORDER',
            columnNames: ['order_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'order',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_notification', true);
  }
}
