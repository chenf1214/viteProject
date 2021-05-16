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
      <el-form-item label="身份证" prop="id">
        <el-input v-model="ruleForm.id"></el-input>
      </el-form-item>
      <el-form-item label="体重" prop="weight">
        <el-input v-model="ruleForm.weight"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini"
    @click="goFirst"
      ><i class="el-icon-arrow-left el-icon--left"></i
    >上一页</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')" 
        size="mini"
          >提交</el-button
        >
        <el-button type="primary" size="mini"
    @click="goThree"
      >下一页<i class="el-icon-arrow-right el-icon--right"></i
    ></el-button>
        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { useRouter } from "vue-router"
export default {
  data() {
    var validateID = (rule: any, value: string, callback: any) => {
      if (value === "") {
        callback(new Error("请输入ID"));
      } else if (!this.checkIDCard(value)) {
        callback(new Error("身份证号格式不正确!"));
      } else {
        callback();
      }
    };
    var validateName = (rule: any, value: string, callback: any) => {
      if (value === "") {
        callback(new Error("请输入姓名"));
      } else if (value.length < 2 || value.length > 20) {
        callback(new Error("姓名格式不正确!"));
      } else {
        callback();
      }
    };
    var validateWeight = (rule: any, value: string, callback: any) => {
      if (value === "") {
        callback(new Error("请输入体重"));
      } else if (Number(value) < 40 || Number(value) > 150) {
        callback(new Error("体重格式不正确!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name: "",
        id:"",
        weight: ""
      },
      rules: {
        name: [{ required: true, validator: validateName, trigger: "blur" }],
        id: [{ required: true, validator: validateID, trigger: "blur" }],
        weight: [{ required: true, validator: validateWeight, trigger: "blur" }]
      },
    };
  },
  setup() {
    const router = useRouter();
    function goFirst() {
      router.push("/first");
    }
    function goThree() {
      router.push("/three");
    }
    return {
      goFirst, goThree //一定要要放在return里才能在模板上面使用
    };
  },
  methods: {
     submitForm(formName:string) {
        (this as any).$refs[formName].validate((valid:any) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    checkIDCard(idcode: string) {
      // 加权因子
      var weight_factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      // 校验码
      var check_code = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];

      var code = idcode + "";
      var last = idcode[17]; //最后一位

      var seventeen = code.substring(0, 17);

      // ISO 7064:1983.MOD 11-2
      // 判断最后一位校验码是否正确
      var arr: Array<any>;
      arr = seventeen.split("");
      var len = arr.length;
      var num = 0;
      for (var i = 0; i < len; i++) {
        num = num + arr[i] * weight_factor[i];
      }

      // 获取余数
      var resisue = num % 11;
      var last_no = check_code[resisue];

      // 格式的正则
      // 正则思路
      /*
      第一位不可能是0
      第二位到第六位可以是0-9
      第七位到第十位是年份，所以七八位为19或者20
      十一位和十二位是月份，这两位是01-12之间的数值
      十三位和十四位是日期，是从01-31之间的数值
      十五，十六，十七都是数字0-9
      十八位可能是数字0-9，也可能是X
      */
      var idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;

      // 判断格式是否正确
      var format = idcard_patter.test(idcode);

      // 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
      return last === last_no && format ? true : false;
    },
  },
};
</script>

<style>
</style>