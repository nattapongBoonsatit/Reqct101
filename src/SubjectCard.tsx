import React from "react";

type Subject = {
  id: number;
  name: string;
  grade: string;
};

type Props = {
  subject: Subject;
  onDelete: (id: number) => void;
};

const SubjectCard: React.FC<Props> = ({ subject, onDelete }) => {
  const gradeColor = subject.grade === "F" ? "#e74c3c" : "#2a7a3b"; // แดงสำหรับ F, เขียวแม่โจ้สำหรับอื่น
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px",
        borderRadius: "12px",
        background: "#f4f7f4",
        marginBottom: "10px",
        borderLeft: `6px solid ${gradeColor}`,
      }}
    >
      <div>
        <strong>{subject.name}</strong>
      </div>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <span
          style={{
            padding: "4px 10px",
            borderRadius: "8px",
            background: gradeColor,
            color: "white",
            fontWeight: "600",
          }}
        >
          {subject.grade}
        </span>
        <button
          onClick={() => onDelete(subject.id)}
          style={{
            background: "#c0392b",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "4px 10px",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default SubjectCard;
