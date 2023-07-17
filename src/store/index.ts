import { defineStore } from 'pinia'

interface IHead{

    title: string|number;
    align: string;
    sortable: boolean;
    key: string | number,


}
export const useAlertsStore = defineStore('alerts', {
    state: ():IHead => (    [
        {title: 1, align: 'start', sortable: false, key: 'name',},
        { title: 'Team type', key: 'calories', sortable: false },
        { title: 'Description', key: 'fat', sortable: false },
        { title: 'Join Date', key: 'carbs', sortable: false },
        { title: 'Status', key: 'protein', sortable: false },
        { title: 'Actions', key: 'actions', sortable: false },]
    ),
})