import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/API";
// 封装游客身份模块uuid ---> 生成一个随机字符串（不能变了）
import { getUUID } from "@/utils/uuid_token"
const state = {
    goodInfo: {},
    // 游客临时身份
    uuid_token: getUUID()
};
const actions = {
    // 获取产品信息的action
    async getGoodInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId);
        if (result.code == 200) {
            commit("GETGOODINFO", result.data);
        }
    },
    // 将产品添加到购物车中
    async addUpdateShopCart({ commit }, { skuId, skuNum }) {
        // 加入购物车的解构
        // 加入购物车以后发请求，前台将参数带给服务器
        // 服务器写入数据成功，并没有返回其他的数据，只是返回code=200，代表这次操作成功
        // 因为服务器并没有返回其他其余数据，因此我们不需要三连环数据
        let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        // 代表服务器加入购物车成功
        if (result.code == 200) {
            return "ok"
        } else {
            // 代表加入购物车失败
            return Promise.reject(new Error("fail"));
        }
    },
};
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo;
    }
};
// 简化数据而生
const getters = {
    // 路径导航简化的信息
    categoryView(state) {
        // 当前计算出的categoryView的属性值至少是一个空对象，假的报错就不会有了
        return state.goodInfo.categoryView || {};
    },
    // 简化产品信息的数据
    skuInfo(state) {
        return state.goodInfo.skuInfo || {};
    },
    // 产品售卖属性的变化
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || [];
    }
};
export default {
    state,
    actions,
    mutations,
    getters
}