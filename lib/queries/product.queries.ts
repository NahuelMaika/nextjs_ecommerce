import { prisma } from "@/db/prisma";
import { LATEST_PRODUCTS_LIMIT } from "@/lib/constants";
import { convertToPlainObject } from "../utils";

// Get the latest products (homepage feed)
export async function getLatestProducts() {
  const products = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: "desc" },
  });

  return convertToPlainObject(products);
}
