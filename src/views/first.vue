<template>
  <div>
    <el-checkbox-group v-model="checkList">
      <el-checkbox :label="item.value" :key="i" v-for="(item, i) in fruits">{{
        item.label
      }}</el-checkbox>
    </el-checkbox-group>
    <el-button type="primary" @click="handleSubmit" size="mini" class="btn">
      Submit
    </el-button>
    <el-button type="primary" size="mini"
    @click="goto"
      >下一页<i class="el-icon-arrow-right el-icon--right"></i
    ></el-button>
  </div>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
export default {
  data() {
    return {
      checkList: [],
      fruits: [
        { label: "苹果", value: 59 },
        { label: "橘子", value: 49 },
        { label: "香蕉", value: 39 },
      ],
    };
  },
  setup() {
    const router = useRouter();
    function goto() {
      router.push("/second");
    }
    return {
      goto, //一定要要放在return里才能在模板上面使用
    };
  },
  methods: {
    handleSubmit() {
      let msg: string;
      let count = 0;
      console.log(this.checkList, Object.values(this.checkList));
      Object.values(this.checkList).forEach((item) => {
        count += item;
      });
      console.log(count * 0.95);
      msg = `Your total cost is $${count * 0.95}`;
      (this as any).$alert(msg, "", {
        confirmButtonText: "确定",
        callback: (action: any) => {
          // (this as any).$message({
          //   type: 'info',
          //   message: `action: ${ action }`
          // });
        },
      });
    },
  },
};
</script>

<style scoped>
.btn {
  margin-top: 20px;
}
</style>