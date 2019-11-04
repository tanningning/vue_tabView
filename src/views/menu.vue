<template>
  <el-aside class="daohang">
    <el-menu :default-active="currentIndex" class="el-menu-vertical-demo">
      <el-menu-item
        :index="menu.index"
        v-for="(menu,index) in menuList"
        :key="menu.index"
        @click="goPage(menu)"
      >
        <i :class="menu.icon"></i>
        <span slot="title">{{menu.name}}</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
import menuList from "./menu.js";
import { mapActions } from "vuex";
export default {
  name: "side-menu",
  props: {
    currentIndex: {
      type: String,
      default: "0"
    }
  },
  data() {
    return {
      menuList
    };
  },
  methods: {
    ...mapActions("tagViews", ["addVisitedView", "addCachedView"]),
    goPage(menu) {
      let view = {
        name: menu.name,
        path: menu.path,
        query: {
          currentIndex: menu.index
        }
      };
      this.addVisitedView(view);
      this.addCachedView(view);
      if (menu.name === this.$route.name) return;
      this.$router.push({
        path: menu.path,
        query: {
          currentIndex: menu.index
        }
      });
    }
  },
  created() {
    console.log("menuList", this.currentIndex);
  }
};
</script>

<style>
.daohang {
  width: 200px;
  height: 90vh;
}
</style>