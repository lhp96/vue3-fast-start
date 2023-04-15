<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import MenuItem from './MenuItem.vue'
import { useAppStore } from '@/store/app'
import { routes } from '@/router'
const router = useRouter()
const appStore = useAppStore()

// 递归将路由的children遍历，过滤掉不需要的路由
const recursion = (menu: any) => {
  menu.forEach((item: any) => {
    if (item.children) {
      item.children = item.children.filter(
        (item: any) => !item?.meta?.hidden && item?.meta?.title,
      )
      recursion(item.children)
    }
  })
}

const menuList = computed(() => {
  const menu = (routes as any)
    .find((item: any) => item.path === '/').children
    .filter((item: any) => !item?.meta?.hidden && item?.meta?.title)
  recursion(menu)
  return menu
})

const activeMenu = computed(() => router.currentRoute.value?.name)
const isCollapse = computed(() => appStore.isCollapse)
</script>

<template>
  <!-- 菜单 -->
  <div class="menu">
    <el-aside
      :width="`${isCollapse ? '65px' : '200px'}`"
      :class="{ collapse: isCollapse }"
    >
      <!-- <Logo /> -->
      <div
        class="logo-container"
        @click="() => router.push({ name: 'Home' })"
      >
        <el-image
          class="logo"
          src="https://cn.vitejs.dev/logo.svg"
          alt="logo"
        />
        <span v-if="!isCollapse">管理系统</span>
      </div>
      <el-menu
        :unique-opened="true"
        :default-active="activeMenu"
        :collapse="isCollapse"
        background-color="#d9ecff"
      >
        <MenuItem :menu-list="menuList" />
      </el-menu>
    </el-aside>
  </div>
</template>

<style lang="less" scoped>
// 菜单栏颜色
@menu-color: #d9ecff;
.menu{
  background: @menu-color;
  .logo-container{
    height: 56px;
    display: flex;
    align-items: center;
    cursor: pointer;
    .logo{
      width: 32px;
      height: 32px;
      margin: 0 15px;
    }
  }
}
:deep(ul.el-menu--vertical){
  border: none;
  height: 100vh;
  overflow: auto;
}
</style>
