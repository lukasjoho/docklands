import { useQuery } from "@tanstack/react-query";
import { getUserName } from "./actions";
import { getCookie } from "cookies-next";

export default function useUserName() {
  const userIdCookie = getCookie("userId");
  const query = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserName({ cookieUserId: userIdCookie }),
  });
  return {
    username: query.data,
  };
}
