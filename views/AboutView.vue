<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

const serverDescription = ref('')

const fetchServerDescription = async () => {
  if (!process.client) return
  try {
    const response = await axios.get('https://ping.lvjia.cc/mcapi.php?host=mc2.lvjia.cc')
    if (response.data.status === 'success') {
      serverDescription.value = response.data.data.description
    }
  } catch (error) {
    serverDescription.value = '无法获取服务器描述'
  }
}

onMounted(() => {
  fetchServerDescription()
})
</script>

<template>
  <div class="about">
    <n-card title="关于我们的服务器" class="semi-transparent">
      <n-space vertical>
        <p>这是一个充满欢乐的 Minecraft 服务器！</p>
        <p>我们致力于为玩家提供最好的游戏体验。</p>
        <p>{{ serverDescription }}</p>
      </n-space>
    </n-card>
  </div>
</template>

<style>
.about {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.semi-transparent {
  background: rgba(255, 255, 255, 0.7) !important;
  backdrop-filter: blur(10px);
}

.n-card-header {
  background: rgba(255, 255, 255, 0.8) !important;
}
</style>
