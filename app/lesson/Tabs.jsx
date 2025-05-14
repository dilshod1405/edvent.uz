import Link from 'next/link';
import ChattingTab from './ChattingTab';

const TABS = ['Tavsif', 'Vazifalar', "Qo'llanmalar", 'Savol-javob'];

export default function Tabs({ activeTab, setActiveTab, lesson }) {
  return (
    <>
      <div className="border-b border-[#4F39F6] mb-4 flex space-x-6">
        {TABS.map(tab => (
          <button
            key={tab}
            className={`pb-2 font-semibold ${
              activeTab === tab ? 'border-b-4 border-[#4F39F6] text-white' : 'text-white/70'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {activeTab === 'Tavsif' && <div>{lesson.qa || 'Ushbu dars uchun tavsif mavjud emas.'}</div>}
        {activeTab === 'Vazifalar' && <div>{lesson.homework || 'Vazifa mavjud emas.'}</div>}
        {activeTab === "Qo'llanmalar" && (
          <ul className="space-y-2 text-white list-disc list-inside">
            {(lesson.resources || []).map((file, i) => (
              <li key={i}>
                <Link href={file.url} target="_blank" rel="noreferrer" className="text-blue-300 underline">
                  {file.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
        {activeTab === 'Savol-javob' && <ChattingTab lessonId={lesson.id} />}
      </div>
    </>
  );
}
