import { useNavigate, useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useEffect, useRef } from "react";

interface VideoProps {
  username: string;
}

function Video({username}: VideoProps) {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const zegoInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!roomId) {
      return;
    }

    const mymeeting = async () => {
      const appId = 365517591;
      const serverSecret = "7714b19e5a2120096fc6cda4658c57ea";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appId,
        serverSecret,
        roomId,
        String(Date.now()),
        username
      );

      const zegoInstance = ZegoUIKitPrebuilt.create(kitToken);
      zegoInstanceRef.current = zegoInstance;

      zegoInstance.joinRoom({
        container: containerRef.current,
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        onLeaveRoom() {
          navigate("/");
        },
        showPreJoinView: false,
        showRoomDetailsButton: false,
        showAudioVideoSettingsButton: false,
        showScreenSharingButton: false,
        layout: "Grid",
      });
    };

    mymeeting();

    return () => {
      if (zegoInstanceRef.current) {
        zegoInstanceRef.current.destroy();
      }
    };
  }, [roomId, navigate]);

  return <div ref={containerRef} className="rounded-md overflow-hidden"></div>;
}

export default Video;
