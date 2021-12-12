import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
import diagnoses from "./routes/diagnoses";
import patients from "./routes/patients";

import express, { Request, Response } from "express";

import cors from "cors";

const app = express();

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());

app.get("/", (_req: never, res: Response) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req: Request, res: Response) => {
  const { height, weight } = req.query;

  const bmi = calculateBmi(Number(height), Number(weight));

  if (!height || !weight) {
    res.json({
      error: "malformatted parameters",
    });
  } else {
    res.json({ height, weight, bmi });
  }
});

app.post("/exercises", (req: Request, res: Response) => {
  interface InputData {
    daily_exercises: Array<number>;
    target: number;
  }

  const { daily_exercises, target } = req.body as InputData;

  const result = calculateExercises(daily_exercises, target);

  if (!daily_exercises || !target) {
    res.json({ error: "parameters missing" });
  } else if (typeof daily_exercises != "object" || typeof target != "number") {
    res.json({ error: "malformatted parameters" });
  } else {
    res.json(result);
  }
});

app.get("/api/ping", (_req: Request, res: Response) => {
  res.json({ message: "something" });
});

app.use("/api/diagnoses", diagnoses);
app.use("/api/patients", patients);

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
