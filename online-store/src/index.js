import './global.css';

import { eventClickCard, showCards } from './components/cardCreator'

import { eventGetTypingTextValue, eventInputSearchArea } from './components/search'

import { updateCartCounter } from './components/cart'

import {setFilters,  
        eventClickClearFiltersButton, 
        eventClickFiltersCheckboxInput } from './components/filter'

import{ eventChangeSortSelector } from './components/sort'

import { eventClickResetSettings } from './components/resetSettings'

//----------------INITIALIZATION-------------------------------

setFilters();
showCards();
updateCartCounter();

//----------------EVENTS---------------------------------------
eventClickClearFiltersButton(showCards);
eventClickFiltersCheckboxInput(showCards);

eventChangeSortSelector(showCards);

eventClickResetSettings();

eventGetTypingTextValue(showCards);

eventInputSearchArea(showCards)

eventClickCard()