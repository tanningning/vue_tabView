<template>
  <div class="home">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <SideMenu :currentIndex="currentIndex" />
        <el-main>
          <div class="nav_tags">
            <ul>
              <li v-for="view in tagViewsList" :key="view.name">
                <span @click="goPage(view)">{{view.name}}</span>
                <i
                  v-if="tagViewsList.length>1"
                  class="tag_close el-icon-close"
                  @click="deletePage(view)"
                ></i>
              </li>
            </ul>
          </div>
          <keep-alive :include="cachedViews">
            <router-view />
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import SideMenu from "./menu.vue";
import { mapState } from "vuex";
import { mapActions } from "vuex";
export default {
  name: "home",
  components: {
    SideMenu
  },
  data() {
    return {
      currentIndex: "0"
    };
  },
  computed: {
    ...mapState({
      tagViewsList: state => state.tagViews.visitedViews,
      cachedViews: state => state.tagViews.cachedViews
    })
  },
  watch: {
    tagViewsList(newValue) {
      console.log("222", this.tagViewsList);
      let view = this.tagViewsList[this.tagViewsList.length - 1];
      if (this.$route.name === view.name) return;
      this.$router.push({
        path: view.path,
        query: view.query
      });
      this.currentIndex = view.query.currentIndex;
    }
  },
  methods: {
    ...mapActions("tagViews", [
      "addVisitedView",
      "deleteVisitedView",
      "addCachedView",
      "delCachedView"
    ]),
    goPage(view) {
      if (view.name === this.$route.name) return;
      console.log("view", view);
      this.$router.push({
        path: view.path,
        query: view.query
      });
      this.currentIndex = view.query.currentIndex;
    },
    deletePage(view) {
      this.deleteVisitedView(view);
      this.delCachedView(view);
    }
  },
  created() {
    let index = this.$route.query.currentIndex;
    if (index) {
      this.currentIndex = index;
    }
    let view = {
      name: this.$route.name,
      path: this.$route.path.replace("/", ""),
      query: this.$route.query
    };
    this.addVisitedView(view);
    this.addCachedView(view);
  }
};
</script>
<style lang="less" scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  padding: 0 !important;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.nav_tags {
  width: 100%;
  height: 30px;
  background: yellowgreen;
  ul {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    li {
      float: left;
      list-style: none;
      height: 100%;
      font-size: 14px;
      line-height: 30px;
      padding: 0 5px;
      background: yellow;
      color: red;
      text-align: center;
      cursor: pointer;
      border: 1px solid red;
      .tag_close {
        margin-left: 5px;
        color: #d3dce6;
        &:hover {
          color: aqua;
          transform: scale(1.5);
        }
      }
    }
  }
}
</style>
