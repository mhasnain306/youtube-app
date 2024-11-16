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
        padding: "10px",
        backgroundColor: "#f8f8f8",
        marginBottom: "10px",
      }}
    >
      <form
        style={{
          display: "flex",
          alignItems: "center",
          maxWidth: "800px",
          width: "100%",
          backgroundColor: "#fff",
          padding: "10px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          gap: "10px",
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
        <input
          required
          className="form-control"
          type="text"
          placeholder="YouTube Handle (@MrBeast)"
          ref={handleRef}
          style={{
            border: "1px solid #000",
            borderRadius: "4px",
            padding: "8px",
            flex: 2,
            minWidth: "200px",
          }}
        />
        <input
          id="from"
          className="form-control"
          type="date"
          ref={fromRef}
          style={{
            border: "1px solid #000",
            borderRadius: "4px",
            padding: "8px",
            flex: 1,
            minWidth: "150px",
          }}
        />
        <input
          id="to"
          className="form-control"
          type="date"
          ref={toRef}
          style={{
            border: "1px solid #000",
            borderRadius: "4px",
            padding: "8px",
            flex: 1,
            minWidth: "150px",
          }}
        />
        <button
          className="btn btn-dark"
          style={{
            padding: "10px 15px",
            backgroundColor: "#000",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            fontWeight: "bold",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
            minWidth: "120px",
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
