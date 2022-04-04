// TODO Add a couple lines about each project
const data = [
  {
    title: 'Crime Analysis in Atlanta',
    subtitle: 'Data Visualization and Analytics Course Project',
    link: 'https://kratosst.github.io/crime_map_demo.html',
    image: '/images/projects/crimemap.webp',
    date: '2021-12-5',
    desc:
      'Filtered crime data and extracted features with Hadoop and Spark. Applied multilayer perceptron (MLP) ML model to fit the '
      + 'crime prediction and achieved an accuracy of 65%.'
      + 'Designed and implemented an interactive web app to visualize crime predictions statistics in heatmap within 6 months and '
      + '30 minutes time gap, with React, D3.js, and Google Map API.'
      + 'Developed a backend server in Java powered by AWS EC2 for route planning to reduce the risk. ',
  },
  {
    title: 'EVA Operator Optimization',
    subtitle: 'Database System Implementation Course Project',
    link: 'https://github.com/KratosST/EVA-Delete-Operator',
    image: '/images/projects/eva.png',
    date: '2021-12-08',
    desc:
      'Distributed the system on multiple platforms backed by MySQL and Django to run the video analytics models. '
      + 'Designed new operators and user-defined functions to support queries in SQL statements and implemented related '
      + 'expression objects and planners to parse the input. Optimized the query by adding validations and preprocessing.',
  },
  {
    title: 'FIFA Player Info',
    subtitle: 'Database System Course Project',
    link: 'https://github.com/KratosST/CSC3170-Soccer-Management-System',
    image: '/images/projects/fifa.jpg',
    date: '2020-04-28',
    desc:
      'Developed the UI capable of customized searching, filtering, editing of player information with HTML and Javascript. '
      + 'Applied MySQL to design the relation schema and database structure. Built the info system backed by Django and Java. ',
  },
  {
    title: 'Medical Management',
    subtitle: 'A convolutional neural network to classify cats! (and dogs)',
    link: 'https://github.com/KratosST/CSC3002-Medical-Management-System',
    image: '/images/projects/medical-app.png',
    date: '2019-05-19',
    desc:
      'Designed and implemented a system capable of scheduling appointments between patients and doctors on the local area'
      + ' network (LAN), based on C++ and Qt. '
      + 'Applied the Jieba NLP API for text segmentation and recommendation algorithm over the extracted keywords from symptom'
      + ' descriptions and achieved average matching accuracy of 80%. Generated concise medical records for prescriptions.',
  },
];

export default data;
