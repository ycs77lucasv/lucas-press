import { unref } from 'vue'
import { Chart } from 'chart.js'
import { useTheme } from './useTheme'

export function useLineChart(target, labels, datasets, options) {
  const el = unref(target)
  const { isDark } = useTheme()

  return new Chart(el, {
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
}

export function useBarChart(target, labels, datasets, options) {
  const el = unref(target)
  const { isDark } = useTheme()

  return new Chart(el, {
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
}
