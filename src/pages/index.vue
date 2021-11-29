<template>
  <Layout>
    <PageHeader>
      <template #title>首頁</template>
    </PageHeader>

    <div class="mt-6 grid md:grid-cols-12 gap-4">
      <TrendingCard
        class="md:col-span-12 lg:col-span-4"
        icon="eye"
        label="瀏覽人次"
        value="145"
        :is-up="true"
        trending="12"
        stretch
      />
      <TrendingCard
        class="md:col-span-12 lg:col-span-4"
        icon="star"
        label="點讚數"
        value="591"
        :is-up="false"
        trending="2"
        stretch
      />
      <TrendingCard
        class="md:col-span-12 lg:col-span-4"
        icon="annotation"
        label="留言數"
        value="7"
        :is-up="true"
        trending="53"
        stretch
      />

      <Card class="md:col-span-8 min-w-0" stretch>
        <div class="h-[300px] flex flex-col p-5">
          <h2 class="text-xl font-semibold tracking-wide text-gray-700">瀏覽人次</h2>
          <div class="flex-grow pt-4 min-h-0">
            <canvas ref="lineChartEl"></canvas>
          </div>
        </div>
      </Card>

      <Card class="md:col-span-4 min-w-0" stretch>
        <div class="h-[300px] flex flex-col p-5">
          <h2 class="text-xl font-semibold tracking-wide text-gray-700">瀏覽裝置</h2>
          <div class="flex-grow pt-4 min-h-0">
            <canvas ref="barChartEl"></canvas>
          </div>
        </div>
      </Card>
    </div>
  </Layout>
</template>

<script>
import { onMounted, ref } from 'vue'
import { Chart } from 'chart.js'

export default {
  setup() {
    const lineChartEl = ref(null)
    const barChartEl = ref(null)

    onMounted(() => {
      new Chart(lineChartEl.value, {
        type: 'line',
        data: {
          labels: ['6/21(一)', '6/22(二)', '6/23(三)', '6/24(四)', '6/25(五)', '6/26(六)', '6/27(日)'],
          datasets: [
            {
              label: '6/21 - 6/27',
              data: [0, 10, 5, 2, 20, 30, 45],
              borderColor: '#7C3AED', // violet-600
              backgroundColor: '#7C3AED', // violet-600
              tension: 0.4,
            },
            {
              label: '6/14 - 6/20',
              data: [6, 25, 22, 37, 14, 8, 4],
              borderColor: '#C4B5FD', // violet-300
              backgroundColor: '#C4B5FD', // violet-300
              tension: 0.4,
            },
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          plugins: {
            legend: {
              align: 'end',
              position: 'bottom',
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              grid: {
                borderDash: [3],
                drawBorder: false,
              },
            },
          },
        },
      })

      new Chart(barChartEl.value, {
        type: 'bar',
        data: {
          labels: ['一', '二', '三', '四', '五', '六', '日'],
          datasets: [
            {
              label: '電腦',
              data: [0, 10, 5, 2, 20, 30, 45],
              borderColor: '#7C3AED', // violet-600
              backgroundColor: '#7C3AED', // violet-600
            },
            {
              label: '手機',
              data: [6, 25, 22, 37, 14, 8, 4],
              borderColor: '#C4B5FD', // violet-300
              backgroundColor: '#C4B5FD', // violet-300
            },
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          plugins: {
            legend: {
              align: 'end',
              position: 'bottom',
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              grid: {
                borderDash: [3],
                drawBorder: false,
              },
            },
          },
        },
      })
    })

    return {
      lineChartEl,
      barChartEl,
    }
  },
}
</script>
