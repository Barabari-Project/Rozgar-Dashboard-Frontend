import { ITopic } from "../../utils/types/course";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import "./lecture.css";


interface VideoTabProps {
  topic: ITopic | null;
}

const VideoTab: React.FC<VideoTabProps> = ({ topic }) => {
    const markdown = `# React Notes with Markdown Features

  This document includes various elements like Google links, images, YouTube thumbnails, and markdown styling for React-based apps.

  ## Links
  - [Google Search](https://www.google.com)

  ## Large Image
  ![Large Image](https://via.placeholder.com/1200x600 "Sample Large Image")

  ## YouTube Thumbnail Link
  [![YouTube Video](https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg)](https://www.youtube.com/watch?v=dQw4w9WgXcQ)

  ## Markdown Features

### Headings
# H1
## H2
### H3

  ### Emphasis  
  - *Italic*
  - **Bold**
  - ***Bold and Italic***

  ### Lists

  #### Unordered List
  - Item 1
  - Item 2
    - Sub-item 1
    - Sub-item 2

  #### Ordered List
  1. First item
  2. Second item

  ### Blockquote
  > This is a blockquote.

  ### Inline Code
  Here is some 

  ### Code Block
  javascript
  function helloWorld() {
    console.log("Hello, World!");
  }

  `
  console.log(topic && topic.markdown);
  return (
    <div id="VideoDiv" className="w-full py-4 md:px-5">
      <Markdown remarkPlugins={[remarkGfm]}>{topic && topic.markdown}</Markdown>
    </div>
  )
}

export default VideoTab;