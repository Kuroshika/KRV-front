<script setup>
import { useSubmissionsStore } from '@/store/submissions';
import axios from 'axios';
import { computed, reactive, ref, watch, onMounted } from 'vue';
import { useTimeNodeListStore } from '@/store/timenode';
import { useRouter, useRoute } from 'vue-router';
const status = ref("display");
const inputStatus = ref(true);
const route = useRoute();
const deepClone = (obj) => {
    var target = {};
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            if (typeof obj[key] === 'object') {
                target[key] = deepClone(obj[key]);
            } else {
                target[key] = obj[key];
            }
        }
    }
    return target;
}

const submission = computed(() => {
    const submissions = useSubmissionsStore();
    let theSub;
    for (const item of submissions.items) {
        const id = route.params.id;
        if (item.id == id) {
            theSub = item;
            break;
        }
    }
    console.log(theSub)
    return reactive(theSub);
});

const timeNodeList = useTimeNodeListStore();

const switchDisplay2Edit = () => {
    status.value = "edit";
    console.log(status);
}

const switchEdit2Display = () => {
    status.value = "display";
    console.log(status);
}
const onSubmit = async () => {
    console.log(submission.value)
    console.log(timeNodeList.dataList)

    // 这里可以添加表单验证逻辑

    // 如果验证通过，提交数据
    console.log('Form submitted:', submission.value);
    const params = { id: submission.value.id };
    var subFlag = false;
    var nodeFlag = false;
    // 使用HTTP客户端库发送数据到服务器
    await axios.put('/submission/update', submission.value, { params })
        .then(response => {
            subFlag = true;
        })
        .catch(error => {
            subFlag = false;
        });
    await axios.put('/submission/timenode/update', timeNodeList.dataList, { params })
        .then(response => {
            nodeFlag = true;
        })
        .catch(error => {
            console.log("?")
            nodeFlag = false;
        });
    console.log("subFlag: ", subFlag)
    console.log("nodeFlag: ", nodeFlag)
    if (subFlag && nodeFlag) {
        status.value = "display";
        alert('Success: 修改成功');
    } else {
        alert('Error: 修改失败');
    }
}

watch(status, (newValue, oldValue) => {
    if (newValue == "edit" && oldValue == "display") {
        inputStatus.value = false;
    } else if (newValue == "display" && oldValue == "edit") {
        inputStatus.value = true;
    }
}
);

onMounted(() => {
    timeNodeList.subId = route.params.id;
    console.log(timeNodeList.subId)
    timeNodeList.fetchData(); // 在组件挂载时自动获取数据
});

const addTimeNode = () => {
    console.log("addTimeNode")
    console.log(timeNodeList.dataList)
    timeNodeList.dataList.push({
        comments: "",
        finishDate: "",
        nodeName: "",
        nodeOrder: 0,
        state: 0,
        subId:  timeNodeList.subId,
    })
    timeNodeList.dataList.forEach(item => item.nodeOrder=timeNodeList.dataList.indexOf(item));
    console.log("After addTimeNode")
    console.log(timeNodeList.dataList)
}
const delTimeNode = (nodeOrder) => {
    console.log("delTimeNode")
    timeNodeList.dataList.splice(nodeOrder)
    timeNodeList.dataList.forEach(item => item.nodeOrder=timeNodeList.dataList.indexOf(item));
}
</script>

<template>
    <div class="main-container">

        <div class="content-container">
            <form>
                <ul>
                    <li class="content-li">
                        <span style="margin-right: 30px;">公司名称: </span>
                        <input v-model="submission.companyName" :disabled="inputStatus" />
                    </li>
                    <li class="content-li">
                        <div style="margin-right: 30px;">公司描述: </div>
                        <textarea class="form-control" v-model="submission.companyDescribe" :disabled="inputStatus">
                    </textarea>
                    </li>
                    <li class="content-li">
                        <span style="margin-right: 30px;">工作地点: </span>
                        <input v-model="submission.baseCity" :disabled="inputStatus" />
                    </li>
                    <li class="content-li">
                        <span style="margin-right: 30px;">工作岗位: </span>
                        <input v-model="submission.position" :disabled="inputStatus" />
                    </li>
                    <li class="content-li">
                        <span style="margin-right: 30px;">提交日期: </span>
                        <input v-model="submission.submissionDate" :disabled="inputStatus" />
                    </li>
                    <li class="content-li">
                        <span style="margin-right: 30px;">更新日期: </span>
                        <input v-model="submission.updatedDate" :disabled="inputStatus" />
                    </li>
                </ul>
                <div class="timenodes-block">
                    <div class="row">

                    </div>
                    <div v-for="item in timeNodeList.dataList" :key="item" class="row">
                        <div class="col-md-2">
                            <input v-model="item.nodeName" v-if="inputStatus" class="form-control-plaintext"
                                readonly></input>
                            <input v-model="item.nodeName" v-if="!inputStatus" class="form-control"></input>
                        </div>

                        <div class="col-md-2">
                            <select v-model="item.state" class="form-select" aria-label="Default select example"
                                :disabled="inputStatus">
                                <option value="1">已完成</option>
                                <option value="0">未完成</option>
                            </select>
                        </div>
                        <div class="col-md-2">
                            <input v-model="item.finishDate" v-if="inputStatus" class="form-control-plaintext"
                                readonly></input>
                            <input v-model="item.finishDate" v-if="!inputStatus" class="form-control"></input>
                        </div>
                        <div class="col-md-1" v-if="!inputStatus"><a type="button"
                                @click="delTimeNode(item.nodeOrder)">删除</a></div>

                    </div>
                    <div>
                        <button type="button" class="add-node-btn" v-if="!inputStatus" @click="addTimeNode"></button>
                    </div>

                </div>

            </form>
            <div class="button-region">
                <div class="edit-btn" :display=none>
                    <button class="btn btn-primary" @click="switchDisplay2Edit" v-if="status == 'display'">编辑</button>
                </div>
                <div class="display-btn">
                    <button class="btn btn-primary" @click="switchEdit2Display" v-if="status == 'edit'">退出编辑</button>
                </div>
                <br>

                <div class="submit-btn">
                    <button class="btn btn-primary" @click="onSubmit" v-if="status == 'edit'">提交</button>
                </div>
            </div>

        </div>
    </div>
</template>
<style>
.content-container {
    margin-left: 5%;
    margin-right: 5%;
    margin-top: 40px;
    padding: 20px;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>

<style scoped>
.content-li {
    margin-bottom: 30px;
}

.content-textarea {
    width: 80%;
    height: fit-content;
}

.timenodes-block {
    margin: 50px auto;
    padding: 20px;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.add-node-btn {
    border: none;
    margin-top: 20px;
    margin-left: 15px;
    background-image: url(../assets/img/add-box.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    width: 35px;
    height: 35px;
    text-align: center;
    line-height: 50px;

}
</style>
