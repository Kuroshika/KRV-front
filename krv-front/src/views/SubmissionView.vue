<script setup>
import { useSubmissionsStore } from '@/store/submissions';
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
const submissionsStore = useSubmissionsStore();

onMounted(() => {
    submissionsStore.fetchData(); // 在组件挂载时自动获取数据
});

const fetchData = () => {
    submissionsStore.fetchData(); // 手动触发数据获取
};
const route = useRoute();
const router = useRouter();
const createSubmission = () => {
    router.push(
        { path: '/submission/create' }
    );
}
const delSubmission = (item_id) => {
    console.log(item_id)
    if (confirm("确定要删除吗？此操作无法撤销。")) {
        const params = { id: item_id }; 
        const response = axios.delete('/submission/del', { params })
            .then(response => {
                console.log(response);
                alert('Success: 删除成功', response);
                fetchData();
            })
            .catch(error => {
                alert('Error: 删除失败', error);
            });

        
    }
}
</script>
<template>
    <div>
        <h1>投递列表</h1>

        <div class="submission-list content-container">
            <div class="d-flex d-region">
                <div class="btn-reflesh-box btn-box ">
                    <button class="btn btn-primary" @click="fetchData">刷新</button>
                </div>
                <div class="btn-create btn-box">
                    <button class="btn btn-primary" @click="createSubmission">创建新提交</button>
                </div>
            </div>

            <p v-if="loading">Loading...</p>

            <div v-if="!loading && !error">
                <div v-for="item in submissionsStore.items" :key="item" class="row">

                    <div class="submission-attribute-item col-md-1 ">id: {{ item.id }} </div>
                    <div class="submission-attribute-item col-md-2">公司名称: {{ item.companyName }} </div>
                    <span class="submission-attribute-item col-md-2">岗位: {{ item.position }} </span>
                    <span class="submission-attribute-item col-md-2">提交时间: {{ item.submissionDate }} </span>
                    <span class="submission-attribute-item col-md-2">更新时间: {{ item.updatedDate }} </span>
                    <div class="submission-attribute-item col-md-1">
                        <a :href="'/submission/' + item.id">编辑</a>
                        <span> &nbsp</span>
                        <a  type="button" @click="delSubmission(item.id)" style="color: crimson;">删除</a>
                    </div>
                    <br>


                </div>
            </div>


            <p v-if="error">{{ error.message }}</p>



        </div>


    </div>
</template>

<style scoped>
.submission-attribute-item {
    margin: auto;
    margin-bottom: 20px;
    padding: auto;

}

.d-region {
    margin-bottom: 2%;

}

.btn-box {
    margin: 1%;
}
.content-container {
    margin-left: 5%;
    margin-right: 5%;
    margin-top: 40px;
    padding: 20px;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
