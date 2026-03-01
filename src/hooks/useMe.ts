import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { EndPoints, Query_Keys } from "@/constants";
import type { UpdateProfilePayload } from "@/types/user";
import api from "@/lib/api";

export const useMe = () => {
  return useQuery({
    queryKey: [Query_Keys.Me],
    queryFn: async () => {
      const data = await api.get(EndPoints.Me);
      return data;
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: UpdateProfilePayload) => {
      const data = await api.patch(EndPoints.Me, payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Query_Keys.Me] });
    },
  });
};

export const useMyLoansProfile = (params?: {
  status?: "BORROWED" | "LATE" | "RETURNED";
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: [Query_Keys.MeLoans, params],
    queryFn: async () => {
      const data = await api.get(EndPoints.MeLoans, { params });
      return data;
    },
  });
};

export const useMyReviews = (params?: {
  q?: string;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: [Query_Keys.MeReviews, params],
    queryFn: async () => {
      const data = await api.get(EndPoints.MeReviews, { params });
      return data;
    },
  });
};
