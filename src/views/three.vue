<template>
  <div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item label="" >
        <el-checkbox-group v-model="ruleForm.checkList">
          <el-checkbox
            :label="item.value"
            :key="i"
            v-for="(item, i) in goods"
            >{{ item.label }}</el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>

      <el-radio-group v-model="ruleForm.radio">
        <el-radio :label="1">Visa</el-radio>
        <el-radio :label="2">MasterCard</el-radio>
        <el-radio :label="3">Discover</el-radio>
      </el-radio-group>

      <el-form-item>
        <el-button type="primary" size="mini" @click="goSecond"
          ><i class="el-icon-arrow-left el-icon--left"></i>上一页</el-button
        >
        <el-button type="primary" @click="submitForm('ruleForm')" size="mini"
          >提交</el-button
        >
        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
export default {
  data() {
    var validateName = (rule: any, value: string, callback: any) => {
      if (value === "") {
        callback(new Error("请输入姓名"));
      } else if (value.length < 2 || value.length > 20) {
        callback(new Error("姓名格式不正确!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name: "",
        radio: 1,
        checkList: [],
      },
      goods: [
        { label: "4 个25 瓦的灯泡", value: 2.39 },
        { label: "8 个25 瓦的灯泡", value: 4.29 },
        { label: "4 个25 瓦的长寿命灯泡", value: 3.95 },
        { label: "8 个25 瓦的长寿命灯泡", value: 7.49 },
      ],
      rules: {
        name: [{ required: true, validator: validateName, trigger: "blur" }],
      },
    };
  },
  setup() {
    const router = useRouter();
    function goSecond() {
      router.push("/second");
    }

    return {
      goSecond, //一定要要放在return里才能在模板上面使用
    };
  },
  methods: {
    submitForm(formName: string) {
      (this as any).$refs[formName].validate((valid: any) => {
        if (valid) {
          alert("submit!");
          console.log(this.ruleForm)
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style>
</style>