import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../components/ui/button";

function Submit() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleContinue = () => {
    // Store the confirmed action in sessionStorage so AdminReview can execute it
    const action = location.state?.action || "approve";
    sessionStorage.setItem("actionCompleted", JSON.stringify({ type: action }));

    // Show success toast
    toast.success("Request successfully approved!", {
      description: "The approval has been recorded and logged.",
      duration: 4000,
    });

    // Navigate back after a small delay to ensure toast renders
    setTimeout(() => {
      navigate("/admin");
    }, 500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      {/* Success Checkmark */}
      <div className="mb-8">
        <CheckCircle2 className="w-20 h-20 text-green-500" strokeWidth={1.5} />
      </div>

      {/* Success Heading */}
      <h1
        className="text-5xl font-bold text-center mb-6"
        style={{ fontFamily: "Trajan Pro, serif" }}
      >
        Success
      </h1>

      {/* Message Text */}
      <p className="text-center text-gray-600 mb-8 max-w-md text-lg">
        Your request for reinstatement was sent successfully.
        <br />
        Please check your email to continue.
      </p>

      {/* Continue Button */}
      <Button
        variant="default"
        style={{ backgroundColor: "#2F3590" }}
        className="text-white w-41 h-12"
        onClick={handleContinue}
      >
        Continue
      </Button>
    </div>
  );
}

export default Submit;
