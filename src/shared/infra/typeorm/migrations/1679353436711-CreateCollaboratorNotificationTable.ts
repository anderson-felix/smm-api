import { notificationPriorityArray } from '@modules/notification/enums/NotificationPriorityEnum';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCollaboratorNotificationTable1679353436711
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'collaborator_notification',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'collaborator_id',
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
            name: 'FK_COLLABORATOR_NOTIFICATION_COLLABORATOR',
            columnNames: ['collaborator_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'collaborator',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          {
            name: 'FK_COLLABORATOR_NOTIFICATION_ORDER',
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
    await queryRunner.dropTable('collaborator_notification', true);
  }
}
