import { defineStore } from 'pinia'
 
export const useGeneralInfoStore = defineStore( 'general_info',{
    
  state: () => ({
    general_infos: {},
  }),

  getters:{
    getGeneralInfos: (state)  =>  state.general_infos
  },

  actions:{
    async fetchGeneralInfos(){
        try {
           const {data} = await useMyFetch( 'general-info',{
              key: 'general_info'
            })

            if(data.value){
              this.general_infos = data.value
            }
          
        } catch (error) {
            return error;
        }
    }
  },
  // prefetch({ store }) {
  //   return store.setGeneralInfos()}
  
})