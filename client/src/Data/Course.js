import Mern from '../assets/C1MERN.jpg';
import Devops from '../assets/C2DEVOPS.jpg';
import Cloud from '../assets/C3Cloud.jpg';
import Java from '../assets/C4JAVA.jpg';
import Ethical from '../assets/C5EthicalHacking.jpg';

const Course = [
  {
    id: '1',
    thumbnail: Mern,
    title: 'MERN Stack Development',
    courseBy: 'freeCodeCamp',
    rating: 4.5,
    price: '₹1099',
  },
  {
    id: '2',
    thumbnail: Devops,
    title: 'DevOps Mastery',
    courseBy: 'intellipaat',
    rating: 4.3,
    price: '₹1299',
  },
  {
    id: '3',
    thumbnail: Cloud,
    title: 'Cloud Computing Essentials',
    courseBy: 'Edureka',
    rating: 4.2,
    price: '₹999',
  },
  {
    id: '4',
    thumbnail: Java,
    title: 'Java Programming Bootcamp',
    courseBy: 'BroCode',
    rating: 4.4,
    price: '₹1199',
  },
  {
    id: '5',
    thumbnail: Ethical,
    title: 'Ethical Hacking & Cyber Security',
    courseBy: 'HackPhiles',
    rating: 4.6,
    price: '₹1399',
  },
];

export default Course;
