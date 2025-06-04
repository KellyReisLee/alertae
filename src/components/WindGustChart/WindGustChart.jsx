import React from 'react';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';

const WindGustChart = ({ data }) => {
  if (!data || !data.list) return null;

  // Processar os dados da API para o gráfico de rajadas de vento
  const chartData = {
    labels: data.list.map(item => format(new Date(item.dt * 1000), 'dd/MM')),
    datasets: [
      {
        label: 'Rajadas de Vento (m/s)',
        data: data.list.map(item => item.wind.gust || 0),
        fill: true,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Rajadas de Vento por Dia'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Velocidade (m/s)'
        }
      }
    }
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default WindGustChart; 