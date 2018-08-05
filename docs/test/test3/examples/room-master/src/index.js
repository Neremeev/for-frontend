import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// const dataSPA = {
// 	nameRoom: ["Красная", "Зелёная", "Синяя", "Жёлтая", "Фиолетовая"],
// 	day: ["Понедельник","Вторник","Среда","Четверг","Пятница"],
// 	time: ["9:00","10:00","11:00","12:00","14:00","15:00","16:00","17:00"]
// }
const dataSPA = {
	nameRoom: ["red", "green", "blue", "yellow","purple"],
	day: ["monday", "tuesday", "wednesday", "thursday", "friday"],
	time: ["ten", "twelve", "fourteen", "sixteen", "eighteen"]
}

ReactDOM.render(
	<App dataSPA={dataSPA} />,
	document.getElementById('root')
);

