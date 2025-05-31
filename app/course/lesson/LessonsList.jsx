import Link from 'next/link';

export default function LessonsList({ currentLessonId, moduleLessons, moduleName, title }) {
  return (
    <div className="bg-[#17212b] p-4 rounded-md shadow-md">
      <h2 className="mb-4 text-xl font-semibold text-white">{moduleName}</h2>
      <ul className="space-y-2">
        {moduleLessons.map(lesson => {
          const isActive = String(lesson.id) === String(currentLessonId);
          return (
            <li key={lesson.id}>
              <Link
                href={`/lesson/${lesson.id}`}
                className={`block px-3 py-2 rounded-md font-medium transition-colors duration-200 ${
                  isActive
                    ? 'bg-[#4F39F6] text-white'
                    : 'text-gray-300 hover:bg-[#4F39F6] hover:text-white'
                }`}
              >
                {lesson.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
