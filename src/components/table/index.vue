<template>
	<div class="table-container">
		<el-table
      ref="commontable"
			:data="list"
			:border="border"
			:stripe="stripe"
			v-bind="$attrs"
			style="width: 100%"
			@selection-change="onSelectionChange"
      @sort-change="onSortChange"
		>
      <!-- 多选 -->
			<el-table-column v-if="isSelection && list.length" type="selection" :reserve-selection="reserveSelection" width="30" :selectable="selectable" />
      <!-- 序号 -->
			<el-table-column v-if="showNum && list.length" align="center" :label="numTitle" width="60" :fixed="numFixed" >
        <template  v-slot="scope">
          <slot name="numSlot" :row="scope.row" :num="scope.$index+1+((page.pageIndex-1)*page.pageSize)" :$index="scope.$index">
            <span style="margin-left: 10px">{{ scope.$index+1+((page.pageIndex-1)*page.pageSize) }}</span>
          </slot>
        </template>
      </el-table-column>
			<el-table-column
				v-for="item in columns"
				:key="item.prop"
				show-overflow-tooltip
				:prop="item.prop"
				:label="item.label"
			>
				<template v-slot="scope">
					<template v-if="item.type === 'image'">
						<el-image
							:style="{ width: `${item.width}px`, height: `${item.height}px` }"
							:src="scope.row[item.key]"
							:zoom-rate="1.2"
							:preview-src-list="[scope.row[item.key]]"
							preview-teleported
							fit="cover"
						/>
					</template>
					<template v-else>
						{{ scope.row[item.prop] }}
					</template>
				</template>
			</el-table-column>
			<template #empty>
				<el-empty description="暂无数据" />
			</template>
		</el-table>
		<div class="table-footer">
			<el-pagination
        v-if="showPage"
				:current-page.sync="page.pageIndex"
				:page-size.sync="page.pageSize"
				:page-sizes="pageSizes"
				:total="total"
				:layout="layout"
				@size-change="onHandleSizeChange"
				@current-change="onHandleCurrentChange"
        style="text-align: right; margin: 15px 0;"
			>
			</el-pagination>
		</div>
	</div>
</template>

<script setup lang="ts" name="netxTable">
import { reactive, computed } from 'vue';

// 定义父组件传过来的值
const props = defineProps({
	// 列表内容
	tableData: {
		type: Array<EmptyObjectType>,
		default: () => [],
	},
	// 表头内容
  columns: {
    type: Array<EmptyObjectType>,
    default:()=>[]
  },
	// 配置项
	config: {
		type: Object,
		default: () => {},
	},
  //边框
  border: {
    type: Boolean,
    default: true
  },
  //斑马纹
  stripe: {
    type: Boolean,
    default: true
  },
  //是否为多选
  isSelection: {
    type: Boolean,
    default: true
  },
  //返回值用来决定这一行的 CheckBox 是否可以勾选
  selectable: {
    type: Function,
    default: () => {}
  },
  //数据刷新后是否保留选项
  reserveSelection: {
    type: Boolean,
    default: false
  },
  //是否显示序号
  showNum: {
    type: Boolean,
    default: true
  },
  //序号列标题
  numTitle: {
    type: String,
    default: '序号'
  },
  //是否固定序号列
  numFixed: Boolean,
  //是否显示页数等
  showPage: {
      type: Boolean,
      default: true
    },
  //数据总数
  total: {
    type: Number,
    default: 0
  },
  layout: {
    type: String,
    default: 'total,sizes,prev, pager, next, jumper'
  },
  page: {
    type: Object,
    default: () => ({
      pageSize: 10,
      pageIndex: 1
    })
  },
  //控制pagination
  pageSizes: {
    type: Array,
    default() {
      return [10, 20, 30, 40]
    }
  }
});
console.log('columns',props.columns[0].label)

// 定义子组件向父组件传值/事件
const emit = defineEmits(['onSelectionChange','onSortChange','pageChange','sortHeader']);

// 定义变量内容
const state = reactive({
});

//计算属性
const list = computed(() => {
  if (props.total || !props.showPage) {
        return props.tableData
      }
      return props.tableData.filter((obj, index:number) => {
        return (
          index >= (props.page.pageIndex - 1) * props.page.pageSize &&
          index < props.page.pageIndex * props.page.pageSize
        )
      })
})




//多选改变
const onSelectionChange = (row:object,event:object,column:object)=>{
	emit('onSelectionChange', row,event,column);
}
//排序改变
const onSortChange = (row:object,event:object,column:object)=>{
	emit('onSortChange', row,event,column);
}
// 分页改变
const onHandleSizeChange = (val: number) => {
	props.page.pageSize = val;
	emit('pageChange', props.page);
};
// 分页改变
const onHandleCurrentChange = (val: number) => {
	props.page.pageNum = val;
	emit('pageChange', props.page);
};
// 搜索时，分页还原成默认
const pageReset = () => {
	props.page.pageNum = 1;
	props.page.pageSize = 10;
	emit('pageChange', props.page);
};

// 暴露变量
defineExpose({
	pageReset,
});
</script>

<style scoped lang="scss">
.table-container {
	display: flex;
	flex-direction: column;
	.el-table {
		flex: 1;
	}
	.table-footer {
		display: flex;
		.table-footer-tool {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			i {
				margin-right: 10px;
				cursor: pointer;
				color: var(--el-text-color-regular);
				&:last-of-type {
					margin-right: 0;
				}
			}
		}
	}
}
</style>
