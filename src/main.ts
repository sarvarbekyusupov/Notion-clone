import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { join } from "path";
import { NestExpressApplication } from "@nestjs/platform-express";

async function start() {
  try {
    const PORT = process.env.PORT || 3030;
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.useGlobalPipes(new ValidationPipe());

    // Serve static files
    // app.useStaticAssets(join(__dirname, "..", "static"), {
    //   prefix: "/static",
    // });

    const config = new DocumentBuilder()
      .setTitle("Daftarim API")
      .setDescription(
        "Daftarim - Real Estate Management System API Documentation"
      )
      .setVersion("1.0")
      .addBearerAuth(
        {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          name: "JWT",
          description: "Enter JWT token",
          in: "header",
        },
        "JWT-auth"
      )
      .addTag("auth", "Authentication endpoints")
      .addTag("admin", "Admin management endpoints")
      .addTag("user", "User management endpoints")
      .addTag("properties", "Property management endpoints")
      .addTag("blocks", "Block management endpoints")
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document, {
      swaggerOptions: {
        persistAuthorization: true,
        docExpansion: "none",
        filter: true,
        showExtensions: true,
        showCommonExtensions: true,
      },
      customSiteTitle: "Daftarim API Documentation",
    });

    await app.listen(PORT);
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(
      `Swagger documentation available at http://localhost:${PORT}/api`
    );
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
}

start();
