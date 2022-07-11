// 引入
import { reqCategoryList, reqGetBannerList, reqFloorList } from '@/API';
// home模块的小仓库
const state = {
    // state中数据默认初始值别瞎写，服务器返回的是对象，返回的就是对象【根据接口返回值初始化】
    categoryList: [],
    // 轮播图的数据
    bannerList: [],
    // floor的数据
    floorList: []
};
const actions = {
    async categoryList({ commit }) {
        // 通过api里面的接口函数进行调用，向服务器发请求，获取服务器的数据
        let result = await reqCategoryList()
        if (result.code == 200) {
            commit("CATEGORYLIST", result.data);
        }
        state.categoryList.length = 15
    },
    // 获取首页轮播图的数据
    async getBannerList({ commit }) {
        let result = await reqGetBannerList();
        if (result.code == 200) {
            commit("GETBANNERLIST", result.data)
        }
    },
    async getFloorList({ commit }) {
        let result = await reqFloorList();
        if (result.code == 200) {
            commit("GETFLOORLIST", result.data)
        }
    }
};
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList
    }
}

const getters = {};
export default {
    state,
    mutations,
    actions,
    getters,
}