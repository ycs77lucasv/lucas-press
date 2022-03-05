import { unref, watch } from 'vue'
import { Chart } from 'chart.js'
import { useTheme } from './useTheme'

function useChartDarkMode(chart) {
  const { isDark } = useTheme()
  watch(isDark, () => {
    chart.config.options.plugins.legend.labels.color = isDark.value ? 'white' : Chart.defaults.color
    chart.config.options.scales.x.ticks.color = isDark.value ? 'white' : Chart.defaults.color
    chart.config.options.scales.y.ticks.color = isDark.value ? 'white' : Chart.defaults.color
    chart.update()
  })
}

export function useLineChart(target, labels, datasets, options) {
  const el = unref(target)
  const { isDark } = useTheme()

  const lineChart = new Chart(el, {
    type: 'line',
    data: {
      labels,
      datasets: datasets.map(dataset => {
        return {
          label: dataset.label,
          data: dataset.data,
          borderColor: dataset.color,
          backgroundColor: dataset.color,
          tension: 0.4,
        }
      })
    },
    options: Object.assign({
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
          labels: {
            color: isDark.value ? 'white' : Chart.defaults.color,
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: isDark.value ? 'white' : Chart.defaults.color,
          },
        },
        y: {
          grid: {
            borderDash: [3],
            drawBorder: false,
          },
          ticks: {
            color: isDark.value ? 'white' : Chart.defaults.color,
          },
        },
      },
    }, options),
  })
  useChartDarkMode(lineChart)
  return lineChart
}

export function useBarChart(target, labels, datasets, options) {
  const el = unref(target)
  const { isDark } = useTheme()

  const barChart = new Chart(el, {
    type: 'bar',
    data: {
      labels,
      datasets: datasets.map(dataset => {
        return {
          label: dataset.label,
          data: dataset.data,
          borderColor: dataset.color,
          backgroundColor: dataset.color,
          barThickness: 8,
        }
      })
    },
    options: Object.assign({
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
          labels: {
            color: isDark.value ? 'white' : Chart.defaults.color,
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: isDark.value ? 'white' : Chart.defaults.color,
          },
        },
        y: {
          grid: {
            borderDash: [3],
            drawBorder: false,
          },
          ticks: {
            color: isDark.value ? 'white' : Chart.defaults.color,
          },
        },
      },
    }, options),
  })
  useChartDarkMode(barChart)
  return barChart
}
