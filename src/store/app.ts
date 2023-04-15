import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { router } from '@/router'

export const useAppStore = defineStore('app', () => {
  const isCollapse = ref(false)
  function changeCollapse() {
    isCollapse.value = !isCollapse.value
  }

  const route = useRoute()
  const tabsValue = ref('Home')
  function changeTabsValue(val: string) {
    tabsValue.value = val
    if (route.name !== val)
      router.push({ name: val })
  }
  const tabsList = ref([
    {
      title: '首页',
      name: 'Home',
    },
  ])
  const removeTabs = (targetName: string) => {
    let nextTab
    if (tabsValue.value === targetName) {
      tabsList.value.forEach((tab, index) => {
        if (tab.name === targetName) {
          nextTab = tabsList.value[index + 1] || tabsList.value[index - 1]
        }
      })
    }
    tabsList.value = tabsList.value.filter(tab => tab.name !== targetName)
    if (nextTab) {
      changeTabsValue(nextTab.name)
    }
  }
  const addTabs = () => {
    if (route.meta?.title && route.name !== tabsValue.value && !route.meta?.hidden) {
      const isExist = tabsList.value.some(item => item.name === route.name)
      if (!isExist) {
        tabsList.value.push({
          title: route.meta?.title as string,
          name: route.name as string,
        })
      }
      changeTabsValue(route.name as string)
    }
  }
  return {
    isCollapse,
    changeCollapse,
    tabsValue,
    changeTabsValue,
    tabsList,
    addTabs,
    removeTabs,
  }
})
