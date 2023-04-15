<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'
import { useRouter } from 'vue-router'

const props = defineProps({
  menuList: {
    type: Array<any>,
    required: true,
  },
})

const router = useRouter()
const navigateTo = (route: RouteRecordRaw) => {
  router.push(route)
}
</script>

<template>
  <template v-for="(item, idx) in menuList">
    <el-menu-item
      v-if="!item?.children?.length"
      :key="item.name"
      :index="item.name"
      @click="navigateTo(item)"
    >
      <el-icon>
        <component :is="item?.meta?.icon" />
      </el-icon>
      <template #title>
        <span> {{ item.meta.title }}</span>
      </template>
    </el-menu-item>
    <el-sub-menu
      v-else
      :key="idx"
      :index="item.name"
    >
      <template #title>
        <el-icon>
          <component :is="item?.meta?.icon" />
        </el-icon>
        <span> {{ item.meta.title }}</span>
      </template>
      <MenuItem :menu-list="item?.children" />
    </el-sub-menu>
  </template>
</template>
