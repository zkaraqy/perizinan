import {
    CreationOptional,
    DataTypes,
    InferCreationAttributes,
    InferAttributes,
    Model,
    Sequelize
} from 'sequelize'

export class Pegawai extends Model<
    InferAttributes<Pegawai>,
    InferCreationAttributes<Pegawai>
> {
    declare id: CreationOptional<string>
    declare nama: string | null
    declare jenisKelamin: string | null
    declare tanggalLahir: string | null
    declare userId: string | null
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>

    static initModel(sequelize: Sequelize): typeof Pegawai {
        Pegawai.init({
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                unique: true,
                defaultValue: DataTypes.UUIDV4
            },
            nama: {
                type: DataTypes.STRING(255)
            },
            jenisKelamin: {
                type: DataTypes.STRING(255),
                // field: "jenis_kelamin",
            },
            tanggalLahir: {
                type: DataTypes.DATEONLY,
                // field: "tanggal_lahir",
            },
            userId: {
                type: DataTypes.STRING(255)
            },
            createdAt: {
                type: DataTypes.DATE,
                field: "createdAt"
            },
            updatedAt: {
                type: DataTypes.DATE,
                field: "updatedAt"
            }
        }, {
            sequelize,
            tableName: "pegawai",
            underscored: true
        })

        return Pegawai
    }
}