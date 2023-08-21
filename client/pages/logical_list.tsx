import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Idea5w2hData } from './idea_5w2h_types';
import { MandalaData } from './mandala_types';

function MandalaListPage() {
  const [mandalaDataList, setMandalaDataList] = useState<MandalaData[]>([]);
  const [idea5w2hDataList, setIdea5w2hDataList] = useState<Idea5w2hData[]>([]);

  useEffect(() => {
    async function fetchMandalaData() {
      try {
        const response = await fetch('http://localhost:8000/mandala_list');
        const data = await response.json();
        setMandalaDataList(data);
      } catch (error) {
        console.error('Mandalaデータの取得中にエラーが発生しました:', error);
      }
    }

    async function fetchIdea5w2hData() {
      try {
        const response = await fetch('http://localhost:8000/5w2h_list');
        const data = await response.json();
        setIdea5w2hDataList(data);
      } catch (error) {
        console.error('5w2hデータの取得中にエラーが発生しました:', error);
      }
    }

    fetchMandalaData();
    fetchIdea5w2hData();
  }, []);

  return (
    <div>
      <h1>Mandala一覧</h1>
      <ul>
        {mandalaDataList.map((mandalaData) => (
          <li key={mandalaData.mandala_id}>
            <Link href={`/mandala/${mandalaData.mandala_id}`}>
              {mandalaData.mandala_title}
            </Link>
          </li>
        ))}
      </ul>
      <br />
      <h1>5w2h一覧</h1>
      <ul>
        {idea5w2hDataList.map((idea5w2hData) => (
          <li key={idea5w2hData.idea_5w2h_id}>
            <Link href={`idea_5w2h/${idea5w2hData.idea_5w2h_id}`}>
              {idea5w2hData.idea_5w2h_title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MandalaListPage;
