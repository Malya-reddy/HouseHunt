import { createSlice } from "@reduxjs/toolkit";

// Load user and token from localStorage on app load
const savedUser = JSON.parse(localStorage.getItem("user"));
const savedToken = localStorage.getItem("token");

const initialState = {
  user: savedUser || null,
  token: savedToken || null,
  listings: [], // for fetched properties if needed
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      // Save to localStorage too
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    setListings: (state, action) => {
      state.listings = action.payload.listings;
    },
    setTripList: (state, action) => {
      if (state.user) state.user.tripList = action.payload;
    },
    setWishList: (state, action) => {
      if (state.user) state.user.wishList = action.payload;
    },
    setPropertyList: (state, action) => {
      if (state.user) state.user.propertyList = action.payload;
    },
    setReservationList: (state, action) => {
      if (state.user) state.user.reservationList = action.payload;
    },
  },
});

// Export actions
export const {
  setLogin,
  setLogout,
  setListings,
  setTripList,
  setWishList,
  setPropertyList,
  setReservationList,
} = userSlice.actions;

// Export reducer
export default userSlice.reducer;
