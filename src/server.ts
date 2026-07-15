import express from "express";
import { z } from "zod";
import { routeMessage } from "./router";

const app = express();
const bodySchema = z.object({ message: z.string().min(5) });

app.use(express.json());

app.get("/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.post("/route", (request, response) => {
  const parsed = bodySchema.safeParse(request.body);
  if (!parsed.success) {
    response.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  response.json(routeMessage(parsed.data.message));
});

app.listen(3000, () => {
  console.log("Support Intent Router listening on http://localhost:3000");
});
