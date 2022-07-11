import { reqGetSearchInfo } from "@/API"
// search模块的小仓库
const state = {
    searchList: {}
};
const actions = {
    // 获取search模块
    async getSearchList({ commit }, params = {}) {
        //    params形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
        let result = await reqGetSearchInfo(params)
        if (result.code == 200) {
            commit("GETSEARCHLIST", result.data)
        }
    }
};
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
};
//项目当中，getters主要的作用是：简化仓库中的数据（简化数据而生）
// 可以把我们将来在组件中需要用的数据简化一下【将来组件在获取数据的时候就方便了】
const getters = {
    // 当前形参state，是当前仓库中的state，并非大仓库中的state
    goodsList(state) {
        // state.searchList.goodsList如果服务器数据回来了，没问题是一个数组，
        // 假如网络不给力|没有网state.searchList.goodsList应该返回的是undefined
        return state.searchList.goodsList || [];
    },
    attrsList(state) {
        return state.searchList.attrsList || [];
    },
    trademarkList(state) {
        return state.searchList.trademarkList || [];
    },
    totalPages(state) {
        return state.searchList.totalPages || [];
    }
};
export default {
    state,
    mutations,
    actions,
    getters,
}