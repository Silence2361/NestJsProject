import { NestFactory} from "@nestjs/core"
import { AppModule } from "./app.module"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { JwtAuthGuard } from "./auth/jwt-auth.guard"
import { ValidationPipe } from "@nestjs/common"
import { Sequelize } from 'sequelize-typescript'

async function start(){
    const PORT = process.env.PORT || 5000
    const app = await NestFactory.create(AppModule)

    const config = new DocumentBuilder()
        .setTitle("Nest.js project")
        .setDescription("Documentation of Project")
        .setVersion('1.0.0')
        .addTag('Mammet')
        .addBearerAuth()
        .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/docs', app, document)

    app.useGlobalPipes(new ValidationPipe())

    const sequelize = app.get(Sequelize);
    await sequelize.sync()


    await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`))
}

start()