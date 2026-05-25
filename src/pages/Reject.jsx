import { useNavigate, useLocation } from "react-router-dom";
import { CircleX } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../components/ui/button";

function Reject() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoBack = () => {
    // Store the confirmed action in sessionStorage so AdminReview can execute it
    const action = location.state?.action || "reject";
    sessionStorage.setItem("actionCompleted", JSON.stringify({ type: action }));

    // Show rejection toast
    toast.error("Request has been rejected!", {
      description: "The student will be notified of the rejection.",
      duration: 4000,
    });

    // Navigate back after a small delay to ensure toast renders
    setTimeout(() => {
      navigate("/admin");
    }, 500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      {/* Reject Checkmark */}
      <div className="mb-8">
        <CircleX className="w-20 h-20 text-red-500" strokeWidth={1.5} />
      </div>

      {/* Reject Heading */}
      <h1
        className="text-5xl font-bold text-center mb-6"
        style={{ fontFamily: "Trajan Pro, serif" }}
      >
        Try Again
      </h1>

      {/* Message Text */}
      <p className="text-center text-gray-600 mb-8 max-w-lg text-lg">
        Your request for reinstatement wasn't sent successfully.
        <br />
        Please resubmit your form application.
      </p>

      {/* Try again Button */}
      <Button
        variant="default"
        style={{ backgroundColor: "#2F3590" }}
        className="text-white w-41 h-12"
        onClick={handleGoBack}
      >
        Go back
      </Button>
    </div>
  );
}

export default Reject;
