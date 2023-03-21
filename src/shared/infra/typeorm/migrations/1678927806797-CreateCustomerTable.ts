import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCustomerTable1678927806797 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'customer',
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
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
            default: null,
          },
          {
            name: 'federal_document',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'phone',
            type: 'varchar',
          },
          {
            name: 'address',
            type: 'json',
            isNullable: true,
            default: null,
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
            name: 'FK_CUSTOMER_USER_CREATOR',
            columnNames: ['created_by'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
        ],
        indices: [
          {
            name: 'UQ_CUSTOMER_EMAIL',
            columnNames: ['email'],
            where: 'deleted_at is null',
            isUnique: true,
          },
          {
            name: 'UQ_CUSTOMER_FEDERAL_DOCUMENT',
            columnNames: ['federal_document'],
            where: 'deleted_at is null',
            isUnique: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('customer', true);
  }
}
