import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  faclilites: [],
  selectedFacility: {},
};

export const facilitySlice = createSlice({
  name: 'facility',
  initialState,
  reducers: {
    storeFacilities: (state, { payload }) => {
      state.faclilites = payload;
    },
    selectFacility: (state, { payload }) => {
      state.selectedFacility = payload;
    },
  },
});

export const { storeFacilities, selectFacility } = facilitySlice.actions;
export default facilitySlice.reducer;
