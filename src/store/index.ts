import { defineStore } from "pinia";
import apiData from "../plugins/apiData.ts";
import { useRouter } from "vue-router";
import axios from "axios";

export const useDataStore = defineStore("data", {
  state: () => {
    return {
      fetchData: [],
      teamData: {},
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
  actions: {
    async getTeam() {
      try {
        await apiData.get("/team").then((data) => (this.teamData = data.data));
      } catch (err) {
        console.log(err);
      }
    },
    async add(item) {
      const router = useRouter();
      await apiData
        .post("/team", {
          id: Math.floor(Math.random() * 101),
          img: item.img,
          type: item.typeData,
        })
        .then((res) => {
          teamData.value = res.data;

          router.push("/team");
        });
    },
  },
});
