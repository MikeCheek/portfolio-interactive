const pop = './assets/images/pop.png'
const quoridor = './assets/images/quoridor.png'
const nt = './assets/images/nt.png'
// const wdc = './assets/images/wdc.png'
const nlp = './assets/images/nlp.png'
const segmentation = './assets/images/segmentation.png'
const wordgame = './assets/images/wordgame.png'
// const pop_mobile = './assets/images/pop-mobile.jpg'
// const quoridor_mobile = './assets/images/quoridor-mobile.png'
// const nt_mobile = './assets/images/nt-mobile.jpg'
// const wdc_mobile = './assets/images/wdc-mobile.jpg'
// const segmentation_mobile = './assets/images/segmentation-mobile.png'
// const wordgame_mobile = './assets/images/wordgame-mobile.png'

export interface Project {
  title: string
  image: string
  // image_mobile: string
  description: string
  href?: string
  github?: string
  reduce_opacity?: boolean
  // video?: string;
  technologies?: string[]
  tools?: string[]
}

export const projectsList: Project[] = [
  {
    title: 'Semantic Segmentation of Underwater Imagery',
    image: segmentation,
    // image_mobile: segmentation_mobile,
    description: `This project focuses on developing a multi-class segmentation algorithm for underwater images.<br/><br/>
    The U-Net model was used and enhanced by incorporating a dropout mechanism to mitigate overfitting.<br/>
    Various images manipulation techniques were applied to calculate database statistics and to improve the data through preprocessing and augmentation.<br/><br/>
    
    Project developed for Machine Learning for CV course at ESILV.`,
    github:
      'https://github.com/MikeCheek/Semantic-Segmentation-of-Underwater-Imagery',
    // vidyyeo: require('../assets/videos/segmented.mp4'),
    technologies: ['Python', 'OpenCV', 'PyTorch', 'MatplotLib', 'NumPy'],
    tools: ['Machine Learning for Computer Vision', 'Segmentation models']
  },
  {
    title: 'TripAdvisor Recommendation Challenge',
    image: nlp,
    // image_mobile: nlp,
    description: `A machine learning project focused on building a recommendation system for TripAdvisor reviews. 
    Starting with a BM25 baseline, advanced NLP models like BERT and Sentence Transformers were tested, with Roberta achieving the best results.<br/><br/>
      Preprocessing included language filtering, tokenization, and lemmatization to enhance data quality. An ensemble learning approach combined model outputs to improve recommendation accuracy.<br/><br/>
      Project developed for Machine Learning for NLP course at ESILV.`,
    github: 'https://github.com/MikeCheek/Project1-MachineLearningForNLP',
    technologies: ['Python', 'NumPy', 'Pandas', 'nltk', 'PyTorch'],
    tools: ['Machine Learning for NLP', 'Ensemble Learning']
  },
  {
    title: 'Naturalmente Tecnologici',
    image: nt,
    // image_mobile: nt_mobile,
    description: `Website created on the occasion of the Naturalmente Tecnologici event organized by the Syskrack association in Grassano (Matera)<br/><br/>
      During the event there were conferences and workshops on the theme of ethical and sustainable technological development in social and environmental terms.<br/><br/>
      In the background is implemented a working <a href="https://en.wikipedia.org/wiki/Flocking" class="link" rel="noopener noreferrer" alt="Flocking simulation">Flocking simulation</a> (to be activated by clicking on "Animate Background")`,
    href: 'https://nt.syskrack.org',
    github: 'https://github.com/MikeCheek/naturalmente-tecnologici',
    // video: require('../assets/videos/nt-new.mp4'),
    technologies: ['GatsbyJs', 'Typescript', 'Sass'],
    tools: ['FTP Deploy Action']
  },
  {
    title: 'Quoridor - LandTiger',
    image: quoridor,
    // image_mobile: quoridor_mobile,
    description: `Project developed for the extrapoint of "Architetture dei sistemi di elaborazione" course at Politecnico di Torino 2023/2024.<br/><br/>
The aim of the project was to acquire full confidence in using the KEIL software debug environment to emulate the behaviour of the LPC1768 and the LANDTIGER board.<br/><br/>
To achieve this result we were asked to develop a working reprodution of the Quoridor game.`,
    github: 'https://github.com/MikeCheek/ASE-Extrapoint-1-Quoridor',
    // video: require('../assets/videos/quoridor.mp4'),
    technologies: ['C', 'ARM Assembly'],
    tools: ['Keil']
  },
  {
    title: 'Pop! Funding',
    image: pop,
    // image_mobile: pop_mobile,
    description: `A working crowdfunding web application based on Algorand Blockchain where anyone with Algo can create a funding or donate<br/><br/>
    This is the Project Work proposed by Algorand to the attendees of MasterZ 2nd Edition.<br/><br/>
    Doing this Project Work we had the opportunity to test and improve our knowledge of the Algorand blockchain and to learn how to use it in the development of a crowdfunding platform.<br/><br/>
    Visit the site and try to click on bubbles!`,
    href: 'https://pop-funding.vercel.app',
    github: 'https://github.com/MikeCheek/pop-funding',
    // video: require('../assets/videos/pop.mp4'),
    technologies: ['NextJs', 'Typescript', 'TailwindCSS'],
    tools: ['ESLint', 'Prettier']
  },
  // {
  //   title: "Web Dev Challenge 2022",
  //   image: wdc,
  //   image_mobile: wdc_mobile,
  //   description: `Website created to show all info of the Web Dev Challenge event organized by JEToP<br/><br/>
  //               In the challenge, teams were required to create landing pages on a specific topic<br/><br/>
  //               Have a look also at the <a title="JEToP WDC Thanks" href="https://wdc.jetop.com/thanks" class="link" rel="noopener noreferrer" target="_blank">thanks page</a>`,
  //   href: "https://wdc.jetop.com",
  //   technologies: ["NextJs", "Typescript", "TailwindCSS"],
  //   tools: ["Husky", "ESLint", "Prettier"],
  // },
  {
    title: 'Word Game',
    image: wordgame,
    // image_mobile: wordgame_mobile,
    description: `WebApp developed for fun and to try something new<br/><br/>
                It is a simple guess the hidden word game and you can play in english or in italian<br/><br/>
                This webapp is also a PWA, so you can install it and play offline<br/><br/>
                When you guess the word, you can also see its definition (only available in English).
                It's a great way to play and learn at the same time!`,
    href: 'https://mikecheek.github.io/wordgame',
    github: 'https://github.com/MikeCheek/wordgame',
    technologies: ['GatsbyJs', 'Typescript', 'Sass']
  }
]
