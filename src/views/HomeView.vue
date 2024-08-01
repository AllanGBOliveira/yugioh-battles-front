<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import TheWelcome from '../components/TheWelcome.vue'
import styles from "@/assets/styles/home/home.module.scss"
import Toast from 'bootstrap/js/dist/toast';
import tvboxBg from "@/assets/images/tvbox.png"

const showToastButton = ref<HTMLButtonElement | null>(null);
const toastElement = ref<HTMLDivElement | null>(null);
let toastInstance: Toast | null = null;
const resised = ref({
  width: 0,
  height: 0,
  isResized: false
})
// const resized = computed(() => {
//   {
//     return {
//       width: window.innerWidth,
//       height: window.innerHeight,
//     }
//   }
// })

const showToast = () => {
  if (toastInstance) {
    toastInstance.show();
    console.log("AQUi");

  }
};

function getScreenSize(event: Event) {
  const screenSize = {
    isresized: event.type === 'resize' ? true : false,
    width: window.innerWidth,
    height: window.innerHeight,
  }
  console.log(event);

  resised.value.width = screenSize.width;
  resised.value.height = screenSize.height;
  resised.value.isResized = screenSize.isresized;

  return {
    screenSize
  }
}

onMounted(() => {
  if (toastElement.value) {
    toastInstance = new Toast(toastElement.value);
  }

  window.addEventListener('DOMContentLoaded', getScreenSize)

  window.addEventListener('resize', getScreenSize)
});

// const tbBoxStyles = {
//   backgroundImage: `url(${tvboxBg})`,
//   // backgroundSize: 'cover',
//   // backgroundPosition: 'center',
//   // backgroundRepeat: 'no-repeat',
//   // width: '100%',
//   // height: '100%',
// }



</script>

<template>
  <main class="main">
    <div class="tv">
      <img :src="tvboxBg" class="" alt="Workplace" usemap="#workmap" :width="resised.width" :height="resised.height">
      <div class="light-danger position-absolute start-0 top-0 w-50 h-50"></div>

      <map name="workmap">
        <area class="cursor-pointer" shape="rect" coords="34,44,270,350" alt="Computer" href="computer.htm">
        <area shape="rect" coords="290,172,333,250" alt="Phone" href="phone.htm">
        <area shape="circle" coords="337,300,44" alt="Cup of coffee" href="coffee.htm">
      </map>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.test {
  background-color: $primary-color
}

.tv,
.tvbox,
.tvbg {
  display: block;
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  height: 100%;
}


.main {
  display: block;
  width: 100%;
  height: 100%;

  .container {
    @extend .main;
  }
}

.tvbox {
  object-fit: cover;
}

.light {
  display: block;
  width: 50px;
  height: 50px;

  position: absolute;
  bottom: 8px;
  left: 82.8%;
  filter: blur(10px);
  border-radius: 50%;
  opacity: 0.6;

  @each $key, $value in $colors {
    &-#{$key} {
      background: rgba($color: $value, $alpha: 1.0);
    }
  }

}
</style>
