import { useRef } from "react";

export interface InputsType {
  channelHandle: string;
  fromDate: string;
  toDate: string;
}

interface Props {
  onSubmit: (inputData: InputsType) => void;
}

const ChannelForm = ({ onSubmit }: Props) => {
  const handleRef = useRef<HTMLInputElement>(null);
  const fromRef = useRef<HTMLInputElement>(null);
  const toRef = useRef<HTMLInputElement>(null);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "20px", // Adds some padding around the form
        backgroundColor: "#f8f8f8", // Light grey background to enhance contrast
      }}
    >
      <form
        style={{
          maxWidth: "700px",
          width: "100%",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
        onSubmit={(e) => {
          e.preventDefault();
          const inputs: InputsType = {
            channelHandle: handleRef.current
              ? handleRef.current.value
              : "",
            fromDate: fromRef.current
              ? fromRef.current.value
              : "",
            toDate: toRef.current ? toRef.current.value : "",
          };
          onSubmit(inputs);
        }}
      >
        <div className="d-flex gap-3 mb-3">
          <input
            required
            className="form-control"
            type="text"
            placeholder="YouTube Handle"
            ref={handleRef}
            style={{
              border: "1px solid #000",
              borderRadius: "4px",
              padding: "10px",
              flex: 1,
            }}
          />
        </div>
        <div className="d-flex gap-3 mb-3">
          <div style={{ flex: 1 }}>
            <label
              className="form-label"
              htmlFor="from"
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
                color: "#000",
              }}
            >
              From
            </label>
            <input
              id="from"
              className="form-control"
              type="date"
              ref={fromRef}
              style={{
                border: "1px solid #000",
                borderRadius: "4px",
                padding: "10px",
                width: "100%",
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label
              className="form-label"
              htmlFor="to"
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
                color: "#000",
              }}
            >
              To
            </label>
            <input
              id="to"
              className="form-control"
              type="date"
              ref={toRef}
              style={{
                border: "1px solid #000",
                borderRadius: "4px",
                padding: "10px",
                width: "100%",
              }}
            />
          </div>
        </div>
        <button
          className="btn btn-dark"
          style={{
            display: "block",
            width: "100%",
            padding: "12px",
            backgroundColor: "#000",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            fontWeight: "bold",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#333")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#000")
          }
        >
          Get Channel
        </button>
      </form>
    </div>
  );
};

export default ChannelForm;
