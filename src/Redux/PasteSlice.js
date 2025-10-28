import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : []
}

export const PasteSlice = createSlice({
  name: 'Paste',
  initialState,
  reducers: {
    addTopastes: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste created successfully")
    },
    updateTopaste: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item)=>{
        return item._id === paste._id
      });
      if(index >= 0){
        state.pastes[index]= paste;

        localStorage.setItem("pastes", JSON.stringify(state.pastes));

        toast.success("Paste updated")
      } 
    },
    resetAllpaste: (state, action) => {
      state.pastes = [];

      localStorage.removeItem("pastes")
    },
    removeFrompastes: (state, action) => {
      const pastId = action.payload;

      console.log(pastId);
      const index = state.pastes.findIndex((item)=>{
        return item._id === pastId
      });

      if(index >= 0){
        state.pastes.splice(index, 1);

        localStorage.setItem("pastes", JSON.stringify(state.pastes));

        toast.success("Paste Deleted")
      }
    }
  },
})

export const { addTopastes, updateTopaste, resetAllpaste, removeFrompastes } = PasteSlice.actions

export default PasteSlice.reducer