import { ITopic } from "../../utils/types/course";

interface VideoTabProps {
  topic: ITopic | null;
}

const VideoTab: React.FC<VideoTabProps> = ({ topic }) => {

  console.log(topic, "VideoTab lecture"); //abc

  return (
    <div id="VideoDiv" className="w-full py-4 md:px-5">
      <iframe
        className="rounded-xl w-full aspect-[16/9]"
        src={topic?.url}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  )
}

export default VideoTab;