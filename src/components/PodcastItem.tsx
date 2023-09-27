import ShowMoreText from "react-show-more-text";

function PodcastItem({ podcast }: { podcast: Podcast }) {
  const displayedText = podcast.text;
  return (
    <>
      <a
        href={`https://changelog.com/${podcast.podcast}/${podcast.episode_number}`}
        target="_blank"
        className="bg-gray-50 w-11/12 md:w-2/4 text-sm md:text-base mt-10 rounded p-4 leading-loose"
      >
        <h2 className="text-xl font-bold"> {podcast.speaker}</h2>
        <div className="text-sm font-normal">
          {" "}
          on {podcast.podcast} #{podcast.episode_number}
        </div>
        <ShowMoreText className="text-xs font-light pt-2">
          {displayedText}
        </ShowMoreText>
      </a>
    </>
  );
}

export default PodcastItem;
