import { BrowserRouter, Routes } from "react-router-dom";

import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
} from "./components";
import { RoundedButtons } from "./components/btn";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SecondPage from "./components/secondpage"; // Update the import statement

const App = () => {
  return (
    // <Router>
    //   <div className='relative z-0 bg-primary'>
    //     <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
    //       <Navbar />
    //       <Hero />
    //     </div>
    //     {/* <About />
    //     <Experience />
    //     <Works />
    //     <Feedbacks />
    //     <div className='relative z-0'>
    //       <Contact />
    //     </div>  */}
    //   </div>
    //   <Route path="/" exact>
    //       <Navbar />
    //       <Hero />
    //     </Route>
    //     <Route path="/second">
    //       <secondPage />
    //     </Route>

    // </Router>
    //   <BrowserRouter>
    //   <div className='relative z-0 bg-primary'>
    //     {/* ... Other components and content ... */}
    //     <Route path="/" exact>
    //       <Navbar />
    //       <Hero />
    //     </Route>
    //     <Route path="/second">
    //       <secondPage /> {/* Use the corrected component name */}
    //     </Route>
    //   </div>
    // </BrowserRouter>

    <Router>
      <div className="relative z-0 bg-primary bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar />
        <Hero />
      </div>

      <Routes>
        <Route path="/second" element={<SecondPage />} />
      </Routes>
      <div className="relative z-0 bg-primary">
        {/* <About />
        <Experience />
        <Works />
        <Feedbacks /> */}
        <div className="relative z-0">{/* <Contact /> */}</div>
      </div>
    </Router>
  );
};

export default App;
