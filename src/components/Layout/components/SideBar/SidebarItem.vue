<template>
  <div
    v-if="!item.meta || !item.meta.hidden"
    :class="[
      isCollapse ? 'simple-mode' : 'full-mode',
    ]"
  >
    <template v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children">
      <router-link v-if="theOnlyOneChild.meta && theOnlyOneChild.meta.title" :to="theOnlyOneChild.path">
        <el-menu-item :style="{'min-width': sideBarWidth}" :index="theOnlyOneChild.path">
          <SidebarItemLink v-if="theOnlyOneChild.meta" :icon="theOnlyOneChild.meta.icon " :title="theOnlyOneChild.meta.title" :iconType="theOnlyOneChild.meta.iconType"  />
        </el-menu-item>
      </router-link>
    </template>
    <el-sub-menu v-else :index="item.path">
      <template #title>
        <SidebarItemLink v-if="item.meta" :icon="item.meta.icon " :title="item.meta.title" :iconType="item.meta.iconType" />
      </template>
      <template v-if="item.children">
        <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :is-collapse="isCollapse"
          class="nest-menu"
        />
      </template>
    </el-sub-menu>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import SidebarItemLink from './SidebarItemLink.vue'
export default defineComponent({
  props: {
    item: {
      type: Object as PropType<RouteRecordRaw>,
      required: true
    },
    isCollapse: {
      type: Boolean,
      required: false
    },
    sideBarWidth: {
      type:String,
      default:'300px'
    },
  },
  components: {
    SidebarItemLink
  },
  setup(props) {
    const alwaysShowRootMenu = computed(() => {
      if (props.item.meta && props.item.meta.alwaysShow) {
        return true
      } else {
        return false
      }
    })

    const showingChildNumber = computed(() => {
      if (props.item.children) {
        const showingChildren = props.item.children.filter((item) => {
          if (item.meta && item.meta.hidden) {
            return false
          } else {
            return true
          }
        })
        return showingChildren.length
      }
      return 0
    })

    const theOnlyOneChild = computed(() => {
      if (showingChildNumber.value > 1) {
        return null
      }
      if (props.item.children) {
        for (const child of props.item.children) {
          if (!child.meta || !child.meta.hidden) {
            return child
          }
        }
      }
      // If there is no children, return itself with path removed,
      // because this.basePath already conatins item's path information
      return { ...props.item}
    })

    return {
      alwaysShowRootMenu,
      showingChildNumber,
      theOnlyOneChild
    }
  }
})
</script>

<style lang="scss" scoped>
.el-menu-item.is-active{
  background-color: $menuActiveBg;
}
.full-mode {
  .el-menu-item{
    &>span{
      display: inline-block;
      padding-left: 5px;
    }
  }
  .el-submenu {
    overflow: hidden;

    & > .el-submenu__title {
      .el-submenu__icon-arrow {
        display: none;
      }

      & > span {
        padding-left: 5px;
      }
    }
  }
}

.simple-mode {
  &.first-level {
    .submenu-title-noDropdown {
      padding: 0 !important;
      position: relative;

      .el-tooltip {
        padding: 0 !important;
      }
    }

    .el-submenu {
      overflow: hidden;

      & > .el-submenu__title {
        padding: 0px !important;

        .el-submenu__icon-arrow {
          display: none;
        }

        & > span {
          visibility: hidden;
        }
      }
    }
  }
}
</style>
