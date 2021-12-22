<template>
  <section>
    <form @submit.prevent>
      <p>在线考试登录</p>
      <div class="input_box">
        <input type="text" v-model="username" />
        <label :class="{ active: usernameHiddenStyle }">用户名</label>
      </div>
      <div class="input_box">
        <input type="password" v-model="password" />
        <label :class="{ active: passwordHiddenStyle }">密码</label>
      </div>
      <button type="submit" @click="handleLoginClick">登录</button>
    </form>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import useUserStoreWithOut from '@/store/modules/user';
import { errorMessage } from '@/utils/message';

const username = ref<string>('root');
const password = ref<string>('12345678');
const userStore = useUserStoreWithOut();
const router = useRouter();

const handleLoginClick = async () => {
  if (await userStore.userLogin(username.value, password.value)) {
    router.push({ name: 'Home' });
  } else {
    errorMessage('用户名或密码错误');
  }
};

const usernameHiddenStyle = computed(() => username.value !== '');

const passwordHiddenStyle = computed(() => password.value !== '');
</script>

<style lang="less" scoped>
section {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(
    94.3deg,
    rgba(26, 33, 64, 1) 10.9%,
    rgba(81, 84, 115, 1) 87.1%
  );
  overflow: hidden;

  &::before {
    position: absolute;
    content: '';
    z-index: 2;
    width: 450px;
    height: 450px;
    top: 50%;
    left: 50%;
    transform: translate(-100%, -80%);
    background-color: #ffe53b;
    background-image: linear-gradient(147deg, #ffe53b 0%, #ff2525 74%);
    border-radius: 50%;
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.2);
    animation: pulse 1.5s infinite;
  }

  &::after {
    position: absolute;
    content: '';
    z-index: 2;
    width: 300px;
    height: 300px;
    top: 50%;
    left: 50%;
    transform: translate(10%, 20%);
    background-color: #fa8bff;
    background-image: linear-gradient(
      45deg,
      #fa8bff 0%,
      #2bd2ff 52%,
      #2bff88 90%
    );
    border-radius: 50%;
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.2);
    animation: pulse 1.6s infinite;
  }

  form {
    position: relative;
    z-index: 3;
    width: 320px;
    background-color: rgba(255, 255, 255, 0.1);
    padding: 45px 30px;
    border-radius: 8px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);

    p {
      color: #fff;
      display: block;
      text-align: center;
      margin: 0 0 30px 0;
      font-size: 35px;
    }

    .input_box {
      position: relative;

      input {
        color: #fff;
        width: 100%;
        height: 50px;
        border-radius: 8px;
        background-color: transparent;
        border: 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.5);
        margin-bottom: 15px;
        padding-left: 15px;
        outline: none;

        &:focus {
          color: #fff;
        }
      }

      label {
        color: #fff;
        position: absolute;
        top: 14px;
        left: 14px;
        pointer-events: none;
        transition: all 0.5s;
      }
    }

    button {
      width: 100%;
      height: 50px;
      border: 0;
      outline: none;
      cursor: pointer;
      color: #fff;
      transition: ease 0.4s;
      border-radius: 8px;
      background-size: 200% auto;
      background-image: linear-gradient(
        to right,
        #02aab0 0%,
        #00cdac 51%,
        #02aab0 100%
      );
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);

      &:hover {
        background-position: right center;
        color: #fff;
        text-decoration: none;
      }
    }
  }
}

.input_box input:focus + label,
.input_box label.active {
  top: -2px;
  color: #ccc;
  font-size: 12px;
}

@keyframes pulse {
  50% {
    box-shadow: 0 0 0 50px rgba(255, 255, 255, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
}
</style>
