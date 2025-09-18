import { PrismaClient } from "@prisma/client";
import imageData from "~/data/image.json";

const prisma = new PrismaClient();
interface Image {
  id: number;
  keyword_en: string;
  createdAt: Date;
  updatedAt: Date;
}

async function main() {
  // Seed your database here
  (imageData as Image[]).forEach((image) => {
    const name = (image.keyword_en || "").trim();
    if (!image.id || !name) return;
    // 排除汉字
    if (/[^\u0000-\u00ff]/.test(name)) return;

    void prisma.image
      .create({
        data: {
          id: image.id,
          name: image.keyword_en,
          createdAt: image.createdAt,
          updatedAt: image.updatedAt,
        },
      })
      .then();
  });
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
