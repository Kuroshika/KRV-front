<template>
    <nav class="navbar navbar-expand-md navbar-light bg-light" role="navigation">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" href="#">
                    KukaResumeVault
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
            </div>
            <div class="collapse navbar-collapse" id="navbarNav">
                <div class="navbar-nav me-auto mb-2 mb-lg-0">
                    
                    <div  v-for="(route, index) in router.options.routes" :key="index">
                        <div class="nav-item">
                            <a class="nav-link" v-if="route.meta && route.meta.title" :href="route.path">
                            {{ route.meta.title }}
                        </a>

                        <a class="nav-link" v-else-if="route.name" :href="route.path">
                            {{ route.name }}
                        </a>
                        </div>

                        
                    </div>
                </div>
            </div>

        </div>
    </nav>

</template>
<script setup>
import router from '@/router';
</script>

<style scoped>
</style>