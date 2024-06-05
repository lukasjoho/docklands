"use server";

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
  const dbLocation = await prisma.location.create({
    data: {
      name: location.name,
      lat: location.lat,
      lng: location.lng,
      placeId: location.placeId,
      user: {
        create: {
          name: user.name,
          image: user.imageUrl,
          cookieUserId: user.cookieUserId,
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
