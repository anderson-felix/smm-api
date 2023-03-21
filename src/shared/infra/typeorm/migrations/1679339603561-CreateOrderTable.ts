import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { orderStatusArray } from '@modules/order/enums/OrderStatusEnum';

export class CreateOrderTable1679339603561 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'order',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'created_by',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'customer_id',
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
            name: 'status',
            type: 'enum',
            enum: orderStatusArray,
          },
          {
            name: 'files',
            type: 'json',
            default: `'[]'`,
          },
          {
            name: 'flags',
            type: 'json',
            default: `'[]'`,
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
            default: null,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'FK_ORDER_USER_CREATOR',
            columnNames: ['created_by'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
          {
            name: 'FK_ORDER_CUSTOMER',
            columnNames: ['customer_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'customer',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('order', true);
  }
}
