import { unref } from 'vue'
import { Chart } from 'chart.js'

export function useLineChart(target, labels, datasets, options) {
  const el = unref(target)

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
    }, options),
  })
}

export function useBarChart(target, labels, datasets, options) {
  const el = unref(target)

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
    }, options),
  })
}
