'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import VideoPlayer from './VideoPlayer';
import LessonsList from './LessonsList';
import Tabs from './Tabs';
import { useParams } from 'next/navigation';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';

export default function LessonPage() {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [moduleLessons, setModuleLessons] = useState([]);
  const [activeTab, setActiveTab] = useState('Tavsif');
  const [loading, setLoading] = useState(true);
  const [otpData, setOtpData] = useState(null);
  const [otpLoading, setOtpLoading] = useState(false);

  // Backenddan lesson va moduleLessons olish
  useEffect(() => {
  if (!id) return;

  const fetchLesson = async () => {
    const token = localStorage.getItem('access');
    if (!token) {
      window.location.href = '/signin';
      return;
    }

    setLoading(true);

    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/education/lessons/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      const data = res.data;
      setLesson({
        id: data.id,
        title: data.title,
        description: data.description,
        moduleId: data.module_id,
        homeworks: data.homeworks,
        resources: data.resources,
        duration: data.duration,
        moduleTitle: data.module_title,
        course_title: data.course_title,
        videoId: data.video_id,
      });
      setModuleLessons(data.module_lessons || []);
    } catch (err) {
      console.error('Failed to fetch lesson:', err);

      // Agar backend 401 qaytarsa
      if (err.response?.status === 401) {
        window.location.href = '/signin';
      }
    } finally {
      setLoading(false);
    }
  };

  fetchLesson();
}, [id]);


  // OTP olish (video oynasi uchun)
useEffect(() => {
  if (!lesson || !lesson.videoId) return;

  const fetchOtp = async () => {
    setOtpLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/education/vdocipher/otp/${lesson.videoId}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`,
          }
        }
      );
      setOtpData(res.data);
    } catch (e) {
      console.error('Failed to fetch OTP:', e);
      setOtpData(null);
    } finally {
      setOtpLoading(false);
    }
  };

  fetchOtp();
}, [lesson]);


  if (loading) return <div className="mt-20 text-2xl font-semibold text-center text-white">
    <CircularProgress className="mx-auto" color="inherit" />
  </div>;
  if (!lesson) return <div className="mt-20 text-2xl font-semibold text-center text-white">Video dars topilmadi !</div>;

  return (
    <div className="min-h-screen bg-[#030712] text-white px-4 py-8 lg:px-12">
      <div className="grid grid-cols-1 gap-8 mx-auto max-w-7xl lg:grid-cols-3">
        <div className="lg:col-span-2">
          {otpLoading ? (
            <Skeleton
              sx={{ bgcolor: '#2B3856' }}
              variant="rectangular"
              width={750}
              height={380}
            />
          ) : (
            otpData && (
              <VideoPlayer
                className="mb-6"
                title={lesson.title}
                otp={otpData.otp}
                playbackInfo={otpData.playbackInfo}
                description={lesson.description}
              />
            )
          )}

          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} lesson={lesson} />

          <div className="mt-6" style={{ display: activeTab === 'Tavsif' ? 'block' : 'none' }} />

        </div>

        <LessonsList key={lesson.id} moduleLessons={moduleLessons} title={lesson.title} currentLessonId={lesson.id} moduleName={lesson.moduleTitle} duration={lesson.duration}/>
      </div>
    </div>
  );
}
