import React, { useState } from "react";
import "./App.css";

// Interface for the Grade object
interface Grade {
  id: number;
  field1: string;
  field2: string;
  field3: string;
  field4: number;
  field5: string;
}

const App: React.FC = () => {
  // State variables
  const initialGrades: Grade[] = [
    {
      id: 1,
      field1: "John",
      field2: "Doe",
      field3: "Math",
      field4: 5,
      field5: "2023-07-20",
    },
    {
      id: 2,
      field1: "Alice",
      field2: "Smith",
      field3: "History",
      field4: 4,
      field5: "2023-07-21",
    },
  ];

  // State variables
  const [grades, setGrades] = useState<Grade[]>(initialGrades);
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);
  const [newGrade, setNewGrade] = useState<Grade>({
    id: 3,
    field1: "",
    field2: "",
    field3: "",
    field4: 0,
    field5: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    // Special handling for the field5 input (Date)
    if (id === "field5") {
      // Validate the field5 format (YYYY-MM-DD) using a regular expression
      const datePattern = /^\d{4}-\d{2}-\d{2}$/;
      if (value.match(datePattern)) {
        setNewGrade((prevGrade) => ({
          ...prevGrade,
          field5: value,
        }));
      }
    } else {
      setNewGrade((prevGrade) => ({
        ...prevGrade,
        [id]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (
      !newGrade.field1 ||
      !newGrade.field2 ||
      !newGrade.field3 ||
      newGrade.field4 === 0 ||
      !newGrade.field5.match(/^\d{4}-\d{2}-\d{2}$/)
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
      field5: "",
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
    setGrades((prevGrades) =>
      prevGrades.map((g, index) => ({ ...g, id: index + 1 }))
    );
    if (selectedGrade && selectedGrade.id === grade.id) {
      setSelectedGrade(null);
      setNewGrade((prevGrade) => ({
        id: prevGrade.id,
        field1: "",
        field2: "",
        field3: "",
        field4: 0,
        field5: "",
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
                <p className="field1">Student First Name: {grade.field1}</p>
                <p className="field2">Student Last Name: {grade.field2}</p>
                <p className="field3">Subject: {grade.field3}</p>
                <p className="field4">Score: {grade.field4}</p>
                <p className="field5">Date: {grade.field5}</p>
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
            <input
              type="text"
              id="field5"
              defaultValue={newGrade.field5}
              onChange={handleInputChange}
              placeholder="Date (YYYY-MM-DD)"
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
                  field5: "",
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
