import CompanyReducer from './companyReducer';
import PlaceReducer from './placeReducer';
import URLReducer from './urlReducer';
import {combineReducers} from 'redux';
import TitleReducer from './titleReducer';
import DescriptionReducer from './descriptionReducer';

const rootReducer = combineReducers({
    company:CompanyReducer,
    title:TitleReducer,
    url:URLReducer,
    description:DescriptionReducer,
    Place:PlaceReducer

});

export default rootReducer;