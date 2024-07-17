import { IModule } from "../../utils/types/course";

interface VideoTabProps {
    videoUrl: string ;
    module: IModule | null;
}

const VideoTab: React.FC<VideoTabProps> = ({ videoUrl, module }) => {
    
    console.log(videoUrl, "videoUrl"); //abc
    
    return (
        <div id="VideoDiv" className="w-full py-4 md:px-5">
        <iframe
          className="rounded-xl w-full aspect-[16/9]"
          src={videoUrl || `https://www.youtube.com/embed/fN74Ate46Z8?si=bNkrleFc44ltVE0t`}
          // src="https://www.youtube.com/embed/fN74Ate46Z8?si=bNkrleFc44ltVE0t"
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