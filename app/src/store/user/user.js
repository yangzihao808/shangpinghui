// 登录与注册模块
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from "@/API/index"
import { setToken, removeToken } from "@/utils/token"
const state = {
    code: "",
    token: localStorage.getItem("TOKEN"),
    userInfo: {}
};
const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        // 获取验证码的这个接口，把验证码返回，但是正常情况下后台把验证码发送到用户手机上
        let result = await reqGetCode(phone);
        if (result.code == 200) {
            commit("GETCODE", result.data)
            return "ok"
        } else {
            return Promise.reject(new Error("fail"))
        };
    },
    // 用户注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user);
        if (result.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new Error("fail"))
        }
    },
    // 登录业务（token）
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data);
        // 服务器下发token，用户唯一标识
        // 将来经常通过带token找服务器用户信息进行展示
        if (result.code == 200) {
            commit("USERLOGIN", result.data.token);
            return "ok",
                // 持久化存储token
                setToken(result.data.token)
        } else {
            return Promise.reject(new Error("fail"));
        }
    },
    // 获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo()
        if (result.code == 200) {
            commit("GETUSERINFO", result.data);
            return "ok"
        } else {
            return Promise.reject(new Error("fail"));
        }
    },
    // 退出登录
    async userLogout({ commit }) {
        // 只是像服务器发起一次请求，通知服务器清除token
        let result = await reqLogout();
        // action不能操作state，只能提交mutation修改state
        if (result.code == 200) {
            commit("CLEAR");
            return "ok"
        } else {
            return Promise.reject(new Error("fail"));
        }
    }
};
const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },
    USERLOGIN(state, token) {
        state.token = token;
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    // 清除本地数据
    CLEAR(state) {
        // 把仓库中的相关用户信息清空
        state.token = "";
        state.userInfo = {};
        // 把本地存储数据清空
        removeToken();
    }
};
const getters = {};
export default {
    state,
    actions,
    mutations,
    getters
}