import { CALL_STATUS, useVapi } from "@/hooks/useVapi";
import { Loader2, Mic, Square } from "lucide-react";
import { Button } from "../ui/button";

const AssistantButton = ({
  toggleCall,
  callStatus,
  audioLevel = 0,
}: Partial<ReturnType<typeof useVapi>>) => {
  const color =
    callStatus === CALL_STATUS.ACTIVE
      ? "#f43f5e" // rose-500
      : callStatus === CALL_STATUS.LOADING
      ? "#f59e0b" // amber-500
      : "#10b981"; // emerald-500
  
  const buttonStyle = {
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    color: "white",
    border: "none",
    boxShadow: `0 0 ${15 + audioLevel * 40}px ${
      audioLevel * 15
    }px ${color}`,
    backgroundColor:
      callStatus === CALL_STATUS.ACTIVE
        ? "#f43f5e" // rose-500
        : callStatus === CALL_STATUS.LOADING
        ? "#f59e0b" // amber-500
        : "#10b981", // emerald-500
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  const handleButtonClick = () => {
    console.log('Button clicked, current callStatus:', callStatus);
    if (toggleCall) {
      console.log('Calling toggleCall function');
      toggleCall();
    } else {
      console.error('toggleCall function is undefined or null');
    }
  };

  return (
    <Button
      style={buttonStyle}
      className={`transition ease-in-out ${
        callStatus === CALL_STATUS.ACTIVE
          ? "bg-rose-500 hover:bg-rose-600"
          : callStatus === CALL_STATUS.LOADING
          ? "bg-amber-500 hover:bg-amber-600"
          : "bg-emerald-500 hover:bg-emerald-600"
      } flex items-center justify-center shadow-lg`}
      onClick={handleButtonClick}
    >
      {callStatus === CALL_STATUS.ACTIVE ? (
        <Square />
      ) : callStatus === CALL_STATUS.LOADING ? (
        <Loader2 className="animate-spin" />
      ) : (
        <Mic />
      )}
    </Button>
  );
};

export { AssistantButton };
