'use client';

import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LetterChart({ letters }) {

  const [ labels, setLabels ] = useState([]);
  const [ datasets, setDatasets ] = useState([])

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display : 'top'
      },
      title: {
        display: true,
        text: 'Letters by Year',
      },
    },
  };

  useEffect(() => {
    const years1 = [];
    const lettersByYear = [];
    const years2 = [];
    const lettersFromByYear = [];
    const years3 = [];
    const lettersToByYear = [];
    letters.sort((a, b) => a.year > b.year ? 1 : -1);
    letters.forEach(letter => {
      if(letter.year) {
        const thisIndex = years1.indexOf(letter.year);
        if(thisIndex === -1) {
          years1.push(letter.year);
          lettersByYear.push({
            year : letter.year,
            totalLetters : 1
          })
        } else {
          lettersByYear[thisIndex].totalLetters = lettersByYear[thisIndex].totalLetters + 1;
        }
      }
      if(letter.year && letter.author && letter.author.indexOf("Erasmus") > -1) {
        const thisIndex = years2.indexOf(letter.year);
        if(thisIndex === -1) {
          years2.push(letter.year);
          lettersFromByYear.push({
            year : letter.year,
            totalLetters : 1
          })
        } else {
          lettersFromByYear[thisIndex].totalLetters = lettersFromByYear[thisIndex].totalLetters + 1;
        }
      }
      if(letter.year && letter.recipient && letter.recipient.indexOf("Erasmus") > -1) {
        const thisIndex = years3.indexOf(letter.year);
        if(thisIndex === -1) {
          years3.push(letter.year);
          lettersToByYear.push({
            year : letter.year,
            totalLetters : 1
          })
        } else {
          lettersToByYear[thisIndex].totalLetters = lettersToByYear[thisIndex].totalLetters + 1;
        }
      }
    })
    console.log(lettersByYear, lettersFromByYear)
    let newDatasets = [];
    newDatasets.push({
      label : "Total Letters by Year",
      data : lettersByYear.map(thisGroup => thisGroup.totalLetters),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    })
    newDatasets.push({
      label : "Letters From Erasmus By Year",
      data : lettersByYear.map(thisGroup => {
        let thisYearGroup = lettersFromByYear.find(yearGroup => yearGroup.year === thisGroup.year);
        if(thisYearGroup) {
          return thisYearGroup.totalLetters;
        } else {
          return 0;
        }
      }),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    })
    newDatasets.push({
      label : "Letters To Erasmus By Year",
      data : lettersByYear.map(thisGroup => {
        let thisYearGroup = lettersToByYear.find(yearGroup => yearGroup.year === thisGroup.year);
        if(thisYearGroup) {
          return thisYearGroup.totalLetters;
        } else {
          return 0;
        }
      }),
      borderColor: 'rgba(227, 239, 49)',
      backgroundColor: 'rgba(227, 239, 49, 0.5)',
    })
    console.log(newDatasets)
    let newLabels = years1;
    setLabels(newLabels)
    setDatasets(newDatasets)
  }, [letters])

  return (
    <Line options={options} data={{
      labels : labels,
      datasets : datasets
    }} />
  )

}