import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MandalaData } from './mandala_types';

function MandalaListPage() {
  const [mandalaDataList, setMandalaDataList] = useState<MandalaData[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8000/mandala_list');

        const data = await response.json();

        setMandalaDataList(data);
      } catch (error) {
        console.error('Mandalaデータの取得中にエラーが発生しました:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Mandala一覧</h1>
      <ul>
        {mandalaDataList.map((mandalaData) => (
          <li key={mandalaData.mandala_id}>
            <Link href={`/${mandalaData.mandala_id}`}>
              {mandalaData.mandala_title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MandalaListPage;
