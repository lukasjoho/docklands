import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createLocation, deleteUser, getLocations } from "./actions";
import { toast } from "sonner";
import { Prisma } from "@prisma/client";
import { nanoid } from "nanoid";

const QUERY_KEY = "userLocations";

export default function useLocations() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createLocation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Dein Ort wurde hinzugefügt.");
    },
    onError: () => {
      toast.error("Fehler. Dein Ort konnte nicht gespeichert werden.");
    },
    onMutate: async (location) => {
      const userId = nanoid();
      const newLocation: Prisma.LocationGetPayload<{
        include: { user: true };
      }> = {
        id: nanoid(),
        name: location.location.name,
        lat: location.location.lat,
        lng: location.location.lng,
        placeId: location.location.placeId,
        createdAt: new Date().toISOString() as unknown as Date,
        updatedAt: new Date().toISOString() as unknown as Date,
        userId: userId,
        user: {
          id: userId,
          cookieUserId: location.user.cookieUserId || null,
          name: location.user.name,
          image: location.user.imageUrl || null,
          registered: false,
          createdAt: new Date().toISOString() as unknown as Date,
          updatedAt: new Date().toISOString() as unknown as Date,
        },
      };

      await queryClient.cancelQueries({ queryKey: [QUERY_KEY] });
      const previousUserLocations = queryClient.getQueryData([QUERY_KEY]);
      queryClient.setQueryData(
        [QUERY_KEY],
        (
          old: Prisma.LocationGetPayload<{
            include: { user: true };
          }>[]
        ) => [...old, newLocation]
      );
      return { previousUserLocations };
    },
  });
  const query = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => getLocations(),
  });

  const userDeleteMutation = useMutation({
    mutationFn: (id: string) => deleteUser({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      toast.success("Dein Ort wurde entfernt.");
    },
    onError: () => {
      toast.error("Fehler. Dein Ort konnte nicht entfernt werden.");
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY] });
      const previousUserLocations = queryClient.getQueryData([QUERY_KEY]);
      queryClient.setQueryData(
        [QUERY_KEY],
        (
          old: Prisma.LocationGetPayload<{
            include: { user: true };
          }>[]
        ) => old.filter((location) => location.user.id !== id)
      );
      return { previousUserLocations };
    },
  });
  return {
    locations: query.data,
    addLocation: mutation.mutate,
    removeUser: userDeleteMutation.mutate,
  };
}
