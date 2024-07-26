<script setup>
import { useNewSubStore } from '@/store/newsub';
import axios from 'axios';
import { computed, reactive, ref, watch } from 'vue';

import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const newSubmission = reactive(
    useNewSubStore()
)

const onSubmit = () => {
    console.log(newSubmission.data)
    console.log('Form submitted:', newSubmission.data);

    const response = axios.post('/submission/add', newSubmission.data, )
        .then(response => {
            alert('Success: 修改成功', response);
        })
        .catch(error => {
            alert('Error: 修改失败', error);
        });

    router.push({path: '/submissions'})
}

</script>

<template>
    <div class="main-container">
        <h1>Submission</h1>
        <div class="content-container">
            <form>
                <ul>
                    <li class="content-li">
                        <span style="margin-right: 30px;">公司名称: </span>
                        <input v-model="newSubmission.data.companyName"  />
                    </li>
                    <li class="content-li">
                        <span style="margin-right: 30px;">公司描述: </span>
                        <input v-model="newSubmission.data.companyDescribe" />
                    </li>
                    <li class="content-li">
                        <span style="margin-right: 30px;">工作地点: </span>
                        <input v-model="newSubmission.data.baseCity"  />
                    </li>
                    <li class="content-li">
                        <span style="margin-right: 30px;">工作岗位: </span>
                        <input v-model="newSubmission.data.position"  />
                    </li>
                </ul>

            </form>
            <div class="button-region">

                <div class="submit-btn">
                    <button class="btn btn-primary" @click="onSubmit" >提交</button>
                </div>

            </div>

        </div>
    </div>
</template>

<style scoped>
.content-container {
    margin-left: 5%;
    margin-right: 5%;
    margin-top: 40px;
    padding: 20px;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.content-li {
    margin-bottom: 30px;
}

</style>
