import { Box, Button, Input, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Idea5w2hData } from '../idea_5w2h_types';

function Idea5w2hPage() {
  const router = useRouter();
  const { idea_5w2h_id } = router.query;

  const [idea5w2hData, setIdea5w2hData] = useState<Idea5w2hData | null>(null);
  const [editable, setEditable] = useState(false);
  const [saveMessageVisible, setSaveMessageVisible] = useState(false);

  const handleSaveSuccess = () => {
    setSaveMessageVisible(true);
    setTimeout(() => {
      setSaveMessageVisible(false);
      setEditable(false);
    }, 2000);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:8000/5w2h?idea_5w2h_id=${idea_5w2h_id}`,
        );
        const data = await response.json();
        setIdea5w2hData(data);
      } catch (error) {
        console.error('5w2hデータの取得中にエラーが発生しました:', error);
      }
    }

    if (idea_5w2h_id) {
      fetchData();
    }
  }, [idea_5w2h_id]);

  const handleEditToggle = () => {
    setEditable((prevEditable) => !prevEditable);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/5w2h/${idea_5w2h_id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(idea5w2hData),
        },
      );

      if (response.ok) {
        handleSaveSuccess();
      } else {
        console.error('5w2hデータの保存中にエラーが発生しました');
      }
    } catch (error) {
      console.error('5w2hデータの保存中にエラーが発生しました:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/5w2h/${idea_5w2h_id}`,
        {
          method: 'DELETE',
        },
      );

      if (response.ok) {
        router.push('/logical_list');
      } else {
        console.error('Mandalaデータの削除中にエラーが発生しました');
      }
    } catch (error) {
      console.error('Mandalaデータの削除中にエラーが発生しました:', error);
    }
  };

  const handleBack = () => {
    router.push('/logical_list');
  };

  if (!idea5w2hData) {
    return <div>ロード中...</div>;
  }

  return (
    <Box>
      {saveMessageVisible && <Text color="green">保存しました</Text>}
      <Text fontSize="xl">5w2hデータ (ID: {idea5w2hData.idea_5w2h_id})</Text>
      <Text>5w2hタイトル: {idea5w2hData.idea_5w2h_title}</Text>

      <div className="grid-container">
        <div className="grid-item">
          Why:{' '}
          {editable ? (
            <Input
              value={idea5w2hData.why}
              onChange={(e) =>
                setIdea5w2hData({ ...idea5w2hData, why: e.target.value })
              }
            />
          ) : (
            idea5w2hData.why
          )}
        </div>
        <div className="grid-item">
          When:{' '}
          {editable ? (
            <Input
              value={idea5w2hData.when}
              onChange={(e) =>
                setIdea5w2hData({ ...idea5w2hData, when: e.target.value })
              }
            />
          ) : (
            idea5w2hData.when
          )}
        </div>
        <div className="grid-item">
          Where:{' '}
          {editable ? (
            <Input
              value={idea5w2hData.where}
              onChange={(e) =>
                setIdea5w2hData({ ...idea5w2hData, where: e.target.value })
              }
            />
          ) : (
            idea5w2hData.where
          )}
        </div>
        <div className="grid-item">
          Who:{' '}
          {editable ? (
            <Input
              value={idea5w2hData.who}
              onChange={(e) =>
                setIdea5w2hData({ ...idea5w2hData, who: e.target.value })
              }
            />
          ) : (
            idea5w2hData.who
          )}
        </div>
        <div className="grid-item">
          What:{' '}
          {editable ? (
            <Input
              value={idea5w2hData.what}
              onChange={(e) =>
                setIdea5w2hData({ ...idea5w2hData, what: e.target.value })
              }
            />
          ) : (
            idea5w2hData.what
          )}
        </div>
        <div className="grid-item">
          How:{' '}
          {editable ? (
            <Input
              value={idea5w2hData.how}
              onChange={(e) =>
                setIdea5w2hData({ ...idea5w2hData, how: e.target.value })
              }
            />
          ) : (
            idea5w2hData.how
          )}
        </div>
        <div className="grid-item">
          How Much:{' '}
          {editable ? (
            <Input
              value={idea5w2hData.how_much}
              onChange={(e) =>
                setIdea5w2hData({ ...idea5w2hData, how_much: e.target.value })
              }
            />
          ) : (
            idea5w2hData.how_much
          )}
        </div>
      </div>

      <Button onClick={handleDelete}>Delete</Button>
      <Button onClick={handleBack}>戻る</Button>

      {!editable ? (
        <Button onClick={handleEditToggle}>編集</Button>
      ) : (
        <Button onClick={handleSave}>保存</Button>
      )}

      <style jsx>{`
        .grid-container {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-gap: 10px;
          margin-top: 20px;
        }

        .grid-item {
          border: 1px solid #ccc;
          padding: 10px;
        }
      `}</style>
    </Box>
  );
}

export default Idea5w2hPage;
