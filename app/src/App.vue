<template>
  <div>
    <Header />
    <router-view></router-view>
    <!-- 在Home、Search是显示的，在登陆、注册是隐藏的 -->
    <Footer v-show="$route.meta.show" />
  </div>
</template>

<script>
import Header from "../src/components/Header";
import Footer from "./components/Footer/index.vue";
export default {
  name: "App",
  components: { Header, Footer },
  mounted() {
    // 派发一个action ，获取商品分类的三级列表的数据
    this.$store.dispatch("categoryList");
  },
};
</script>