<script setup>
import { useSubmissionsStore } from '@/store/submissions';
import { onMounted } from 'vue';
const submissionsStore = useSubmissionsStore();

onMounted(() => {
    submissionsStore.fetchData(); // 在组件挂载时自动获取数据
});

const fetchData = () => {
    submissionsStore.fetchData(); // 手动触发数据获取
};
</script>

<template>
 <div class="home-slogan  text-center"><h1>Hello, this is KukaResumeVault!</h1></div>
</template>

<style scoped>
.home-slogan{
    display: flex;
}
</style>
