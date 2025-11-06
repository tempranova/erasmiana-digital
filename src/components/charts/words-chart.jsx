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

export default function LetterChart({ letters, books }) {

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
        text: 'Words by Year',
      },
    },
  };

  useEffect(() => {
    const years1 = [];
    const wordsByYear = [];
    const years2 = [];
    const letterWordsByYear = [];
    const years3 = [];
    const bookWordsByYear = [];
    letters.forEach(letter => {
      if(letter.year) {
        const thisIndex = years2.indexOf(letter.year);
        if(thisIndex === -1) {
          years2.push(letter.year);
          letterWordsByYear.push({
            year : letter.year,
            totalWords : letter.wordCount
          })
        } else {
          letterWordsByYear[thisIndex].totalWords = letterWordsByYear[thisIndex].totalWords + letter.wordCount;
        }
        const totalIndex = years1.indexOf(letter.year);
        if(totalIndex === -1) {
          years1.push(letter.year);
          wordsByYear.push({
            year : letter.year,
            totalWords : letter.wordCount
          })
        } else {
          wordsByYear[totalIndex].totalWords = wordsByYear[totalIndex].totalWords + letter.wordCount
        }
      }
    })
    books.forEach(book => {
      if(book.year) {
        const thisIndex = years3.indexOf(book.year);
        if(thisIndex === -1) {
          years3.push(book.year);
          bookWordsByYear.push({
            year : book.year,
            totalWords : book.sections.reduce((acc, val) => acc + val.wordCount, 0)
          })
        } else {
          bookWordsByYear[thisIndex].totalWords = bookWordsByYear[thisIndex].totalWords + book.sections.reduce((acc, val) => acc + val.wordCount, 0)
        }
        const totalIndex = years1.indexOf(book.year);
        if(totalIndex === -1) {
          years1.push(book.year);
          wordsByYear.push({
            year : book.year,
            totalWords : book.sections.reduce((acc, val) => acc + val.wordCount, 0)
          })
        } else {
          wordsByYear[totalIndex].totalWords = wordsByYear[totalIndex].totalWords + book.sections.reduce((acc, val) => acc + val.wordCount, 0)
        }
      }
    })

    let newDatasets = [];
    newDatasets.push({
      label : "Total Words by Year",
      data : wordsByYear.map(thisGroup => thisGroup.totalWords),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    })
    newDatasets.push({
      label : "Letter Words by Year",
      data : wordsByYear.map(thisGroup => {
        let thisYearGroup = letterWordsByYear.find(yearGroup => yearGroup.year === thisGroup.year);
        if(thisYearGroup) {
          return thisYearGroup.totalWords;
        } else {
          return 0;
        }
      }),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    })
    newDatasets.push({
      label : "Book Words By Year",
      data : wordsByYear.map(thisGroup => {
        let thisYearGroup = bookWordsByYear.find(yearGroup => yearGroup.year === thisGroup.year);
        if(thisYearGroup) {
          return thisYearGroup.totalWords;
        } else {
          return 0;
        }
      }),
      borderColor: 'rgba(227, 239, 49)',
      backgroundColor: 'rgba(227, 239, 49, 0.5)',
    })
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