import { BrowserRouter, Routes,Route } from "react-router";
import BasicDetailsForm from "./component/BasicDetailsForm";
import DocumentCollection from "./component/DocumentCollection";
import StatementPurpose from "./component/StatementPurpose";
import './App.css'
import InterviewAvailblity from "./component/InterviewAvailblity";


function App() {
  return (
    <div className="">
    
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<BasicDetailsForm/>}/>
        <Route path='/DocumentCollection' element={<DocumentCollection/>}/>
        <Route path='/StatementPurpose' element={<StatementPurpose/>}/>
        <Route path='/InterviewAvailblity' element={<InterviewAvailblity/>}/>
      </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
