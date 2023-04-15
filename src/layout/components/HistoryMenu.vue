<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/store/app'
const appStore = useAppStore()
const route = useRoute()
const changeTab = (name: string) => {
  appStore.changeTabsValue(name)
}

const removeTab = (targetName: string) => {
  appStore.removeTabs(targetName)
}
watch(
  () => route.fullPath,
  () => {
    appStore.addTabs()
  },
)
</script>

<template>
  <div class="tablist">
    <el-tabs
      v-model="appStore.tabsValue"
      type="card"
      class="tabs"
      @tab-remove="removeTab"
      @tab-change="changeTab"
    >
      <el-tab-pane
        v-for="(item, idx) in appStore.tabsList"
        :key="item.name"
        :name="item.name"
        :closable="idx !== 0"
      >
        <template #label>
          <span class="tabs-label">
            {{ item.title }}
          </span>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="less" scoped>
.tablist {
  display: flex;
  align-items: center;
  padding: 1px 6px 3px;
  border-top: 1px solid #ebeef5;
}
.tabs{
  height: 26px;
}
.tabs-label{
  padding: 0;
}
:deep(.el-tabs--card > .el-tabs__header){
  border-bottom: none;
}
:deep(.el-tabs--card>.el-tabs__header .el-tabs__nav){
  border: 1px solid var(--el-border-color-light);
}
:deep(.el-tabs__item){
  height: 26px;
  padding: 0 10px !important;
}
</style>
