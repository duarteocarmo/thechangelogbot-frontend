function PodcastItem({ podcast }: { podcast: Podcast }) {
  const displayedText = podcast.text;
  return (
    <>
      <a
        href={`https://changelog.com/${podcast.podcast}/${podcast.episode_number}`}
        target="_blank"
        className="bg-gray-50 w-3/4 mt-10 rounded p-4 leading-loose"
      >
        <h2 className="text-xl font-bold">
          {podcast.podcast} #{podcast.episode_number}
        </h2>
        <div className="text-sm font-normal">{podcast.speaker}</div>
        <div className="text-xs font-light pt-2">{displayedText}</div>
      </a>
    </>
  );
}


export default PodcastItem