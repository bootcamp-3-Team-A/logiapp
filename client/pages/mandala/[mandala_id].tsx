import { Box, Button, Grid, GridItem, Input, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MandalaData } from '../mandala_types';

function MandalaPage() {
  const router = useRouter();
  const { mandala_id } = router.query;

  const [mandalaData, setMandalaData] = useState<MandalaData | null>(null);
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
          `http://localhost:8000/mandala_core?mandala_id=${mandala_id}`,
        );
        const data = await response.json();
        setMandalaData(data);
      } catch (error) {
        console.error('Mandalaデータの取得中にエラーが発生しました:', error);
      }
    }

    if (mandala_id) {
      fetchData();
    }
  }, [mandala_id]);

  const handleEditToggle = () => {
    setEditable((prevEditable) => !prevEditable);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/mandala_core/${mandala_id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(mandalaData),
        },
      );

      if (response.ok) {
        handleSaveSuccess();
      } else {
        console.error('Mandalaデータの保存中にエラーが発生しました');
      }
    } catch (error) {
      console.error('Mandalaデータの保存中にエラーが発生しました:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/mandala_core/${mandala_id}`,
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

  if (!mandalaData) {
    return <div>ロード中...</div>;
  }

  const gridMapping: { [key: number]: string } = {
    10: 'mandala1_1',
    0: 'mandala1_2',
    1: 'mandala1_3',
    2: 'mandala1_4',
    9: 'mandala1_5',
    11: 'mandala1_6',
    18: 'mandala1_7',
    19: 'mandala1_8',
    20: 'mandala1_9',
    13: 'mandala2_1',
    3: 'mandala2_2',
    4: 'mandala2_3',
    5: 'mandala2_4',
    12: 'mandala2_5',
    14: 'mandala2_6',
    21: 'mandala2_7',
    22: 'mandala2_8',
    23: 'mandala2_9',
    16: 'mandala3_1',
    6: 'mandala3_2',
    7: 'mandala3_3',
    8: 'mandala3_4',
    15: 'mandala3_5',
    17: 'mandala3_6',
    24: 'mandala3_7',
    25: 'mandala3_8',
    26: 'mandala3_9',
    37: 'mandala4_1',
    27: 'mandala4_2',
    28: 'mandala4_3',
    29: 'mandala4_4',
    36: 'mandala4_5',
    38: 'mandala4_6',
    45: 'mandala4_7',
    46: 'mandala4_8',
    47: 'mandala4_9',
    40: 'mandala5_1',
    30: 'mandala5_2',
    31: 'mandala5_3',
    32: 'mandala5_4',
    39: 'mandala5_5',
    41: 'mandala5_6',
    48: 'mandala5_7',
    49: 'mandala5_8',
    50: 'mandala5_9',
    43: 'mandala6_1',
    33: 'mandala6_2',
    34: 'mandala6_3',
    35: 'mandala6_4',
    42: 'mandala6_5',
    44: 'mandala6_6',
    51: 'mandala6_7',
    52: 'mandala6_8',
    53: 'mandala6_9',
    64: 'mandala7_1',
    54: 'mandala7_2',
    55: 'mandala7_3',
    56: 'mandala7_4',
    63: 'mandala7_5',
    65: 'mandala7_6',
    72: 'mandala7_7',
    73: 'mandala7_8',
    74: 'mandala7_9',
    67: 'mandala8_1',
    57: 'mandala8_2',
    58: 'mandala8_3',
    59: 'mandala8_4',
    66: 'mandala8_5',
    68: 'mandala8_6',
    75: 'mandala8_7',
    76: 'mandala8_8',
    77: 'mandala8_9',
    70: 'mandala9_1',
    60: 'mandala9_2',
    61: 'mandala9_3',
    62: 'mandala9_4',
    69: 'mandala9_5',
    71: 'mandala9_6',
    78: 'mandala9_7',
    79: 'mandala9_8',
    80: 'mandala9_9',
  };

  return (
    <Box>
      {saveMessageVisible && <Text color="green">保存しました</Text>}
      <Text fontSize="xl">Mandalaデータ (ID: {mandalaData.mandala_id})</Text>
      <Text>Mandalaタイトル: {mandalaData.mandala_title}</Text>
      {!editable ? <Button onClick={handleEditToggle}>編集</Button> : null}
      <Grid templateColumns="repeat(9, 1fr)" gap="4px" alignItems="center">
        {Array.from({ length: 81 }).map((_, index) => {
          const propName = gridMapping[index];
          const cellData = propName ? mandalaData[propName] : '';

          let backgroundColor = 'gray';

          if (propName === 'mandala5_1') {
            backgroundColor = 'blue';
          }

          return (
            <GridItem
              key={index}
              bg={backgroundColor}
              // Other styles
            >
              {editable ? (
                <Input
                  type="text"
                  value={cellData}
                  onChange={(event) => {
                    const updatedMandalaData = {
                      ...mandalaData,
                      [propName]: event.target.value,
                    };
                    setMandalaData(updatedMandalaData);
                  }}
                />
              ) : (
                cellData
              )}
            </GridItem>
          );
        })}
        <Button onClick={handleDelete}>Delete</Button>
        <Button onClick={handleBack}>戻る</Button>
      </Grid>
      {editable ? <Button onClick={handleSave}>保存</Button> : null}
    </Box>
  );
}

export default MandalaPage;
