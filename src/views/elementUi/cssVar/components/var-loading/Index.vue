<template>
  <ul class="strip-loading c-flex-x-start">
    <li v-for="v in 6" :key="v" :style="`--line-index: ${v}`"></li>
  </ul>
</template>

<style lang="scss">
.strip-loading {
  // width: 200px;
  // height: 200px;
  padding: 0;

  li {
    --time: calc((var(--line-index) - 1) * 200ms);
    border-radius: 3px;
    width: 6px;
    height: 30px;
    background-color: #f66;
    animation: beat 1.5s ease-in-out var(--time) infinite;
    list-style-type: none;
    & + li {
      margin-left: 5px;
    }
  }
}
@keyframes beat {
  0%,
  100% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(0.5);
  }
}
</style>

<script>
export default {
  name: "strip-loading",
};
</script>