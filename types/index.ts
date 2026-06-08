import { z } from "zod";
import { insertProductSchema } from "@/lib/validator";

export type Product = z.infer<typeof insertProductSchema> & {
  //Esto es para que siempre tenga lo del validador de zod y no tener que repetir los campos
  id: string;
  rating: string;
  createdAt: Date;
};
