import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPhoneNumberToUser1793330677928 implements MigrationInterface {
    name = 'AddPhoneNumberToUser1793330677928'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Safe check or just skip if your entity already defines it in InitialSchema
        const table = await queryRunner.getTable("users");
        const column = table?.findColumnByName("phoneNumber");
        if (!column) {
            await queryRunner.query(`ALTER TABLE \`users\` ADD \`phoneNumber\` varchar(20) NULL`);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`phoneNumber\``);
    }
}