export const addAsyncReducers = (builder, asyncThunks) => {
    asyncThunks.forEach(({ asyncThunk, stateKey }) => {
      builder
        .addCase(asyncThunk.pending, (state) => {
          state[`${stateKey}Loading`] = true;
        })
        .addCase(asyncThunk.fulfilled, (state, action) => {
          state[stateKey] = action.payload;
          state[`${stateKey}Loading`] = false;
        })
        .addCase(asyncThunk.rejected, (state) => {
          state[stateKey] = [];
          state[`${stateKey}Loading`] = false;
        });
    });
  };
  