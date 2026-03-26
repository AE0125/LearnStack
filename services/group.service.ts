import prisma from "@/lib/prisma"

export async function getGroups() {
  return prisma.group.findMany({
    include: {
      users: true,
    },
    orderBy: {
      code: "asc",
    },
  })
}

export async function createGroup(data: { code: string; color?: string }) {
  return prisma.group.create({
    data,
  })
}
