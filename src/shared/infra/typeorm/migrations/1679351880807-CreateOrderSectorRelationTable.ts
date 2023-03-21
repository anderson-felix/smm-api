import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOrderSectorRelationTable1679351880807
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'order_sector_relation',
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
            name: 'sector_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'estimated_hours',
            type: 'varchar',
            isNullable: true,
            default: null,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'FK_ORDER_SECTOR_RELATION_ORDER',
            columnNames: ['order_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'order',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          {
            name: 'FK_ORDER_SECTOR_RELATION_SECTOR',
            columnNames: ['sector_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'sector',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('order_sector_relation', true);
  }
}
