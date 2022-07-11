import Mock from 'mockjs';
// 把JSON数据格式引进来
import banner from "./banner.json";
import floor from "./floor.json";

// mock数据 第一个参数：请求的地址 第二个参数：请求数据
Mock.mock("/mock/banner", { code: 200, data: banner }); //模拟首页大的轮播图
Mock.mock("/mock/floor", { code: 200, data: floor })