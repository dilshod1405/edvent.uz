import Link from 'next/link';
import ChattingTab from './ChattingTab';
import DownloadIcon from '@mui/icons-material/Download';

const TABS = ['Tavsif', 'Vazifalar', "Qo'llanmalar", 'Savol-javob'];

export default function Tabs({ activeTab, setActiveTab, lesson }) {
  return (
    <>
      <div className="border-b border-[#4F39F6] mb-4 flex space-x-6">
        {TABS.map(tab => (
          <button
            key={tab}
            className={`pb-2 font-semibold cursor-pointer ${
              activeTab === tab ? 'border-b-4 border-[#4F39F6] text-white' : 'text-white/70'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      
      <div className="mt-4">
        {activeTab === 'Tavsif' && <div>{lesson.description || 'Ushbu dars uchun tavsif mavjud emas.'}</div>}
        {activeTab === 'Vazifalar' && (
          <ul className="space-y-2 list-disc list-inside">
            {(lesson.homeworks || []).length > 0 ? (
              lesson.homeworks.map((hw, i) => (
                <li key={i}>
                  {hw.description}
                  {hw.file && (
                    <a href={hw.file} target="_blank" rel="noreferrer" className="ml-2 text-blue-300 underline">
                      <DownloadIcon /> Yuklab olish
                    </a>
                  )}
                </li>
              ))
            ) : (
              <p>Vazifa mavjud emas.</p>
            )}
          </ul>
        )}

        {activeTab === "Qo'llanmalar" && (
          <ul className="space-y-2 text-white list-disc list-inside">
            {(lesson.resources || []).map((file, i) => (
              <li key={i}>
                <Link href={file.file} target="_blank" rel="noreferrer" className="text-blue-300 underline">
                  {file.title}
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
