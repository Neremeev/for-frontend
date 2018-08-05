import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';

import './static/styles/styles.css';
import './static/styles/vendor.min.css';


import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Root />,
  document.getElementById('root')
);

registerServiceWorker();
