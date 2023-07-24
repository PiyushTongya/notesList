 import {watch}  from "vue"
export function useCharactersLimit(value,limit){
    watch(value,(newValue,oldValue)=>{
        if(newValue.length === limit) {
          alert(`sorry !! more than ${limit} char are not allowed`)
        }
      })
}