import { ITopic } from "../../utils/types/course";

interface VideoTabProps {
  topic: ITopic | null;
}

const VideoTab: React.FC<VideoTabProps> = ({ topic }) => {
  console.log(topic);
  return (
    <div id="VideoDiv" className="w-full py-4 md:px-5">
      <iframe
        className="rounded-xl w-full aspect-[16/9]"
        // src={topic?.url}
        src="https://www.youtube.com/embed/6nv3qy3oNkc?si=KMZ9nqDLNavw6jIl"
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