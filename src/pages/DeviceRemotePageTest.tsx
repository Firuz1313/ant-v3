import { useParams, useNavigate } from "react-router-dom";

interface DeviceRemotePageProps {
  panelBtnFromRemote?: number | null;
  onRemoteButton?: (key: string) => void;
}

export default function DeviceRemotePageTest({
  panelBtnFromRemote,
  onRemoteButton,
}: DeviceRemotePageProps) {
  const { deviceId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-foreground mb-4">
          Device Remote Test Page
        </h1>
        <p className="text-muted-foreground">Device ID: {deviceId}</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
