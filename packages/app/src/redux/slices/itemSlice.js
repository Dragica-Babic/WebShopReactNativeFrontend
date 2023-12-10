import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ItemService from "../../services/ItemService.service";

const setPage = (state, action) => {
    state.page = action.payload;
}

const setAPage = (state, action) => {
    state.activeOffersPage = action.payload;
}

const setFPage = (state, action) => {
    state.finishedOffersPage = action.payload;
}

const setHPage = (state, action) => {
    state.purchasedOffersPage = action.payload;
}

const removeItem = (state, action) => {
    state.activeOffers = state.activeOffers.filter(item => action.payload !== item);
}

export const getAllItems = createAsyncThunk("getAllItems", async ({ searchTerm, categoryId, lowerPrice, upperPrice, location }, { getState }) => {
    try {
        const state = getState();
        const page = state.items.page;
        return await ItemService.getItems({ page, searchTerm, categoryId, lowerPrice, upperPrice, location });
    } catch (error) {
        console.log(error);
    }
})

export const getActiveOffers = createAsyncThunk("getActiveOffers", async ({ userId }, { getState }) => {
    try {
        const state = getState();
        const page = state.items.activeOffersPage;
        return await ItemService.getActiveOffers({ page, userId });
    } catch (error) {
        console.log(error);
    }
})

export const getFinishedOffers = createAsyncThunk("getFinishedOffers", async ({ userId }, { getState }) => {
    try {
        const state = getState();
        const page = state.items.finishedOffersPage;
        return await ItemService.getFinishedOffers({ page, userId });
    } catch (error) {
        console.log(error);
    }
})

export const getHistory = createAsyncThunk("getHistory", async ({ userId }, { getState }) => {
    try {
        const state = getState();
        const page = state.items.purchasedOffersPage;
        return await ItemService.getHistory({ page, userId });
    } catch (error) {
        console.log(error);
    }
})

const itemSlice = createSlice({
    name: 'items',
    initialState: {
        page: 0,
        totalPages: 0,
        activeTotal: 0,
        finishedTotal: 0,
        historyTotal: 0,
        activeOffersPage: 0,
        finishedOffersPage: 0,
        purchasedOffersPage: 0,
        loading: false,
        items: [],
        activeOffers: [],
        finishedOffers: [],
        purchasedOffers: []
    },
    reducers: {
        setPageValue: setPage,
        setActivePage: setAPage,
        setFinishedPage: setFPage,
        setHistoryPage: setHPage,
        deleteItem: removeItem
    },
    extraReducers: (builder) => {
        builder.addCase(getAllItems.pending, (state, acton) => {
            state.loading = true;
        })
            .addCase(getAllItems.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(getAllItems.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.content;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(getActiveOffers.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getActiveOffers.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(getActiveOffers.fulfilled, (state, action) => {
                state.loading = false;
                state.activeOffers = action.payload.content;
                state.activeTotal = action.payload.totalPages;
            })
            .addCase(getFinishedOffers.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getFinishedOffers.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(getFinishedOffers.fulfilled, (state, action) => {
                state.loading = false;
                state.finishedOffers = action.payload.content;
                state.finishedTotal = action.payload.totalPages;
            })
            .addCase(getHistory.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getHistory.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(getHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.purchasedOffers = action.payload.content;
                state.historyTotal = action.payload.totalPages;
            })
    }
})

export const { setPageValue } = itemSlice.actions;
export const { setActivePage } = itemSlice.actions;
export const { setFinishedPage } = itemSlice.actions;
export const { setHistoryPage } = itemSlice.actions;
export const { deleteItem } = itemSlice.actions;
export default itemSlice.reducer;