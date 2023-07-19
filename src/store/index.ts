import { defineStore } from "pinia";

export const useDataStore = defineStore("data", {
  state: () => {
    return {
      data: [
        {
          id: 1,
          name: "staff",
          icon: "mdi-account-multiple",
          route: "/",
        },
        {
          id: 2,
          name: "team",
          icon: "mdi-account-multiple",
          route: "/team",
        },
      ],
    };
  },
});
