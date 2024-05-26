import express, { Request, Response } from "express";
import cors from "cors";
import UserRouter from "./routes/user.route";
import { prisma } from "./database";

const app = express();
const port = process.env.PORT ?? 3000;
async function main() {
  app.use(express.json());
  app.use(cors());
  app.use("/users", UserRouter);

  app.all("*", (req: Request, res: Response) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found` });
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

main()
  .then(async () => {
    await prisma.$connect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
