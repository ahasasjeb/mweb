<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { NCard, NGrid, NGridItem, NStatistic, NButton, NSpace, useMessage, NSelect, NSpin } from 'naive-ui'
import type { SelectOption } from 'naive-ui'
import axios from 'axios'

const serverStatus = ref({
  loading: true,
  online: false,
  players: 0,
  maxPlayers: 0,
  version: '',
})

const fetchServerStatus = async () => {
  serverStatus.value.loading = true
  try {
    const response = await axios.get('https://ping.lvjia.cc/mcapi.php?host=mc2.lvjia.cc')
    if (response.data.status === 'success') {
      const data = response.data.data
      serverStatus.value = {
        loading: false,
        online: true,
        players: data.online,
        maxPlayers: data.max,
        version: data.version,
      }
    } else {
      serverStatus.value = {
        loading: false,
        online: false,
        players: 0,
        maxPlayers: 0,
        version: '',
      }
    }
  } catch (error) {
    serverStatus.value = {
      loading: false,
      online: false,
      players: 0,
      maxPlayers: 0,
      version: '',
    }
  }
}

const skylandStatus = ref({
  loading: true,
  online: false,
  players: 0,
  maxPlayers: 0,
  version: '',
})

const fetchSkylandStatus = async () => {
  skylandStatus.value.loading = true
  try {
    const response = await axios.get('https://ping.lvjia.cc/mcapi.php?host=f.rainplay.cn&port=34374')
    if (response.data.status === 'success') {
      const data = response.data.data
      skylandStatus.value = {
        loading: false,
        online: true,
        players: data.online,
        maxPlayers: data.max,
        version: data.version,
      }
    } else {
      skylandStatus.value = {
        loading: false,
        online: false,
        players: 0,
        maxPlayers: 0,
        version: '',
      }
    }
  } catch (error) {
    skylandStatus.value = {
      loading: false,
      online: false,
      players: 0,
      maxPlayers: 0,
      version: '',
    }
  }
}

onMounted(() => {
  fetchServerStatus()
  fetchSkylandStatus() // 添加空岛服务器状态获取
})

const message = useMessage()

interface ServerOption extends SelectOption {
  name: string
  address: string
  label?: string
  value?: string
}

const servers: ServerOption[] = [

  { name: '备用服务器-2', address: 'mc2.lvjia.cc', label: '备用服务器-2', value: 'mc.lvjia.cc' },
  { name: '备用服务器-3', address: 'mc.lvjia.me', label: '备用服务器-3', value: 'mc.lvjia.me' },
  { name: '生存服务器', address: 'f.rainplay.cn:48753', label: '生存服务器', value: 'f.rainplay.cn:48753' },
  { name: '空岛服务器', address: 'f.rainplay.cn:34374', label: '空岛服务器', value: 'f.rainplay.cn:34374' },
  { name: '空岛服务器-2', address: 'sky.lvjia.cc', label: '空岛服务器-2', value: 'sky.lvjia.cc' },
  { name: '主服务器', address: 'mc.mingpixel.net', label: '主服务器', value: 'mc.mingpixel.net' },
  { name: '备用服务器', address: 'bak.mingpixel.net', label: '备用服务器', value: 'bak.mingpixel.net' },
]

const selectedServer = ref<string>(servers[0].address)

const copyServerAddress = () => {
  if (process.client) {
    navigator.clipboard.writeText(selectedServer.value)
    message.success('服务器地址已复制到剪贴板')
  }
}

const getCurrentServerName = () => {
  return servers.find(s => s.address === selectedServer.value)?.name || ''
}
</script>

<template>
  <main>
    <n-space vertical size="large">
      <n-card title="服务器状态" class="semi-transparent">
        <n-grid :cols="4" :x-gap="12">
          <n-grid-item>
            <n-statistic
              :value="serverStatus.loading ? '加载中...' : (serverStatus.online ? '在线' : '离线')"
              label="状态"
            />
          </n-grid-item>
          <n-grid-item>
            <n-statistic :value="serverStatus.loading ? '-' : serverStatus.players" label="在线玩家" />
          </n-grid-item>
          <n-grid-item>
            <n-statistic :value="serverStatus.loading ? '-' : serverStatus.maxPlayers" label="最大人数" />
          </n-grid-item>
          <n-grid-item>
            <n-statistic :value="serverStatus.loading ? '-' : serverStatus.version" label="游戏版本" />
          </n-grid-item>
        </n-grid>
      </n-card>

      <n-card title="空岛服务器状态" class="semi-transparent">
        <n-grid :cols="4" :x-gap="12">
          <n-grid-item>
            <n-statistic
              :value="skylandStatus.loading ? '加载中...' : (skylandStatus.online ? '在线' : '离线')"
              label="状态"
            />
          </n-grid-item>
          <n-grid-item>
            <n-statistic :value="skylandStatus.loading ? '-' : skylandStatus.players" label="在线玩家" />
          </n-grid-item>
          <n-grid-item>
            <n-statistic :value="skylandStatus.loading ? '-' : skylandStatus.maxPlayers" label="最大人数" />
          </n-grid-item>
          <n-grid-item>
            <n-statistic :value="skylandStatus.loading ? '-' : skylandStatus.version" label="游戏版本" />
          </n-grid-item>
        </n-grid>
      </n-card>

      <n-card title="快速复制IP，有空岛服务器" class="semi-transparent">
        <n-space vertical>
          <n-select
            v-model:value="selectedServer"
            :options="servers"
            label-field="name"
            value-field="address"
            placeholder="选择服务器"
          />
          <p>服务器地址：{{ selectedServer }}</p>
          <n-button type="primary" size="large" @click="copyServerAddress">
            复制服务器地址
          </n-button>
        </n-space>
      </n-card>
    </n-space>
  </main>
</template>

<style scoped>
main {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

:deep(.semi-transparent) {
  background: rgba(255, 255, 255, 0.7) !important;
  backdrop-filter: blur(10px);
}

:deep(.n-card-header) {
  background: rgba(255, 255, 255, 0.8) !important;
}
</style>
