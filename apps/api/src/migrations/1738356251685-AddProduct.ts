import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProduct1738356251685 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE product (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                quantity INT NOT NULL,
                sku VARCHAR(255) NOT NULL,
                description TEXT,
                store VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE product;
        `);
  }
}
