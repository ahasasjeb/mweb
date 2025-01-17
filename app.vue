<script setup lang="ts">
const router = useRouter()
const menuOptions = [
  {
    label: '首页',
    key: 'home',
    onClick: () => router.push('/')
  },
  {
    label: '关于',
    key: 'about',
    onClick: () => router.push('/about')
  }
]
</script>

<template>
  <n-config-provider>
    <n-message-provider>
      <n-layout class="main-layout">
        <n-layout-header bordered class="transparent-header">
          <div class="header-content">
            <div class="logo">明像素</div>
            <n-menu mode="horizontal" :options="menuOptions" />
          </div>
        </n-layout-header>
        <n-layout-content class="transparent-content">
          <NuxtPage />
        </n-layout-content>
      </n-layout>
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped>
.main-layout {
  min-height: 100vh;
  margin: 0;
  padding: 0;
  background: url('@/assets/lvjia.webp') no-repeat center center fixed;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.transparent-header {
  background: none !important;
}

.header-content {
  display: flex;
  align-items: center;
  padding: 0 24px;
  height: 64px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
}

.transparent-content {
  background: transparent !important;
}

.logo {
  font-size: 1.5em;
  font-weight: bold;
  margin-right: 24px;
  min-width: 90px;  /* 添加最小宽度 */
  white-space: nowrap;  /* 防止文字换行 */
}

:deep(.n-menu-item) {
  min-width: 56px !important;
  white-space: nowrap !important;
}

:deep(.n-menu-item-content) {
  padding: 0 12px !important;
}

@media (max-width: 768px) {
  .header-content {
    padding: 0 12px;
  }

  .logo {
    margin-right: 12px;
    min-width: 60px;
  }
}
</style>
