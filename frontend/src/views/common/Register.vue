<template>
  <div class="login">
    <h2>用户登录</h2>
    <div class="login_box">
      <input type="text" required="required" />
      <label>用户名</label>
    </div>

    <div class="login_box">
      <input type="password" required="required" />
      <label>密码</label>
    </div>

    <a href="javascript:void(0)">
      登录
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </a>
  </div>
</template>

<script></script>

<style lang="less" scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  padding: 40px;
  background-color: rgba(0, 0, 0, 0.2);
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.4);

  h2 {
    color: #fff;
    margin-bottom: 30px;
  }

  .login_box {
    position: relative;
    width: 100%;

    input {
      outline: none;
      border: none;
      width: 100%;
      padding: 10px 0;
      margin-bottom: 30px;
      color: #fff;
      font-size: 16px;
      border-bottom: 1px solid #fff;
      background-color:  transparent;
    }

    label {
      position: absolute;
      top: 0;
      left: 0;
      padding: 10px 0;
      color: #fff;
      pointer-events: none;
    }
  }
}

.login .login_box input:focus + label {
  top: -20px;
  font-size: 12px;
  color: #03e9f4;
}
</style>
