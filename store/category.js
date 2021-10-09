export const state = () => ({
  category: []
})

export const mutations = {
  SET_CATEGORY_LIST: (state, data) => {
    state.category = data;
  },
}

export const actions = {
  CATEGORY_LIST({commit}) {
    return new Promise((resolve, reject) => {
      this.$axios.get("/api/category")
        .then(({data}) => {
          commit('SET_CATEGORY_LIST', data);
          resolve();
        })
        .catch(error => {
          reject(error)
        })
    });
  },
}

export const getters = {
  categoryList: state => state.category,
}
