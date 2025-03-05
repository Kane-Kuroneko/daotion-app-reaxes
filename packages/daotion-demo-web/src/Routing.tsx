import {
	Route ,
	Routes ,
	BrowserRouter ,
} from 'react-router-dom';


export const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
	      <Route
		      path = "/*"
	      >
		      <Route index element={<>add a component here</>}/>
	      </Route>

      </Routes>
    </BrowserRouter>
  );
};
