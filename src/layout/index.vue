<script setup lang="ts">
import Navbar from '@/layout/components/Navbar.vue'
import LeftMenu from '@/layout/components/LeftMenu.vue'
import HistoryMenu from '@/layout/components/HistoryMenu.vue'
</script>

<template>
  <main class="layout">
    <LeftMenu />
    <section class="right">
      <div class="header">
        <Navbar />
        <HistoryMenu />
      </div>
      <div class="main">
        <router-view v-slot="{ Component, route }">
          <component :is="Component" :key="route.fullPath" />
        </router-view>
      </div>
    </section>
  </main>
</template>

<style lang="less" scoped>
.layout {
  display: flex;
  height: 100%;
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    .header {
      display: flex;
      flex-direction: column;
      background-color: #fff;
      border-bottom: 1px solid #ebeef5;
    }
    .main {
      flex: 1;
      overflow: auto;
      padding: 10px;
      background:  #fbfbfb;
    }
  }
}
</style>
