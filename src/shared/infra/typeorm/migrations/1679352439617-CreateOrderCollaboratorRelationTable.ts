import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOrderCollaboratorRelationTable1679352439617
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'order_collaborator_relation',
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
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'FK_ORDER_COLLABORATOR_RELATION_ORDER',
            columnNames: ['order_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'order',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          {
            name: 'FK_ORDER_COLLABORATOR_RELATION_COLLABORATOR',
            columnNames: ['collaborator_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'collaborator',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('order_collaborator_relation', true);
  }
}
