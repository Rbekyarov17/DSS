import React, { useState } from "react";
//import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import "./App.css";


// Interface for the Grade object
interface Grade {
  id: number;
  field1: string;
  field2: string;
  field3: string;
  field4: number;
  date: Date;
}

const App: React.FC = () => {
  // State variables
  const [grades, setGrades] = useState<Grade[]>([]);
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);
  const [newGrade, setNewGrade] = useState<Grade>({
    id: 1,
    field1: "",
    field2: "",
    field3: "",
    field4: 0,
    date: new Date(),
  });

  // Handle form input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setNewGrade((prevGrade) => ({
      ...prevGrade,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (
      !newGrade.field1 ||
      !newGrade.field2 ||
      !newGrade.field3 ||
      newGrade.field4 === 0
    ) {
      return;
    }

    if (selectedGrade) {
      // Update existing grade
      setGrades((prevGrades) =>
        prevGrades.map((grade) =>
          grade.id === selectedGrade.id ? newGrade : grade
        )
      );
    } else {
      // Add new grade
      setGrades((prevGrades) => [...prevGrades, newGrade]);
    }

    setNewGrade((prevGrade) => ({
      id: prevGrade.id + 1,
      field1: "",
      field2: "",
      field3: "",
      field4: 0,
      date: new Date(),
    }));
    setSelectedGrade(null);
  };

  // Handle grade selection
  const handleGradeSelect = (grade: Grade) => {
    setSelectedGrade(grade);
    setNewGrade(grade);
  };

  // Handle grade deletion
  const handleGradeDelete = (grade: Grade) => {
    setGrades((prevGrades) =>
      prevGrades.filter((g) => g.id !== grade.id)
    );
    if (selectedGrade && selectedGrade.id === grade.id) {
      setSelectedGrade(null);
      setNewGrade((prevGrade) => ({
        id: prevGrade.id,
        field1: "",
        field2: "",
        field3: "",
        field4: 0,
        date: new Date(),
      }));
    }
  };

  return (
    
      <div>
      {/* Navbar */}
      <nav className="navbar">Navbar</nav>

      {/* Main content */}
      <main className="main">
        {/* List Section */}
        <section className="content-list">
          <ul className="grade-list">
            {grades.map((grade) => (
              <li key={grade.id} onClick={() => handleGradeSelect(grade)}>
                <p className="id">ID: {grade.id}</p>
                <p className="field1">
                  Student First Name: {grade.field1}
                </p>
                <p className="field2">
                  Student Last Name: {grade.field2}
                </p>
                <p className="field3">Subject: {grade.field3}</p>
                <p className="field4">Score: {grade.field4}</p>
                <p className="date">Date: {grade.date.toDateString()}</p>
                <button
                  className="deleteButton"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleGradeDelete(grade);
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* Details Section */}
        <section className="content-details">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="field1"
              value={newGrade.field1}
              onChange={handleInputChange}
              placeholder="Student First Name"
              required
            />
            <input
              type="text"
              id="field2"
              value={newGrade.field2}
              onChange={handleInputChange}
              placeholder="Student Last Name"
              required
            />
            <input
              type="text"
              id="field3"
              value={newGrade.field3}
              onChange={handleInputChange}
              placeholder="Subject"
              required
            />
            <input
              type="number"
              id="field4"
              value={newGrade.field4}
              onChange={handleInputChange}
              min="2"
              max="6"
              placeholder="Score (2-6)"
              required
            />
            <button type="submit" id="saveButton">
              Save
            </button>
            <button
              type="button"
              id="clearButton"
              onClick={() =>
                setNewGrade((prevGrade) => ({
                  id: prevGrade.id,
                  field1: "",
                  field2: "",
                  field3: "",
                  field4: 0,
                  date: new Date(),
                }))
              }
            >
              Clear
            </button>
          </form>
        </section>
        
      </main>

      {/* Footer */}
      <footer className="footer">Footer</footer>

    </div>
    
  );
};

export default App;
