import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCollaboratorTable1679340306989
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'collaborator',
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
            name: 'password',
            type: 'varchar',
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
            name: 'hourly_price',
            type: 'varchar',
            isNullable: true,
            default: null,
          },
          {
            name: 'address',
            type: 'json',
            isNullable: true,
            default: null,
          },
          {
            name: 'recent_flags',
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
            name: 'FK_COLLABORATOR_USER_CREATOR',
            columnNames: ['created_by'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
        ],
        indices: [
          {
            name: 'UQ_COLLABORATOR_EMAIL',
            columnNames: ['email'],
            where: 'deleted_at is null',
            isUnique: true,
          },
          {
            name: 'UQ_COLLABORATOR_FEDERAL_DOCUMENT',
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
    await queryRunner.dropTable('collaborator', true);
  }
}
