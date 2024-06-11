"use server";

import { revalidatePath } from "next/cache";
import prisma from "./prisma";

export async function getLocations() {
  const locations = await prisma.location.findMany({
    include: {
      user: true,
    },
  });
  return locations;
}

export async function createLocation({
  user,
  location,
}: {
  user: {
    name: string;
    imageUrl?: string;
    cookieUserId?: string;
  };
  location: { lat: number; lng: number; name: string; placeId: string };
}) {
  const dbUser = await prisma.user.upsert({
    where: {
      cookieUserId: user.cookieUserId,
    },
    update: {
      name: user.name,
      image: user.imageUrl,
    },
    create: {
      name: user.name,
      image: user.imageUrl,
      cookieUserId: user.cookieUserId,
    },
  });
  const dbLocation = await prisma.location.create({
    data: {
      name: location.name,
      lat: location.lat,
      lng: location.lng,
      placeId: location.placeId,
      user: {
        connect: {
          id: dbUser.id,
        },
      },
    },
    include: {
      user: true,
    },
  });
  return dbLocation;
}

export async function deleteUser({ id }: { id: string }) {
  const user = await prisma.user.delete({
    where: {
      id,
    },
  });
  return user;
}

export async function createMessage({
  text,
  cookieUserId,
}: {
  text: string;
  cookieUserId?: string;
}) {
  const message = await prisma.message.create({
    data: {
      text,
      cookieUserId,
    },
  });
  return message;
}

export async function upsertUser({
  cookieUserId,
  name,
}: {
  cookieUserId: string;
  name: string;
}) {
  const user = await prisma.user.upsert({
    where: {
      cookieUserId: cookieUserId,
    },
    update: {
      name,
      registered: true,
    },
    create: {
      name,
      cookieUserId,
      registered: true,
    },
  });
  return user;
}

export async function getUserName({ cookieUserId }: { cookieUserId?: string }) {
  if (!cookieUserId) return;
  const user = await prisma.user.findUnique({
    where: {
      cookieUserId,
    },
  });
  if (!user) return null;
  return user.name;
}
