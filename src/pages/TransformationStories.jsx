import { transformationStories } from '../data/transformationStories';
import '../css/FeaturePage.css';

function TransformationStories() {
  return (
    <section className="feature-page">
      <div className="feature-page-hero">
        <h1>Transformation Stories</h1>
        <p>
          Real-style success stories from the TrainWithNish community —
          showing what consistency with our tools can look like.
        </p>
      </div>

      <div className="feature-page-grid">
        {transformationStories.map((story) => (
          <article key={story.id} className="feature-page-card">
            <span className="feature-page-tag">{story.duration}</span>
            <h2>{story.name}</h2>
            <p><strong>Goal:</strong> {story.goal}</p>
            <p>{story.summary}</p>
            <p><strong>Result:</strong> {story.result}</p>
            <p style={{ fontStyle: 'italic', marginTop: 16, color: '#1e1e1e' }}>
              &ldquo;{story.quote}&rdquo;
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default TransformationStories;
