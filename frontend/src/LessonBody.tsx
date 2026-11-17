import type { Lesson } from './course';
import { lessonGuides } from './lessonGuides';

export default function LessonBody({ lesson }: { lesson: Lesson }) {
  const guide = lessonGuides[lesson.id];

  return (
    <div className="lesson-body">
      <p className="lesson-text">{guide.basics}</p>
      <p className="lesson-text">{lesson.notes}</p>

      <h3>Worked example</h3>
      <p className="lesson-text">{guide.context}</p>
      <pre>{lesson.example}</pre>
      <p className="lesson-text">{guide.walkthrough.join(' ')}</p>

      <h3>Points to remember</h3>
      <ul>
        {guide.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
    </div>
  );
}
