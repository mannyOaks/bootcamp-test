import {MigrationInterface, QueryRunner} from "typeorm";

export class init1630273294158 implements MigrationInterface {
    name = 'init1630273294158'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`test_db\`.\`posts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`body\` varchar(100) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`test_db\`.\`posts\``);
    }

}
