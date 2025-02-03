import Banner from './components/Banner';
import Top10List from './components/Top10List';

export default async function Home() {
  let bannerData = null;

  try {
    bannerData = await fetch('http://localhost:3000/api/banner', {
      next: { revalidate: 60 }, // ✅ 60초마다 데이터 갱신 (ISR)
    }).then((res) => res.json());
  } catch (error) {
    console.error('❌ Banner API fetch failed:', error);
  }

  return (
    <div>
      {/* API 요청이 실패하면 기본 배너 데이터를 보여줌 */}
      <Banner
        bannerData={
          bannerData || {
            image: '',
            title: '기본 배너',
            description: '기본 설명',
          }
        }
      />
      <div className='px-8'>
        <Top10List />
      </div>
    </div>
  );
}
