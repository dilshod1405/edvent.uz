import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import axios from 'axios';
import CourseDetail from './CourseDetail';

const Page = async ({ params }) => {
  const { id } = params;

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/education/courses/${id}/`);
    const course = res.data;

    return (
      <div>
        <Header />
        <CourseDetail course={course} />
        <Footer />
      </div>
    );
  } catch (error) {
    console.error("Course not found:", error);
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        <p className="text-xl font-bold">Kurs topilmadi yoki yuklanmadi.</p>
      </div>
    );
  }
};

export default Page;
