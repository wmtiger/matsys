<template>
  <Card class="login-card">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
      <Form-item prop="user">
        <Input type="text" v-model="formValidate.user" placeholder="输入账号"></Input>
      </Form-item>
      <Form-item prop="pwd">
        <Input type="password" v-model="formValidate.pwd" placeholder="输入密码"></Input>
      </Form-item>
      <Form-item>
        <Button long type="primary" @click="handleSubmit('formValidate')">登陆</Button>
      </Form-item>
    </Form>

    <div class="login-footer">
      <Checkbox class="rememberme" v-model="single">记住我</Checkbox>
      <span class="forget">
        <router-link to="/forget">忘记密码</router-link>
      </span>
    </div>
  </Card>
</template>

<script>
  import { getUserName, getUserPwd } from '@/common/auth'
  export default {
    data () {
      return {
        formValidate: {
          user: getUserName(),
          pwd: getUserPwd()
        },
        ruleValidate: {
          user: [{required: true, message: '账号不能为空', trigger: 'blur'}],
          pwd: [{required: true, message: '密码不能为空', trigger: 'blur'}]
        },
        single: true
      }
    },
    methods: {
      handleSubmit (fv) {
        this.$refs[fv].validate((valid) => {
          if (valid) {
            this.$store.dispatch('Login', this.formValidate).then(() => {
              this.$router.push({ path: '/' })
            }).catch(() => {
              console.log('login err')
            })
          } else {
            this.$Message.error('验证不成功')
          }
        })
      }
    }
  }
</script>

<style scoped>
  .login-card {
    width: 320px;
    margin: 60px auto;
  }
  .login-footer{
    margin-top: 10px;
    height: 10px;
  }
  .forget{
    float: right;
  }
  .rememberme{
    float: left;
  }

</style>
