// likedPlaylist:[],
// watchLaterPlaylist:[],
// historyPlaylist:[],
export const reducerFun = (state, action) => {
  switch (action.type) {
    case "ADD_TO_WATCHLATER":
      return {
        ...state,
        watchLaterPlaylist: [
          ...state.watchLaterPlaylist,
          { ...action.payload },
        ],
      };

    case "REMOVE_FROM_WATCHLATER":
      return {
        ...state,
        watchLaterPlaylist: state.watchLaterPlaylist.filter(
          (item) => item._id !== action.payload._id
        ),
      };

    case "ADD_TO_LIKED":
      return {
        ...state,

        likedPlaylist: [...state.likedPlaylist, { ...action.payload }],
      };

    case "REMOVE_FROM_LIKED":
      return {
        ...state,

        likedPlaylist: state.likedPlaylist.filter(
          (item) => item._id !== action.payload._id
        ),
      };
    case "ADD_TO_HISTORY":
      return {
        ...state,
        historyPlaylist: [...state.historyPlaylist, { ...action.payload }],
      };
    case "REMOVE_FROM_HISTORY":
      return {
        ...state,
        historyPlaylist: state.historyPlaylist.filter(
          (item) => item._id !== action.payload._id
        ),
      };

    case "CLEAR_ALL_HISTORY":
      return {
        ...state,
        historyPlaylist: [],
      };

    default:
      break;
  }
};
