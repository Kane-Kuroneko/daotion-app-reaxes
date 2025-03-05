import {
	Route ,
	Routes ,
	BrowserRouter ,
} from 'react-router-dom';
import { Test } from '@@pages/Test';

import Homepage from '@@pages/Homepage';
import ComingSoon from '@@pages/ComingSoon';
import WhitePaper from '@@pages/WhitePaper';
import NotFound from '@@pages/NotFound';


export const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={toolkits.withOutlet(<Homepage />)} />

        <Route path="/*" element={toolkits.withOutlet(<NotFound />)} />

        <Route path="soon" element={toolkits.withOutlet(<ComingSoon />)} />

        <Route path="paper" element={toolkits.withOutlet(<WhitePaper />)} />

        <Route path="test/*" element={toolkits.withOutlet(<Test />)} />

      </Routes>
    </BrowserRouter>
  );
};
