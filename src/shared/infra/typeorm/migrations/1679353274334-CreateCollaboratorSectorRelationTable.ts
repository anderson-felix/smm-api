import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCollaboratorSectorRelationTable1679353274334
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'collaborator_sector_relation',
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
            name: 'sector_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'FK_COLLABORATOR_SECTOR_RELATION_COLLABORATOR',
            columnNames: ['collaborator_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'collaborator',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          {
            name: 'FK_COLLABORATOR_SECTOR_RELATION_SECTOR',
            columnNames: ['sector_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'sector',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('collaborator_sector_relation', true);
  }
}
