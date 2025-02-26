import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useStore = create((set, get) => ({
    claims: [],
    searchedClaim: null,

    fetchClaims: async (agentID) => {

        try {
            const response = await axiosInstance.get(`/claims/agent/${agentID}`); // Replace with actual agentID
            set({ claims: response.data });
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    searchClaim: async (claimID) => {
        try {
            const response = await axiosInstance.get(`/claims/search/${claimID}`);
            set({ searchedClaim: response.data });
        } catch (error) {
            console.error('Error searching for claim:', error);
            set({ searchedClaim: null });
        }
    }

}));

