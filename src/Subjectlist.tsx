import React, { useState } from "react";
import SubjectCard from "./SubjectCard";

type Subject = {
  id: number;
  name: string;
  grade: string;
};

const gradePoints: Record<string, number> = {
  A: 4.0,
  "B+": 3.5,
  B: 3.0,
  "C+": 2.5,
  C: 2.0,
  "D+": 1.5,
  D: 1.0,
  F: 0.0,
  W: 0.0,
};

const SubjectList: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [subjectName, setSubjectName] = useState("");
  const [grade, setGrade] = useState("A");
  const [gpa, setGpa] = useState<number | null>(null);

  const addSubject = () => {
    if (!subjectName.trim()) return;
    setSubjects([...subjects, { id: Date.now(), name: subjectName, grade }]);
    setSubjectName("");
  };

  const removeSubject = (id: number) => {
    setSubjects(subjects.filter((s) => s.id !== id));
  };

  const calculateGPA = () => {
    const valid = subjects.filter((s) => s.grade !== "W");
    if (valid.length === 0) {
      setGpa(0);
      return;
    }
    const total = valid.reduce((sum, s) => sum + gradePoints[s.grade], 0);
    setGpa(total / valid.length);
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "20px",
        background: "#fff",
        borderRadius: "20px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#2a7a3b" }}>
        📘 Maejo Subjects
      </h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Subject Name"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid #ccc",
          }}
        />
        <select
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid #ccc",
          }}
        >
          {Object.keys(gradePoints).map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        <button
          onClick={addSubject}
          style={{
            background: "#60b66c",
            color: "white",
            border: "none",
            borderRadius: "10px",
            padding: "10px 15px",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>

      <div>
        {subjects.map((s) => (
          <SubjectCard key={s.id} subject={s} onDelete={removeSubject} />
        ))}
      </div>

      <button
        onClick={calculateGPA}
        style={{
          width: "100%",
          background: "#2a7a3b",
          color: "white",
          padding: "12px",
          borderRadius: "12px",
          border: "none",
          fontWeight: "600",
          marginTop: "20px",
          cursor: "pointer",
        }}
      >
        Calculate GPA
      </button>

      {gpa !== null && (
        <div
          style={{
            textAlign: "center",
            fontSize: "20px",
            fontWeight: "600",
            color: "#60b66c",
            marginTop: "15px",
          }}
        >
          🎓 GPA: {gpa.toFixed(2)}
        </div>
      )}
    </div>
  );
};

export default SubjectList;
