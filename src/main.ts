import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function main() {
  const port = 4000;
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  console.log(`Server running and listening on port ${port}`);
}
main();
