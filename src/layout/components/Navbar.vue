<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/store/app'
const appStore = useAppStore()
const titleList = computed(() => useRoute().matched)
const avatar = 'https://cn.vitejs.dev/logo.svg'
const userName = 'admin'
const goUserInfo = () => {
  console.log('goUserInfo')
}
const signOut = () => {
  console.log('signOut')
}
</script>

<template>
  <div>
    <el-header class="navbar">
      <div class="box-left">
        <div class="collapse_box" @click="() => appStore.changeCollapse()">
          <el-icon :size="18">
            <expand v-if="appStore.isCollapse" />
            <fold v-else />
          </el-icon>
        </div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <transition-group name="breadcrumb" mode="out-in">
            <template v-for="item in titleList" :key="item.name">
              <el-breadcrumb-item :to="{ name: item.name }">
                {{ item.meta?.title }}
              </el-breadcrumb-item>
            </template>
          </transition-group>
        </el-breadcrumb>
      </div>
      <div class="box-right">
        <ul>
          <li>2</li>
          <li>3</li>
          <li>
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <el-avatar shape="square" :size="34" :src="avatar" style="background-color: #fff;" />
                {{ userName }}
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="goUserInfo">个人中心</el-dropdown-item>
                  <el-dropdown-item @click="signOut">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </li>
        </ul>
      </div>
    </el-header>
  </div>
</template>

<style lang="less" scoped>
.navbar {
  display: flex;
  height: 48px;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 0 10px;
  .box-left {
    display: flex;
    align-items: center;
    .collapse_box {
      display: flex;
      cursor: pointer;
      margin-right: 10px;
    }
    .breadcrumb-enter-active,
    .breadcrumb-leave-active {
      transition: all 0.3s;
      opacity: 0;
      transform: translateX(20px);
    }
  }
  .collapse_box {
    cursor: pointer;
  }

  .box-right{
    ul{
      list-style-type: none;
      padding: 0;
      display: flex;
      align-items: center;
      li{
        height: 48px;
        line-height: 48px;
        padding: 0 10px;
        display: flex;
        cursor: pointer;
      }
      li:hover{
        background-color: #f6f6f6;
      }
    }
    .el-dropdown-link{
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 16px;
      font-weight: 500;
      color: #000;
    }
  }
}
</style>
