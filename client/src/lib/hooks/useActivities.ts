import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Activity } from "../types";
import agent from "../api/agent";


export default function useActivities() {
    const queryClient = useQueryClient();

  const { data: activities, isPending } =  useQuery({
    queryKey: ["activities"],
    queryFn: async () => {
      const response = await agent.get<Activity[]>(
        "/api/Activities"
      );
      return response.data;
    },
  });

  const updateActivity = useMutation({
    mutationFn: async (activity: Activity)=>{
        await agent.put("/api/Activities", activity)
    },
    onSuccess: async ()=>{
        await queryClient.invalidateQueries({
            queryKey: ["activities"]
        })
    }
  }) 

  const createActivity = useMutation({
    mutationFn: async (activity: Activity)=>{
        await agent.post("/api/Activities", activity)
    },
    onSuccess: async ()=>{
        await queryClient.invalidateQueries({
            queryKey: ["activities"]
        })
    }
  }) 

  const deleteActivity = useMutation({
    mutationFn: async (id: string)=>{
        await agent.delete(`/api/Activities/${id}`)
    },
    onSuccess: async ()=>{
        await queryClient.invalidateQueries({
            queryKey: ["activities"]
        })
    }
  }) 

  return {activities, isPending, updateActivity, createActivity, deleteActivity}
}
