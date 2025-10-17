import { PrismaClient } from "@prisma/client";

import { auth } from "~/server/auth";

const admin_email = process.env.ADMIN_EMAIL!;
const admin_password = process.env.ADMIN_PASSWORD!;

const prisma = new PrismaClient();

async function main() {
  const existUser = await prisma.user.findFirst({
    where: { email: admin_email },
  });

  if (!existUser) {
    const { user } = await auth.api.signUpEmail({
      body: {
        name: "MEETQY",
        email: admin_email,
        password: admin_password,
      },
    });

    await prisma.user.update({
      where: { id: user.id },
      data: { role: "admin" },
    });
  }
}

main().catch((e) => {
  console.error("Failed to seed database");
  console.error(e);
  process.exit(1);
});
