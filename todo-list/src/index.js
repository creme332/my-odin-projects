//import styles
import './reset.css';
import './styles.css';

import { Tooltip, Toast, Popover } from 'bootstrap';

// Import our custom CSS
import './scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import './assets/menu_FILL0_wght400_GRAD0_opsz48.svg'

var offcanvasElementList = [].slice.call(document.querySelectorAll('.offcanvas'))
var offcanvasList = offcanvasElementList.map(function (offcanvasEl) {
  return new bootstrap.Offcanvas(offcanvasEl)
})

