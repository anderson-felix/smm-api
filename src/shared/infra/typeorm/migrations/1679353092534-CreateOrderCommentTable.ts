import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOrderCommentTable1679353092534
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'order_comment',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'order_id',
            type: 'uuid',
          },
          {
            name: 'collaborator_id',
            type: 'uuid',
            isNullable: true,
            default: null,
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: true,
            default: null,
          },
          {
            name: 'text',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'FK_ORDER_MESSAGE_ORDER',
            columnNames: ['order_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'order',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          {
            name: 'FK_ORDER_MESSAGE_COLLABORATOR',
            columnNames: ['collaborator_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'collaborator',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
          {
            name: 'FK_ORDER_MESSAGE_USER',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('order_comment', true);
  }
}
