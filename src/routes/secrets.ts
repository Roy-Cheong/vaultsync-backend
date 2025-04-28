import { Router } from "express";
import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// GET /api/secrets
router.get("/", async (req: Request, res: Response) => {
  try {
    const secrets = await prisma.secret.findMany();
    res.json(secrets);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch secrets" });
  }
});

// POST /api/secrets
router.post("/", async (req: Request, res: Response): Promise<void> => {
    const { name, value, expiresIn } = req.body;
    if (!name || !value) {
      res.status(400).json({ error: "Name and value are required" });
      return;
    }
    try {
      const secret = await prisma.secret.create({
        data: { name, value, expiresIn },
      });
      res.status(201).json(secret);
    } catch (error) {
      res.status(500).json({ error: "Failed to create secret" });
    }
  });
  

// PUT /api/secrets/:id
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, value, expiresIn } = req.body;
  try {
    const updated = await prisma.secret.update({
      where: { id: Number(id) },
      data: { name, value, expiresIn },
    });
    res.json(updated);
  } catch (error) {
    res.status(404).json({ error: "Secret not found" });
  }
});

// DELETE /api/secrets/:id
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.secret.delete({ where: { id: Number(id) } });
    res.json({ message: "Secret deleted" });
  } catch (error) {
    res.status(404).json({ error: "Secret not found" });
  }
});

export default router;
