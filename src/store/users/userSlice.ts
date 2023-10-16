import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from '@types';

const usersSlice = createSlice({
  name: 'users',
  initialState: [] as UserType[],
  reducers: {
    setUsers: (state, action: PayloadAction) => {
      return action.payload;
    },
    updateUser: (state, action: PayloadAction<UserType>) => {
      const updatedUser = action.payload;
      const index = state.findIndex((user) => user.id === updatedUser.id);

      if (index !== -1) {
        state[index] = updatedUser;
      }
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      const userId = action.payload;
      return state.filter((user) => user.id !== userId);
    },
  },
});

export const { setUsers, updateUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
