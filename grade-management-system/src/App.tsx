import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import AboutPage from "./AboutPage";

// Interface for the Grade object
interface Grade {
  id: number;
  studentFirstName: string;
  studentLastName: string;
  subject: string;
  score: number;
  date: Date;
}

const App: React.FC = () => {
  // State variables
  const [grades, setGrades] = useState<Grade[]>([]);
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);
  const [newGrade, setNewGrade] = useState<Grade>({
    id: 1,
    studentFirstName: "",
    studentLastName: "",
    subject: "",
    score: 0,
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
      !newGrade.studentFirstName ||
      !newGrade.studentLastName ||
      !newGrade.subject ||
      newGrade.score === 0
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
      studentFirstName: "",
      studentLastName: "",
      subject: "",
      score: 0,
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
    // After deleting the grade, update the IDs in order
    setGrades((prevGrades) =>
    prevGrades.map((g, index) => ({ ...g, id: index + 1 }))
    );
    
    if (selectedGrade && selectedGrade.id === grade.id) {
      setSelectedGrade(null);
      setNewGrade((prevGrade) => ({
        id: prevGrade.id,
        studentFirstName: "",
        studentLastName: "",
        subject: "",
        score: 0,
        date: new Date(),
      }));
    }
  };

  return (
    <Router>
      <div>
      {/* Navbar */}
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>

      {/* Main content */}
      <main className="main">
        {/* List Section */}
        <section className="content-list">
          <ul className="grade-list">
            {grades.map((grade) => (
              <li key={grade.id} onClick={() => handleGradeSelect(grade)}>
                <p className="id">ID: {grade.id}</p>
                <p className="studentFirstName">
                  Student First Name: {grade.studentFirstName}
                </p>
                <p className="studentLastName">
                  Student Last Name: {grade.studentLastName}
                </p>
                <p className="subject">Subject: {grade.subject}</p>
                <p className="score">Score: {grade.score}</p>
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
              id="studentFirstName"
              value={newGrade.studentFirstName}
              onChange={handleInputChange}
              placeholder="Student First Name"
              required
            />
            <input
              type="text"
              id="studentLastName"
              value={newGrade.studentLastName}
              onChange={handleInputChange}
              placeholder="Student Last Name"
              required
            />
            <input
              type="text"
              id="subject"
              value={newGrade.subject}
              onChange={handleInputChange}
              placeholder="Subject"
              required
            />
            <input
              type="number"
              id="score"
              value={newGrade.score}
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
                  studentFirstName: "",
                  studentLastName: "",
                  subject: "",
                  score: 0,
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

      {/* Routes */}
      <Routes>
        <Route path="/about" element={<AboutPage/>} />
        {/* Add other routes as needed */}
      </Routes>
    </div>
    </Router>
  );
};

export default App;
